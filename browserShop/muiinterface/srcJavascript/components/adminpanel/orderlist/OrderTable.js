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
import {apiUrl} from "../../../api";

export const OrderChecker = () => {

    const {openOrderPanel, setOpenOrderPanel} = useContext(AdminContext)

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

    const ordersObject = {};

    for (let row of data) {
        if (row && data) {
            if (ordersObject[row.customer]) {
                ordersObject[row.customer].push(row);
            } else {
                ordersObject[row.customer] = [row];
            }
        }
    }
    console.log(ordersObject)
    const ordersArray = Object.entries(ordersObject);
    console.log({ordersArray}, 'to jest oa')
    const customers = ordersArray.map(array => {
        return array[0]
    })
    const customerAddress = ordersArray.map(array=>{
            return array[1][0].address
    })
    console.log(customers, customerAddress)
    const drawArray = []
    const totalArr = []

    ordersArray.forEach(array=> {
        console.log(array[1], 'to tux')
        drawArray.push(array[1])
    });
    console.log({drawArray}, 'to jest draw')
    console.log(ordersArray, 'to tu')
    drawArray.forEach(subArray => {
        const tempArr = []
            subArray.forEach(object=> {
                const total = Number(object.amount) * Number(object.unit_price)
                tempArr.push(total)
            })
        const value = tempArr.reduce((prev,curr) => {
            return prev + curr;
        },0)
        totalArr.push(value)
    })
    console.log({customers, customerAddress, totalArr})

    console.log(totalArr)
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
