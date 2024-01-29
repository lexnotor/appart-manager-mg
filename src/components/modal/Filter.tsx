import { useAppartContext } from "@/contexts/appart.context";
import { useEstateContext } from "@/contexts/estate.context";
import { useOccupantContext } from "@/contexts/occupant.context";
import { PaymentEntity } from "@/types";
import { DatePicker, Modal, Select } from "antd";
import React, { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Filter = ({
    closeModal,
    payload: { filterType },
}: {
    closeModal: () => any;
    payload: { filterType: "ESTATE" | "APPART" | "PAIEMENT" | "OCCUPANT" };
}) => {
    const [loading] = useState(false);
    const { estates } = useEstateContext();
    const { occupants } = useOccupantContext();
    const { apparts } = useAppartContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const minPriceRef = useRef<HTMLInputElement>(null),
        maxPriceRef = useRef<HTMLInputElement>(null),
        fromDateRef = useRef<PaymentEntity["date"]>(null),
        toDateRef = useRef<PaymentEntity["date"]>(null),
        delayRef = useRef<HTMLInputElement>(null),
        noDelayRef = useRef<HTMLInputElement>(null),
        freeRef = useRef<HTMLInputElement>(null),
        noFreeRef = useRef<HTMLInputElement>(null),
        estateRef = useRef<{ value: string }>({ value: "all" }),
        appartRef = useRef<{ value: string }>({ value: "all" }),
        occupantRef = useRef<{ value: string }>({ value: "all" });

    const { isPayFilter, isAppartFilter, isOccupantFilter } = useMemo(
        () => ({
            isPayFilter: filterType == "PAIEMENT",
            isOccupantFilter: filterType == "OCCUPANT",
            isEstateFilter: filterType == "ESTATE",
            isAppartFilter: filterType == "APPART",
        }),
        [filterType],
    );

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const query = new URLSearchParams(searchParams);

        minPriceRef.current && minPriceRef.current.value
            ? query.set("minPrice", minPriceRef.current.value)
            : query.delete("minPrice");
        maxPriceRef.current && maxPriceRef.current.value
            ? query.set("maxPrice", maxPriceRef.current.value)
            : query.delete("maxPrice");

        estateRef.current && estateRef.current.value != "all"
            ? query.set("estateId", estateRef.current.value)
            : query.delete("estateId");
        appartRef.current && appartRef.current.value != "all"
            ? query.set("appartId", appartRef.current.value)
            : query.delete("appartId");
        occupantRef.current && occupantRef.current.value != "all"
            ? query.set("occupantId", occupantRef.current.value)
            : query.delete("occupantId");

        delayRef.current && !delayRef.current.checked
            ? query.set("isdelay", "no")
            : query.delete("isdelay");
        noDelayRef.current && !noDelayRef.current.checked
            ? query.set("noDelay", "no")
            : query.delete("noDelay");
        freeRef.current && !freeRef.current.checked
            ? query.set("free", "no")
            : query.delete("free");
        noFreeRef.current && !noFreeRef.current.checked
            ? query.set("noFree", "no")
            : query.delete("noFree");

        fromDateRef.current && fromDateRef.current.month
            ? query.set(
                  "fromDate",
                  new Date(
                      fromDateRef.current.year,
                      fromDateRef.current.month,
                      fromDateRef.current.day,
                  )
                      .getTime()
                      .toString(),
              )
            : query.delete("fromDate");
        toDateRef.current && toDateRef.current.month
            ? query.set(
                  "toDate",
                  new Date(
                      toDateRef.current.year,
                      toDateRef.current.month,
                      toDateRef.current.day,
                  )
                      .getTime()
                      .toString(),
              )
            : query.delete("toDate");

        setSearchParams(query);
        closeModal();
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Filtrer la Recherche
            </h1>
            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                {isAppartFilter ? (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="estate-select" className="basis-full">
                            Propriété
                        </label>
                        <Select
                            id="estate-select"
                            showSearch
                            placeholder="Choisir une propriété ..."
                            onChange={(value) => {
                                estateRef.current.value = value;
                            }}
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            defaultValue={searchParams.get("estateId") ?? "all"}
                            options={[
                                {
                                    label: "Toutes les propriétés",
                                    value: "all",
                                },
                                ...estates.map((item) => ({
                                    value: item.id,
                                    label: item.data().title,
                                })),
                            ]}
                            size="large"
                            className=""
                        />
                    </div>
                ) : null}

                {isPayFilter || isAppartFilter ? (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="occupant-select" className="basis-full">
                            Occupant
                        </label>
                        <Select
                            id="occupant-select"
                            showSearch
                            placeholder="Choisir Occupant ..."
                            onChange={(value) => {
                                occupantRef.current.value = value;
                            }}
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            defaultValue={
                                searchParams.get("occupantId") ?? "all"
                            }
                            options={[
                                {
                                    label: "Tous les occupants",
                                    value: "all",
                                },
                                ...occupants.map((item) => ({
                                    value: item.id,
                                    label: item.data().nom,
                                })),
                            ]}
                            size="large"
                            className=""
                        />
                    </div>
                ) : null}

                {isPayFilter ? (
                    <div className="flex flex-col gap-2">
                        <label htmlFor="appart-select" className="basis-full">
                            Appartement
                        </label>
                        <Select
                            id="appart-select"
                            showSearch
                            placeholder="Choisir Appartement ..."
                            onChange={(value) => {
                                appartRef.current.value = value;
                            }}
                            filterOption={(input, option) =>
                                (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                            defaultValue={searchParams.get("appartId") ?? "all"}
                            options={[
                                {
                                    label: "Tous les Appartements",
                                    value: "all",
                                },
                                ...apparts.map((item) => ({
                                    value: item.id,
                                    label: item.data().title,
                                })),
                            ]}
                            size="large"
                            className=""
                        />
                    </div>
                ) : null}

                {isAppartFilter || isPayFilter ? (
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="new-appart-price"
                            className="basis-full"
                        >
                            Prix ou montant
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                min={0}
                                id="min-price"
                                className="grow border border-neutral-700 rounded-lg p-2"
                                placeholder="min"
                                ref={minPriceRef}
                            />
                            <input
                                type="number"
                                min={0}
                                id="max-price"
                                className="grow border border-neutral-700 rounded-lg p-2"
                                placeholder="max"
                                ref={maxPriceRef}
                            />
                        </div>
                    </div>
                ) : null}

                {isPayFilter ? (
                    <div className="flex flex-col gap-2">
                        <label className="basis-full">Période</label>
                        <div className="flex gap-2">
                            <DatePicker
                                picker="month"
                                onChange={(value) =>
                                    (fromDateRef.current = value
                                        ? {
                                              month: value.month(),
                                              year: value.year(),
                                              day: value.daysInMonth(),
                                          }
                                        : null)
                                }
                                size="large"
                                className="grow"
                                placeholder="Du mois ..."
                            />
                            <DatePicker
                                picker="month"
                                onChange={(value) =>
                                    (toDateRef.current = value
                                        ? {
                                              month: value.month(),
                                              year: value.year(),
                                              day: value.daysInMonth(),
                                          }
                                        : null)
                                }
                                size="large"
                                className="grow"
                                placeholder="Au mois ..."
                            />
                        </div>
                    </div>
                ) : null}

                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-price" className="basis-full">
                        {/* Status */}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                        {isAppartFilter ? (
                            <>
                                <label
                                    htmlFor="free"
                                    className="self-end flex gap-1 items-center cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name="free"
                                        id="free"
                                        className="peer"
                                        hidden
                                        ref={freeRef}
                                        defaultChecked={
                                            !searchParams.get("free")
                                        }
                                    />
                                    <span className="checkbox" />
                                    <span>Non occupé</span>
                                </label>
                                <label
                                    htmlFor="no-free"
                                    className="self-end flex gap-1 items-center cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name="no-free"
                                        id="no-free"
                                        className="peer"
                                        hidden
                                        ref={noFreeRef}
                                        defaultChecked={
                                            !searchParams.get("noFree")
                                        }
                                    />
                                    <span className="checkbox" />
                                    <span>Occupé</span>
                                </label>
                            </>
                        ) : null}
                        {isOccupantFilter ? (
                            <>
                                <label
                                    htmlFor="no-delay"
                                    className="self-end flex gap-1 items-center cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name="no-delay"
                                        id="no-delay"
                                        className="peer"
                                        ref={noDelayRef}
                                        hidden
                                        defaultChecked={
                                            !searchParams.get("noDelay")
                                        }
                                    />
                                    <span className="checkbox" />
                                    <span>En ordre</span>
                                </label>
                                <label
                                    htmlFor="delay"
                                    className="self-end flex gap-1 items-center cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name="delay"
                                        id="delay"
                                        className="peer"
                                        hidden
                                        ref={delayRef}
                                        defaultChecked={
                                            !searchParams.get("isdelay")
                                        }
                                    />
                                    <span className="checkbox" />
                                    <span>En retard</span>
                                </label>
                            </>
                        ) : null}
                    </div>
                </div>

                <footer className="flex justify-center gap-8 mt-4">
                    <button
                        type="button"
                        className="py-2 px-12 rounded-lg bg-primary-dark text-white"
                        onClick={closeModal}
                    >
                        Annuler
                    </button>
                    <button
                        disabled={loading}
                        className="flex gap-2 py-2 px-12 rounded-lg bg-primary-dark disabled:bg-primary-dark/60 text-white"
                    >
                        {loading && (
                            <span className="w-4 h-4 rounded-full border border-transparent border-t-white animate-spin" />
                        )}
                        <span>Valider</span>
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default Filter;
