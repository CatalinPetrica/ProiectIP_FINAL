import React from "react";
import {Col} from "react-bootstrap";
import axios from "axios";


export default class IstoricMedical extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            username:'',
            medical_data_id:'',
            medical_history:"",
            allergy:"",
            cardio_consultation:"",

        }
    }


    componentDidMount() {
    this.setState({seIncarca: true});

    axios.get('http://13.58.63.43:8080/wearablehealth/medicaldata/getAllOf/' +this.props.match.params.id)
    .then(response => {
    console.log(response.data[0]);

    this.setState({
        seIncarca: false,
        username: response.data[0].username,
    medical_data_id:response.data[0].medical_data_id,
    medical_history:response.data[0].medical_history,
    allergy:response.data[0].allergy,
    cardio_consultation:response.data[0].cardio_consultation,

})
});
}
    render() {
        const id = this.props.match.params.id;
        const {seIncarca, name, surname, username, patientPhotoURL, cnp, age, country,county, city, adress, phone, email, job,
            medical_data_id, medical_history, allergy, cardio_consultation, diagnostice, tratamente, alergii, recomandari,dateFiziologice, dateAmbientale } = this.state;

        if (seIncarca) {
            return <p align='center'>Se incarca...</p>
        }

        return (
            <div>
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
            </div>

        )
    }
}
