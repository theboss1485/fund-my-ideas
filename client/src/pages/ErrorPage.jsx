import { useRouteError } from "react-router-dom";

/* This function is to handle provide a route to go to 
if user doesn't navigate to a known route within the application.*/
const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;