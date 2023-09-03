import { ReactNode } from "react";

import Box from "@mui/material/Box";

interface Props {
  children: ReactNode;
}

const Main = ({ children }: Props) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
