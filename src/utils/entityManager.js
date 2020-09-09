import React from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "./../components/CustomCheckbox";
import { v4 } from "uuid";

class AbstractManager {
    constructor() {
        this.headers = [];
    }

    getHeaders(headerCheckbox, handler) {
        let clone = [...this.headers];
        clone.unshift("#");
        clone.unshift(<Form.Check key={v4()} ref={headerCheckbox} type="checkbox" onChange={handler} />);
        return clone;
    }

    createCheckbox(checkboxes, index) {
        let checkbox = React.createRef();
        checkboxes.push(checkbox);
        let cb = <CustomCheckbox id={index} ref={checkbox} />;
        return cb;
    }
}

class ActivityManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Zona", "Categorías asociadas", "Materiales usados"];
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, nombre, zona } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/actividades/${_id}`}>{index + 1}</Link></td>
                <td>{nombre}</td>
                <td>{zona}</td>
                <td><Link to={`/detalles/actividades/${_id}`}>Ver categorías asociadas</Link></td>
                <td><Link to={`/detalles/actividades/${_id}`}>Ver materiales usados</Link></td>
            </tr>
        );
    }

    processEntityCard(data) {
        const { _id, nombre, zona, categorias, materiales } = data;
        return (
            <Container>
                <h2>{nombre}</h2>
                <Form.Group>
                    <Form.Label># ID Base de datos:</Form.Label>
                    <Form.Control type="text" value={_id} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Zona:</Form.Label>
                    <Form.Control type="text" value={zona} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Categorías:</Form.Label>
                    {
                        !categorias ?
                            <p>No existen categorias para esta actividad</p>
                            :
                            <ListGroup>
                                {
                                    categorias.map(function (c, index) {
                                        return getAssociatedEntities(c, "categorias", "Categoría", index)
                                    })
                                }
                            </ListGroup>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Materiales usados:</Form.Label>
                    {
                        !materiales ?
                            <p>No hay materiales</p>
                            :
                            <ListGroup>
                                {
                                    materiales.map(function (m, index) {
                                        return getAssociatedEntities(m, "materiales", "Material", index);
                                    })
                                }
                            </ListGroup>
                    }

                </Form.Group>
            </Container>
        );
    }
}

class CategoryManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Actividades en esta categoría"];
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, nombre } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/categorias/${_id}`}>{index + 1}</Link></td>
                <td>{nombre}</td>
                <td><Link to={`/detalles/categorias/${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }

    processEntityCard(data) {
        const { _id, nombre, actividades } = data;
        return (
            <Container>
                <h2>{nombre}</h2>
                <Form.Group>
                    <Form.Label># ID Base de datos:</Form.Label>
                    <Form.Control type="text" value={_id} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Actividades en esta categoría:</Form.Label>
                    {
                        !actividades ?
                            <p>No existen actividades en esta categoría</p>
                            :
                            <ListGroup>
                                {
                                    actividades.map(function (a, index) {
                                        return getAssociatedEntities(a, "actividades", "Actividad", index)
                                    })
                                }
                            </ListGroup>
                    }
                </Form.Group>
            </Container>
        );
    }
}

class ClientManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto", "Fecha de nacimiento", "Actividades en las que está apuntado"];
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, nombre_completo, dni, contacto, fecha_nacimiento } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/clientes/${_id}`}>{index + 1}</Link></td>
                <td>{nombre_completo}</td>
                <td>{dni}</td>
                <td>{contacto}</td>
                <td>{fecha_nacimiento}</td>
                <td><Link to={`/detalles/clientes/${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }

    processEntityCard(data) {
        const { _id, nombre_completo, dni, contacto, fecha_nacimiento, talleres } = data;
        return (
            <Container>
                <h2>{nombre_completo}</h2>
                <Form.Group>
                    <Form.Label># ID Base de datos:</Form.Label>
                    <Form.Control type="text" value={_id} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>DNI:</Form.Label>
                    <Form.Control type="text" value={dni} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contacto:</Form.Label>
                    <Form.Control type="text" value={contacto} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha de nacimiento:</Form.Label>
                    <Form.Control type="text" value={fecha_nacimiento} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Programas en los que está apuntado:</Form.Label>
                    {
                        !talleres ?
                            <p>No está apuntado a nada</p>
                            :
                            <ListGroup>
                                {
                                    talleres.map(function (t, index) {
                                        return getAssociatedEntities(t, "talleres", "Programa", index)
                                    })
                                }
                            </ListGroup>
                    }
                </Form.Group>
            </Container>
        );
    }
}

class InstructorManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto"];
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, nombre_completo, dni, contacto } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/monitores/${_id}`}>{index + 1}</Link></td>
                <td>{nombre_completo}</td>
                <td>{dni}</td>
                <td>{contacto}</td>
            </tr>
        );
    }

    processEntityCard(data) {
        const { _id, nombre_completo, dni, contacto } = data;
        return (
            <Container>
                <h2>{nombre_completo}</h2>
                <Form.Group>
                    <Form.Label># ID Base de datos:</Form.Label>
                    <Form.Control type="text" value={_id} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>DNI:</Form.Label>
                    <Form.Control type="text" value={dni} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contacto:</Form.Label>
                    <Form.Control type="text" value={contacto} disabled />
                </Form.Group>
            </Container>
        );
    }
}

class MaterialManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Descripción", "Precio", "Actividades que usan este material"];
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, descripcion, precio } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/materiales/${_id}`}>{index + 1}</Link></td>
                <td>{descripcion}</td>
                <td>{precio}</td>
                <td><Link to={`/detalles/materiales/${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }

    processEntityCard(data) {
        const { _id, descripcion, precio, actividades } = data;
        return (
            <Container>
                <h2>{descripcion}</h2>
                <Form.Group>
                    <Form.Label># ID Base de datos:</Form.Label>
                    <Form.Control type="text" value={_id} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control type="text" value={descripcion} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio:</Form.Label>
                    <Form.Control type="text" value={precio} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Actividades que lo usan:</Form.Label>
                    {
                        !actividades ?
                            <p>No hay actividades que lo usen</p>
                            :
                            <ListGroup>
                                {
                                    actividades.map(function (a, index) {
                                        return getAssociatedEntities(a, "actividades", "Actividad", index)
                                    })
                                }
                            </ListGroup>
                    }
                </Form.Group>
            </Container>
        );
    }
}

class WorkshopManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["# Actividad", "# Monitor", "Fecha", "Hora inicio", "Hora fin", "Plazas totales", "# Modo de pago", "Clientes apuntados"];
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, id_actividad, id_monitor, fecha, hora_inicio, hora_fin, plazas, id_modo_pago } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/talleres/${_id}`}>{index + 1}</Link></td>
                <td><Link to={`/detalles/actividades/${id_actividad}`}>Ver actividad</Link></td>
                <td><Link to={`/detalles/monitores/${id_monitor}`}>Ver monitor</Link></td>
                <td>{fecha}</td>
                <td>{hora_inicio}</td>
                <td>{hora_fin}</td>
                <td>{plazas}</td>
                <td><Link to={`/detalles/modosDePago/${id_modo_pago}`}>Ver modo de pago</Link></td>
                <td><Link to={`/detalles/talleres/${_id}`}>Ver clientes apuntados</Link></td>
            </tr>
        );
    }

    processEntityCard(data) {
        const { _id, id_actividad, id_monitor, fecha, hora_inicio, hora_fin, plazas, clientes } = data;
        return (
            <Container>
                <h2>Programa: Actividad {id_actividad}</h2>
                <Form.Group>
                    <Form.Label># ID Base de datos:</Form.Label>
                    <Form.Control type="text" value={_id} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>DNI:</Form.Label>
                    {getAssociatedEntities(id_actividad, "actividades", "Actividad")}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contacto:</Form.Label>
                    {getAssociatedEntities(id_monitor, "monitores", "Monitor que la imparte")}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fecha:</Form.Label>
                    <Form.Control type="text" value={fecha} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hora de inicio:</Form.Label>
                    <Form.Control type="text" value={hora_inicio} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hora de fin:</Form.Label>
                    <Form.Control type="text" value={hora_fin} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Plazas:</Form.Label>
                    <Form.Control type="text" value={plazas} disabled />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Clientes apuntados:</Form.Label>
                    {
                        !clientes ?
                            <p>No hay ningún cliente apuntado</p>
                            :
                            <ListGroup>
                                {
                                    clientes.map(function (c, index) {
                                        return getAssociatedEntities(c, "clientes", "Cliente", index)
                                    })
                                }
                            </ListGroup>
                    }
                </Form.Group>
            </Container>
        );
    }
}

function getCollectionName(guiName) {
    switch (guiName) {
        case "Actividades": return "actividades";
        case "Categorías": return "categorias";
        case "Clientes": return "clientes";
        case "Materiales": return "materiales";
        case "Monitores": return "monitores";
        case "Programaciones": return "talleres";
        default: return "";
    }
}

function getManager(collectionName) {
    switch (collectionName) {
        case "actividades": return new ActivityManager();
        case "categorias": return new CategoryManager();
        case "clientes": return new ClientManager();
        case "materiales": return new MaterialManager();
        case "monitores": return new InstructorManager();
        case "talleres": return new WorkshopManager();
        default: return null;
    }
}

function getAssociatedEntities(entityId, collection, displayText, index) {
    let number = index ? index + 1 : ""
    return (
        <ListGroup.Item variant="primary" action href={`/detalles/${collection}/${entityId}`}>
            {displayText} {number}
        </ListGroup.Item>
    );
}

export { getManager, getCollectionName };