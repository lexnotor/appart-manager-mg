import estate_out from "@/assets/estate_out.jpg";
import { useAppartContext } from "@/contexts/appart.context";
import { useEstateContext } from "@/contexts/estate.context";
import { Divider } from "antd";
import { useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CustomTable } from "../CustomTable";

const EstateDetails = ({
    close,
    payload,
}: {
    close: () => any;
    payload: { estateId: string };
}) => {
    const { estates } = useEstateContext();
    const currentEstate = estates.find((item) => item.id == payload?.estateId);

    const { apparts } = useAppartContext();
    const listAppart = apparts.filter(
        (item) => item.data().estate?.id == payload.estateId,
    );

    useEffect(() => {
        if (currentEstate && currentEstate.data()) return;

        const timer = setTimeout(close, 3_000);
        return () => clearTimeout(timer);
    }, [close, currentEstate]);

    const data = currentEstate ? currentEstate.data() : null;

    return (
        <div className="flex flex-col gap-1 h-full relative">
            <section className="grow overflow-auto flex flex-col gap-4 pr-4">
                <img
                    src={estate_out}
                    alt="photo_1"
                    className="shrink-0 w-full rounded-md mx-auto"
                />

                <p>
                    <span>Propriété </span>
                    {data?.created_at && (
                        <span>
                            (Ajouté le{" "}
                            {data.created_at.toDate().toLocaleDateString()})
                        </span>
                    )}
                </p>
                <header className="flex gap-x-8">
                    <h3 className="font-bold text-2xl">{data?.title}</h3>
                </header>

                <p>
                    <p className="max-sm:hidden flex gap-1">
                        <span className="text-lg  opacity-50">
                            <FaLocationDot />
                        </span>
                        <span className="text-[85%] opacity-80">
                            {data?.address}
                        </span>
                    </p>
                </p>

                <p>{data?.description}</p>

                <Divider orientation="left" orientationMargin={0}>
                    <span className="font-bold">Appartments</span>
                </Divider>
                <CustomTable
                    dataSource={listAppart}
                    columns={[
                        {
                            title: "Designation",
                            render: (_, record) =>
                                record.data().title.slice(0, 50) + " ...",
                        },
                        {
                            title: "Loyer",
                            render: (_, record) =>
                                `${record.data().price} ${
                                    record.data().price_unit
                                }`,
                        },
                        {
                            title: "Etat",
                            render: (_, record) =>
                                record.data().occupant ? (
                                    <span className="text-primary-dark">
                                        Occupé ({record.data().occupant.nom})
                                    </span>
                                ) : (
                                    <span>Non-Occupé</span>
                                ),
                        },
                    ]}
                />
            </section>

            <Divider className="py-0 mt-0 mb-2" />

            <footer className="flex gap-4 justify-end">
                <button
                    onClick={close}
                    className="block px-4 py-1 border rounded-md hover:border-red-700 hover:bg-red-700 duration-500"
                >
                    Femer
                </button>
            </footer>
        </div>
    );
};

export default EstateDetails;
