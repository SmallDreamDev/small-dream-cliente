import React from "react";
import { Container, Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";
import { AbstractComponent } from "./../components/AbstractComponent";
import { getManager, getCollectionName } from "./../utils/entityManager";

class EntityManagementView extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentEntity: "",
            entityGUIName: "",
            tableHeaders: [],
            tableEntries: [],
        }
        this.manager = null;
        this.loadTable = this.loadTable.bind(this);
        this.buildRow = this.buildRow.bind(this);
    }

    componentDidMount() {
        this.loadTable();
    }

    buildRow(entry) {
        return this.manager.process(entry);
    }

    loadTable() {
        let entityGUIName = document.getElementById("tableSelector")
            .options[document.getElementById("tableSelector")].value.toLowerCase();
        let currentEntity = getCollectionName(entityGUIName);
        this.manager = getManager(currentEntity);
        let tableHeaders = this.manager.getHeaders();

        let _this = this;
        super.getAPIManager().getEntityList(currentEntity, function (list) {
            _this.setState({ currentEntity, entityGUIName, tableHeaders, tableEntries: list });
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
                                <option>Talleres</option>
                            </Form.Control>
                        </Container>
                        <Container className="col pr-0">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text>⌕</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="inlineFormInputGroup" placeholder="Nombre, apellidos..." />
                            </InputGroup>
                        </Container>
                    </Container>
                    <Container className="row d-flex flex-row-reverse p-0 mx-0 my-2">
                        <Button className="ml-1" variant="secondary">Borrar seleccionados</Button>
                        <Button className="mr-1" variant="secondary">Añadir</Button>
                    </Container>
                </Container>
                {
                    tableEntries.length === 0 ?
                        (<p>No hay { entityGUIName}</p>)
                        :
                        (<><Table variant="dark" bordered hover responsive/*size="sm"*/>


                            <thead>
                                <tr>
                                    {
                                        tableHeaders.map(function (h) {
                                            return <th>{h}</th>;
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableEntries.map(function (e) {
                                        return buildRow(e);
                                    })
                                }
                            </tbody>

                        </Table></>)
                }
            </Container>
        );
    }

}

export { EntityManagementView };
