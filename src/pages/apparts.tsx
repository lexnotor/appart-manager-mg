import AntConfig from "@/components/AntConfig";
import AppartDetails from "@/components/AppartDetails";
import AppartList from "@/components/AppartList";
import { useAppartContext } from "@/contexts/appart.context";
import { useDimensionContext } from "@/contexts/dimension.context";
import { useModalContext } from "@/contexts/modal.context";
import { Drawer } from "antd";
import { useCallback } from "react";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const AppartsPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { apparts } = useAppartContext();

    const closeDetails = useCallback(() => {
        const query = new URLSearchParams(searchParams);
        query.delete("appart");
        setSearchParams(query);
    }, [searchParams, setSearchParams]);

    const { screenX } = useDimensionContext();
    const { openModal } = useModalContext();

    return (
        <div className="p-4 flex flex-col gap-8">
            <header className="flex justify-between">
                <h2 className="text-2xl font-bold">Appartements</h2>
                <div>
                    <button
                        className="px-4 py-2 border rounded-md border-primary-dark bg-primary-dark hover:bg-transparent hover:border-primary hover:text-primary duration-500"
                        onClick={() => openModal({ modalId: "CREATE_APPART" })}
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

            <AppartList apparts={apparts} />

            <AntConfig>
                <Drawer
                    destroyOnClose
                    onClose={closeDetails}
                    open={!!searchParams?.get("appart")}
                    closable={false}
                    footer={false}
                    width={screenX <= 720 ? "90vw" : "720px"}
                >
                    <AppartDetails close={closeDetails} />
                </Drawer>
            </AntConfig>
        </div>
    );
};

export default AppartsPage;
