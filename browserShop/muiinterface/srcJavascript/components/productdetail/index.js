import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Colors } from "../../styles/theme";
import styled from "@emotion/styled";
import {Product, ProductImage } from "../../styles/product";
import {IncDec} from "../ui/incdec";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import {useCookies} from "react-cookie";


function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  lineHeight: 1.5,
}));

export const ProductDetail = ({ open, onClose, product}) => {

    console.log(product, 'to jest produkt')

  //
    const [cookies, setCookie] = useCookies(['basketCookie']);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

  function handleAddToCard() {
    const basketObject = cookies.basketCookie ? cookies.basketCookie : {}
    if (basketObject[product.name]){
      basketObject[product.name].amount += 1
    } else {
      basketObject[product.name] = {
        amount: 1,
        price: product.price,
        picture: product.photo
      }
    }
    setCookie('basketCookie', basketObject)
    console.log(cookies.basketCookie)
  }
  console.log(cookies.basketCookie)
  console.log(product.name)

  return (
    <Dialog
      TransitionComponent={SlideTransition}
      open={open}
      fullScreen
    >
      <DialogTitle
        sx={{
          background: Colors.secondary,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          {product.name}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ProductDetailWrapper display={"flex"} flexDirection={matches ? "column" : "row"}>
          <Product sx={{ mr: 4 }}>
            <ProductImage src={`/images/products/${product.photo}`} />
          </Product>
          <ProductDetailInfoWrapper>
            <Typography variant="subtitle">SKU: 123</Typography>
            <Typography variant="subtitle">Availability: 5 in stock</Typography>
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              {product.name}
            </Typography>
            <Typography variant="body">

              Lorem ipsum eloasd
              {/*{product.description}*/}
              {/*{product.description}*/}
              {/*{product.description}*/}
            </Typography>
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button variant="contained"
              onClick={handleAddToCard}
              >Add to Cart</Button>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{ mt: 4, color: Colors.light }}
            >
              <FavoriteIcon sx={{ mr: 2 }} />
              Add to wishlist
            </Box>
            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            >
              <FacebookIcon />
              <TwitterIcon sx={{ pl: 2 }} />
              <InstagramIcon sx={{ pl: 2 }} />
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog>
  );
}
