import { useState } from "react";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductImage,
} from "../../styles/product";
import { Stack, Tooltip, Typography } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import {useDialogModal} from "../../hooks/useDialogModal";
import {ProductDetail} from "../productdetail";
import {ProductMeta} from "./ProductMeta";
import {useCookies} from "react-cookie";
import * as React from "react";

export const SingleProduct = ({ product, matches, addToCard }) => {

  const handleAddToCard = () =>  {
    addToCard(product)
  }

  const [cookies, setCookie] = useCookies(['basketCookie']);
  const [showProductDetailDialog, setShowProductDetailDialog] = useState(false);

  const handleShowProductDetailDialog = () => {
    setShowProductDetailDialog(true);
  };

  const handleCloseProductDetailDialog = () => {
    setShowProductDetailDialog(false);
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };


  return (
      <>
        <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ProductImage src={`/images/products/${product.photo}`} />
          <ProductMeta product={product} matches={matches} />
          <ProductActionsWrapper>
            <Stack direction={matches ? "row" : "column"}>
              <ProductActionButton>
                <Tooltip placement="left" title="share this product">
                  <ShareIcon color="primary" />
                </Tooltip>
              </ProductActionButton>
              <ProductActionButton onClick={handleShowProductDetailDialog}>
                <Tooltip placement="left" title="Full view">
                  <FitScreenIcon color="primary" />
                </Tooltip>
              </ProductActionButton>
            </Stack>
          </ProductActionsWrapper>
        </Product>
        <ProductAddToCart variant="contained"
                          show={showOptions || matches}
                          onClick={handleAddToCard}
        >
          Add to cart
        </ProductAddToCart>
        {showProductDetailDialog && (
            <ProductDetail product={product} onClose={handleCloseProductDetailDialog}  open/>
        )}
      </>
  );
}