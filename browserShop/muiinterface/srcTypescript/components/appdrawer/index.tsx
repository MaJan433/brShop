import * as React from 'react';
import {Button, Drawer, List, ListItem, ListItemButton, Stack, Typography} from "@mui/material";
import {SubscribeTf} from "../../styles/footer";
import SearchIcon from "@mui/icons-material/Search";
import {Colors} from "../../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import {useUIContext} from "../../context/UIContext";
import {DrawerCloseButton} from "../../styles/appbar";
import {FormEvent, useContext, useEffect, useState} from "react";
import {SearchContext} from "../../context/SearchContext";
import {ItemContext} from "../../context/ItemsContext";
import {useCookies} from "react-cookie";

interface items {
    cat: string,
    lat: number,
    lon: number,
    address: string,
    amount: number,
    photo: string,
    uuid: string,
    price: number
}


export const AppDrawer = () => {

    const [cookies, setCookie] = useCookies(['basketCookie']);
    const [initialItems, setInitialItems] = useState<items[]>([])
    const [categories, setCategories] = useState<(string | number)[]>(['a','b','c'])

    const apiUrl = 'http://localhost:3001';



    useEffect(()=>{

        (async () => {
            const res = await fetch(`http://localhost:3001/items`)
            const data = await res.json();
            setInitialItems(data)
        })();
    },[])

    useEffect(()=> {
        const tempArray : (string | number)[] = []
        if (initialItems){
            initialItems.forEach(item=> {
                if (!tempArray.includes(item.cat)){
                    tempArray.push(item.cat)
                }
                setCategories(tempArray)
            });
        }
    },[initialItems])

    const {items, setItems} = useContext(ItemContext)
    const {drawerOpen, setDrawerOpen} = useUIContext();
    const {search,minPrice,maxPrice,setSearch,setMinPrice,setMaxPrice, category,setCategory} = useContext(SearchContext)

    console.log({search, minPrice, maxPrice, category})


    useEffect(()=>{
        (async () => {
        setSearch('')
        setMinPrice(0)
        setMaxPrice(99999)
        setCategory("Remove categories")
            await startSearching()
        })();

    },[drawerOpen, setSearch,setMinPrice,setMaxPrice, setCategory]);


    const result = categories.map(specificCategory=>{
        return (
            <ListItemButton
                onClick={()=>{setCategory(String(specificCategory).toLowerCase())}}>
                <Typography variant="body1"
                            margin={"auto"}
                >
                    {specificCategory}
                </Typography>
            </ListItemButton>
        )
    })


    const startSearching = async ()=> {
        const res = await fetch(`${apiUrl}/search`, {
            method: 'POST',
            body: JSON.stringify(
                {
                    search:search,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    category: category
                }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json();
        setItems(data)
    }



    return (
        <>
            {drawerOpen && (
                <DrawerCloseButton onClick={() => setDrawerOpen(false)}>
                    <CloseIcon
                        sx={{
                            fontSize: "2.5rem",
                            color: Colors.black,
                        }}
                    />
                </DrawerCloseButton>
            )}
            <Drawer open={drawerOpen} >
                <List>
                <ListItemButton
                    sx={{
                        fontSize: "2.5rem",
                        color: Colors.black,
                    }}>
                    <Stack>
                        <SubscribeTf
                            color="warning"
                            label="What are you looking for?"
                            variant="standard"
                            sx={{
                                fontSize: "2.5rem",
                                color: Colors.black,
                            }}
                            onChange={(e)=>{setSearch(e.target.value)}}
                        />
                    </Stack>
                </ListItemButton>
                <ListItemButton>
                    <Stack>
                        <SubscribeTf
                            color="warning"
                            label="Set min price"
                            variant="standard"
                            type="number"
                            onChange={(e)=>{setMinPrice(Number(e.target.value))}}
                        />
                    </Stack>
                </ListItemButton>
                <ListItemButton>
                    <Stack>
                        <SubscribeTf
                            color="warning"
                            label="Set max price"
                            variant="standard"
                            type="number"
                            onChange={(e)=>{setMaxPrice(Number(e.target.value))}}

                        />
                    </Stack>
                </ListItemButton>
            </List>

                <Button
                    startIcon={<SearchIcon sx={{ color: Colors.white }} />}
                    variant="contained"
                    sx={{ fontSize: 12, py: 0.5, px: 2, minWidth: 80 }}
                    onClick={startSearching}
                >
                    Search
                </Button>
                <List>
                    <ListItem>
                        <Typography variant="body1"
                                    margin={"auto"}
                        >
                            Search by categories?
                        </Typography>
                    </ListItem>
                    {result}
                    <ListItemButton
                        onClick={()=>{setCategory('Remove categories')}}>
                        <Typography variant="body1"
                                    margin={"auto"}
                        >
                            Remove categories
                        </Typography>
                    </ListItemButton>
                </List>

        </Drawer>
        </>
    )
}