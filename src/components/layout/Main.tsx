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
        flexGrow: 1,
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
