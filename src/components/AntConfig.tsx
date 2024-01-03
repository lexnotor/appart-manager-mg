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
                        zIndexBase: 40,
                        zIndexPopupBase: 50,
                    },
                    Select: {
                        colorBgContainer: "transparent",
                        colorPrimary: "#2fdde0",
                        colorPrimaryActive: "#2fdde0",
                        colorPrimaryHover: "#404040",
                        fontSizeLG: 14,
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
