import React from 'react';
import axios from "axios";
import CanvasJSReact from '../../../assets/canvasjs.react'
import './Grafic.css'
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Grafic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seIncarca: true,
            dateFiziologice: []
        }
    }

    componentDidMount() {
        this.setState({seIncarca: true});

        axios.get("http://13.58.63.43:8080/wearablehealth/sensormeasure/getAllOf/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    seIncarca: false,
                    dateFiziologice: response.data
                })
            });
    }

    render() {
        const {seIncarca, dateFiziologice} = this.state;
        if(seIncarca){
            return <p align='center'>Se incarca...</p>
        }
        const tensiune = [];
        const puls = [];
        const temperatura = [];
        const umiditate = [];
        const glicemie = [];

        dateFiziologice.map(date => {

            puls.push({x: new Date(date.measure_date),y: date.pulse});
            temperatura.push({x: new Date(date.measure_date) , y: date.temperature});
            umiditate.push({x: new Date(date.measure_date) , y: date.humidity});

        });


        const optionsPuls = {
            animationEnabled: true,
            title:{
                text: "Istoric puls"
            },
            axisX: {
                valueFormatString: "MM/DD"
            },
            axisY: {
                title: "Puls",
                includeZero: false
            },
            data: [{
                yValueFormatString: "###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: puls
            }]
        };

        const optionsTemperatura = {
            animationEnabled: true,
            title:{
                text: "Istoric temperatura"
            },
            axisX: {
                valueFormatString: "MM/DD"
            },
            axisY: {
                title: "Temperatura",
                includeZero: false
            },
            data: [{
                yValueFormatString: "###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: temperatura
            }]
        };

        const optionsUmiditate = {
            animationEnabled: true,
            title:{
                text: "Istoric umiditate"
            },
            axisX: {
                valueFormatString: "MM/DD"
            },
            axisY: {
                title: "Umiditate",
                includeZero: false
            },
            data: [{
                yValueFormatString: "###",
                xValueFormatString: "MMMM",
                type: "spline",
                dataPoints: umiditate
            }]
        };



        return (
            <div>

                <CanvasJSChart options = {optionsPuls}/>
                <br/>
                <CanvasJSChart options = {optionsTemperatura}/>
                <br/>
                <CanvasJSChart options = {optionsUmiditate}/>
                <br/>

                <br/>
            </div>
        );
    }
}
