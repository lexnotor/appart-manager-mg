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
                        render: (_, record) => record.data().label,
                    },
                    {
                        title: "Occupants",
                        render: (_, record) => record.data().occupant?.nom,
                    },
                    {
                        title: "Date",
                        render: (_, record) =>
                            new Date(record.data().date).toDateString(),
                    },
                    {
                        title: "Montant",
                        render: (_, record) => record.data().amount,
                    },
                    {
                        title: "Appartement",
                        render: (_, record) => record.data().appart?.title,
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
