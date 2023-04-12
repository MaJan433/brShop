import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';

import {TextField, Button, Typography, Grid, Select, MenuItem} from '@mui/material';
import {Box} from "@mui/system";

export const UpdateForm = () => {

    const apiUrl = 'http://localhost:3001'
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('')
    const pictureArray = ['image-1.jpg', "image-2.jpg", "image-3.jpg",
        "image-4.jpg", "image-5.jpg", "image-6.jpg", "image-7.jpg", "image-8.jpg"]
    const pictures = pictureArray.map((pictureString, i) => {
        return (
            <MenuItem value={pictureString} onClick={()=>{setPicture(pictureString)}}> {`Picture nr ${i+1} `}</MenuItem>
        )
    })
    const location = useLocation()
    const uuid = location.pathname.split('/')[2]
    console.log(uuid)

    const updateProduct = async () => {
            
            const tempObj = {
                uuid: uuid,
                productName: name,
                price: price,
                photo: picture,
                amount: amount,
                cat: category
            }

            await fetch(`${apiUrl}/items/`, {
                method: 'PATCH',
                body: JSON.stringify(tempObj),
                headers: {
                    "Content-Type": "application/json"
                },
            })
        }

    return  (
        <>
            <Box boxShadow={1} padding={"30px"} paddingBottom={"10px"}>
                <Typography
                    align={"center"}
                    sx={{fontFamily: "bangers", color: "darkblue", fontSize: "20px", marginBottom: "20px"}}
                >
                    Update product
                </Typography>
                <Typography sx={{margin:'20px'}}>
                    Uuid of updated product {uuid}
                </Typography>
                <form  style={{marginBottom:"80px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Product name"
                                type={"text"}
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Price"
                                inputProps={{ min: 1 }}
                                type={"number"}
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Amount"
                                type={"number"}
                                inputProps={{ min: 1 }}
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                label="Category"
                                type={"text"}
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={12} sm={6}>

                            Choose picture


                            <Select
                                required
                                // defaultValue={pictureArray[0]}
                                sx={{height:"30px", marginLeft:"20px"}}
                            >
                                {pictures}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{minWidth:"250px"}}>
                            <Button onClick={updateProduct} type="submit" variant="contained" sx={{float:"left", padding:"5px"}} color="primary"  >
                                Update Product
                            </Button>
                            <Button sx={{float:"right", padding:"5px", color:"white"}} variant="contained" color="primary" >
                                <Link style={{color:"white", textDecoration: "none"}}
                                    to={'/'}>Return to main page</Link>
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Box>
        </>
    )

}

