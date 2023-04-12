import {createContext} from 'react';
import * as React from "react";

export const ItemContext = createContext
({
    items: [],
    setItems: () => {}
});