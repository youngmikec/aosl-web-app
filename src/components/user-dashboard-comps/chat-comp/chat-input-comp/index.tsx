import { useState, FC } from "react";
import { FiSend } from "react-icons/fi";

type Props = {
  value: string;
  onChannge: (e: any) => void;
  onSubmit: () => void
}

const ChatInputComp: FC<Props> = ({ value, onChannge, onSubmit }) => {
  
  return (
    <>
      <div className="w-full border-[#c8ecff] border-[2px] bg-[#e3f5ff] rounded-2xl px-4 flex justify-between gap-4">
        <div className="flex-1 flex-grow">
          <input 
            value={value}
            type="text"
            placeholder=""
            onChange={onChannge} 
            className="w-full rounded-md bg-[#e3f5ff] py-4 focus:outline-none focus:ring-0" 
          />
        </div>
        <div className="w-[40px] flex justify-center items-center">
          <button onClick={onSubmit}>
            <FiSend size={20} className="text-gray-700" />
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatInputComp;