import { AppartEntity } from "@/types";
import AppartCard from "./AppartCard";
import { QueryDocumentSnapshot } from "firebase/firestore";

const AppartList = ({
    apparts,
}: {
    apparts: QueryDocumentSnapshot<AppartEntity>[];
}) => {
    return apparts?.length ? (
        <ul className="sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(26rem,1fr))]">
            {apparts.map((data, i) => (
                <li key={i}>
                    <AppartCard data={data} />
                </li>
            ))}
        </ul>
    ) : (
        <div className="w-full h-[50vh] flex justify-center items-center text-center">
            <span>Veuillez ajouter un Appartement</span>
        </div>
    );
};

export default AppartList;
