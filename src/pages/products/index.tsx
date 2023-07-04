import { Stack, Typography, Box, Button, Modal } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, callProductListApi, callUpdateProductApi } from "../../feature/productslice";
import { IRootState } from "../../store";
import { addToCart } from "../../feature/cartslice";
import React from "react";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  height: "100%",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

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

  const [openModal, setOpenModal] = React.useState(false);
  const [modalImage, setModalImage] = React.useState("");
  const handleOpenModal = (imgUrl: string) => {
    setModalImage(imgUrl);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setModalImage("");
    setOpenModal(false);
  };

  if (isLoading) {
    return <Typography>Loading ...</Typography>;
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
        <Button onClick={() => dispatch(callUpdateProductApi())}>Test Update</Button>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <img style={{ height: "100%" }} src={modalImage} />
          </Box>
        </Modal>
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
                      maxWidth: "300px",
                    }}
                    src={item.thumbnail}
                    onClick={(e) => handleOpenModal(item.thumbnail)}
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
                      color: "#000",
                      fontSize: "16px",
                      fontWeight: "bold",
                      whiteSpace: "flex-wrap",
                      textOverflow: "hidden",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {item.title}
                  </Typography>
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
                    Price : {item.price}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      flex: "1",
                      color: "#6f6c6c",
                      fontSize: "14px",
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
                      cartItems.filter((cartItem) => cartItem.id === item.id)
                        .length > 0
                        ? cartItems.filter(
                            (cartItem) => cartItem.id === item.id
                          )[0].quantity >= item.stock
                        : false
                    }
                  >
                    Add to Cart{" ("}
                    {cartItems.filter((cartItem) => cartItem.id === item.id)
                      .length > 0
                      ? cartItems.filter(
                          (cartItem) => cartItem.id === item.id
                        )[0].quantity
                      : 0}
                    {")"}
                  </Button>
                </Box>
                <Box
                  sx={{
                    color: "#000",
                    fontSize: "16px",
                    fontWeight: "bold",
                    whiteSpace: "flex-wrap",
                    textOverflow: "hidden",
                    width: "100%",
                    justifyContent: "right",
                  }}
                >
                  <Typography>Stock : {item.stock}</Typography>
                </Box>
              </Box>
            ))}
      </>
    </Stack>
  );
};
// export default Products;
