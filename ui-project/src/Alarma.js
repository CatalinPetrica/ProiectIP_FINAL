import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Col} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


export default class Alarma extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            username: "",
            startDate: "",
            endDate: "",
            comments: ""
        }
    }
    componentDidMount() {
        axios.get('http://13.58.63.43:8080/wearablehealth/alerts/getAllOf/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data[0]);
                if ((response.status == 200) && (response.data[0])) {
                    this.setState({
                        isLoaded: true,
                        username: response.data[0].username,
                        startDate: response.data[0].startDate,
                        endDate: response.data[0].endDate,
                        comments: response.data[0].comments
                    })
                }

            });
    }

    async postData() {

        axios({
            method: 'post',
            url: 'http://13.58.63.43:8080/wearablehealth/alerts/insert',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
            },
            data: {

                username: 'username',
                startDate: 'startDate',
                endDate: 'endDate',
                comments: 'comments',
            }
        });
    }



    render(){

        const { username, startDate, endDate, comments } = this.state;


        return (
            <div >
                <ul>

                    <table>
                        <tr>
                            <td><b>Nume: </b><i>{username}</i></td>
                        </tr>
                        <tr>
                            <td><b>Data inceput: </b><i>{startDate}</i></td>
                        </tr>
                        <tr>
                            <td><b>Data sfarsit: </b><i>{endDate}</i></td>
                        </tr>
                        <tr>
                            <td><b>Comentarii: </b><i>{comments}</i></td>
                        </tr>
                    {/*{items.map(item => (*/}
                    {/*    <li key={item.id}>*/}
                    {/*        Nume: {item.username} | Data inceput: {item.startDate} | Data sfarsit: {item.endDate} | Comentarii: {item.comments}*/}
                    {/*    </li>*/}
                    {/*))};*/}
                    </table>
                    </ul>

                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><b>Nume</b></Form.Label>
                                    <Form.Control name="username" value={username}
                                                  onChange={data => this.setState({username: data.target.value})}
                                                  type="text" placeholder="Introdu numele de utilizator"/>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><b>Data inceput</b></Form.Label>
                                    <Form.Control name="startDate" value={startDate}
                                                  onChange={data => this.setState({startDate: data.target.value})} type="text"
                                                  placeholder="Data inceput"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><b>Data sfarsit</b></Form.Label>
                                    <Form.Control name="endDate" value={endDate}
                                                  onChange={data => this.setState({endDate: data.target.value})} type="text"
                                                  placeholder="Data sfarsit"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><b>Comentarii</b></Form.Label>
                                    <Form.Control name="comments" value={comments}
                                                  onChange={data => this.setState({comments: data.target.value})} type="text"
                                                  placeholder="Comentarii"/>
                                </Form.Group>
                            </Col>

                            <Col></Col>
                            <Col>
                                <Button variant="dark" onClick={ ()=> this.postData() }>Creaza alarma</Button>
                            </Col>
                        </Row>
                    </Form>

            </div>
        );
    }
}
