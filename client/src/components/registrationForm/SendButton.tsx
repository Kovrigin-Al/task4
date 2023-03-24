import { FC } from "react"

type Props = {
    isLoading: boolean;
    type: 'login' | 'registration';
}
const SendButton: FC<Props> = ({isLoading, type}) => {
  return (
    <button
    disabled={isLoading}
    type="submit"
    className={
      isLoading
        ? "group relative flex w-full justify-center  rounded-md border border-transparent bg-gray-400 py-2 text-sm font-medium text-white"
        : "group relative flex w-full justify-center  rounded-md border border-transparent bg-sky-600 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
    }
  >
    {type === 'login' ? "Log in" : "Create"}
  </button>  )
}
export default SendButton