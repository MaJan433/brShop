import React, {useContext} from 'react';
import {Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, useMediaQuery} from "@mui/material";
import {useCookies} from "react-cookie";
import {TotalValue} from "./TotalValue";
import {LoginPanel} from "../loginregistrationpanel";
import {BasketContext} from "../../context/BasketContext";
import {BasketMobile} from "./BasketMobile";
import {BasketDesktop} from "./BasketDesktop";


export const BasketList = () => {

    const {basketOpen, setBasketOpen} = useContext(BasketContext)
    const [cookies, setCookie] = useCookies(['basketCookie']);
    const smallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    if (cookies.basketCookie) {
        const basketArr = Object.entries(cookies.basketCookie)
        console.log(basketArr)
        if (basketOpen){
            return (
                <>
                    <Box className="basket-container">
                        {smallScreen && <BasketMobile basketArr={basketArr}/>}
                        {!smallScreen && <BasketDesktop basketArr={basketArr}/>}
                        {/*<List>*/}
                        {/*    <ListItem className="list-header">*/}
                        {/*        <ListItemAvatar>*/}
                        {/*            <Avatar src={'../basketLogo.jpg'} className="list-item-avatar"/>*/}
                        {/*        </ListItemAvatar>*/}
                        {/*        <ListItemText primary='Picture' className="list-item-text"/>*/}
                        {/*        <ListItemText primary='Amount' className="list-item-text"/>*/}
                        {/*        <ListItemText primary='Unit price' className="list-item-text"/>*/}
                        {/*        <ListItemText primary='Total price' className="list-item-text"/>*/}
                        {/*        <ListItemText primary='Add/remove product' className="list-item-text"/>*/}
                        {/*    </ListItem>*/}
                        {/*    {basketArr.map(item => (*/}
                        {/*        item[1].amount !== 0 &&*/}
                        {/*        <ListItem key={item[0]} className="list-item">*/}
                        {/*            <ListItemAvatar>*/}
                        {/*                <Avatar src={`/images/products/${item[1].picture}`} className="list-item-avatar"/>*/}
                        {/*            </ListItemAvatar>*/}
                        {/*            <ListItemText primary={item[0]} className="list-item-text"/>*/}
                        {/*            <ListItemText primary={item[1].amount} className="list-item-text"/>*/}
                        {/*            <ListItemText primary={`${item[1].price.toFixed(2)} $`} className="list-item-text"/>*/}
                        {/*            <ListItemText primary={`${(Number(item[1].price) * item[1].amount).toFixed(2)} $`}*/}
                        {/*                          className="list-item-text"/>*/}
                        {/*            <IncDec use="basket" product={item}/>*/}
                        {/*        </ListItem>*/}
                        {/*    ))}*/}
                        {/*</List>*/}
                        <Box boxShadow={3} p={2} className="basket-box">
                            <TotalValue/>
                            <LoginPanel/>
                        </Box>
                    </Box>
                </>
            );
        }
    }
        }

