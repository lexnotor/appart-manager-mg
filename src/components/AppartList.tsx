import { AppartEntity } from "@/types";
import AppartCard from "./AppartCard";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import generatePdf from "@/functions/generateAppartList";
import { FiPrinter } from "react-icons/fi";

const AppartList = ({
    apparts,
}: {
    apparts: QueryDocumentSnapshot<AppartEntity, AppartEntity>[];
}) => {
    const [searchParams] = useSearchParams();
    const data = useMemo(() => {
        const text = searchParams.get("text");
        const noFree = searchParams.get("noFree");
        const free = searchParams.get("free");
        const occupantId = searchParams.get("occupantId");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        return apparts
            .filter(
                (item) =>
                    !text ||
                    text == "all" ||
                    new RegExp(text, "i").test(item.data().title),
            )
            .filter(
                (item) => !occupantId || item.data().occupant?.id == occupantId,
            )
            .filter((item) => !noFree || item.data().occupant)
            .filter((item) => !free || !item.data().occupant)
            .filter((item) => !minPrice || +item.data().price > +minPrice)
            .filter((item) => !maxPrice || +item.data().price < +maxPrice);
    }, [apparts, searchParams]);

    return data?.length ? (
        <>
            <ul className="sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
                {data.map((data, i) => (
                    <li key={i}>
                        <AppartCard data={data} />
                    </li>
                ))}
            </ul>
            <div className="">
                <button
                    className="bg-primary-dark h-[3rem] shadow-md aspect-square fixed bottom-[5vh] right-[1vw] my-auto rounded-full flex justify-center items-center text-2xl"
                    title="Imprimer la liste"
                    onClick={() =>
                        generatePdf(data, {
                            column: [
                                "title",
                                "estate",
                                "price",
                                "price_unit",
                                "created_at",
                            ],
                        })
                    }
                >
                    <FiPrinter />
                </button>
            </div>
        </>
    ) : (
        <div className="w-full h-[50vh] flex justify-center items-center text-center">
            <span>Aucun appartement trouvé</span>
        </div>
    );
};

export default AppartList;
