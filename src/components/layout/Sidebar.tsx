import { ReactNode } from "react";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  onClose?: () => void;
  children: ReactNode;
}

const SIDEBAR_WIDTH = 320;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = ({ onClose, children }: Props) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
        },
      }}
      variant="permanent"
      anchor="right"
      open
    >
      <DrawerHeader>
        {onClose && (
          <IconButton onClick={onClose} aria-label="Close sidebar">
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        )}
      </DrawerHeader>
      <Divider />
      <div>{children}</div>
    </Drawer>
  );
};

export default Sidebar;
