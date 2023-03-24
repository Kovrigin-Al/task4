import { FC } from "react";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/consts";

type Props = {
    type: "login" | "registration";
};
let header = "";
let question = "";
let action = "";
let link = "";
const FormHeader: FC<Props> = ({ type }) => {
    if (type === "login") {
        header = "Log in to your account";
        question = "You are not registred yet? ";
        action = "Create account";
        link = REGISTRATION_ROUTE;
    } else {
        header = "Create account";
        question = "Have you already registred? ";
        action = "Sign in";
        link = LOGIN_ROUTE;

    }
    return (
        <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                {header}
            </h2>
            <p className="mt-2 text-center mb-10 text-sm text-gray-600">
                {question}
                <NavLink className="text-sky-600" to={link}>
                    {action}
                </NavLink>
            </p>
        </div>
    );
};
export default FormHeader;
