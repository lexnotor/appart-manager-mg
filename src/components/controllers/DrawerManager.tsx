import { useDimensionContext } from "@/contexts/dimension.context";
import { useDrawerContext } from "@/contexts/drawer.context";
import { Drawer } from "antd";
import React, { useCallback, useMemo } from "react";
import AntConfig from "../AntConfig";
import AppartDetails from "../drawer/AppartDetails";
import EstateDetails from "../drawer/EstateDetails";

const DrawerManager = () => {
    const { closeDrawer, drawers } = useDrawerContext();
    const { screenX } = useDimensionContext();
    const close = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    const props = useMemo<React.ComponentProps<typeof Drawer>>(
        () => ({
            destroyOnClose: true,
            onClose: close,
            closable: false,
            footer: false,
            width: screenX <= 720 ? "90vw" : "720px",
        }),
        [close, screenX],
    );

    return (
        <AntConfig>
            <Drawer {...props} open={drawers?.drawerId == "APPART_DETAILS"}>
                {drawers?.drawerId == "APPART_DETAILS" && (
                    <AppartDetails close={close} payload={drawers?.payload} />
                )}
            </Drawer>

            <Drawer {...props} open={drawers?.drawerId == "ESTATE_DETAILS"}>
                {drawers?.drawerId == "ESTATE_DETAILS" && (
                    <EstateDetails close={close} payload={drawers?.payload} />
                )}
            </Drawer>
        </AntConfig>
    );
};

export default DrawerManager;
