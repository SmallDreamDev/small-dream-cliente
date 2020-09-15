import React from "react";
import { Container } from "react-bootstrap";

import { AbstractComponent } from "./../components/AbstractComponent.js";
import { getManager } from "./../utils/entityManager.js";
import { getParams } from "./../utils/urlParser.js";

import "./../styles/createEntityView.css";

class CreateEntityView extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            manager: null
        };
    }

    componentDidMount() {
        // ["crearEntidad", "actividades" (collection)]
        let params = getParams(window.location.href);
        this.setState({ manager: getManager(params[1]) });
    }

    render() {
        return (
            <Container className="p-0">
                {
                    this.state.manager ?
                        (this.state.manager.processCreateEntityForm())
                        :
                        (<h1>Cargando formulario...</h1>)
                }
            </Container>
        );
    }
}

export { CreateEntityView };
