import {
    AppbarContainer,
    AppbarHeader,
    MyList
} from "../../styles/appbar";
import {ListItemText} from "@mui/material";
import {Actions} from "./actions";
import {useContext, useEffect, useRef} from "react";
import {RefContext} from "../../context/RefContext";
import {UseUIContext} from "../../context/ui";


export const AppbarDesktop = ({matches}) => {

    const {gridRef, setGridRef, contactRef, setContactRef} = useContext(RefContext);
    const {drawerOpen, setDrawerOpen} = UseUIContext();
    console.log(gridRef, contactRef, 'tu sa refy')

    const scrollToProducts = () => {

        if (gridRef) {
            gridRef.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContact = () => {
        if (contactRef) {
            contactRef.scrollIntoView({ behavior: 'smooth' });
        }
    }


            return (
            <AppbarContainer>
                <AppbarHeader>Broowser Shop</AppbarHeader>
                <MyList type={"row"}>
                    <ListItemText primary="Home"/>
                    <ListItemText primary="Categories" onClick={()=>{setDrawerOpen(true)}}/>
                    <ListItemText primary="Products" onClick={scrollToProducts}>
                    </ListItemText>
                    <ListItemText primary="Contact Us" onClick={scrollToContact}>
                    </ListItemText>
                    <Actions matches={matches}/>
                </MyList>
            </AppbarContainer>

    )
}