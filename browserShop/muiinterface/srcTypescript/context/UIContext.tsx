import * as React from 'react';
import { createContext, useContext, useState } from "react";

interface UIContextType {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UIContext = createContext<UIContextType>({ drawerOpen: false, setDrawerOpen: () => {} });
export const useUIContext = () => useContext(UIContext);

interface UIProviderProps {
    children: React.ReactNode;
}

export const UIProvider = ({ children }: UIProviderProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const value = {
        drawerOpen,
        setDrawerOpen,
    };


    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
