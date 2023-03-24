import AuthPage from "./pages/AuthPage";
import ListPage from "./pages/ListPage";
import { LIST_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const restrictedRoutes = [{ path: LIST_ROUTE, component: <ListPage/> }];
export const publicRoutes = [{ path: LOGIN_ROUTE, component: <AuthPage/> },{ path: REGISTRATION_ROUTE, component: <AuthPage/> }]
