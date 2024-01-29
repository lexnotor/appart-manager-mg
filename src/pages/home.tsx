import { Navigate } from "react-router-dom";

const HomePage = () => {
    return <Navigate to={{ pathname: "/estates" }} />;
};

export default HomePage;
