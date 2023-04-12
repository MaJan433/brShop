import * as React from 'react';
import { Typography } from "@mui/material";


interface ProductMetaProps {
    matches?: boolean,
    product: {
        amount: number,
        cat: string,
        lat: number,
        lon: number,
        name: string,
        photo: string,
        price: number,
        uuid: string
    }
}
export const ProductMeta = ({ product, matches }: ProductMetaProps) => {
    return (
        <>
        <Typography variant={matches ? "h6" : "h5"} lineHeight={2}>
          {product.name}
        </Typography>
        <Typography variant={matches ? "caption" : "body1"}>
          ${product.price.toFixed(2)}
        </Typography>
        </>
    );
}