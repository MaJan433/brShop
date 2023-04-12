import { useState } from "react";
import {
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductImage,
} from "../../styles/product";
import { Stack, Tooltip} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import {useDialogModal} from "../../hooks/useDialogModal";
import {ProductDetail} from "../productdetail";
import {ProductMeta} from "./ProductMeta";

import {useCookies} from "react-cookie";

export const SingleProductDesktop = ({ product, matches, addToCard }) => {
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

  const [cookies, setCookie] = useCookies(['basketCookie']);
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  const handleAddToCard = () => {
    addToCard(product)
  }

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={`/images/products/${product.photo}`} />
        {(showOptions || matches) && (
          <ProductAddToCart show={showOptions} variant="contained"
                            onClick={handleAddToCard}
          >
            Add to cart
          </ProductAddToCart>
        )}
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? "row" : "column"}>
            <ProductActionButton>
              <Tooltip placement="left" title="share this product">
                <ShareIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <Tooltip placement="left" title="Full view">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductMeta product={product} />
      <ProductDetailDialog product={product} />
    </>
  );
}
