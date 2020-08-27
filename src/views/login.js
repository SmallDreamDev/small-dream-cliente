import React from "react";
import { Image, Container, Button, Alert, Form } from "react-bootstrap/";
import "./../styles/login.css";
import history from "./../utils/history";

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
        let url = "http://localhost:8080/usuario/identificarse";
        let body = {
            nombre_usuario : document.getElementById("userInput").value,
            clave : document.getElementById("passwordInput").value
        }
        let options = {
           method : "POST",
           body : JSON.stringify(body),
           headers: {
               "Content-Type" : "application/json"
           }
        }
        let _this = this;
        fetch(url, options).then(function(res) {
            if(res.status !== 200){
                _this.setState({errorMessage : "El usuario o contraseña son incorrectos"});
                _this.renderError();
            }else{
                _this.setState({errorMessage : ""});
                history.push("/");
            }
        }).catch(error => console.log(error));
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
