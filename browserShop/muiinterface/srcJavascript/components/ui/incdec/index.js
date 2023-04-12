import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from "@mui/icons-material/Remove";
import {useEffect, useState} from "react";
import { Colors } from "../../../styles/theme";
import {useCookies} from "react-cookie";

export const IncDec = (props) => {

    const [cookies, setCookies] = useCookies(['basketCookie'])


    const object = cookies.basketCookie
    const [value, setValue] = useState(object[props.product[0]].amount ? object[props.product[0]].amount : 0);



    useEffect(()=> {
        const object = cookies.basketCookie
        setValue(object[props.product[0]].amount)
    }, [cookies.basketCookie])

    const decreaseProduct = () =>{
        if (value > 0){

            object[props.product[0]].amount -= 1
            setCookies('basketCookie', object)
            setValue(object[props.product[0]].amount)
        }


    }

    const increaseProduct = () =>{
        if (value < 9){

            object[props.product[0]].amount += 1
            setCookies('basketCookie', object)
            setValue(object[props.product[0]].amount)
        } else {
            alert('You can only but less than 10 products at once!')
        }
    }

    return (
      <Box display="flex">
        <IconButton
          sx={{
            borderRadius: 0,
            background: `${Colors.secondary}`,
          }}
          onClick={decreaseProduct}
        >
          <RemoveIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            border: `1px solid ${Colors.secondary}`,
            p: 2,
          }}
        >
          {value}
        </Typography>
        <IconButton
          sx={{
            borderRadius: 0,
            background: `${Colors.secondary}`,
          }}
          onClick={increaseProduct}
        >
          <AddIcon />
        </IconButton>
      </Box>
    );
}