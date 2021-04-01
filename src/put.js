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
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

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

const useStylesDialog = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        textAlign: 'center',
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#282c34',
    },
    paper: {
        width: '80%',
        maxHeight: 435,
    },
}));


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

export default class Put extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dish:null,
            typeOfDish:null,
            dishes:[],
            types:[]
        }
    }

    UpdateDish = () => {
        let endpoint = "http://127.0.0.1:8080/menu";
        let params = {
            type: this.state.typeOfDish,
            dish: this.state.dish
        };
        let url = endpoint + formatParams(params);
        axios.put(url)
            .then(res => {
                alert(res.data);
            })
    }

    SetDish = (value) => {this.setState({dish: value })}

    SetType = (value) => {this.setState({typeOfDish: value })}

    componentDidMount() {
        axios.get("http://127.0.0.1:8080/menu/types")
            .then(res => {
                const types = res.data;
                this.setState({ types });
            });
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
                    <Typography variant="h5" gutterBottom>
                        Выберите блюдо, которое хотите изменить
                    </Typography>
                    <ConfirmationDialog dishes={this.state.dishes}/>
                    <Typography variant="h5" gutterBottom>
                        Введите новое название блюда
                    </Typography>
                    <SimpleField SetDish={this.SetDish}/>
                    <Typography variant="h5" gutterBottom>
                        или Выберите новый тип блюда
                    </Typography>
                    <SimpleSelect types={this.state.types} SetType={this.SetType}/>
                    <Button variant="contained" color="primary" onClick={this.UpdateDish}>Изменить</Button>
                </fieldset>
            </div>
        );
    }
}


function SimpleField(props) {
    const classes = useStylesSelect();
    const [dish, setDish] = React.useState('');

    const handleChange = (event) => {
        setDish(event.target.value);
        document.getElementById("dish").value=event.target.value;
        props.SetDish(document.getElementById("dish").value)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <TextField id="dish" label="Dish" value={dish} onChange={handleChange}/>
            </FormControl>
        </div>
    );
}

function SimpleSelect(props) {
    const classes = useStylesSelect();
    const [types, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
        document.getElementById("select").value=event.target.value;
        props.SetType(document.getElementById("select").value)
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <Select id="select"
                        value={types}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}>
                    {props.types.map(type => <MenuItem key={type.id} value={type.id}>{type.type}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}



function ConfirmationDialogRaw(props) {
    const { onClose, value: valueProp, open, ...other } = props;
    const [value, setValue] = React.useState(valueProp);
    const radioGroupRef = React.useRef(null);

    /*React.useEffect(() => {
        if (!open) {
            setValue(valueProp);
        }
    }, [valueProp, open]);*/

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose(value);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };


    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">Dishes</DialogTitle>
            <DialogContent dividers>
                <RadioGroup
                    ref={radioGroupRef}
                    aria-label="ringtone"
                    name="ringtone"
                    value={value}
                    onChange={handleChange}
                >
                    {props.dishes.map((dish) => (
                        <FormControlLabel value={dish.dish} key={dish.dish} control={<Radio />} label={dish.dish} />
                    ))}
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleOk} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
};


function ConfirmationDialog(props) {
    const classes = useStylesDialog();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    const handleClickListItem = () => {
        setOpen(true);
    };

    const handleClose = (newValue) => {
        setOpen(false);

        if (newValue) {
            setValue(newValue);
        }
    };

    return (
        <div className={classes.root}>
            <List component="div" role="list">
                <ListItem
                    button
                    divider
                    aria-haspopup="true"
                    aria-controls="dish-menu"
                    aria-label="dish"
                    onClick={handleClickListItem}
                    role="listitem"
                >
                    <ListItemText primary="Dish" secondary={value} />
                </ListItem>
                <ConfirmationDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    id="dish-menu"
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    value={value}
                    dishes={props.dishes}
                />
            </List>
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

