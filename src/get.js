import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import axios from "axios";
import { Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {ScrollView} from 'react-native-web';
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

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const useStylesSelect = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const useStylesCard = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const useStylesGrid = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
}));





/*class MenuDay extends React.Component {
    state = {
        days: []
    }

    componentDidMount() {
        axios.get("http://127.0.0.1:8080/menu/days")
            .then(res => {
                const days = res.data;
                this.setState({ days });
            })
    }

       render() {
           if (this.props.show) {
               return (
                   <div>
                       <fieldset>
                           <h3>Выберите день</h3>
                           <SimpleSelect days={this.state.days} setDay={this.props.setDay}/>
                       </fieldset>
                   </div>
               )}
           else {return null}
       }
}*/



/*export default class Get extends React.Component{
    render(){
        return <h2>Get</h2>;
    }
}*/
export default class Get extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showTimes:false,
            showMenu:false,
            time:null,
            times:["breakfast", "lunch", "dinner"]
        }
    }

    ShowAllMenu = () => {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu
        }));
        this.setState({showTimes: false})
        this.setState({time: null })
    }

    ShowTimesMenu = (value) => {
        this.setState({showTimes: true})
        this.setState({time: value })
    }


    /*  componentDidMount() {
          axios.get("http://127.0.0.1:8080/menu/days")
              .then(res => {
                  const days = res.data;
                  this.setState({ days });
              })
      }*/

    render() {

        return (
            <div>
                <p>
                    <TemporaryDrawer />
                </p>
                <fieldset>
                    <Button variant="contained" color="primary" onClick={this.ShowAllMenu}>{this.state.showMenu ? 'Закрыть меню' : 'Открыть меню'}</Button>
                </fieldset>
                <div>
                    <GetMenu menu={this.state.showMenu} day={this.state.time}/>
                </div>
                <div>
                    <fieldset>
                        <h3>Посмотреть варианты</h3>
                        <SimpleSelect times={this.state.times} ShowTimesMenu={this.ShowTimesMenu}/>
                    </fieldset>
                </div>
                <GetMenuTime menu={this.state.showTimes} time={this.state.time}/>
            </div>
        );
    }
}

function TemporaryDrawer() {
    const classes = useStyles();
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
                <ListItem href="index.js" button key='Меню'>
                    <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <ListItemText  primary='Меню' />
                </ListItem>
                <ListItem href="post.js" button key='Добавить блюдо'>
                    <ListItemIcon><AddCircleOutlineIcon /></ListItemIcon>
                    <ListItemText  primary='Добавить блюдо' />
                </ListItem>
                <ListItem button key='Обновить блюдо'>
                    <ListItemIcon><LoopIcon /></ListItemIcon>
                    <ListItemText href="put.js" primary='Обновить блюдо' />
                </ListItem>
                <ListItem button key='Удалить блюдо'>
                    <ListItemIcon><DeleteIcon /></ListItemIcon>
                    <ListItemText href="delete.js" primary='Удалить блюдо' />
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
    const [time, setDay] = React.useState('');

    const handleChange = (event) => {
        setDay(event.target.value);
        document.getElementById("select").value=event.target.value;
    };

    return (
        <div>
            <FormControl className={classes.formControl}>

                <Select id="select"
                        value={time}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}>
                    {props.times.map(time => <MenuItem key={props.times.indexOf(time)} value={time}>{time}</MenuItem>)}
                </Select>
            </FormControl>
            <p/>
            <Button variant="contained" color="primary" onClick={() => {props.ShowTimesMenu(document.getElementById("select").value)}}>
                Отобразить
            </Button>
        </div>
    );
}

class GetMenu extends React.Component {
    state = {
        menu: [],

    }

    componentDidUpdate(prevProps) {
        if (this.props.menu !== prevProps.menu||this.props.day !== prevProps.day) {
            if (this.props.menu&&!this.props.day) {
                axios.get("http://127.0.0.1:8080/menu/all")
                    .then(res => {
                        const menu = res.data;
                        this.setState({menu});
                    })
            }

        }}

    render() {
        if (this.props.menu) {
            return (
                <div>
                    <fieldset>
                        <CardMenu menu={this.state.menu}/>
                    </fieldset>
                </div>
            )
        }
        else {return null}
    }

}


class GetMenuTime extends React.Component {
    state = {
        menu: [],

    }

    componentDidUpdate(prevProps) {
        if (this.props.menu !== prevProps.menu||this.props.time !== prevProps.time) {
            if (this.props.time&&this.props.menu){
                let endpoint = "http://127.0.0.1:8080/menu";
                let params = {time: this.props.time};
                let url = endpoint + formatParams(params);
                axios.get(url)
                    .then(res => {
                        const menu = res.data;
                        this.setState({menu});
                    })
            }

        }}

    /*
    document.getElementById("result").value=`day: ${result.day}
breakfast: ${result.breakfast}
dinner: ${result.dinner}
lunch: ${result.lunch}`}
    else {return null}*/

    render() {
        if (this.props.menu) {
            return (
                <div>
                    <fieldset>
                        <SingleLineGridList menu={this.state.menu}/>
                    </fieldset>
                </div>
            )
        }
        else {return null}
    }

}


function formatParams( params ){
    return "?" + Object
        .keys(params)
        .map(function(key){
            return key+"="+encodeURIComponent(params[key])
        })
        .join("&")
}

function ListMenu(props) {
    let uniqueTypes = [];
    let table = []
    {props.menu.map((example) => (
        (uniqueTypes.indexOf(Object.keys(example)[0]) === -1) ?
            (uniqueTypes.push(Object.keys(example)[0]),
                table.push(<b>{Object.keys(example)[0]}:</b>),
                table.push(<li>{example[Object.keys(example)[0]]}</li>))
            : table.push(<li>{example[Object.keys(example)[0]]}</li>)
    ))}
    return table
}

function ListMenuTimes(props) {
    let table = []
    for (let type in props.example) {
        if (props.example.hasOwnProperty(type)) {
            table.push(<li>{type} : {props.example[type]}</li>)
        }}
    return table
}


function SingleLineGridList(props) {
    const classes = useStylesGrid();
    const classes1 = useStylesCard();
    return (
        <div className={classes.root}>
            <ScrollView horizontal={true}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {props.menu.map((example) => (
                                <Grid key={props.menu.indexOf(example)} item>
                                    <Card className={classes1.root} >
                                        <CardContent>
                                            <Typography variant="body2" component="p" >
                                                <ListMenuTimes  example={example}/>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </Grid>
            </ScrollView>
        </div>
    );
}

function CardMenu(props) {
    const classes = useStylesGrid();
    const classes1 = useStylesCard();
    return (
        <div className={classes.root}>
            <ScrollView vertical={true}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Grid  item>
                                <Card className={classes1.root} >
                                    <CardContent>
                                        <Typography variant="body2" component="p" >
                                            <ListMenu menu={props.menu}/>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ScrollView>
        </div>
    );
}