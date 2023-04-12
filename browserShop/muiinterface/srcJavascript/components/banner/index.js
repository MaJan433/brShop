import {Typography} from "@mui/material";
import {BannerContainer, BannerContent, BannerDescription, BannerImage, BannerTitle} from "../../styles/banner";

export const Banner = () =>{
    return (
        <>
            <BannerContainer>
                <BannerImage src={
                    '/ecomercelogo.png'
                }sx={{alignItems:"center"}}></BannerImage>
                <BannerContent>
                    <Typography variant="h6"> Experience the customers' luxury...</Typography>
                    <BannerTitle variant="h2">New stock now!</BannerTitle>
                    <BannerDescription variant="subtitle"
                    > Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </BannerDescription>
                </BannerContent>
            </BannerContainer>

        </>
    )
}