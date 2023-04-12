
import { Typography } from "@mui/material";
export const ProductMeta = ({ product, matches }) => {
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