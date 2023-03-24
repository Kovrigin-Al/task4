import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { NavBar } from "./components/NavBar";
import { ListContext, UserContext } from "./context";
import { useAuth } from "./hooks/useAuth";
import { useRequest } from "./hooks/useRequest";

const tokenJson = localStorage.getItem("token");
const token = tokenJson ? JSON.parse(tokenJson) : null;
export const App: FC = observer(() => {
    const { login, logout } = useAuth();
    const { error, isLoading, request } = useRequest();
    const [loading, setLoading] = useState(true);
    const list = useContext(ListContext);
    const user = useContext(UserContext);
    
    useEffect(() => {
    const fetchData = async () => {
        request("/api/user/auth", "GET", null, {
            Authorization: `Bearer ${token}`,
        })
            .then(response => {
                if (response && response.token) {
                    login(response.token);
                } else {
                    logout();
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
        setLoading(true);
        if (token) {
            fetchData();
        } else {
            setLoading(false);
        }
        return () => {
            setLoading(true);
        };
    }, [list, login, request]);

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-sky-800 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <h1>Error: An unexpected error has occurred.</h1>;
    }
    return (
        <BrowserRouter>
            <NavBar />
            <div className="pt-16">
                <AppRouter isAuth={user.isAuth()} />
            </div>
        </BrowserRouter>
    );
});

export default App;
