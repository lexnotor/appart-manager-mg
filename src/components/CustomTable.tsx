import { Table } from "antd";

import { AnyObject } from "antd/es/_util/type";

type Cust<T extends AnyObject> = Parameters<typeof Table<T>>[0];

export function CustomTable<T extends AnyObject>({ ...arg }: Cust<T>) {
    return (
        <Table
            className="bg-transparent"
            size="small"
            locale={{
                emptyText: (
                    <div className="text-center py-20 text-base">
                        La liste est vide
                    </div>
                ),
            }}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ x: "max-width" }}
            {...arg}
            components={{
                header: {
                    cell: ({ children, ...rest }: { children: any }) => (
                        <td
                            {...rest}
                            className="p-2 hover:!bg-transparent !font-medium !text-black text-sm !bg-white"
                        >
                            {children}
                        </td>
                    ),
                    row: ({ children }: { children: any }) => (
                        <tr>{children}</tr>
                    ),
                },
                body: {
                    row: ({ children }: { children: any }) => (
                        <tr className="!rounded-xl odd:!bg-transparent even:!bg-[#f1f1f134] hover:!bg-[#e5e5e5]/40 transition-colors duration-500">
                            {children}
                        </tr>
                    ),
                    cell: ({ children, ...rest }: { children: any }) => (
                        <td
                            {...rest}
                            className="p-0 !font-normal !text-black text-sm !border-none"
                        >
                            {children}
                        </td>
                    ),
                },
            }}
        />
    );
}
