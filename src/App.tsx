import { AppBar, Badge, createStyles, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Theme, Toolbar, Typography, WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import TodoIcon from '@material-ui/icons/FormatListNumbered';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Router } from 'react-router';
import { Todo } from './model/model';
import HomePage from './pages/HomePage';
import TodoPage from './pages/TodoPage';
import { RootState } from './reducers/index';
import { isSmartphone } from './responsive';
import withRoot from './withRoot';

export namespace App {
    export interface Props extends RouteComponentProps<void>, WithStyles<typeof styles>, WithWidth {
        todoList: Todo[];
    }

    export interface State {
        mobileOpen: boolean;
    }
}

const history = createBrowserHistory();

class App extends React.Component<App.Props, App.State> {

    state = {
        mobileOpen: true,
    };

    routes = (
        <div className={this.props.classes.content}>
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/home" component={HomePage} />
            <Route exact={true} path="/todo" component={TodoPage} />
        </div>
    );

    render() {

        const { width, classes } = this.props;

        let drawer = (
            <div>
                <div className={classes.drawerHeader} />
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push('/')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={() => history.push('/todo')}>
                        <ListItemIcon>
                            {this.renderTodoIcon()}
                        </ListItemIcon>
                        <ListItemText primary="Todo" />
                    </ListItem>
                </List>
                <div style={{ height: 10000 }} />
            </div>
        );

        return (
            <Router history={history}>
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerToggle}
                                    className={classes.navIconHide}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" noWrap={!isSmartphone(width)}>
                                    Create-React-App with Material-UI, Typescript, Redux and Routing
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <Hidden mdUp>
                            <Drawer
                                variant="temporary"
                                anchor={'left'}
                                open={this.state.mobileOpen}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                onClose={this.handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden smDown implementation="css">
                            <Drawer
                                variant="permanent"
                                open
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        {this.routes}
                    </div>
                </div>
            </Router>
        );
    }

    renderTodoIcon() {
        let uncompletedTodos = this.props.todoList.filter(t => t.completed === false);

        if (uncompletedTodos.length > 0) {
            return (
                <Badge color="secondary" badgeContent={uncompletedTodos.length}>
                    <TodoIcon />
                </Badge>
            );
        } else {
            return (
                <TodoIcon />
            );
        }
    }

    private handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };
}

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

function mapStateToProps(state: RootState) {
    return {
        todoList: state.todoList
    };
}

export default withRoot(withStyles(styles)(connect(mapStateToProps)(withWidth()(App))));
