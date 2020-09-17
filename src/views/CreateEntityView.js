import React from "react";
import { Alert, Container } from "react-bootstrap";

import { AbstractComponent } from "./../components/AbstractComponent.js";
import { getManager } from "./../utils/entityManager.js";
import { getParams } from "./../utils/urlParser.js";

import "./../styles/createEntityView.css";

class CreateEntityView extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            manager: null,
            collection: "",
            errorAlert: null
        };
        this.callAPICreateEntity = this.callAPICreateEntity.bind(this);
    }

    componentDidMount() {
        // ["crearEntidad", "actividades" (collection)]
        let params = getParams(window.location.href);
        this.setState({
            manager: getManager(params[1]),
            collection: params[1]
        });
    }

    callAPICreateEntity(entityData, errorAlert) {
        if (errorAlert) {
            this.setState({
                errorAlert: errorAlert
            });
        } else {
            super.getAPIManager().createEntity(
                entityData,
                this.state.collection,
                function (error) {
                    let errorAlert = (
                        <Alert variant="danger">
                            {error.validationErrorMessage}
                        </Alert>
                    );
                    this.setState({
                        errorAlert: errorAlert
                    });
                }.bind(this),
                function (responseJson) {
                    let alertSuccess = (
                        <Alert variant="success">
                            Operación realizada con éxito!
                        </Alert>
                    );
                    this.setState({
                        errorAlert: alertSuccess
                    });
                }.bind(this)
            );
        }
    }

    render() {
        return (
            <Container className="p-0">
                {
                    this.state.manager ?
                        (this.state.manager.processCreateEntityForm(
                            this.callAPICreateEntity,
                            this.state.errorAlert
                        ))
                        :
                        (<h1>Cargando formulario...</h1>)
                }
            </Container>
        );
    }
}

export { CreateEntityView };
