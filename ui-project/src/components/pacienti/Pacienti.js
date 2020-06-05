import React from "react";
import './Pacienti.css'
import {UserName} from "../../variabile";
import Button from "react-bootstrap/Button";
import '../Style.css';

export default class Pacienti extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            pacienti: []
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});

        let role = JSON.parse(localStorage.getItem('user')).role;
        let id = JSON.parse(localStorage.getItem('user')).id;
        console.log(localStorage.getItem('username')+"sa vedem");

        fetch('http://13.58.63.43:8080/wearablehealth/doctors/getAllPacientsOf/' + localStorage.getItem('username'))
            .then(response => response.json())
            .then(data => this.setState({
                pacienti: data, seIncarca: false}));
    }

    render() {
        const {pacienti, seIncarca} = this.state;
        if (seIncarca) {
            return <p>Se incarca...</p>
        }

        const listaPacienti = pacienti.map(pacient => {
            const numePacient = pacient.name + ' ' + pacient.surname;
            const id = pacient.username;
            return <li><i><a href={'/pacienti/' + id} id={id}>{numePacient}</a></i></li>

        });
        return (
            <div align='center'>
                <div>
                    <table>
                    <td>

                         <h1>Lista pacientilor</h1>

                    </td>
                    </table>
                </div>
                <div className="listaPacienti" >
                    <ol>{listaPacienti}</ol>
                </div>

                <Button variant="dark" onClick={() => this.props.history.push("/adauga")}>Adauga Pacient</Button>

            </div>
        )
    }
}
