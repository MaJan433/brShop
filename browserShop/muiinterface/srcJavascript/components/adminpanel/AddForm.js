import {useContext, useState} from 'react';
import { Select, TextField, Button, Grid, Typography, MenuItem} from '@mui/material';
import "@fontsource/bangers";
import {Box} from "@mui/system";
import {AdminContext} from "../../context/AdminContext";
import {apiUrl} from "../../api";

export const AddForm = () => {
    const {openAddUserPanel, setOpenAddUserPanel} = useContext(AdminContext)
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


        const handleSubmit = async (event) => {
            event.preventDefault();

            const checkArr= [name, price, picture, amount, category]
            if (checkArr.some(val => val === '')){
                alert('Some fields are empty. Please fill them')
                return;
            }
                    const res = await fetch(`${apiUrl}/items/add`, {
                        method: 'POST',
                        body: JSON.stringify(
                            {
                                productName: name,
                                price: price,
                                photo: picture,
                                amount: amount,
                                cat: category
                            }),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });
                    if (res.status === 200){
                        alert('You have added a new product!')
                } else {
                    alert("Product couldn't be added")
                }
            };


    const closePanel = () => {
        setOpenAddUserPanel(false)
    }

    return openAddUserPanel ? (
            <>
                <Box boxShadow={1} padding={"30px"} paddingBottom={"10px"}>
                <Typography
                    align={"center"}
                    sx={{fontFamily: "bangers", color: "darkblue", fontSize: "20px", marginBottom: "20px"}}
                >
                    Add new product to database
                </Typography>
                <form onSubmit={handleSubmit} style={{marginBottom:"80px"}}>
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
                                    defaultValue={pictureArray[0]}
                                    sx={{height:"30px", marginLeft:"20px"}}
                                >
                                    {pictures}

                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{minWidth:"250px"}}>
                                <Button type="submit" variant="contained" sx={{float:"left", padding:"5px"}} color="primary"  onClick={handleSubmit}>
                                    Add Product
                                </Button>
                                <Button type="submit" sx={{float:"right", padding:"5px"}} variant="contained" color="primary" onClick={closePanel}>
                                    Close panel
                                </Button>
                            </Grid>

                    </Grid>
                </form>
                </Box>
            </>
        ) : ( <div></div>)

}