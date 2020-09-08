import React from "react";
import {
    Container,
    Form,
    Button,
    InputGroup,
    FormControl,
    Table,
    Alert,
    Modal
} from "react-bootstrap";
import { AbstractComponent } from "./../components/AbstractComponent";
import { getManager, getCollectionName } from "./../utils/entityManager";
import { v4 } from "uuid";
import history from "../utils/history";

class EntityManagementView extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentEntity: "",
            entityGUIName: "",
            tableHeaders: [],
            tableEntries: [],
            allEntries: [],
            deletionErrorMessage: "",
            isModalOpen: false,
        };
        this.checkboxes = [];
        this.checkboxesClone = [];
        this.manager = null;
        this.headerCheckbox = React.createRef();
        this.loadTable = this.loadTable.bind(this);
        this.changeTable = this.changeTable.bind(this);
        this.buildRow = this.buildRow.bind(this);
        this.toggleCheckboxes = this.toggleCheckboxes.bind(this);
        this.filterBySearchBar = this.filterBySearchBar.bind(this);
        this.handleAddEntity = this.handleAddEntity.bind(this);
        this.handleDeleteSelected = this.handleDeleteSelected.bind(this);
        this.renderEntityDeletionError = this.renderEntityDeletionError.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.loadTable();
    }

    buildRow(entry, i) {
        return this.manager.process(entry, i, this.checkboxes);
    }

    toggleCheckboxes() {
        if (this.headerCheckbox.current.checked) {
            this.checkboxes.forEach(function (chbx) {
                if (chbx.current !== null) {
                    chbx.current.toggleCheck(true);
                }
            });
        } else {
            this.checkboxes.forEach(function (chbx) {
                if (chbx.current !== null) {
                    chbx.current.toggleCheck(false);
                }
            });
        }
    }

    filterBySearchBar() {
        let input = document.getElementById("inlineFormInputGroup").value;
        let filteredEntries = [];
        this.state.allEntries.forEach(function (e) {
            for (let key in e) {
                if (
                    typeof e[key] === "string" &&
                    e[key].toLowerCase().includes(input.toLowerCase())
                ) {
                    filteredEntries.push(e);
                    break;
                }
            }
        });
        this.setState({ tableEntries: filteredEntries });
    }

    handleAddEntity() {
        history.push("/crear?collection=" + this.state.currentEntity);
    }

    handleDeleteSelected() {
        let deleteEntry = super.getAPIManager().deleteEntity;
        let _this = this;
        for (let i = 0; i < this.checkboxesClone.length; i++) {
            let listElement = this.checkboxes.filter(
                function (c) { return c.current !== null; }
            )[i];
            listElement.current.toggleCheck(this.checkboxesClone[i]);
        }
        this.checkboxes.filter(function (chbx) {
            return chbx.current !== null && chbx.current.checked();
        }).forEach(function (chbx) {
            let idCell = document.getElementById(chbx.current.id);
            let id = idCell.href.split("id=")[1];
            deleteEntry(id, _this.state.currentEntity, function (isDeleted) {
                if (isDeleted) {
                    let tableEntries = _this.state.tableEntries.filter(
                        function (e) { return e._id !== id; }
                    );
                    _this.setState({ tableEntries, isModalOpen: false });
                } else {
                    _this.setState({
                        deletionErrorMessage: "Ha habido un error al borrar la/s fila/s seleccionada/s",
                        isModalOpen: false
                    });
                    _this.renderEntityDeletionError();
                }
            });
        });
    }

    renderEntityDeletionError() {
        if (this.state.deletionErrorMessage) {
            return (
                <Alert variant="danger">
                    {this.state.deletionErrorMessage}
                </Alert>
            );
        }
    }

    openModal() {
        let selected = this.checkboxes.filter(
            function (c) { return c.current !== null && c.current.checked(); }
        ).length > 0;

        if (selected) {
            this.checkboxesClone = this.checkboxes.filter(
                function (c) { return c.current !== null; }
            ).map(
                function (c) { return c.current.checked(); }
            );
            this.setState({ isModalOpen: true });
        }
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    changeTable() {

    }

    loadTable() {
        this.checkboxes = [];
        let entityGUIName = document.getElementById("tableSelector")
            .options[document.getElementById("tableSelector").selectedIndex].value;
        let currentEntity = getCollectionName(entityGUIName);
        this.manager = getManager(currentEntity);
        let tableHeaders = this.manager.getHeaders(this.headerCheckbox, this.toggleCheckboxes);

        let _this = this;
        super.getAPIManager().getEntityList(currentEntity, function (list) {
            _this.setState({
                currentEntity,
                entityGUIName: entityGUIName.toLowerCase(),
                tableHeaders,
                tableEntries: list,
                allEntries: list,
                deletionErrorMessage: ""
            });
        });
    }

    render() {
        const { entityGUIName, tableHeaders, tableEntries } = this.state;
        let buildRow = this.buildRow;
        return (
            <Container className="p-0">
                <Container className="p-0">
                    <Container className="row px-0 mx-0 pt-2">
                        <Form.Label>Selecciona una:</Form.Label>
                    </Container>
                    <Container className="row p-0 m-0">
                        <Container className="col pl-0">
                            <Form.Control id="tableSelector" as="select" onChange={this.loadTable}>
                                <option>Actividades</option>
                                <option>Categorías</option>
                                <option>Clientes</option>
                                <option>Materiales</option>
                                <option>Monitores</option>
                                <option>Programaciones</option>
                            </Form.Control>
                        </Container>
                        <Container className="col pr-0">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>⌕</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    id="inlineFormInputGroup"
                                    placeholder="Nombre, apellidos..."
                                    onChange={this.filterBySearchBar}
                                />
                            </InputGroup>
                        </Container>
                    </Container>
                    <Container className="row d-flex flex-row-reverse p-0 mx-0 my-2">
                        <Button
                            className="ml-1"
                            variant="secondary"
                            onClick={this.openModal}
                        >Borrar seleccionados
                        </Button>
                        <Button
                            className="mr-1"
                            variant="secondary"
                            onClick={this.handleAddEntity}
                        >Añadir
                        </Button>
                    </Container>
                </Container>
                <Container className="p-0">
                    {this.renderEntityDeletionError()}
                </Container>
                {
                    tableEntries.length === 0 && entityGUIName ?
                        (<p>No hay { entityGUIName}</p>)
                        :
                        (<Table variant="dark" bordered hover responsive>
                            <thead>
                                <tr>
                                    {
                                        tableHeaders.map(function (h) {
                                            return <th key={v4()}>{h}</th>;
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableEntries.map(function (e, i) {
                                        return buildRow(e, i);
                                    })
                                }
                            </tbody>

                        </Table>)
                }
                <Modal show={this.state.isModalOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Borrar seleccionados</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>¿Estas seguro de que quieres borrar la/s fila/s seleccionada/s?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>No</Button>
                        <Button variant="primary" onClick={this.handleDeleteSelected}>Sí</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        );
    }

}

export { EntityManagementView };
