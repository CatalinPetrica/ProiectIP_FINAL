import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './Login.css'
import {InputGroup} from "react-bootstrap";
import {userService} from "./UserService";
import {UserName} from "../../variabile";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();
        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password, returnUrl } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }



        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    // UserName.usr=this.state.username;
                    // console.log(UserName.usr.toString());
                    this.props.history.push(from);
                    window.location.reload();
                },
                error => this.setState({ error, loading: false })
            );

        // UserName.usr=this.state.username;
        // console.log(UserName.usr.toString());
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;

        return (
            <InputGroup className="justify-content-md-center">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><b>Username</b></Form.Label>
                        <Form.Control name="username" value={username} onChange={this.handleChange} type="text" placeholder="username..."/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Parola</b></Form.Label>
                        <Form.Control name="password" value={password} onChange={this.handleChange} type="password" placeholder="parola..."/>
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Login
                    </Button>
                </Form>
            </InputGroup>
        )
    }

}
