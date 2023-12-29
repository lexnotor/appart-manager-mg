import { RouteError } from "@/types";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError() as RouteError;
    if (error.status == 404) return <div>La page n'existe pas</div>;

    return <div>Une erreur est survenue</div>;
};

export default ErrorPage;
