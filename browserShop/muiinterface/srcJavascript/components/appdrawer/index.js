import {Button, Drawer, List, ListItem, ListItemButton, Stack, Typography} from "@mui/material";
import {SubscribeTf} from "../../styles/footer";
import SearchIcon from "@mui/icons-material/Search";
import {Colors} from "../../styles/theme";
import CloseIcon from "@mui/icons-material/Close";
import {UseUIContext} from "../../context/ui";
import {DrawerCloseButton} from "../../styles/appbar";
import {useContext, useEffect, useState} from "react";
import {SearchContext} from "../../context/SearchContext";
import {ItemContext} from "../../context/ItemsContext";
import {useCookies} from "react-cookie";
import {apiUrl} from "../../api";


export const AppDrawer = () => {

    const [cookies, setCookie] = useCookies(['basketCookie']);
    const [initialItems, setInitialItems] = useState([])
    const [categories, setCategories] = useState(['a','b','c'])





    useEffect(()=>{

        (async () => {
            const res = await fetch(`${apiUrl}/items`)
            const data = await res.json();
            setInitialItems(data)
        })();
    },[])

    useEffect(()=> {
        const tempArray = []
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
    const {drawerOpen, setDrawerOpen} = UseUIContext();
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
                onClick={()=>{setCategory(specificCategory.toLowerCase())}}>
                <Typography variant="body1"
                            margin={"auto"}
                >
                    {specificCategory}
                </Typography>
            </ListItemButton>
        )
    })
    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    };

    const handleMinNumberChange = (event) => {
        setMinPrice(event.target.value)
    }

    const handleMaxNumberChange = (event) => {
        setMaxPrice(event.target.value)
    }

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
                            onChange={handleSearchChange}
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
                            onChange={handleMinNumberChange}
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
                            onChange={handleMaxNumberChange}

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