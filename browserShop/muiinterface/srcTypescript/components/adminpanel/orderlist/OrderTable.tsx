import React, {useContext, useEffect, useState} from "react";
import { Box, Button, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { OrderTableRow } from './OrderTableRow';
import {AdminContext} from "../../../context/AdminContext";

interface ordersObject {
    [key: string]:
        {
            uuid: string,
            product: string,
            amount: number,
            unit_price: number,
            customer: string,
            address: string
        }[]
}

export const OrderChecker = () => {

    const {openOrderPanel, setOpenOrderPanel} = useContext(AdminContext)
    const apiUrl = "http://localhost:3001"
    const [data, setData] = useState([
        {
            uuid: "",
            product: "",
            amount: 0,
            unit_price: 0,
            customer: "",
            address: "",
        },
    ]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/orders`);
            const data = await res.json();
            setData(data);
        })();
    }, []);



    const ordersObject: ordersObject = {};

    for (let row of data) {
        if (row && data) {
            if (ordersObject[row.customer]) {
                ordersObject[row.customer].push(row);
            } else {
                ordersObject[row.customer] = [row];
            }
        }
    }
    type ordersArrayObject = {
        uuid: string,
        product: string,
        amount: number,
        unit_price: number,
        customer: string,
        address: string
    }
    type ordersArrayRow = [string, ordersArrayObject[]]

    type ordersArray = ordersArrayRow[]


    const ordersArray : ordersArray = Object.entries(ordersObject);
    const customers = ordersArray.map(array => {
        return array[0]
    })
    const customerAddress = ordersArray.map(array=>{
            return array[1][0].address
    })
    console.log(customers, customerAddress)

    const totalArr: number[]  = []

    interface DrawItem {
        uuid: string;
        product: string;
        amount: number;
        unit_price: number;
        customer: string;
        address: string

    }
    console.log(ordersArray, 'to jest ordersArray')
    const drawArray: DrawItem[] = [];
        ordersArray.forEach((array,i) => {
            if ((array[1] && array[1].length > i)){
                console.log(array[1][i].uuid,'uuid here')
                drawArray.push({
                    uuid: array[1][i].uuid,
                    product: array[1][i].product,
                    amount: array[1][i].amount,
                    unit_price: array[1][i].unit_price,
                    customer: array[1][i].customer,
                    address: array[1][i].address
                });
            }
            })


    console.log({drawArray}, 'to jest draw')
    drawArray.forEach(subArray => {
        const total: number = Number((subArray.amount * subArray.unit_price).toFixed(2));
        console.log(total, 'total1')
        const tempArr: number[] = []
        tempArr.push(total)

        const value = tempArr.reduce((prev: number, curr: number) => {
            return Number(prev) + curr;
        }, 0)
        totalArr.push(Number(value))
    })
    //
    const rows = customers.map((customer, i) =>  {
        return (
            <OrderTableRow customer={customer} address={customerAddress[i]}
                           totalValue={totalArr[i]} view={ordersObject}
            ></OrderTableRow>)
    });

return openOrderPanel ? (
    <>
        <Box>
            <Typography
                align={"center"}
                sx={{fontFamily: "bangers", color: "darkblue", fontSize: "20px", marginBottom: "20px", marginTop:"20px"}}
            >
                Order List
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Total Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained"
                    onClick={()=>{setOpenOrderPanel(false)}}
                    sx={{marginBottom:'20px'}}
            >
                Close list
            </Button>
        </Box>
    </>
) : <div></div>

}
