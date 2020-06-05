import React from 'react';
import logo from '../images/logo2.png'
import './Welcome.css'

import {InputGroup} from 'react-bootstrap';

export default class Welcome extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={"welcome"}>
                <InputGroup className="justify-content-md-center" >
                    <h1>WearableHealth</h1>
                    <img className={"homeImg"} src={logo} />
                </InputGroup>
            </div>
        )
    }
}
