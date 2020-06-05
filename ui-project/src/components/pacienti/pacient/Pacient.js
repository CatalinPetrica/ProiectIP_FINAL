import React from "react";
import axios from "axios";
import './Pacient.css'
import {Col, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {UserName} from "../../../variabile";

export default class Pacient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            id:'',
            name:'',
            surname:'',
            username:'',
            cnp:'',
            age:'',
            country:'',
            county:'',
            city:'',
            adress:'',
            phone:'',
            email:'',
            job:'',
            medical_data_id:'',
            medical_history:"",
            allergy:"",
            cardio_consultation:"",
            diagnostice: [],
            tratamente: [],
            alergii: [],
            recomandari: [],
            dateFiziologice: [],
            dateAmbientale: []
        }
    }

    componentDidMount() {
        this.setState({seIncarca: true});

        axios.get('http://13.58.63.43:8080/wearablehealth/pacients/getOne/' +this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    seIncarca: false,
                    id: response.data.id,
                    name: response.data.name,
                    surname: response.data.surname,
                    username: response.data.username,
                    patientPhotoURL: response.data.patientPhotoURL,
                    cnp: response.data.cnp,
                    age: response.data.age,
                    country: response.data.country,
                    county: response.data.county,
                    city: response.data.city,
                    adress: response.data.street,
                    phone: response.data.phone,
                    email: response.data.email,
                    job: response.data.job,
                })
            });

        axios.get('http://13.58.63.43:8080/wearablehealth/medicaldata/getAllOf/' +this.props.match.params.id)
            .then(response => {
                console.log(response.data[0]);
                    if((response.status==200)&&(response.data[0])){
                this.setState({
                    seIncarca: false,
                    username: response.data[0].username,
                    medical_data_id:response.data[0].medical_data_id,
                    medical_history:response.data[0].medical_history,
                    allergy:response.data[0].allergy,
                    cardio_consultation:response.data[0].cardio_consultation,

                })}
            });


    }

    render() {
        const id = this.props.match.params.id;
        const {seIncarca, name, surname, username, patientPhotoURL, cnp, age, country,county, city, adress, phone, email, job,
            medical_data_id, medical_history, allergy, cardio_consultation, diagnostice, tratamente, alergii, recomandari,dateFiziologice, dateAmbientale } = this.state;

        if (seIncarca) {
            return <p align='center'>Se incarca...</p>
        }
/*
        const listaDiagnostice = diagnostice.map(diagnostic => {
            const nume = diagnostic.nume;
            return <li><p>{nume}</p></li>
        });*/
/*
        const listaAlergii = alergii.map(alergie => {
            const nume = alergie.nume;
            return <li><p>{nume}</p></li>
        });*/

       /* const dateA = {
            lumina: dateAmbientale[dateAmbientale.length - 1].lumina ? "Da" : "Nu",
            gaz: dateAmbientale[dateAmbientale.length - 1].gaz ? "Da" : "Nu",
            umiditate: dateAmbientale[dateAmbientale.length - 1].umiditate ? "Da" : "Nu",
            proximitate: dateAmbientale[dateAmbientale.length - 1].proximitate ? "Da" : "Nu"
        };*/

        return (
            <div>
                <div className='date-personale'>
                    <Row>
                        <Col>
                            <h1> Date personale</h1>
                            <table>
                                <tr>
                                    <td><b>Nume: </b><i>{name}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Prenume: </b><i>{surname}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Username: </b><i>{username}</i></td>
                                </tr>

                                <tr>
                                    <td><b>Varsta: </b><i>{age}</i></td>
                                </tr>
                                <tr>
                                    <td><b>CNP: </b><i>{cnp}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Adresa: </b><i>{adress}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Tara: </b><i>{country}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Judet: </b><i>{county}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Oras: </b><i>{city}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Adresa: </b><i>{adress}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Telefon: </b><i>{phone}</i></td>
                                </tr>
                                <tr>
                                    <td><b>E-mail: </b><i>{email}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Job: </b><i>{job}</i></td>
                                </tr>

                            </table>
                        </Col>
                        <Col>
                            <h1>Date fiziologice</h1>
                            <table>

                                <tr>
                                    <Button variant="dark" onClick={() => this.props.history.push(id + "/grafice")}>Vezi grafic istoric</Button>
                                </tr>
                            </table>
                        </Col>
                        <Col>
                            <h1>Recomandari</h1>
                            <table>
                                <tr>
                                    <Button variant="dark" onClick={() => this.props.history.push(id + "/tratamente")}>Vezi recomandari pacient</Button>
                                </tr>
                                <br/>
                                <tr>
                                    <Button variant="dark">Adauga Recomandare</Button>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <h1>Istoric Medical</h1>
                            <table>
                                <tr>
                                    <td><b>Id consultatie: </b><i>{medical_data_id}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Istoric(avansat): </b><i>{medical_history}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Alergii: </b><i>{allergy}</i></td>
                                </tr>
                                <tr>
                                    <td><b>Consult cardio: </b><i>{cardio_consultation}</i></td>
                                </tr>


                            </table>
                        </Col>
                        <Col>
                           <tr> <h1>Alarme</h1></tr>
                            <tr>  <Button variant="dark" onClick={() => this.props.history.push(id + "/alarma")}>Adauga/Afiseaza Alarma</Button></tr>
                            <table>
                                <tr>

                                </tr>
                            </table>
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}
