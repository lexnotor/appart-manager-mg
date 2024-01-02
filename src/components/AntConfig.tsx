import { useDimensionContext } from "@/contexts/dimension.context";
import { ConfigProvider, theme } from "antd";
import { ReactNode } from "react";

const AntConfig = ({ children }: { children: ReactNode }) => {
    const { darkAlgorithm, defaultAlgorithm } = theme;

    const { isDark } = useDimensionContext();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Drawer: {
                        paddingLG: 16,
                        paddingMD: 16,
                        paddingSM: 16,
                        paddingXL: 16,
                        paddingXS: 16,
                    },
                    Table: {
                        colorBgContainer: "transparent",
                    },
                },
                algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntConfig;
