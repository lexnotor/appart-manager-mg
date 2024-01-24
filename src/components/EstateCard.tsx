import living_room from "@/assets/living_room.jpg";
import { useAppartContext } from "@/contexts/appart.context";
import { useDrawerContext } from "@/contexts/drawer.context";
import { EstateEntity } from "@/types";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const EstateCard = ({
    data,
}: {
    data: QueryDocumentSnapshot<EstateEntity, EstateEntity>;
}) => {
    const { apparts } = useAppartContext();
    const { openDrawer } = useDrawerContext();

    const showDetails = () => {
        openDrawer({
            drawerId: "ESTATE_DETAILS",
            payload: { estateId: data.id },
        });
    };

    return (
        <article className="p-2 border border-neutral-700 rounded-md max-w-[30rem] flex flex-col gap-2">
            <div className="flex gap-4">
                <img
                    src={living_room}
                    alt="photo_1"
                    className="w-[10vh] sm:w-1/3 max-sm:self-center shrink-0 aspect-square object-cover object-center rounded-md cursor-pointer"
                />
                <header className="flex flex-col justify-between gap-1">
                    <h3 className="text-lg font-bold cursor-pointer hover:text-primary duration-500">
                        {data.data().title}
                    </h3>
                    <p className="max-sm:hidden flex gap-1">
                        <span className="text-lg pt-1 opacity-50">
                            <FaLocationDot />
                        </span>
                        <span className="text-[85%] opacity-80">
                            {data.data().address}
                        </span>
                    </p>
                </header>
            </div>

            <div className="grow flex flex-col justify-between gap-2">
                <section className="mb-auto text-[85%] text-justify">
                    <p className="">{data.data().description}</p>
                </section>

                <footer className="flex w-full justify-end gap-2 text-[85%] max-sm:items-center">
                    <Link
                        to={`${data.id}`}
                        className="whitespace-nowrap px-2 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                    >
                        Appartements (
                        {
                            apparts.filter(
                                (item) => item.data()?.estate?.id == data.id,
                            ).length
                        }
                        )
                    </Link>
                    <button
                        onClick={showDetails}
                        className="whitespace-nowrap px-2 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                    >
                        Voir plus
                    </button>
                </footer>
            </div>
        </article>
    );
};

export default EstateCard;
