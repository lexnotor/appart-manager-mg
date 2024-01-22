import AppartList from "@/components/AppartList";
import { useAppartContext } from "@/contexts/appart.context";
import { useEstateContext } from "@/contexts/estate.context";
import { useModalContext } from "@/contexts/modal.context";
import { useMemo } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const AppartsPage = () => {
    const { apparts } = useAppartContext();
    const { estates } = useEstateContext();
    const params = useParams();
    const estate = estates.find((item) => item.id == params.id);

    const filteredApparts = useMemo(
        () =>
            params.id
                ? apparts.filter(
                      (item) => item.data()?.estate?.id == params?.id,
                  )
                : apparts,
        [apparts, params.id],
    );

    const { openModal } = useModalContext();

    return (
        <div className="p-4 flex flex-col gap-8">
            <header className="flex justify-between">
                <h2>
                    <Link
                        to={"../"}
                        className="text-[90%] opacity-70 underline"
                    >
                        Propriétés
                    </Link>
                    <span className="text-[90%]"> / Appartements /</span>
                    <span className="text-[85%] opacity-80 text-lg max-sm:block sm:text-xl font-bold">
                        {" "}
                        {estate ? estate.data().title : null}
                    </span>
                </h2>
                <div>
                    <button
                        className="px-2 py-1 sm:px-4 sm:py-2 border rounded-md border-primary-dark bg-primary-dark hover:bg-transparent hover:border-primary hover:text-primary duration-500"
                        onClick={() =>
                            openModal({
                                modalId: "CREATE_APPART",
                                payload: { estateId: params.id },
                            })
                        }
                    >
                        <span className="max-sm:hidden">
                            Ajouter appartement
                        </span>
                        <span className="sm:hidden text-2xl">
                            <IoMdAdd />
                        </span>
                    </button>
                </div>
            </header>

            <AppartList apparts={filteredApparts} />
        </div>
    );
};

export default AppartsPage;
