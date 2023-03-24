import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegistrationForm from "../components/registrationForm";
import { useAuth } from "../hooks/useAuth";
import { useRequest } from "../hooks/useRequest";
import { LIST_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { isLoading, request, error, cleanError } = useRequest();

    const handleSubmit = async (e: React.FormEvent, body: any) => {
        e.preventDefault();
        cleanError();
        const response = await request(
            location.pathname === LOGIN_ROUTE
                ? "/api/user/login"
                : "/api/user/registration",
            "POST",
            body
        );
        login(response.token);
        navigate(`${LIST_ROUTE}`);
    };

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <RegistrationForm
                    error={error}
                    handleSubmit={handleSubmit}
                    isLoading={isLoading}
                    type={
                        location.pathname === LOGIN_ROUTE
                            ? "login"
                            : "registration"
                    }
                />
            </div>
        </div>
    );
};

export default AuthPage;
