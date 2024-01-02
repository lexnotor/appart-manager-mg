import { usePaymentContext } from "@/contexts/payment.context";
import AntConfig from "./AntConfig";
import { CustomTable } from "./CustomTable";

const PaymentList = () => {
    const { payments } = usePaymentContext();
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
                ]}
                dataSource={payments}
            />
        </AntConfig>
    );
};

export default PaymentList;
