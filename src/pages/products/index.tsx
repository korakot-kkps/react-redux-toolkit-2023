import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../feature/productslice";

export const Products = () => {
  const dispatch = useDispatch();
  console.log(useSelector((state) => state));
  // const { productList } = useSelector(state=>{});

  useEffect(() => {
    // call the particular action
    dispatch(getProducts());
  }, []);

  return (
    <Stack>
      <Typography>Products</Typography>
    </Stack>
  );
};
// export default Products;
