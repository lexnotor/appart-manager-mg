import { useModalContext } from "@/contexts/modal.context";
import { usePaymentContext } from "@/contexts/payment.context";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AntConfig from "./AntConfig";
import { CustomTable } from "./CustomTable";
import generatePdf from "@/functions/generatePayList";
import { FiPrinter } from "react-icons/fi";

const PaymentList = () => {
    const [searchParams] = useSearchParams();
    const { payments } = usePaymentContext();
    const { openModal } = useModalContext();

    const data = useMemo(() => {
        const occupantId = searchParams.get("occupantId");
        const appartId = searchParams.get("appartId");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const fromDate = searchParams.get("fromDate");
        const toDate = searchParams.get("toDate");

        return payments
            .filter(
                (item) => !occupantId || item.data().occupant?.id == occupantId,
            )
            .filter((item) => !appartId || item.data().appart?.id == appartId)
            .filter(
                (item) =>
                    !minPrice || parseInt(item.data().amount) >= +minPrice,
            )
            .filter(
                (item) => !maxPrice || parseInt(item.data().amount) < +maxPrice,
            )
            .filter(
                (item) =>
                    !fromDate ||
                    new Date(
                        item.data().date?.year,
                        item.data().date?.month,
                        item.data().date?.day,
                    ).getTime() >= +fromDate,
            )
            .filter(
                (item) =>
                    !toDate ||
                    new Date(
                        item.data().date?.year,
                        item.data().date?.month,
                        item.data().date?.day,
                    ).getTime() <= +toDate,
            );
    }, [payments, searchParams]);

    return (
        <AntConfig>
            <CustomTable
                columns={[
                    {
                        title: "Libellé",
                        render: (_, record) => (
                            <span className="whitespace-nowrap">
                                {record.data().label}
                            </span>
                        ),
                    },
                    {
                        title: "Occupants",
                        render: (_, record) => (
                            <span className="whitespace-nowrap">
                                {record.data().occupant?.nom}
                            </span>
                        ),
                    },
                    {
                        title: "Date",
                        render: (_, record) => {
                            const date = record.data().date;
                            return (
                                <span className="whitespace-nowrap">
                                    {`${new Date(
                                        date.year,
                                        date.month,
                                        date.day,
                                    ).toLocaleDateString()}`}
                                </span>
                            );
                        },
                    },
                    {
                        title: "Montant",
                        render: (_, record) => (
                            <span className="whitespace-nowrap">
                                {record.data().amount}
                            </span>
                        ),
                    },
                    {
                        title: "Appartement",
                        render: (_, record) => (
                            <span
                                className="whitespace-nowrap"
                                title={`Appartement: ${record.data().appart
                                    ?.title}\nProprieté: ${
                                    record.data().appart.estate.title
                                }`}
                            >
                                {record.data().appart?.title}
                            </span>
                        ),
                    },
                    {
                        title: "Actions",
                        render: (_, record) => (
                            <button
                                onClick={() =>
                                    openModal({
                                        modalId: "DELETE_PAYMENT",
                                        payload: { paymentId: record.id },
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
                            column: [
                                "label",
                                "amount",
                                "occupant",
                                "appart",
                                "date",
                                "created_at",
                            ],
                        })
                    }
                >
                    <FiPrinter />
                </button>
            </div>
        </AntConfig>
    );
};

export default PaymentList;
