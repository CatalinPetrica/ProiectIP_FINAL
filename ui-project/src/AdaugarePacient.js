import React from "react";
import {InputGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './Style.css';

export default class AdaugarePacient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            username: "",
            password: "",
            confirmPassword: "",
            name: "",
            surname: "",
            cnp: "",
            age: "",
            country: "",
            county: "",
            city: "",
            adress: "",
            phone: "",
            email: "",
            job: "",
            medic: localStorage.getItem("user").id
        }
    }

    render() {
        const {nume, surname, username,password, cnp, age, country,county, city, adress, phone, email, job} = this.state;

        function inregistreaza() {
            console.log(localStorage.getItem("username"));
            axios({
                method: 'post',
                url: "http://13.58.63.43:8080/wearablehealth/pacients/insert",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                data: {

                    // id: id,
                    name: nume,
                    surname: surname,
                    username: username,
                    // password: password,
                    cnp: cnp,
                    age: age,
                    country: country,
                    county: county,
                    city: city,
                    street: adress,
                    phone: phone,
                    email: email,
                    job: job

                }
            }).then((response) => { mapare()});

        }
        function inregistrareUser() {
            console.log(localStorage.getItem("username"));
            axios({
                method: 'post',
                url: "http://13.58.63.43:8080/wearablehealth/users/insert",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                data: {

                    username: username,
                    password: password,
                    role_id: 1, /*//pacient*/
                    active_id: 1
                },

            }).then((response) => { inregistreaza()});

        }
        function mapare() {
            console.log(localStorage.getItem("username"));
            axios({
                method: 'post',
                url: "http://13.58.63.43:8080/wearablehealth/doctors/insertMap",
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                data: {

                    doctor_id: localStorage.getItem("username"),
                    pacient_id: username,
                     /*//doctor*/
                }
            })
        }

        return (
            <div className="adaugare">
                <h1>Adaugare pacient</h1>
                <br/>
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Nume de utilizator</b></Form.Label>
                            <Form.Control name="username" value={username}
                                          onChange={data => this.setState({username: data.target.value})}
                                          type="text" placeholder="Introdu numele de utilizator"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Nume</b></Form.Label>
                            <Form.Control name="name" value={nume}
                                          onChange={data => this.setState({nume: data.target.value})} type="text"
                                          placeholder="Introdu numele"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Adresa</b></Form.Label>
                            <Form.Control name="adresa" value={adress}
                                          onChange={data => this.setState({adress: data.target.value})} type="text"
                                          placeholder="Introdu adresa"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Varsta</b></Form.Label>
                            <Form.Control name="age" value={age}
                                          onChange={data => this.setState({age: data.target.value})} type="text"
                                          placeholder="Introdu varsta"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><b>Parola</b></Form.Label>
                            <Form.Control name="password" value={password}
                                          onChange={data => this.setState({password: data.target.value})}
                                          type="password" placeholder="Introdu parola"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Prenume</b></Form.Label>
                            <Form.Control name="surname" value={surname}
                                          onChange={data => this.setState({surname: data.target.value})} type="text"
                                          placeholder="Introdu prenume"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>CNP</b></Form.Label>
                            <Form.Control name="cnp" value={cnp}
                                          onChange={data => this.setState({cnp: data.target.value})} type="text"
                                          placeholder="Introdu cnp"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Tara</b></Form.Label>
                            <Form.Control name="country" value={country}
                                          onChange={data => this.setState({country: data.target.value})}
                                          type="text"
                                          placeholder="Introdu tara"/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    {/*<Col>*/}
                    {/*    <Form.Group controlId="formBasicPassword">*/}
                    {/*        <Form.Label><b>Confirma parola</b></Form.Label>*/}
                    {/*        <Form.Control name="confirmPassword" value={confirmPassword}*/}
                    {/*                      onChange={data => this.setState({confirmPassword: data.target.value})}*/}
                    {/*                      type="password" placeholder="Introdu parola"/>*/}
                    {/*    </Form.Group>*/}
                    {/*</Col>*/}

                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Judet</b></Form.Label>
                            <Form.Control name="county" value={county}
                                          onChange={data => this.setState({county: data.target.value})} type="text"
                                          placeholder="Introdu judetul"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Oras/Comuna/Sat</b></Form.Label>
                            <Form.Control name="city" value={city}
                                          onChange={data => this.setState({city: data.target.value})} type="text"
                                          placeholder="Introdu orasul/comuna/satul"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Telefon</b></Form.Label>
                            <Form.Control name="phone" value={phone}
                                          onChange={data => this.setState({phone: data.target.value})} type="text"
                                          placeholder="Introdu nr de telefon"/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>E-mail</b></Form.Label>
                            <Form.Control name="email" value={email}
                                          onChange={data => this.setState({email: data.target.value})} type="text"
                                          placeholder="Introdu e-mailul"/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>Job</b></Form.Label>
                            <Form.Control name="job" value={job}
                                          onChange={data => this.setState({job: data.target.value})} type="text"
                                          placeholder="Introdu jobul"/>
                        </Form.Group>
                    </Col>

                    <Col></Col>
                    <Col>
                        <Button variant="primary" type="submit" onClick={() => inregistrareUser()}>
                            Inregistrare
                        </Button>
                    </Col>
                </Row>
            </Form>
            </div>
        )
    }
}
