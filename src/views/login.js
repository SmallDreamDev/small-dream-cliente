import React from "react";
import { Image, Container, Button, Alert, Form } from "react-bootstrap/";
import "./../styles/login.css";

class LogIn extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage : ""
        };
        this.renderError = this.renderError.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    renderError(){
        if(this.state.errorMessage){
            return (
                <Alert variant="danger">
                    {this.state.errorMessage}
                </Alert>
            );
        }
    }

    logIn(){
        
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
                   <Form.Control type="text" className="form-control"></Form.Control>
                </Form.Group>
                <Form.Group>
                   <Form.Label>Contraseña:</Form.Label>
                   <Form.Control type="password" className="form-control"></Form.Control>
                </Form.Group>
                <Container className="p-0 d-flex justify-content-center">
                    <Button variant="primary" onClick={this.logIn}>Entrar</Button>
                </Container>
            </Form>
        );
    }

}

export { LogIn };
