
import * as React from 'react';
import {Container, Grid } from "@mui/material";
import {SingleProduct} from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {SingleProductDesktop} from "./SingleProductDesktop";
import {useContext, useEffect, useRef} from "react";
import {ItemContext} from "../../context/ItemsContext";
import {useCookies} from "react-cookie";
import {RefContext} from "../../context/RefContext";


export const Products = () => {

    const {gridRef, setGridRef} = useContext(RefContext);
    const [cookies, setCookie] = useCookies(['basketCookie']);
    const {items, setItems} = useContext(ItemContext)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));


    const localRef = useRef(gridRef);

    useEffect(() => {
        setGridRef(localRef.current);
    }, [setGridRef]);

    interface Product {
        amount: number,
        cat: string,
        lat: number,
        lon: number,
        name: string,
        photo: string,
        price: number,
        uuid: string
    }


    const addToCart = (product: Product)=> {

        const basketObject = cookies.basketCookie ? cookies.basketCookie : {}
        if (basketObject[product.name]){
            basketObject[product.name].amount += 1
        } else {
            basketObject[product.name] = {
                amount: 1,
                price: product.price,
                picture:product.photo,
            }
        }
        setCookie('basketCookie', basketObject)
        console.log(cookies.basketCookie)
    }

    const renderProducts = items.map((product) => (
        <Grid item key={product.uuid} xs={2} sm={4} md={4} display="flex" flexDirection={'column'} alignItems="center">
            {matches ? (
                <SingleProduct product={product} matches={matches} addToCard={addToCart}/>
            ) : (
                <SingleProductDesktop product={product} matches={matches} addToCard={addToCart} />
            )}
        </Grid>

    ));
    return (
        <Container
            // ref={localRef}
        >
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                justifyContent="center"
                sx={{ margin: `20px 4px 10px 4px` }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {renderProducts}
            </Grid>
        </Container>
    );


}