import React from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

export default class Tratamente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            tratamente: []
        }
    }

    componentDidMount() {
        this.setState({seIncarca: true});

        axios.get("http://localhost:8080/api/pacienti/" + this.props.match.params.id + "/tratamente")
            .then(response => {
                this.setState({
                    seIncarca: false,
                    tratamente: response.data
                })
            })
    }

    render() {
        const {seIncarca, tratamente} = this.state;

        if (seIncarca) {
            return <p align={"center"}>Se incarca...</p>
        }

        const listaTratamente = tratamente.map(tratament => {
            const rezolvat = tratament.rezolvat ? "Da" : "Nu";
            return <div id={"tratament" + tratament.id}>
                <h3>Tratament {tratament.id}</h3>
                <Form.Group>
                    <Form.Label><b>Observatiile medicului</b></Form.Label>
                    <p>{tratament.observatiiMedic}</p>
                </Form.Group>
                <Form.Group>
                    <Form.Label><b>Observatiile ingrijitorului</b></Form.Label>
                    <p>{tratament.observatiiIngrijitor}</p>
                </Form.Group>
                <Form>
                    <p><b>Rezolvat?</b> {rezolvat}</p>
                </Form>
                <p><b>Ora rezolvarii:</b> {tratament.oraRezolvare}</p>
                <br/>
                <Button variant="primary" type="submit" onClick={() => this.props.history.push("/pacienti/" + this.props.match.params.id + "/tratamente/" + tratament.id)}>
                    Modifica
                </Button>
                <br/>
                <br/>
            </div>
        });

        return (
            <div>
                <h1 align="center">Tratamente</h1>
                <div align="center">{listaTratamente}</div>
                <br/>
                <br/>
            </div>

        )
    }
}
