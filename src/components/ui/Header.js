import React, {useEffect, useState} from "react";
import {
    AppBar,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
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
            marginBottom: "1.25em",
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
        backgroundColor: theme.palette.common.blue,
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7,
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange,
    },
    drawerItemSelected: {
        opacity: 1,
    },
    appBar: {
        zIndex: theme.zIndex.modal + 1
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

    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);
        setOpenMenu(false);
        setSelectedIndex(i);
    };

    const menuOptions = [
        {name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0},
        {
            name: "Custom Software",
            link: "/customSoftware",
            activeIndex: 1,
            selectedIndex: 1,
        },
        {
            name: "Mobile Development",
            link: "/mobileApps",
            activeIndex: 1,
            selectedIndex: 2,
        },
        {
            name: "Website Development",
            link: "/websites",
            activeIndex: 1,
            selectedIndex: 3,
        },
    ];

    const routes = [
        {name: "Home", link: "/", activeIndex: 0},
        {
            name: "Services",
            link: "/services",
            activeIndex: 1,
            ariaPopup: anchorEl ? "true" : undefined,
            ariaOwns: anchorEl ? "simple-menu" : undefined,
            mouseOver: (event) => handleClick(event),
        },
        {name: "Revolution", link: "/revolution", activeIndex: 2},
        {name: "About Us", link: "/about", activeIndex: 3},
        {name: "Contact Us", link: "/contacts", activeIndex: 4},
    ];

    useEffect(() => {
        [...menuOptions, ...routes].forEach((route) => {
            switch (window.location.pathname) {
                case `${route.link}`:
                    if (value !== route.activeIndex) {
                        setValue(route.activeIndex);
                        if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
                            setSelectedIndex(route.selectedIndex);
                        }
                    }
                    break;
                default:
                    break;
            }
        });
    }, [value, selectedIndex, routes, menuOptions]);

    const tabs = (
        <>
            <Tabs
                className={classes.tabsContainer}
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
            >
                {routes.map((route, index) => (
                    <Tab
                        className={classes.tab}
                        component={Link}
                        to={route.link}
                        label={route.name}
                        aria-owns={route.ariaOwns}
                        aria-haspopup={route.ariaPopup}
                        onMouseOver={route.mouseOver}
                        key={index}
                    />
                ))}
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
                <div className={classes.toolBarMargin}/>
                <List disablePadding={true}>
                    {routes.map((route) => (
                        <ListItem
                            onClick={() => {
                                setOpenDrawer(false);
                                setValue(route.activeIndex);
                            }}
                            button
                            divider
                            component={Link}
                            to={route.link}
                            selected={route.activeIndex}
                            classes={{selected: classes.drawerItemSelected}}
                        >
                            <ListItemText
                                disableTypography
                                className={classes.drawerItem}
                            >
                                {route.name}
                            </ListItemText>
                        </ListItem>
                    ))}
                    <ListItem
                        divider
                        button
                        component={Link}
                        to="/estimate"
                        classes={{root: classes.drawerItemEstimate}}>
                        <ListItemText
                            className={
                                classes.drawerItem
                            }
                            disableTypography={true}
                        >
                            Free Estimate
                        </ListItemText>
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
        <>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appBar}>
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
            <div className={classes.toolBarMargin}/>
        </>
    );
}
