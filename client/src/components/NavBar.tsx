import { FC, useContext } from "react";
import { UserContext } from "../context";
import { useAuth } from "../hooks/useAuth";

type Props = {};
export const NavBar: FC<Props> = () => {
    const { logout } = useAuth();
    const user = useContext(UserContext);
    return (
        <>
            {user.isAuth() && (
                <div className="h-16 bg-slate-300 fixed z-10 top-0 left-0 right-0 flex justify-end items-center">
                    <div
                        className="text-sky-700 mx-2 p-2 text-2xl hover:bg-sky-200 rounded-lg cursor-pointer"
                        onClick={() => logout()}
                    >
                        Logout
                    </div>
                </div>
            )}
        </>
    );
};
