import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { IRootState } from "../../store";
import { useSelector } from "react-redux";

export const NavBar = () => {
    const navigate = useNavigate();
      const { cartItems,totalQuantity } = useSelector((state: IRootState) => state.cart);
  return (
    <Stack direction={"row"} sx={{ padding: "10px 15px" }}>
      <Box sx={{ flex: "1", display: "flex" }}>
        <Button variant="contained" onClick={() => navigate("/")}>
          {" "}
          Home
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={() => navigate("/cart")}>
          Cart &nbsp;<Typography> ({cartItems && totalQuantity})</Typography>
        </Button>
      </Box>
    </Stack>
  );
};

// export default NavBar;
