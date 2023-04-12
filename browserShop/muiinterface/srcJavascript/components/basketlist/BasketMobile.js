import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {IncDec} from "../ui/incdec";
import React from "react";
import {Box} from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

export const BasketMobile = (props) => {

    return (
        <Box sx={{marginTop:"30px"}}>
            <TableContainer component="div">
                <Table sx={{ }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize:'20px'}}>Picture</TableCell>
                            <TableCell sx={{fontSize:'20px'}}>Unit price</TableCell>
                            <TableCell sx={{fontSize:'20px'}}>Total price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.basketArr.map(item => (
                            item[1].amount !== 0 &&
                            <TableRow key={item[0]}>
                                <TableCell>
                                    <Avatar sx={{ width: 80, height: 80 }} src={`/images/products/${item[1].picture}`} className="list-item-avatar"/>
                                </TableCell>
                                <TableCell sx={{fontSize:'12px'}}>{`${item[1].price.toFixed(2)} $`}</TableCell>
                                <TableCell sx={{fontSize:'12px'}}>{`${(Number(item[1].price) * item[1].amount).toFixed(2)} $`}</TableCell>
                                <TableCell  sx={{marginLeft: "18px", width:"130px", fontSize:'12px'}}><IncDec product={item}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
};