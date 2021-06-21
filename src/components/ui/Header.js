import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  useScrollTrigger,
} from "@material-ui/core";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
  },
  logo: {
    height: "7rem",
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px",
  },
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
    ...theme.typography.estimate,
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: "white",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, v) => {
    setValue(v);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  const menuOptions = [
    { name: "Services", link: "/services" },
    { name: "Custom Software", link: "/customSoftware" },
    { name: "Mobile Development", link: "/mobileApps" },
    { name: "Website Development", link: "/websites" },
  ];

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpen(false);
    setSelectedIndex(i);
  };

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/services" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/revolution" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/about" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/contacts" && value !== 4) {
      setValue(4);
    }
  }, [value]);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters={true}>
            <Button
              component={Link}
              to="/"
              disableRipple={true}
              className={classes.logoContainer}
            >
              <img src={logo} alt="Company Logo" className={classes.logo} />
            </Button>
            <Tabs
              className={classes.tabsContainer}
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
            >
              <Tab
                label="Home"
                className={classes.tab}
                component={Link}
                to="/"
              ></Tab>
              <Tab
                label="Services"
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? true : undefined}
                className={classes.tab}
                onMouseOver={(event) => handleClick(event)}
                component={Link}
                to="/services"
              ></Tab>
              <Tab
                label="The Revolution"
                className={classes.tab}
                component={Link}
                to="/revolution"
              ></Tab>
              <Tab
                label="About Us"
                className={classes.tab}
                component={Link}
                to="/about"
              ></Tab>
              <Tab
                label="Contact Us"
                className={classes.tab}
                component={Link}
                to="/contacts"
              ></Tab>
            </Tabs>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Free Estimate
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              classes={{ paper: classes.menu }}
              elevation={0}
              MenuListProps={{ onMouseLeave: handleClose }}
            >
              {menuOptions.map((menuItem, index) => (
                <MenuItem
                  key={index}
                  onClick={(event) => {
                    handleMenuItemClick(event, index);
                    setValue(index);
                    handleClose();
                  }}
                  selected={selectedIndex === index && value === 1}
                  component={Link}
                  to={menuItem.link}
                  classes={{ root: classes.menuItem }}
                >
                  {menuItem.name}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin} />
    </>
  );
}
