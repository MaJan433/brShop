import {Box, IconButton, List, styled, Typography} from "@mui/material";
import {Colors, DrawerWidth} from "../theme";
import "@fontsource/bangers"

const scrollPosition = window.pageYOffset;

export const AppbarContainer = styled(Box)(()=> ({
    display:'flex',
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px 8px'
}));

export const AppbarHeader = styled(Typography)(()=> ({
    padding: '5px',
    fontSize: 30,
    flexGrow: 1,
    fontFamily: '"Bangers", cursive',
    color: Colors.secondary
}));

export const MyList = styled(List)(({type}) => ({
    display: type === 'row' ? 'flex' : 'block',
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center'
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
    display: 'flex',
    background: Colors.shaft,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,
    borderTop: `1px solid ${Colors.border}`
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
    flexGrow: 0,
}));

export const DrawerCloseButton = styled(IconButton)(() => ({

    position: 'absolute',
    top: 10 + window.scrollY,
    left: DrawerWidth + 20,
    zIndex: 1999,
}));