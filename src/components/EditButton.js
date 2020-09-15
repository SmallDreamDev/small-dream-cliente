import React from "react";
import { Container, Button, Alert } from "react-bootstrap"
import { FaEdit } from "react-icons/fa";
import { AbstractComponent } from "./AbstractComponent";

class EditButton extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            success: null,
            displayMessage: ""
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
        this.setState({ editing: true, success: null, displayMessage: "" });
        this.oldValue = this.inputRef.current.value;
        this.inputRef.current.disabled = false;
    }

    handleSave() {
        let newValue = this.inputRef.current.value;
        let entity = {
            [this.fieldName]: newValue
        }
        let _this = this;
        super.getAPIManager().updateEntityData(this.id, entity, this.collectionName, function (result, displayMessage) {
            _this.setState({ editing: false, success: result, displayMessage });
            _this.inputRef.current.disabled = true;
            _this.renderResult();
            if(!result){
                _this.handleClose();
            }
        });
    }

    handleClose() {
        this.setState({ editing: false });
        this.inputRef.current.value = this.oldValue;
        this.inputRef.current.disabled = true;
    }

    renderResult() {
        if (this.state.success !== null) {
            let variant = this.state.success ? "success" : "danger";
            return (
                <Alert className="mb-0 p-2" variant={variant}>
                    {this.state.displayMessage}
                </Alert>
            );
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