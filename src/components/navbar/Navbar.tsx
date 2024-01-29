import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

const Navbar = () => {
    const { logout } = useAuth();
    const [isOpen, toggleOpen] = useState(false);

    useEffect(() => {
        const handleSize = () => {
            toggleOpen(false);
        };

        handleSize();
        window.addEventListener("resize", handleSize);

        return () => window.removeEventListener("resize", handleSize);
    }, []);

    return (
        <div className="flex items-center justify-between gap-4">
            <div>MarvelGroup</div>

            <nav className="">
                <button
                    className="text-2xl sm:hidden"
                    onClick={() => toggleOpen((old) => !old)}
                >
                    <IoMenu />
                </button>

                <ul
                    className={`${
                        isOpen ? "left-0 " : "left-[-100vw]"
                    } flex gap-4 max-sm:flex-col duration-500 max-sm:pl-5  max-sm:pt-5 max-sm:text-lg  max-sm:absolute top-[3.4rem] max-sm:w-[90vw] max-sm:h-[calc(100vh-4.4rem)] max-sm:bg-neutral-100 max-sm:dark:bg-neutral-800`}
                >
                    <li>
                        <NavLink
                            to={{ pathname: "/apparts" }}
                            onClick={() => toggleOpen(false)}
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "border-b-2 border-b-primary-dark !text-primary-dark"
                                        : ""
                                } hover:text-primary-dark duration-500`
                            }
                        >
                            Appartements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{ pathname: "/payment" }}
                            onClick={() => toggleOpen(false)}
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "border-b-2 border-b-primary-dark !text-primary-dark"
                                        : ""
                                } hover:text-primary-dark duration-500`
                            }
                        >
                            Paiements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{ pathname: "/occupants" }}
                            onClick={() => toggleOpen(false)}
                            className={({ isActive }) =>
                                `${
                                    isActive
                                        ? "border-b-2 border-b-primary-dark !text-primary-dark"
                                        : ""
                                } hover:text-primary-dark duration-500`
                            }
                        >
                            Occupants
                        </NavLink>
                    </li>

                    <li className="sm:hidden">
                        <button
                            className="block px-4 py-1 border rounded-md hover:border-primary-dark hover:bg-primary-dark duration-500"
                            onClick={() => {
                                logout();
                                toggleOpen(false);
                            }}
                        >
                            Deconnexion
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="max-sm:hidden flex gap-3">
                <SearchBar />
                <button onClick={() => logout()} className="block">
                    Deconnexion
                </button>
            </div>
        </div>
    );
};

export default Navbar;
