import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, restrictedRoutes } from "../routes";
import { LIST_ROUTE, LOGIN_ROUTE } from "../utils/consts";

interface Props {
  isAuth: boolean
}
export const AppRouter: FC<Props> = observer(({isAuth}) => {
    return (
      <Routes>
        {isAuth &&
          restrictedRoutes.map((r) => {
            const { path, component } = r;
            return <Route key={path} path={path} element={component} />;
          })}
        {!isAuth && publicRoutes.map((r) => {
          const { path, component } = r;
          return <Route key={path} path={path} element={component} />;
        })}
        <Route path="*" element={<Navigate to={isAuth ? LIST_ROUTE : LOGIN_ROUTE} />} /> 
      </Routes>
    );
  });