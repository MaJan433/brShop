import React, {useContext} from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {ItemContext} from "../../context/ItemsContext";
import { createBrowserHistory } from 'history';
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

interface Props {
    result: {
        amount: number,
        cat: string,
        lat: number,
        lon: number,
        name: string,
        photo: string,
        price: number,
        uuid: string
    },
    api: string
}

export const OrderTableRow = (props: Props) => {

    const history = createBrowserHistory();
    const {items, setItems} = useContext(ItemContext)
    const apiUrl = 'http://localhost:3001'
    const removal = async () => {
        await fetch(`${props.api}/items/${props.result.uuid}`, {
            method: 'DELETE',
        });
        const res = await fetch(`${apiUrl}/items`);
        const data = await res.json();
        setItems(data);
    };


    const moveToUpdatePanel = () => {
        history.push(`/update/${props.result.uuid}`)
    }

    return(
        <TableRow key={props.result.uuid}>
            <TableCell>{props.result.uuid}</TableCell>
            <TableCell>{props.result.name}</TableCell>
            <TableCell>{(props.result.price).toFixed(2)}</TableCell>
            <TableCell>{props.result.photo}</TableCell>
            <TableCell>{props.result.amount}</TableCell>
            <TableCell>{props.result.cat}</TableCell>
            <TableCell>
                <IconButton onClick={removal}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
            <TableCell>
                <Button>
                    <Link to={`/update/${props.result?.uuid}`} >Update</Link>
                </Button>
            </TableCell>
        </TableRow>
    );

}