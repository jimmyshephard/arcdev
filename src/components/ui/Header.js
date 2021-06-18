import React from 'react';
import {AppBar, Button, makeStyles, Tab, Tabs, Toolbar, useScrollTrigger} from "@material-ui/core";
import logo from '../../assets/logo.svg';

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

const useStyles = makeStyles(theme => ({
  toolBarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em'
  },
  logo: {
    height: '7rem'
  },
  tabsContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px'
  },
  button: {
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
    ...theme.typography.estimate
  }
}));

export default function Header(props) {

  const classes = useStyles();

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters={true}>
            <img src={logo} alt="Company Logo" className={classes.logo}/>
            <Tabs className={classes.tabsContainer}>
              <Tab label="Home" className={classes.tab}></Tab>
              <Tab label="Services" className={classes.tab}></Tab>
              <Tab label="The Revolution" className={classes.tab}></Tab>
              <Tab label="About Us" className={classes.tab}></Tab>
              <Tab label="Contact Us" className={classes.tab}></Tab>
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>
              Free Estimate
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolBarMargin}/>
    </>
  )
}
