import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, callProductListApi } from "../../feature/productslice";
import { IRootState } from "../../store";
import { addToCart } from "../../feature/carslice";

export const Products = () => {
  const dispatch = useDispatch<any>(); /*Needed <any>*/
  const { productList, isLoading } = useSelector(
    (state: IRootState) => state.product
  );
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  useEffect(() => {
    // call the particular action
    dispatch(callProductListApi());
  }, []);

  if (isLoading) {
    return <Typography>Loading ...</Typography>;
  }
  if (!cartItems.length) {
    return <Typography>No cart items are added...</Typography>;
  }

  return (
    <Stack
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "40px",
      }}
    >
      <>
        {productList && productList.length < 1
          ? null
          : productList.map((item) => (
              <Box
                key={item.id}
                sx={{
                  backgroundColor: "whitesmoke",
                  padding: "20px",
                  borderRadius: "10px",
                  border: "1px solid #d7cccc",
                }}
              >
                <Box sx={{ height: "200px", padding: "10px" }}>
                  <img
                    style={{
                      height: "100%",
                    }}
                    src={item.thumbnail}
                  />
                </Box>
                <Box
                  sx-={{
                    display: "flex",
                    padding: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      flex: "1",
                      color: "#6f6c6c",
                      fontSize: "14px",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: "#6f6c6c", fontSize: "14px" }}>
                    Price : {item.price}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "bold",
                      whiteSpace: "flex-wrap",
                      textOverflow: "hidden",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    padding: "10px",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    border: "1px solid lightgray",
                  }}
                >
                  <Button
                    onClick={() => dispatch(addToCart(item))}
                    disabled={
                      cartItems && cartItems.length > 0
                        ? cartItems
                            .map((cartItem) => cartItem.id)
                            .indexOf(item.id) !== -1
                        : false
                    }
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            ))}
      </>
    </Stack>
  );
};
// export default Products;
