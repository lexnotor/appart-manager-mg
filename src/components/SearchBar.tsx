import { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useSearchParams } from "react-router-dom";
import { LuFilter } from "react-icons/lu";
import { useModalContext } from "@/contexts/modal.context";

const SearchBar = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const { openModal } = useModalContext();
    const pathname = useLocation().pathname;

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setSearchParams((old) => {
            const query = new URLSearchParams(old);
            searchRef.current.value
                ? query.set("text", searchRef.current.value)
                : query.delete("text");
            return query;
        });
    };

    const openFilter = () => {
        openModal({
            modalId: "OPEN_FILTER",
            payload: {
                filterType: pathname.startsWith("/apparts")
                    ? "APPART"
                    : pathname.startsWith("/payment")
                      ? "PAIEMENT"
                      : pathname.startsWith("/occupants")
                        ? "OCCUPANT"
                        : "ESTATE",
            },
        });
    };

    useEffect(() => {
        searchRef.current.value = searchParams.get("text") ?? "";
    }, [searchParams]);

    return (
        <form
            onSubmit={submit}
            className="flex gap-1 max-sm:w-full max-sm:px-4"
        >
            <div className="grow flex gap-3 border rounded-r-full rounded-l-full relative pr-1">
                <input
                    type="search"
                    id="search"
                    name="search"
                    className="grow !border-none focus:outline-none rounded-r-full rounded-l-full"
                    ref={searchRef}
                    placeholder="Recherche ..."
                />
                <button className="bg-primary-dark h-[36px] w-[36px] relative my-auto rounded-full flex justify-center items-center text-xl">
                    <IoSearch />
                </button>
            </div>
            {!pathname.startsWith("/estates") && (
                <button
                    onClick={openFilter}
                    type="button"
                    className="bg-primary-dark h-[36px] w-[36px] relative my-auto rounded-full flex justify-center items-center text-xl"
                >
                    <LuFilter />
                </button>
            )}
        </form>
    );
};

export default SearchBar;
