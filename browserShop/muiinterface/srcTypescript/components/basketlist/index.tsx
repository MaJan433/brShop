import React, {useContext} from 'react';
import {
    Box,
    useMediaQuery,
    Theme
} from "@mui/material";
import {useCookies} from "react-cookie";
import {AppbarHeader} from "../../styles/appbar";
import {IncDec} from "../ui/incdec";
import {TotalValue} from "./TotalValue";
import {LoginPanel} from "../loginregistrationpanel";
import {BasketContext} from "../../context/BasketContext";
import {BasketMobile} from "./BasketMobile";
import {BasketDesktop} from "./BasketDesktop";

type basketArr = [string, {
    amount: number,
    price: number,
    picture: string
}]


export const BasketList = () => {

    const {basketOpen, setBasketOpen} = useContext(BasketContext)
    const [cookies, setCookie] = useCookies(['basketCookie']);
    const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    if (cookies.basketCookie) {
        const basketArr: basketArr[] = Object.entries(cookies.basketCookie)

        if (basketOpen){
            return (
                <>
                    <Box className="basket-container">
                        {smallScreen && <BasketMobile basketArr={basketArr}/>}
                        {!smallScreen && <BasketDesktop basketArr={basketArr}/>}

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

