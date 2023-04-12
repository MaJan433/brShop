import {createContext} from 'react';
import * as React from "react";

export const BasketContext = createContext
({
    openBasket: false,
    setOpenBasket: () => {}
});