import React from 'react';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import styled from 'styled-components';
import './NavigationBar.scss'

const Styles = styled.div``;

const data = localStorage;
let show = false;
let user;

console.log(data);
if(data.length > 2) {
     show = true;
     user = JSON.parse(localStorage.getItem('user'));
}
export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Styles>
                <Navbar bg="dark" variant="dark" >
                    <Navbar.Brand href="/">
                        <img src="https://image.flaticon.com/icons/svg/891/891399.svg" width="25" height="25" alt="brand"/>
                        <a>    WearableHealth</a>
                        {/*<img  src="../images/logo2.png"/>*/}
                    </Navbar.Brand>
                    <Navbar.Toggle  aria-controls="basic-navbar-nav"/>
                      {show ? <Navbar.Collapse className="justify-content-end" >
                        <h4>{localStorage.getItem("role")===2? "pacient":"doctor"}</h4>
                        <Button variant="warning" onClick={() => {localStorage.clear(); window.location.replace('/')}}>
                            Logout</Button>
                    </Navbar.Collapse> : ""}
                </Navbar>
            </Styles>
        )
    }
}

