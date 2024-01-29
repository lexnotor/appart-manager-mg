import { EstateEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import EstateCard from "./EstateCard";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const EstateList = ({
    estates,
}: {
    estates: QueryDocumentSnapshot<EstateEntity, EstateEntity>[];
}) => {
    const [searchParams] = useSearchParams();
    const data = useMemo(() => {
        const text = searchParams.get("text");
        return estates.filter(
            (item) => !text || new RegExp(text, "i").test(item.data().title),
        );
    }, [estates, searchParams]);

    return data?.length ? (
        <ul className="sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
            {data.map((data) => (
                <li>
                    <EstateCard data={data} />
                </li>
            ))}
        </ul>
    ) : (
        <div className="w-full h-[50vh] flex justify-center items-center text-center">
            <span>Aucune propriété trouvée</span>
        </div>
    );
};

export default EstateList;
