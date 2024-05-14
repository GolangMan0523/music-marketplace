import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

type GlobalContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  tagsData: any[];
  setData: Dispatch<SetStateAction<any[]>>;
  tagsArray: any[];
  setTagsArray: Dispatch<SetStateAction<any[]>>;
  analyzerData: {
    analyzer: AnalyserNode | null;
    bufferLength: number;
    dataArray: Uint8Array;
    audioCtx: AudioContext | null;
  };
  setAnalyzerData: Dispatch<
    SetStateAction<{
      analyzer: AnalyserNode | null;
      bufferLength: number;
      dataArray: Uint8Array;
      audioCtx: AudioContext | null;
    }>
  >;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalContextProviderProps = {
  children: ReactNode;
};

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [analyzerData, setAnalyzerData] = useState<{
    analyzer: AnalyserNode | null;
    bufferLength: number;
    dataArray: Uint8Array;
    audioCtx: AudioContext | null;
  }>({
    analyzer: null,
    bufferLength: 0,
    dataArray: new Uint8Array([]),
    audioCtx: null,
  });
  const [search, setSearch] = useState('');
  const [tagsData, setData] = useState<any[]>([]);
  const [tagsArray, setTagsArray] = useState<any[]>([]);

  const contextValue: GlobalContextType = {
    search,
    tagsArray,
    setTagsArray,
    setSearch,
    tagsData,
    setData,
    analyzerData,
    setAnalyzerData,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useMyContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    );
  }
  return context;
};
