import React from 'react';
import './App.css';

import {Container, Row, Col, Navbar} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Footer from './components/footer/Footer';
import Pacienti from "./components/pacienti/Pacienti";
import NavigationBar  from './components/navigation/NavigationBar';
import Sidebar from "./components/navigation/side/Sidebar";
import Pacient from "./components/pacienti/pacient/Pacient";
import Grafic from "./components/pacienti/grafice/Grafic";
import Tratamente from "./components/pacienti/pacient/tratamente/Tratamente";
import EditeazaTratament from "./components/pacienti/pacient/tratamente/EditeazaTratament";
import Welcome from "./components/Welcome";
import Login from "./components/auth/Login";
import {PrivateRoute} from "./components/auth/PrivateRoute"
import IstoricMedical from "./IstoricMedical";
import AdaugarePacient from "./AdaugarePacient";
import Alarma from "./Alarma";

export default class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <NavigationBar bg="dark" variant="dark"/>
                <Sidebar bg="dark" variant="dark"/>
                <Container className={'content'} fluid>
                    <Row>
                        <Col lg={12} className={"margin-top"}>
                            <Switch>
                                <PrivateRoute path="/" exact={true} component={Welcome}/>
                                <PrivateRoute path="/pacienti" exact={true} component={Pacienti}/>
                                <PrivateRoute path="/pacienti/:id" exact={true} component={Pacient}/>
                                <PrivateRoute path="/pacienti/:id/grafice" exact={true} component={Grafic}/>
                                <PrivateRoute path="/pacienti/:id/tratamente" exact={true} component={Tratamente}/>
                                <PrivateRoute path="/pacienti/:id/tratamente/:tratamentId" exact={true} component={EditeazaTratament}/>
                                {/*<PrivateRoute path="/pacienti/:id/istoricmedical" exact={true} component={IstoricMedical}/>*/}
                                <PrivateRoute path="/adauga" exact={true} component={AdaugarePacient}/>
                                <PrivateRoute path="/alarma" exact={true} component={Alarma}/>
                                <Route path="/login" component={Login} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </Router>
        );
    }
}
