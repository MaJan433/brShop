import {useMediaQuery, useTheme} from "@mui/material";
import {AppbarMobile} from "./appbarMobile";
import {AppbarDesktop} from "./appbarDesktop";

export const Appbar = () => {
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))
    return (
        <>
            {matches ? <AppbarMobile matches={matches}/>: <AppbarDesktop matches={matches}/>}
        </>
    )
}