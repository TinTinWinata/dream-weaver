import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import ReactLoading from 'react-loading';
import { TChildrenProps } from "../types/children-type";

type ILoading = {
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const context = createContext<any>(null);

export function LoadingProvider({children} : TChildrenProps){
  const [isLoading, setLoading] = useState<boolean>(false); 
  const data = {isLoading, setLoading}
  return <context.Provider value={data}>
    {isLoading && 
      <div className="fixed bg-gray-500 bg-opacity-50 top-0 left-0 w-full h-screen overflow-hidden center">
        <ReactLoading type="balls" width={'50px'} height={'50px'}/>
      </div>
    }
      {children}
    </context.Provider>
}

export default function useLoading(){
  return useContext(context);
}