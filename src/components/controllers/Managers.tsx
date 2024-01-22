import { Suspense } from "react";
import AntConfig from "../AntConfig";
import ModalManager from "./ModalManager";
import DrawerManager from "./DrawerManager";

const Managers = () => {
    return (
        <AntConfig>
            <Suspense
                fallback={
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 flex justify-center items-center">
                        <div className="w-10 h-10 rounded-full border border-transparent border-t-primary animate-spin" />
                    </div>
                }
            >
                <DrawerManager />
                <ModalManager />
            </Suspense>
        </AntConfig>
    );
};

export default Managers;
