import React from "react";
import { Image, Container, Button, Alert, Form } from "react-bootstrap/";
import "./../styles/login.css";
import { AbstractComponent } from "./../components/AbstractComponent";
import history from "../utils/history";

class LogIn extends AbstractComponent {

    constructor() {
        super();
        this.state = {
            errorMessage: ""
        };
        this.renderError = this.renderError.bind(this);
        this.logIn = this.logIn.bind(this);
    }


    renderError() {
        if (this.state.errorMessage) {
            return (
                <Alert variant="danger">
                    {this.state.errorMessage}
                </Alert>
            );
        }
    }

    logIn() {
        let user = document.getElementById("userInput").value;
        let password = document.getElementById("passwordInput").value;
        let _this = this;
        let getToken = super.getAPIManager().getToken;
        super.getAPIManager().logIn(user, password, function (error) {
            _this.setState({ errorMessage: error });
            if (error) {
                _this.renderError();
            } else {
                history.push("/");
            }
            _this.props.tokenHandler(getToken());
        });
    }

    render() {
        return (
            <Form>
                <Image src="logo.png" fluid />
                <Container className="p-0">
                    {this.renderError()}
                </Container>
                <Form.Group>
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control id="userInput" type="text" className="form-control"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control id="passwordInput" type="password" className="form-control"></Form.Control>
                </Form.Group>
                <Container className="p-0 d-flex justify-content-center">
                    <Button variant="primary" onClick={this.logIn}>Entrar</Button>
                </Container>
            </Form>
        );
    }

}

export { LogIn };
