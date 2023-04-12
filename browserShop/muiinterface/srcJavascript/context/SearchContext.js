import {createContext} from 'react';
import * as React from "react";

export const SearchContext = createContext
({
    search: "",
    setSearch: () => {},
    minPrice: 0,
    setMinPrice: () => {},
    maxPrice: Number.MAX_SAFE_INTEGER,
    setMaxPrice: () => {},
    category: '',
    setCategory: () => {}
});
