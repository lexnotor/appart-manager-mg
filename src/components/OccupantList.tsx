import { QueryDocumentSnapshot } from "firebase/firestore";
import AntConfig from "./AntConfig";
import { CustomTable } from "./CustomTable";
import { OccupantEntity } from "@/types";
import { useAppartContext } from "@/contexts/appart.context";
import { Tag } from "antd";
import { useModalContext } from "@/contexts/modal.context";

const OccupantList = ({
    occupants,
}: {
    occupants: QueryDocumentSnapshot<OccupantEntity>[];
}) => {
    const { apparts } = useAppartContext();
    const { openModal } = useModalContext();

    return (
        <AntConfig>
            <CustomTable
                columns={[
                    {
                        title: "Nom",
                        render: (_, record) => record.data().nom ?? "-",
                    },
                    {
                        title: "Télèphone",
                        render: (_, record) => record.data().phone ?? "-",
                    },
                    {
                        title: "Email",
                        render: (_, record) => record.data().email ?? "-",
                    },
                    {
                        title: "Status",
                        render: (_, record) =>
                            apparts.find(
                                (item) =>
                                    item?.data().occupant_ref?.id == record.id,
                            ) ? (
                                <Tag color="cyan">Occuper</Tag>
                            ) : (
                                "-"
                            ),
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
                dataSource={occupants}
            />
        </AntConfig>
    );
};

export default OccupantList;
