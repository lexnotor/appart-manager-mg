import { EstateEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import EstateCard from "./EstateCard";

const EstateList = ({
    estates,
}: {
    estates: QueryDocumentSnapshot<EstateEntity, EstateEntity>[];
}) => {
    return (
        <ul className="sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
            {estates.map((data) => (
                <li>
                    <EstateCard data={data} />
                </li>
            ))}
        </ul>
    );
};

export default EstateList;
