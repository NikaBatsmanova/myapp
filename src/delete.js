import React from 'react';
import './index.css';
import axios from "axios";
import { Button } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import LoopIcon from '@material-ui/icons/Loop';
import DeleteIcon from '@material-ui/icons/Delete';


const useStylesSelect = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const useStylesMenu = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


export default class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dish:null,
            dishes:[]
        }
    }

    DeleteDish = () => {
        let endpoint = "http://127.0.0.1:8080/menu";
        let params = {
            dish: this.state.dish
        };
        let url = endpoint + formatParams(params);
        axios.delete(url)
            .then(res => {
                alert(res.data);
            })
    }

    SetDish = (value) => {this.setState({dish: value })}

    componentDidMount() {
        axios.get("http://127.0.0.1:8080/menu/dishes")
            .then(res => {
                const dishes = res.data;
                this.setState({ dishes });
            })
    }

    render() {

        return (
            <div>
                <p>
                    <TemporaryDrawer />
                </p>
                <fieldset>
                    <h3>Выберите блюдо, которое хотите удалить из меню</h3>
                    <SimpleSelect dishes={this.state.dishes} SetDish={this.SetDish}/>
                    <Button variant="contained" color="primary" onClick={this.DeleteDish}>Удалить</Button>
                </fieldset>
            </div>
        );
    }
}


function TemporaryDrawer() {
    const classes = useStylesMenu();
    const [state, setState] = React.useState({left: false});

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem to="index.js" button key='Меню'>
                    <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <ListItemText  primary='Меню' />
                </ListItem>
                <ListItem to="post.js" button key='Добавить блюдо'>
                    <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                    <ListItemText  primary='Добавить блюдо' />
                </ListItem>
                <ListItem to="put.js" button key='Обновить блюдо'>
                    <ListItemIcon><LoopIcon /></ListItemIcon>
                    <ListItemText  primary='Обновить блюдо' />
                </ListItem>
                <ListItem to="delete.js" button key='Удалить блюдо'>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText  primary='Удалить блюдо' />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key='left'>
                <Button onClick={toggleDrawer('left', true)}><MenuIcon /></Button>
                <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>

        </div>
    );
}


function SimpleSelect(props) {
    const classes = useStylesSelect();
    const [dishes, SetDish] = React.useState('');

    const handleChange = (event) => {
        SetDish(event.target.value);
        document.getElementById("select").value=event.target.value;
        props.SetDish(document.getElementById("select").value)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select id="select"
                        value={dishes}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}>
                    {props.dishes.map(dish => <MenuItem key={dish.id} value={dish.id}>{dish.dish}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}


function formatParams( params ){
    return "?" + Object
        .keys(params)
        .map(function(key){
            return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}
