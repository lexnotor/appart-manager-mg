import EstateList from "@/components/EstateList";
import { useEstateContext } from "@/contexts/estate.context";
import { useModalContext } from "@/contexts/modal.context";
import { IoMdAdd } from "react-icons/io";

const EstatesPage = () => {
    const { estates } = useEstateContext();
    const { openModal } = useModalContext();

    return (
        <div className="p-4 flex flex-col gap-8">
            <header className="flex justify-between">
                <h2 className="text-xl sm:text-2xl font-bold">Propriétés</h2>
                <div>
                    <button
                        className="px-2 py-1 sm:px-4 sm:py-2 border rounded-md border-primary-dark bg-primary-dark hover:bg-transparent hover:border-primary hover:text-primary duration-500"
                        onClick={() => openModal({ modalId: "CREATE_ESTATE" })}
                    >
                        <span className="max-sm:hidden">
                            Nouvelle propriété
                        </span>
                        <span className="sm:hidden text-2xl">
                            <IoMdAdd />
                        </span>
                    </button>
                </div>
            </header>

            <EstateList estates={estates} />
        </div>
    );
};

export default EstatesPage;
