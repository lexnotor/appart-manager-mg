import OccupantList from "@/components/OccupantList";
import { useModalContext } from "@/contexts/modal.context";
import { useOccupantContext } from "@/contexts/occupant.context";
import { IoMdAdd } from "react-icons/io";

const OccupantsPage = () => {
    const { occupants } = useOccupantContext();
    const { openModal } = useModalContext();

    return (
        <div className="p-4 flex flex-col gap-8">
            <header className="flex justify-between">
                <h2 className="text-2xl font-bold">Occupants</h2>
                <div>
                    <button
                        className="px-4 py-2 border rounded-md border-primary-dark bg-primary-dark hover:bg-transparent hover:border-primary hover:text-primary duration-500"
                        onClick={() => openModal({ modalId: "ADD_OCCUPANT" })}
                    >
                        <span className="max-sm:hidden">Nouvel occupant</span>
                        <span className="sm:hidden text-xl">
                            <IoMdAdd />
                        </span>
                    </button>
                </div>
            </header>

            <OccupantList occupants={occupants} />
        </div>
    );
};

export default OccupantsPage;
