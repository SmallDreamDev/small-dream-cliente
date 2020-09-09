import React from "react";
import { Container, Button, Alert, Col } from "react-bootstrap"
import { FaEdit } from "react-icons/fa";
import { AbstractComponent } from "./AbstractComponent";

class EditButton extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            success: null
        };
        this.inputRef = props.inputRef;
        this.fieldName = props.fieldName;
        this.collectionName = props.collectionName;
        this.id = props.entityId;
        this.oldValue = "";
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderResult = this.renderResult.bind(this);
    }

    handleEdit() {
        this.setState({ editing: true });
        this.oldValue = this.inputRef.current.value;
        this.inputRef.current.disabled = false;
    }

    handleSave() {
        let newValue = this.inputRef.current.value;
        let entity = {
            [this.fieldName]: newValue
        }
        let _this = this;
        super.getAPIManager().updateEntityData(this.id, entity, this.collectionName, function (result) {
            _this.setState({ editing: false, success: result });
            _this.inputRef.current.disabled = true;
            _this.renderResult();
        });
    }

    handleClose() {
        this.setState({ editing: false });
        this.inputRef.current.value = this.oldValue;
        this.inputRef.current.disabled = true;
    }

    renderResult() {
        if (this.state.success !== null) {
            if (this.state.success) {
                return (
                    <Alert className="mb-0 p-2" variant="success">
                        Actualizado correctamente
                    </Alert>
                );
            } else {
                return (
                    <Alert className="mb-0 p-2" variant="danger">
                        Error inesperado: no se ha actualizado
                    </Alert>
                );
            }
        }
    }

    render() {
        return (
            <Container className="row align-items-center px-0">
                {
                    this.state.editing ?
                        (<Container className="d-flex justify-content-end">
                            <Container className="col-sm">
                                <Button variant="secondary" onClick={this.handleSave}>Guardar</Button>
                            </Container>
                            <Container className="col-sm">
                                <Button variant="secondary" onClick={this.handleClose}>Cancelar</Button>
                            </Container>

                        </Container>)
                        :
                        (<Button variant="light" onClick={this.handleEdit}>
                            <FaEdit />
                        </Button>)
                }
                {this.renderResult()}
            </Container>

        );
    }

}

export { EditButton };