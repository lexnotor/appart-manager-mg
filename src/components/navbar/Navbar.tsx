import useAuth from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { logout } = useAuth();

    return (
        <div className="flex justify-between gap-4">
            <div>NdakuM</div>

            <nav>
                <ul className="flex gap-4">
                    <li>
                        <NavLink to={{ pathname: "/apparts" }}>
                            Appartements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: "/payment" }}>
                            Paiements
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={{ pathname: "/occupants" }}>
                            Occupants
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to={{ pathname: "/settings" }}>
                            Paramétres
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
            <div>
                <button onClick={() => logout()}>Deconnexion</button>
            </div>
        </div>
    );
};

export default Navbar;
