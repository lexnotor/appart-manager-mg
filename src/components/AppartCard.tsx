import living_room from "@/assets/living_room.jpg";
import { useModalContext } from "@/contexts/modal.context";
import { AppartEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { LuBadgeCheck } from "react-icons/lu";

const AppartCard = ({
    data,
}: {
    data: QueryDocumentSnapshot<AppartEntity>;
}) => {
    const { openDrawer } = useModalContext();
    const showDetail = () =>
        openDrawer({
            drawerId: "APPART_DETAILS",
            payload: { appartId: data.id },
        });

    return (
        <article className="p-2 border border-neutral-700 rounded-md max-w-[30rem] flex gap-2">
            <img
                onClick={showDetail}
                src={living_room}
                alt="photo_1"
                className="w-[10vh] sm:w-1/2 shrink-0 aspect-square object-cover object-center rounded-md cursor-pointer"
            />
            <div className="grow flex flex-col justify-between gap-2">
                <header>
                    <h3
                        className="font-bold cursor-pointer hover:text-primary duration-500"
                        onClick={showDetail}
                    >
                        {data.data()?.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 text-[85%] mt-1">
                        <div
                            className={`${
                                data.data().occupant || data.data().occupant_ref
                                    ? "text-primary font-bold text-[110%]"
                                    : "text-neutral-600"
                            } flex gap-1 items-center max-sm:hidden`}
                        >
                            <span className="text-lg">
                                <LuBadgeCheck />
                            </span>
                            <span>Occupé</span>
                        </div>
                    </div>
                </header>

                <section className="max-sm:hidden mb-auto text-[85%] text-justify">
                    <p className="">
                        {(data.data().description ?? "")?.slice(0, 100)}
                        {(data.data().description ?? "").length > 100 && " ..."}
                    </p>
                </section>

                <footer className="flex w-full justify-between gap-2 text-[85%] max-sm:items-center">
                    <div className="text-yellow-400">
                        <span>{data.data().price_unit} </span>
                        <span className="sm:text-xl font-bold">
                            {data.data().price}
                        </span>
                        <span className="max-sm:hidden">/mois </span>
                    </div>

                    <div
                        className={`${
                            data.data().occupant || data.data().occupant_ref
                                ? "text-primary font-bold text-[110%]"
                                : "text-neutral-600"
                        } flex gap-1 items-center sm:hidden`}
                    >
                        <span className="text-lg">
                            <LuBadgeCheck />
                        </span>
                        <span>Occupé</span>
                    </div>

                    <button
                        onClick={showDetail}
                        className="whitespace-nowrap px-2 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                    >
                        Voir plus
                    </button>
                </footer>
            </div>
        </article>
    );
};

export default AppartCard;
