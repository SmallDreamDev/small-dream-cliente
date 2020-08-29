import React from "react";
import { Container, Form, Button, InputGroup, FormControl, Table } from "react-bootstrap";

class EntityManagementView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Container className="d-flex align-items-center justify-content-start px-0">
                    <Container className="px-0 col-4">
                        <Form className="mx-0  pl-0">
                            <Form.Label>Selecciona una:</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>Actividades</option>
                                <option>Categorías</option>
                                <option>Clientes</option>
                                <option>Materiales</option>
                                <option>Monitores</option>
                                <option>Talleres</option>
                            </Form.Control>
                        </Form>
                    </Container>
                    <Container className="p-0 col-4">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>⌕</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="inlineFormInputGroup" placeholder="Nombre, apellidos..." />
                        </InputGroup>
                    </Container>
                    <Container className="d-flex justify-content-end align-self-end px-0 mb-1">
                        <Button className="mr-1" variant="secondary">Añadir</Button>
                        <Button variant="secondary">Borrar seleccionados</Button>
                    </Container>
                </Container>
                <Table variant="dark" bordered hover responsive/*size="sm"*/>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </Container >
        );
    }

}

export { EntityManagementView };
