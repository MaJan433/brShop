import {MessageText, PromotionsContainer} from "../../styles/promotions";
import {Box, Slide} from "@mui/material";
import {useEffect, useState} from "react";

const messages = [
    "Consumption is the key to happiness",
    "The more you buy, the less you spare",
    "New Guinea Pigs in stock! Get them now!",
    "Did you know, that capybaras are just bigger guinea pigs?",
    "Bitcoin can only grow, as it is digital gold"
]
export const Promotions = () => {
    const [messageIndex, setMessageIndex] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(()=> {

        setTimeout(()=> {
            setShow(false)
        },2800)

        const intervalId = setInterval(()=> {
            setMessageIndex(i => (i+1) % messages.length);
            setShow(true);
            setTimeout(()=> {
                setShow(false);
            },2500);
        }, 3000);
        return ()=> {
            clearInterval(intervalId);
        }
    },[]);

    return (
        <PromotionsContainer>
            <Slide
            direction={show ? "right" : "left"}
            in={show}
            >
        <Box display="flex" justifyContent="center" alignItems="center">
            <MessageText>
                {messages[messageIndex]}
            </MessageText>
        </Box>
            </Slide>
        </PromotionsContainer>

    );
};