// @ts-nocheck
import React, {useContext} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import {AdminContext} from "../../context/AdminContext";
import {useCookies} from "react-cookie";
import {Box} from "@mui/system";
import {ItemContext} from "../../context/ItemsContext";
import {Typography} from "@mui/material";
import {OrderTableRow} from "./OrderTableRow";

const apiUrl = 'http://localhost:3001';

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    color: 'black',
};

const buttonStyle = {
    marginTop: '1rem',
    marginLeft: '1rem',
};

export const AdminTable = () => {


    type itemsType = {
        cat: string,
        lat: number,
        lon: number,
        address: string,
        amount: number,
        photo: string,
        uuid: string,
        price: number,
        productName?: string,
        name: string
    }


    const [cookies, setCookies, removeCookies] = useCookies(['adminPanelCookie'])
    const {items, setItems} = useContext(ItemContext)
    console.log(items, 'tu sa itemsy')
    const {adminLogged, setAdminLogged, openAddUserPanel, setOpenAddUserPanel, openOrderPanel, setOpenOrderPanel} = useContext(AdminContext)
    const itemsWithType: itemsType[]  = items

    const addNewProduct = () => {
        setOpenAddUserPanel(true)
    }

    const closeAdminPanel = () => {
        setAdminLogged(false)
        removeCookies('adminPanelCookie')
    };

    return (items && adminLogged) ? (
        <>
            <Box>
                <Typography
                    align={"center"}
                    sx={{fontFamily: "bangers", color: "darkblue", fontSize: "20px", marginBottom: "20px", marginTop:"20px"}}
                >
                    Admin Panel
                </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>uuid</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Photo</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Category</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemsWithType.map((object) => (
                            <OrderTableRow key={object.uuid} result={object} api={apiUrl} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" style={buttonStyle} onClick={closeAdminPanel}
            sx={{marginBottom:'20px'}}
            >
                Log out
            </Button>
                <Button variant="contained" style={buttonStyle} onClick={addNewProduct}
                        sx={{marginBottom:'20px'}}
                >
                    Add new product
                </Button>
                <Button variant="contained" style={buttonStyle} onClick={()=>{setOpenOrderPanel(true)}}
                        sx={{marginBottom:'20px'}}
                >
                    View orders
                </Button>
            </Box>
        </>
    ) : <div></div>
};
