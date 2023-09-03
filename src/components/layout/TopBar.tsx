import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";

interface TopBarProps {
  isSidebarOpen: boolean;
  onOpenSidebar?: () => void;
}

const TopBar = ({ isSidebarOpen, onOpenSidebar }: TopBarProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          Shop N&rsquo; Fly
        </Typography>
        {onOpenSidebar && (
          <IconButton
            color="inherit"
            aria-label="Open sidebar"
            edge="end"
            onClick={onOpenSidebar}
            sx={{ ...(isSidebarOpen && { display: "none" }) }}
          >
            <Settings />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
