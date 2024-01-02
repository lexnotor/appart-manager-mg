import { QueryDocumentSnapshot } from "firebase/firestore";
import AntConfig from "./AntConfig";
import { CustomTable } from "./CustomTable";
import { OccupantEntity } from "@/types";
import { useAppartContext } from "@/contexts/appart.context";
import { Tag } from "antd";

const OccupantList = ({
    occupants,
}: {
    occupants: QueryDocumentSnapshot<OccupantEntity>[];
}) => {
    const { apparts } = useAppartContext();

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
                    { title: "Action" },
                ]}
                dataSource={occupants}
            />
        </AntConfig>
    );
};

export default OccupantList;
