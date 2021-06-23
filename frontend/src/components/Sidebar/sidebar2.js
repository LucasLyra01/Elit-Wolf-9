import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import styles from "./styles.module.scss";
import { useHistory, useLocation } from 'react-router-dom';
import { logout } from '../auth/auth';

const drawerWidth = 112;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let history = useHistory();
    const { pathname } = useLocation();

    function handleDashboard(){
        history.push('/dashboard');
    }

    function handleProfile(){
        history.push('/profile') 

    }

    function handleSecurity(){
        history.push('/security') 
    }
    
    function sair(){
        console.log("Saindo da aplicação");
        logout();
        history.push('/');
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <div className={styles.container}>
                <header>
                    <img src="/logo_sidebar.svg" className={styles.logo} alt="logo"/>
                </header>
                <div className={styles.navigation}>
                        <button 
                            className={
                                `${styles.btnNavigation}  ${pathname === '/dashboard' && styles.isActive }`}
                            onClick={handleDashboard}
                            >
                                <img src="/icon_dashboard.svg" alt="dashboard"/>
                        </button>
                        <button 
                            className={`${styles.btnNavigation} ${pathname === ('/profile') && styles.isActive } ${pathname === ('/profile_edit') && styles.isActive } `}
                            onClick={handleProfile}
                            >
                                <img src="/icon_user.svg" alt="Usuário"/>
                            </button>

                        <button 
                            className={`${styles.btnNavigation} ${pathname === '/security' && styles.isActive } `}
                            onClick={handleSecurity}
                            >
                                <img src="/icon_security.svg" alt="Segurança"/>
                        </button>
                </div>
                <div className={styles.exit}>
                    <button onClick={sair}>
                        <img src="/icon_exit.svg" alt="Sair"/>
                    </button>
                </div>
                
        </div>
    );


    return (
        <div className={classes.root}>
        <CssBaseline />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
        
        </div>
    );
    }

    ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
