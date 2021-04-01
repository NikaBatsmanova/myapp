import React from 'react';
import {Link, BrowserRouter, Route, Switch} from 'react-router-dom';


export default class Nav extends React.Component{
    render(){
        return <div>
            <Link to="/get">Get</Link>
            <Link to="/post">Post</Link>
            <Link to="/put">Put</Link>
            <Link to="/delete">Delete</Link>
        </div>;
    }
}