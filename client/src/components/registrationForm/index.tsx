import React, { FC, useState } from "react";
import FormHeader from "./FormHeader";
import InputField from "./InputField";
import SendButton from "./SendButton";

type Props = {
    handleSubmit: (e: React.FormEvent, body: any) => void;
    type: "login" | "registration";
    isLoading: boolean;
    error: string | null;
};

const RegistrationForm: FC<Props> = ({
    handleSubmit,
    type,
    isLoading,
    error,
}) => {
    const [state, setState] = useState<{ [key: string]: string }>({
        email: "",
        name: "",
        password: "",
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <FormHeader type={type} />
            <form onSubmit={e => handleSubmit(e, state)} className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                    <InputField
                        error={!!error}
                        name="email"
                        type="email"
                        position="top"
                        onChange={handleInputChange}
                        value={state.email}
                    />
                    {type === "registration" && (
                        <InputField
                            error={!!error}
                            name="name"
                            type="text"
                            position="middle"
                            onChange={handleInputChange}
                            value={state.name}
                        />
                    )}
                    <InputField
                        error={!!error}
                        name="password"
                        type="password"
                        position="bottom"
                        onChange={handleInputChange}
                        value={state.password}
                    />
           
                </div>

                <SendButton isLoading={isLoading} type={type} />
            </form>
        </>
    );
};
export default RegistrationForm;
