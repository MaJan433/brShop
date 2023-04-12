import {createContext} from 'react';
import * as React from "react";

type items = {
    cat: string,
    lat: number,
    lon: number,
    address: string,
    amount: number,
    photo: string,
    uuid: string,
    price: number,
    name: string
}

interface ItemsContext {
    items: items[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ItemContext = createContext<ItemsContext>
    ({
        items: [{
            cat: '',
            lat: 0,
            lon: 0,
            address: '',
            amount: 0,
            photo: '',
            uuid: '',
            price: 0,
            name: ''
        }],
        setItems: () => {}
    });