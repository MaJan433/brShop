import * as React from 'react'
import {useState} from 'react';
import {Dialog, DialogContent, DialogTitle, DialogContentText, DialogActions, Typography} from '@mui/material'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {Box} from "@mui/system";

interface Props {
    customer: string,
    address: string,
    totalValue: number,
    view: {
        [key: string]: {
            uuid: string,
            product: string,
            amount: number,
            unit_price: number,
            customer: string,
            address: string
        }[]
    }
}

export const OrderTableRow = (props: Props) => {

    console.log(props, 'poszukiwane propsy')
    const [open, setOpen] = useState(false)
    console.log(props.view[props.customer], 'props wjew')
    console.log(props.view[0], 'tutajto')

    if (props.totalValue !== undefined && props.view[props.customer] !== undefined){
        return(
            <>

                <TableRow key={props.customer}>
                    <TableCell>{props.customer}</TableCell>
                    <TableCell>{props.address}</TableCell>
                    <TableCell>{props.totalValue} $ </TableCell>
                    <TableCell><Button onClick={()=> {setOpen(true)}}>VIEW MORE</Button></TableCell>
                    <TableCell>
                        <IconButton>
                            <ShoppingCartCheckoutIcon/> Done
                        </IconButton>
                    </TableCell>
                </TableRow>
                <Dialog open={open} >
                    <DialogTitle>
                        <Typography
                            align={"center"}
                            sx={{fontFamily: "bangers", color: "darkblue", fontSize: "20px", marginBottom: "20px", marginTop:"20px"}}
                        >
                            Order Properties
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Unit Price</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Total Price</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.view[props.customer].map(row => {
                                            if (row.amount) {
                                                return (
                                                    <TableRow key={row.uuid}>
                                                        <TableCell>{row.product}</TableCell>
                                                        <TableCell>{(row.unit_price).toFixed(2)} $</TableCell>
                                                        <TableCell>{row.amount}</TableCell>
                                                        <TableCell>{(parseFloat(String((props.totalValue)))).toFixed(2)} $ </TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return <div key={row.uuid}></div>
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=> {setOpen(false)}}>OK</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    } else {
        return <div></div>
    }



}