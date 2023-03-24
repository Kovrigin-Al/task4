import { FC, useState } from "react";
import { combineClasses } from "../../utils/combineClasses";
import capitalize from "lodash/capitalize";
type Props = {
    name: string;
    type: React.HTMLInputTypeAttribute;
    position: "top" | "middle" | "bottom";
    error: boolean;
    onChange: any;
    value: string;
};
const InputField: FC<Props> = ({
    name,
    type,
    position,
    error,
    onChange,
    value,
}) => {
    return (
        <div>
            <label htmlFor={name} className="sr-only">
                {name}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required
                className={combineClasses(
                    "relative block w-full appearance-none rounded-none border px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm",
                    error
                        ? "border-red-300 text-red-900"
                        : "border-gray-300 text-gray-900",
                    position === "top"
                        ? "rounded-t-md"
                        : position === "bottom"
                        ? "rounded-b-md"
                        : ""
                )}
                placeholder={capitalize(name)}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};
export default InputField;
