import {Divider, ListItemButton, ListItemIcon} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import {ActionIconsContainerDesktop, ActionIconsContainerMobile, MyList, AppbarContainer, AppbarHeader} from "../../styles/appbar";
import SearchIcon from "@mui/icons-material/Search";
import {UseUIContext} from "../../context/ui";
import {useContext} from "react";
import {BasketContext} from "../../context/BasketContext";
import {AdminContext} from "../../context/AdminContext";
import {useCookies} from "react-cookie";
import {apiUrl} from "../../api";

export const Actions = ({matches}) => {

    const [cookies, setCookies, removeCookies] = useCookies(['adminPanelCookie']);

    const {basketOpen, setBasketOpen} = useContext(BasketContext)
    const {adminLogged, setAdminLogged} = useContext(AdminContext)
    const {drawerOpen, setDrawerOpen} = UseUIContext();
    const Component = matches
        ? ActionIconsContainerMobile : ActionIconsContainerDesktop

    const basketHandler = () => {
        if (basketOpen){
            setBasketOpen(false)
        } else{
            setBasketOpen(true)
        }
    };

    const handleAdminVerification = async () => {

        if (cookies.adminPanelCookie) {
            const res = await fetch(`${apiUrl}/check/Hash`, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        password: cookies.adminPanelCookie.password
                    }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (res.status === 200){
                alert('Welcome admin')
                setAdminLogged(true)
            }
        } else {
            const password = window.prompt("Enter admin password:")
            if (password != null){
                const tempObject = {password:password}
                setCookies('adminPanelCookie', tempObject, {
                    maxAgeSeconds: 3600,
                });
                const res = await fetch(`${apiUrl}/check/Hash`, {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            password: password
                        }),
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                if (res.status === 200){
                    alert('Welcome admin')
                    setAdminLogged(true)
                } else {
                    alert('Invalid Password!')
                    removeCookies("adminPanelCookie")
                }
            } else {
                alert('Password cannot be empty!')
                removeCookies("adminPanelCookie")
            }
        }

    }

    return (
        <>
            <Component>
            <MyList type="row">
            <ListItemButton
                onClick={()=>{setDrawerOpen(true)}}
            sx={{
                justifyContent:"center",

            }}
            >
                <ListItemIcon
                sx={{
                    display: "flex",
                    justifyContent: "center"
                }}
                >
                    <SearchIcon/>
                </ListItemIcon>
            </ListItemButton>
                <Divider orientation="vertical" flexItem></Divider>
                <ListItemButton
                    sx={{
                        justifyContent:"center",

                    }}
                    onClick={()=>{setBasketOpen(true)}}
                >
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <ShoppingBasketIcon/>
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem></Divider>
                <ListItemButton
                    sx={{
                        justifyContent:"center",

                    }}
                    onClick={handleAdminVerification}
                >
                    <ListItemIcon
                        sx={{
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <AdminPanelSettingsIcon/>
                    </ListItemIcon>
                </ListItemButton>
                <Divider orientation="vertical" flexItem></Divider>
            </MyList>
            </Component>
        </>
    )
}