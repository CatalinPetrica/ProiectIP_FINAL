import React from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

export default class EditeazaTratament extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            id: 0,
            observatiiMedic: "",
            observatiiIngrijitor: "",
            oraRezolvare: "",
            rezolvat: 0,
        }
    }

    componentDidMount() {
        this.setState({seIncarca: true});

        axios.get("http://localhost:8080/api/tratamente/" + this.props.match.params.tratamentId)
            .then(response => {
                this.setState({
                    seIncarca: false,
                    id: this.props.match.params.tratamentId,
                    observatiiMedic: response.data.observatiiMedic,
                    observatiiIngrijitor: response.data.observatiiIngrijitor,
                    oraRezolvare: response.data.oraRezolvare,
                    rezolvat: response.data.rezolvat,
                })
            });
    }

    render() {
        const {seIncarca, id, observatiiMedic, observatiiIngrijitor, oraRezolvare, rezolvat} = this.state;
        let bifat = false;

        if (seIncarca) {
            return <p align={"center"}>Se incarca...</p>
        }

        function modificaTratamentul() {
            axios({
                method: 'put',
                url: "http://localhost:8080/api/tratamente",
                headers: {},
                data: {
                    id: id,
                    observatiiMedic: observatiiMedic,
                    observatiiIngrijitor: observatiiIngrijitor,
                    oraRezolvare: oraRezolvare,
                    rezolvat: bifat
                }
            })
        }

        return(
            <div>
                <h3>Tratament</h3>
                <Form.Group>
                    <Form.Label>Observatiile medicului</Form.Label>
                    <Form.Control as="textarea" row="3" value={observatiiMedic} onChange={data => this.setState({observatiiMedic: data})}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Observatiile ingrijitorului</Form.Label>
                    <Form.Control as="textarea" row="3" value={observatiiIngrijitor} onChange={data => this.setState({observatiiIngrijitor: data})}/>
                </Form.Group>
                <Form>
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check type="checkbox" id={`default-checkbox`} label="Rezolvat?" onChange={() => bifat = !bifat}/>
                    </div>
                </Form>
                <Form.Control size="sm" type="text" placeholder="Ora rezolvarii" onChange={data => this.setState({oraRezolvare: data})}/>
                <br/>
                <Button variant="primary" type="submit" onClick={() => modificaTratamentul()}>
                    Salveaza
                </Button>
            </div>
        )
    }
}
