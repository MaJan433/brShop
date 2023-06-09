import {Box, styled, Typography} from "@mui/material";
import {theme, Colors} from "../theme";


export const BannerContainer = styled(Box)(({theme})=> ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    maxHeight: '500px',
    overflow: 'hidden',
    padding: '0px 0px',
    background: Colors.light_gray,
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center'
    }
}));

export const BannerContent = styled(Box)(({theme})=> ({
   display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 420,
    padding: '30px'
}));

export const BannerTitle = styled(Typography)(()=> ({
    lineHeight: 2,
    fontSize: '3vw',
    marginBottom: '25px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '40px'
    }
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({

    lineHeight: 1.25,
    fontSize: 'max(2vw, 15px)',
    letterSpacing: 1.25,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
        lineHeight: 1.15,
        letterSpacing: 1.15,
        marginBottom: "1.5em",
    },
}));

export const BannerImage = styled('img')(({src, theme}) => ({
    src: `url(${src})`,
    width: '500px',
    maxHeight:'500px',
    [theme.breakpoints.down('md')]: {
        width: '350px',
    },
    [theme.breakpoints.down('sm')]: {
        width: '320px',
        height: '300px'
    },
}));