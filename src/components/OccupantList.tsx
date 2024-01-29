import { useAppartContext } from "@/contexts/appart.context";
import { useModalContext } from "@/contexts/modal.context";
import generatePdf from "@/functions/generateOccupantList";
import { AppartEntity, OccupantEntity } from "@/types";
import { Tag } from "antd";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { FiPrinter } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import AntConfig from "./AntConfig";
import { CustomTable } from "./CustomTable";

const OccupantList = ({
    occupants,
}: {
    occupants: QueryDocumentSnapshot<OccupantEntity, OccupantEntity>[];
}) => {
    const { apparts } = useAppartContext();
    const { openModal } = useModalContext();
    const [searchParams] = useSearchParams();

    const isDelay = useCallback(
        (appart: QueryDocumentSnapshot<AppartEntity, AppartEntity>) => {
            const lastPayement = appart.data().payments.at(-1);
            const lastPayementDate = new Date(
                lastPayement?.date?.year,
                lastPayement?.date?.month,
                lastPayement?.date?.day,
            );
            return !lastPayement || lastPayementDate.getTime() < Date.now();
        },
        [],
    );

    const data = useMemo(() => {
        const hasdelay = searchParams.get("isdelay");
        const noDelay = searchParams.get("noDelay");

        return occupants
            .filter((occupant) => {
                if (!hasdelay) return true;

                const currentAppart = apparts.find(
                    (appart) => appart?.data().occupant_ref?.id == occupant.id,
                );
                // bloc les retardataire
                return !(currentAppart && !isDelay(currentAppart));
            })
            .filter((occupant) => {
                if (!noDelay) return true;

                const currentAppart = apparts.find(
                    (appart) => appart?.data().occupant_ref?.id == occupant.id,
                );
                // bloc ceux qui sont en ordre
                return !(!currentAppart || !isDelay(currentAppart));
            });
    }, [occupants, searchParams, apparts, isDelay]);

    return (
        <AntConfig>
            <CustomTable
                columns={[
                    {
                        title: "Nom",
                        render: (_, record) => (
                            <span className="whitespace-nowrap">
                                {record.data().nom ?? "-"}
                            </span>
                        ),
                    },
                    {
                        title: "Télèphone",
                        render: (_, record) => (
                            <span className="whitespace-nowrap">
                                {record.data().phone ?? "-"}
                            </span>
                        ),
                    },
                    {
                        title: "Email",
                        render: (_, record) => (
                            <span className="whitespace-nowrap">
                                {record.data().email ?? "-"}
                            </span>
                        ),
                    },
                    {
                        title: "Status",
                        render: (_, record) => {
                            const appart = apparts.find(
                                (item) =>
                                    item?.data().occupant_ref?.id == record.id,
                            );
                            if (!appart) return <>-</>;

                            return (
                                <div>
                                    <Tag color="cyan">Occuper</Tag>

                                    {isDelay(appart) && (
                                        <Tag color="red">Retard</Tag>
                                    )}
                                </div>
                            );
                        },
                    },
                    {
                        title: "Actions",
                        render: (_, record) => (
                            <button
                                onClick={() =>
                                    openModal({
                                        modalId: "DELETE_OCCUPANT",
                                        payload: { occupantId: record.id },
                                    })
                                }
                                className="block px-4 py-1 border rounded-md hover:border-red-700 hover:bg-red-700 duration-500"
                            >
                                Supprimer
                            </button>
                        ),
                    },
                ]}
                dataSource={data}
            />
            <div className="">
                <button
                    className="bg-primary-dark h-[3rem] shadow-md aspect-square fixed bottom-[5vh] right-[1vw] my-auto rounded-full flex justify-center items-center text-2xl"
                    title="Imprimer la liste"
                    onClick={() =>
                        generatePdf(data, {
                            column: ["nom", "phone", "created_at", "email"],
                        })
                    }
                >
                    <FiPrinter />
                </button>
            </div>
        </AntConfig>
    );
};

export default OccupantList;
