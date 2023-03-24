import { FC, ReactNode } from "react";
import { combineClasses } from "../utils/combineClasses";
import { IActions } from "./ToolBar";

type Props = {
    name: IActions;
    children?: ReactNode;
    isDisabled: boolean;
    clickHandler: (type: IActions) => void
};

const className = {
    block: "bg-yellow-600 hover:bg-yellow-700  w-20",
    unblock: "bg-green-600 hover:bg-green-700  w-20",
    delete: "bg-red-600 hover:bg-red-700",
};
const disabledClassName = {
    block: "bg-yellow-600/60 w-20",
    unblock: "bg-green-600/60  w-20",
    delete: "bg-red-600/60 ",
};
const UpdateButton: FC<Props> = ({ children, name, isDisabled, clickHandler }) => {
    return (
        <button
            disabled={isDisabled}
            onClick={e=>clickHandler(name)}
            className={combineClasses(
                isDisabled ? disabledClassName[name] : className[name],
                "flex mx-1 items-center justify-center rounded-xl border border-transparent  p-2 text-base font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2"
            )}
        >
            {children ? children : name}
        </button>
    );
};
export default UpdateButton;
