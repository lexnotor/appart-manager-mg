import { useModalContext } from "@/contexts/modal.context";
import { usePaymentContext } from "@/contexts/payment.context";
import AntConfig from "./AntConfig";
import { CustomTable } from "./CustomTable";

const PaymentList = () => {
    const { payments } = usePaymentContext();
    const { openModal } = useModalContext();

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
                dataSource={payments}
            />
        </AntConfig>
    );
};

export default PaymentList;
