import React from "react";
import { Container, Form, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "./../components/CustomCheckbox";
import { EditButton } from "./../components/EditButton";
import { v4 } from "uuid";
import "./../styles/card.css";

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

    getEntityCardIdComponent(id) {
        return (
            <Form.Group>
                <Form.Label># ID Base de datos:</Form.Label>
                <Form.Control type="text" value={id} disabled />
            </Form.Group>
        );
    }

    getEntityCardHeadComponent(value) {
        return (
            <h2 className="py-4">{value}</h2>
        );
    }

    getEntityCardTextComponent(label, fieldName, value, collectionName, entityId) {
        const inputRef = React.createRef();
        return (
            <Container className="px-0">
                <Form.Label>{label}</Form.Label>
                <Form.Group as={Row}>
                    <Col xs="8">
                        <Form.Control ref={inputRef} type="text" defaultValue={value} disabled />
                    </Col>
                    <Col xs="4">
                        <EditButton fieldName={fieldName} inputRef={inputRef} entityId={entityId} collectionName={collectionName} />
                    </Col>
                </Form.Group>
            </Container>
        );
    }

    getEntityCardListComponent(label, collection, noEntriesDisplay, collectionName, elementDisplay) {
        return (
            <Form.Group>
                <Form.Label>{label}</Form.Label>
                {
                    collection.length === 0 ?
                        <p>{noEntriesDisplay}</p>
                        :
                        <ListGroup>
                            {
                                collection.map(function (item) {
                                    return getAssociatedEntities(item, collectionName)
                                })
                            }
                        </ListGroup>
                }
            </Form.Group>
        );
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
                {super.getEntityCardHeadComponent(nombre)}
                {super.getEntityCardIdComponent(_id)}
                {super.getEntityCardTextComponent("Nombre:", "nombre", nombre, "actividades", _id)}
                {super.getEntityCardTextComponent("Zona:", "zona", zona, "actividades", _id)}
                {super.getEntityCardListComponent("Categorías:", categorias, "No hay ninguna categoría relacionada", "categorias", "Categoría")}
                {super.getEntityCardListComponent("Materiales:", materiales, "No se usan materiales", "materiales", "Material")}
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
                {super.getEntityCardHeadComponent(nombre)}
                {super.getEntityCardIdComponent(_id)}
                {super.getEntityCardTextComponent("Nombre:", "nombre", nombre, "categorias", _id)}
                {super.getEntityCardListComponent("Actividades en esta categoría:", actividades, "No existen actividades en esta categoría", "actividades", "Actividad")}
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
                {super.getEntityCardHeadComponent(nombre_completo)}
                {super.getEntityCardIdComponent(_id)}
                {super.getEntityCardTextComponent("Nombre completo:", "nombre_completo", nombre_completo, "clientes", _id)}
                {super.getEntityCardTextComponent("DNI:", "dni", dni, "clientes", _id)}
                {super.getEntityCardTextComponent("Contacto:", "contacto", contacto, "clientes", _id)}
                {super.getEntityCardTextComponent("Fecha de nacimiento:", "fecha_nacimiento", fecha_nacimiento, "clientes", _id)}
                {super.getEntityCardListComponent("Programas en los que está apuntado", talleres, "No está apuntado a nada", "talleres", "Programa")}
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
                {super.getEntityCardHeadComponent(nombre_completo)}
                {super.getEntityCardIdComponent(_id)}
                {super.getEntityCardTextComponent("Nombre completo:", "nombre_completo", nombre_completo, "monitores", _id)}
                {super.getEntityCardTextComponent("DNI:", "dni", dni, "monitores", _id)}
                {super.getEntityCardTextComponent("Contacto:", "contacto", contacto, "monitores", _id)}
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
                {super.getEntityCardHeadComponent(descripcion)}
                {super.getEntityCardIdComponent(_id)}
                {super.getEntityCardTextComponent("Descripción:", "descripcion", descripcion, "materiales", _id)}
                {super.getEntityCardTextComponent("Precio:", "precio", precio, "materiales", _id)}
                {super.getEntityCardListComponent("Actividades que lo usan:", actividades, "No hay actividades que lo usen", "actividades", "Actividad")}
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
        const { _id, actividad, monitor, fecha, hora_inicio, hora_fin, plazas, clientes } = data;
        return (
            <Container>
                <Container className="m-0 p-0 row justify-content-between">
                    <Container className="p-0 mx-0 col-9">
                        {super.getEntityCardHeadComponent(`Programa: ${actividad.nombre} (${fecha} ${hora_inicio} - ${hora_fin})`)}
                    </Container>
                    <Container className="mx-0 p-0 col-2 align-self-center d-flex flex-row-reverse">
                        <Link className="btn btn-secondary" to={`/detalles/asistencia/${_id}`}>Ver asistencia</Link>
                    </Container>
                </Container>
                {super.getEntityCardIdComponent(_id)}
                <Form.Group>
                    <Form.Label>Actividad impartida:</Form.Label>
                    {getAssociatedEntities(actividad, "actividades")}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Monitor que la imparte:</Form.Label>
                    {getAssociatedEntities(monitor, "monitores")}
                </Form.Group>
                {super.getEntityCardTextComponent("Fecha:", "fecha", fecha, "talleres", _id)}
                {super.getEntityCardTextComponent("Hora de inicio:", "hora_inicio", hora_inicio, "talleres", _id)}
                {super.getEntityCardTextComponent("Hora de fin:", "hora_fin", hora_fin, "talleres", _id)}
                <Form.Label>Plazas:</Form.Label>
                <Form.Group className="seats-container">
                    {/* <ListGroup className="align-items-center" horizontal="sm"> */}
                    {
                        Array.from(Array(plazas)).map(function (item, index) {
                            return getGraphicSeat(clientes, index)
                        })
                    }
                    {/* </ListGroup> */}
                </Form.Group>
                {/* {super.getEntityCardListComponent("Clientes apuntados:", clientes, "No hay ningún cliente apuntado", "clientes", "Cliente")} */}
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

function getAssociatedEntities(entity, collection) {
    let displayText = "";
    switch (collection) {
        case "actividades": displayText = `${entity.nombre}`; break;
        case "categorias": displayText = `${entity.nombre}`; break;
        case "clientes": displayText = `${entity.nombre_completo}`; break;
        case "materiales": displayText = `${entity.descripcion}`; break;
        case "monitores": displayText = `${entity.nombre_completo}`; break;
        case "talleres": displayText = `${entity.actividad.nombre} (${entity.fecha} ${entity.hora_inicio}-${entity.hora_fin})`; break;
        default: displayText = ""; break;
    }
    return (
        <ListGroup.Item key={v4()} variant="primary" action href={`/detalles/${collection}/${entity._id}`}>
            {displayText}
        </ListGroup.Item>
    );
}

function getGraphicSeat(clients, index) {
    let result = null;
    if (clients.length < index + 1) {
        result = (
            <ListGroup.Item variant="success">
                {"<"}Vacío{">"}
            </ListGroup.Item>
        );
    } else {
        result = (
            <ListGroup.Item variant="secondary" key={v4()} action href={`/detalles/clientes/${clients[index]._id}`}>
                {clients[index].nombre_completo}
            </ListGroup.Item>
        );
    }
    return (<Container className="p-0 seat-item">{result}</Container>);
}

export { getManager, getCollectionName };