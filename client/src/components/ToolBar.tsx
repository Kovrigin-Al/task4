import { FC, useContext, useEffect } from "react";
import { Row } from "react-table";
import TrashIcon  from "@heroicons/react/24/outline/TrashIcon";
import UpdateButton from "./UpdateButton";
import { useRequest } from "../hooks/useRequest";
import { useAuth } from "../hooks/useAuth";
import { ListContext, UserContext } from "../context";
import { IData } from "../pages/ListPage";
import { observer } from "mobx-react-lite";

export enum IActions {
    block = "block",
    unblock = "unblock",
    delete = "delete",
}

type Props = {
    selectedUsers: Row<IData>[];
    setIsLoading: (condition: boolean) => void
};

const tokenJson = localStorage.getItem("token");
const token = tokenJson ? JSON.parse(tokenJson) : null;

const ToolBar: FC<Props> = observer(({ selectedUsers, setIsLoading }) => {
    const list = useContext(ListContext);
    const user = useContext(UserContext);

    const selectedUsersIds = selectedUsers.map(u => ({id: u.values.id}));
    const { request, isLoading } = useRequest();
    const {logout} = useAuth()
    useEffect(()=>setIsLoading(isLoading),[isLoading])
    const clickHandler = async (type: IActions) => {
        let requestBody: {users: {}[]} | null = null;
        let reqMethod: "PUT" | "DELETE" | undefined;
        let willLogout: boolean

        if (type === IActions.block) {
            reqMethod = "PUT";
            requestBody = {users: selectedUsersIds.map(u => ({
                ...u,
                status: "blocked",
            }))};
            if (selectedUsersIds.findIndex(selectedUser => selectedUser.id === user.user()!.id) !== -1) {
                willLogout = true
            }
        }

        if (type === IActions.unblock) {
            reqMethod = "PUT";
            requestBody = {users: selectedUsersIds.map(u => ({
                ...u,
                status: "active",
            }))};
        }

        if (type === IActions.delete) {
            reqMethod = "DELETE";
            requestBody = {users: selectedUsersIds}
            if (selectedUsersIds.findIndex(selectedUser => selectedUser.id === user.user()!.id) !== -1) {
                willLogout = true
            }
        }

        await request("/api/users", reqMethod, requestBody, {
            Authorization: `Bearer ${token}`,
        }).then(response => {
            if (willLogout) logout();
            list.updateItems(response);
        });
    };
    return (
        <div className="h-24 w-full flex justify-end items-end">
            <UpdateButton name={IActions.block} isDisabled={isLoading || selectedUsers.length === 0} clickHandler={clickHandler}/>
            <UpdateButton name={IActions.unblock} isDisabled={isLoading || selectedUsers.length === 0} clickHandler={clickHandler}/>
            <UpdateButton name={IActions.delete} isDisabled={isLoading || selectedUsers.length === 0} clickHandler={clickHandler}>
                <TrashIcon className="h-6 w-6" />
            </UpdateButton>
        </div>
    );
});
export default ToolBar;
