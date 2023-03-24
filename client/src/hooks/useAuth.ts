import { useCallback, useContext } from "react";
import jwt_decode from "jwt-decode";
import { UserContext } from "../context";
import { redirect } from "react-router-dom";
import { IUser } from "../context/ListStore";

export const useAuth = () => {
  const user = useContext(UserContext);

  const login = useCallback(
    (jwtToken: string) => {
      const decoded = jwt_decode(jwtToken) as IUser
      user.setUser(decoded);
      if (decoded.status === 'active')
        {user.setIsAuth(true);
          localStorage.setItem("token", JSON.stringify(jwtToken));
          redirect('/')
        }
        else {
          logout()
        }
    },
    [user]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    user.setIsAuth(false);
    user.setUser(null);
    redirect('/login')
  }, [user]);

  return { login, logout };
};
