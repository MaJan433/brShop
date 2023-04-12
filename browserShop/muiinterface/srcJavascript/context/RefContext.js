import {createContext} from 'react';
import * as React from "react";

export const RefContext = createContext
({
    gridRef: null,
    setGridRef: () => {},
    contactRef: null,
    setContactRef: ()=> {}
});