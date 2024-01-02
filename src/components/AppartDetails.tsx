import { LuBadgeCheck } from "react-icons/lu";
import living_room from "@/assets/living_room.jpg";
import { Divider } from "antd";
import { CustomTable } from "./CustomTable";
import { useSearchParams } from "react-router-dom";
import { useAppartContext } from "@/contexts/appart.context";
import { useModalContext } from "@/contexts/modal.context";
import { Timestamp, updateDoc } from "firebase/firestore";
import { AppartEntity } from "@/types";
import { useEffect } from "react";

const AppartDetails = ({ close }: { close: () => any }) => {
    const { apparts } = useAppartContext();
    const { openModal } = useModalContext();
    const [searchParams] = useSearchParams();
    const current = apparts?.find(
        (snap) => snap?.id == searchParams.get("appart"),
    );

    useEffect(() => {
        if (current && current.data()) return;

        const timer = setTimeout(close, 3_000);
        return () => clearTimeout(timer);
    }, [close, current]);

    if (!current || !current?.data())
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-10 h-10 rounded-full border border-transparent border-t-primary animate-spin" />
            </div>
        );

    const data = current.data();

    const freeAppart = () => {
        const history = [...(current.data().history ?? [])];
        history[0] && (history.at(-1).to = new Date().toISOString());

        updateDoc<AppartEntity, AppartEntity>(current.ref as any, {
            occupant: null,
            occupant_ref: null,
            updated_at: Timestamp.now(),
            history,
        });
    };

    return (
        <div className="flex flex-col gap-1 h-full relative">
            <section className="grow overflow-auto flex flex-col gap-4 pr-4">
                <img
                    src={living_room}
                    alt="photo_1"
                    className="shrink-0 w-full rounded-md mx-auto"
                />
                <header className="flex gap-x-8">
                    <h3 className="font-bold text-2xl">{data?.title}</h3>

                    <div className="ml-auto font-bold text-yellow-400">
                        <span>{data?.price_unit} </span>
                        <span className="text-3xl">{data?.price}</span>
                        <span>/mois </span>
                    </div>
                </header>
                <div className="flex flex-wrap gap-x-4 text-[85%]">
                    <div
                        className={`${
                            data.occupant || data.occupant_ref
                                ? "text-primary font-bold text-[110%]"
                                : "text-neutral-600"
                        } flex gap-1 items-center`}
                    >
                        <span className="text-lg">
                            <LuBadgeCheck />
                        </span>
                        <span>Occupé</span>
                    </div>
                    <div className="duration-500 hover:dark:text-primary hover:text-primary-dark flex gap-1 items-center">
                        <button
                            onClick={() =>
                                openModal({
                                    modalId: "EDIT_APPART",
                                    payload: { appartId: current.id },
                                })
                            }
                            className="flex gap-2 text-sm  px-4 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                        >
                            <span>Modifier</span>
                        </button>
                    </div>

                    {data.occupant ? (
                        <button
                            onClick={freeAppart}
                            className="block px-4 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                        >
                            Fin location
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                openModal({
                                    modalId: "NEW_RENT",
                                    payload: { appartId: current?.id },
                                })
                            }
                            className="block px-4 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                        >
                            Louer
                        </button>
                    )}
                    {data.occupant ? (
                        <button
                            onClick={() =>
                                openModal({
                                    modalId: "SAVE_PAYMENT",
                                    payload: { appartId: current?.id },
                                })
                            }
                            className="block px-4 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                        >
                            Nouveau paiement
                        </button>
                    ) : null}
                </div>
                <p>{data?.description}</p>

                <Divider orientation="left" orientationMargin={0}>
                    <span className="font-bold">Paiement</span>
                </Divider>
                <CustomTable
                    columns={[
                        {
                            title: "Occupants",
                            render: (_, record) => record.occupant?.nom || "-",
                        },
                        { title: "Libellé", dataIndex: "label" },
                        { title: "Montant", dataIndex: "amount" },
                        {
                            title: "Date",
                            dataIndex: "date",
                            render: () => new Date().toDateString(),
                        },
                    ]}
                    dataSource={data.payments}
                    scroll={{ x: "max-content" }}
                />

                <Divider orientation="left" orientationMargin={0}>
                    <span className="font-bold">Occupants</span>
                </Divider>
                <CustomTable
                    columns={[
                        {
                            title: "Nom",
                            render: (_, record) => record.nom ?? "-",
                        },
                        {
                            title: "De",
                            dataIndex: "from",
                            render: (text) =>
                                text ? new Date().toDateString() : "-",
                        },
                        {
                            title: "À",
                            dataIndex: "to",
                            render: (text) =>
                                text ? new Date().toDateString() : "-",
                        },
                    ]}
                    dataSource={data.history}
                    scroll={{ x: "max-content" }}
                />
            </section>

            <Divider className="py-0 mt-0 mb-2" />

            <footer className="flex gap-4 justify-end">
                <button
                    onClick={() =>
                        openModal({
                            modalId: "DELETE_APPART",
                            payload: { appartId: current.id },
                        })
                    }
                    className="block px-4 py-1 border rounded-md hover:border-red-700 hover:bg-red-700 duration-500"
                >
                    <span>Supprimer</span>
                </button>
                <button
                    onClick={close}
                    className="block px-4 py-1 border rounded-md hover:border-red-700 hover:bg-red-700 duration-500"
                >
                    Femer
                </button>
            </footer>
        </div>
    );
};

export default AppartDetails;
