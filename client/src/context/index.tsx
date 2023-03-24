import { createContext, FC, ReactNode } from "react";
import ListStore from "./ListStore";
import UserStore from "./UserStore";

interface Props {
    children: ReactNode;
}

export const UserContext = createContext<UserStore>({} as UserStore);
export const ListContext = createContext<ListStore>({} as ListStore);
export const ContextProvider: FC<Props> = ({ children }) => {
    return (
        <UserContext.Provider value={new UserStore()}>
            <ListContext.Provider value={new ListStore()}>
                {children}
            </ListContext.Provider>
        </UserContext.Provider>
    );
};
