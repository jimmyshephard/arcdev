import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button,
    Drawer,
    IconButton, List, ListItem, ListItemText,
    makeStyles,
    Menu,
    MenuItem,
    SwipeableDrawer,
    Tab,
    Tabs,
    Toolbar,
    useMediaQuery,
    useScrollTrigger,
    useTheme,
} from "@material-ui/core";
import logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

function ElevationScroll(props) {
    const {children} = props;

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
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1em",
        },
    },
    logo: {
        height: "7rem",
        [theme.breakpoints.down("md")]: {
            height: "6em",
        },
        [theme.breakpoints.down("xs")]: {
            height: "4.5em",
        },
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
    drawerButton: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    drawerIcon: {
        width: "50px",
        height: "50px",
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: 'white',
        opacity: 0.7
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        opacity: 1
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleChange = (e, v) => {
        setValue(v);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    };

    const menuOptions = [
        {name: "Services", link: "/services"},
        {name: "Custom Software", link: "/customSoftware"},
        {name: "Mobile Development", link: "/mobileApps"},
        {name: "Website Development", link: "/websites"},
    ];

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    };

    useEffect(() => {
        switch (window.location.pathname) {
            case "/": {
                if (value !== 0) {
                    setValue(0);
                }
                break;
            }

            case "/services": {
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(0);
                }
                break;
            }

            case "/revolution": {
                if (value !== 2) {
                    setValue(2);
                }
                break;
            }

            case "/customSoftware": {
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(1);
                }
                break;
            }
            case "/mobileApps": {
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(2);
                }
                break;
            }
            case "/websites": {
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(3);
                }
                break;
            }
            case "/about": {
                if (value !== 3) {
                    setValue(3);
                }
                break;
            }
            case "/contacts": {
                if (value !== 4) {
                    setValue(4);
                }
                break;
            }

            default:
                break;
        }
    }, [value]);

    const tabs = (
        <>
            <Tabs
                className={classes.tabsContainer}
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
            >
                <Tab label="Home" className={classes.tab} component={Link} to="/"></Tab>
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
            <Button variant="contained" color="secondary" className={classes.button}>
                Free Estimate
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                classes={{paper: classes.menu}}
                elevation={0}
                MenuListProps={{onMouseLeave: handleClose}}
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
                        classes={{root: classes.menuItem}}
                    >
                        {menuItem.name}
                    </MenuItem>
                ))}
            </Menu>
            <div className={classes.toolBarMargin}/>
        </>
    );

    const drawer = (
        <>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                onOpen={() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
            >
                <List disablePadding={true}>
                    <ListItem onClick={() => {
                        setOpenDrawer(false);
                        setValue(0);
                    }} button divider component={Link} to="/" selected={value === 0}>
                        <ListItemText className={value === 0 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography={true}>Home</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {
                        setOpenDrawer(false);
                        setValue(1);
                    }} button divider component={Link} selected={value == 1} to="/services">
                        <ListItemText className={value === 1 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography={true}>Services</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {
                        setOpenDrawer(false);
                        setValue(2);
                    }} button divider component={Link} selected={value == 2} to="/revolution">
                        <ListItemText className={value === 2 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography={true}>Revolution</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {
                        setOpenDrawer(false);
                        setValue(3);
                    }} button divider component={Link} selected={value == 3} to="/about">
                        <ListItemText className={value === 3 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography={true}>About</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {
                        setOpenDrawer(false);
                        setValue(4);
                    }} button divider component={Link} selected={value == 4} to="/contact">
                        <ListItemText className={value === 4 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem} disableTypography={true}>Contact</ListItemText>
                    </ListItem>
                    <ListItem onClick={() => {
                        setOpenDrawer(false);
                        setValue(5);
                    }} className={classes.drawerItemEstimate} selected={value == 5} button divider component={Link}
                              to="/estimate">
                        <ListItemText className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
                                      disableTypography={true}>Free Estimate</ListItemText>
                    </ListItem>

                </List>
            </SwipeableDrawer>
            <IconButton
                disableRipple
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.drawerButton}
            >
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </>
    );

    return (
        <ElevationScroll>
            <AppBar position="fixed">
                <Toolbar disableGutters={true}>
                    <Button
                        component={Link}
                        to="/"
                        disableRipple={true}
                        className={classes.logoContainer}
                    >
                        <img src={logo} alt="Company Logo" className={classes.logo}/>
                    </Button>
                    {matches ? drawer : tabs}
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
}
