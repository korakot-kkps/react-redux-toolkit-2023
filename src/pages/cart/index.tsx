import { Stack, Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import {
  ICartItems,
  addToCart,
  removeFromCart,
} from "../../feature/carslice/index";

export const Cart = () => {
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const dispatch = useDispatch<any>();

  if (!cartItems.length) {
    return <Typography>No cart items are added...</Typography>;
  }

  return (
    <Stack
      sx={{
        gap: "40px",
        padding: "20px",
      }}
    >
      <>
        {cartItems && cartItems.length < 1
          ? null
          : cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 5fr)",
                  gap: "4px",
                  backgroundColor: "#edf6f7",
                  border: "1px solid darkgray",
                  padding: "20px",
                  borderRadius: "15px",
                }}
              >
                <Box sx={{ height: "200px" }}>
                  <img style={{ height: "150px" }} src={item.thumbnail} />
                </Box>
                <Box>
                  <Typography>Model : {item.title}</Typography>
                  <Typography>Price : {item.price}</Typography>
                </Box>
                <Box>
                  <Typography>{item.description}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    borderRadius: 1,
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "whitesmoke",
                      padding: "0px",
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    -
                  </Button>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      padding: "5px 20px",
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      margin: "0 10px",
                    }}
                  >
                    {item.quantity}
                  </Box>
                  <Button
                    sx={{
                      backgroundColor: "whitesmoke",
                      padding: "0px",
                      border: "1px solid lightgray",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            ))}
      </>
    </Stack>
  );
};
// export default Cart;
