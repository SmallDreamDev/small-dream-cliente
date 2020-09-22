import React from "react";
import { Button, Alert, Container, Form, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "./../components/CustomCheckbox";
import { EditButton } from "./../components/EditButton";
import { v4 } from "uuid";
import { MyDatePicker } from "../components/MyDatePicker";
import { CreateWorkshopForm } from "../components/CreateEntityForms";
import "./../styles/card.css";
import { sortWorkshopsByDateAndTime } from "./../utils/sortingFunctions";

function getAssociatedWorkshops(entity, collection) {
    let displayText = `${entity.actividad.nombre} (${entity.fecha} ${entity.hora_inicio}-${entity.hora_fin})`;
    let hasAttended = entity.asistido;
    return (
        <Container key={v4()} className="d-flex align-items-center p-0">
            <Container className="p-0 col-8">
                <ListGroup.Item variant="primary" action href={`/detalles/${collection}/${entity._id}`}>
                    {displayText}
                </ListGroup.Item>
            </Container>
            <Container>
                <Form.Check name={`attendanceRadioGroup${entity._id}`} inline label="Asistido" type="radio" defaultChecked={hasAttended} disabled />
                <Form.Check name={`attendanceRadioGroup${entity._id}`} inline label="No asistido" type="radio" defaultChecked={!hasAttended} disabled />
            </Container>
        </Container>
    );
}

function getAssociatedEntities(entity, collection) {
    let displayText = "";
    switch (collection) {
        case "actividades": displayText = `${entity.nombre}`; break;
        case "categorias": displayText = `${entity.nombre}`; break;
        case "clientes": displayText = `${entity.nombre_completo}`; break;
        case "materiales": displayText = `${entity.descripcion}`; break;
        case "monitores": displayText = `${entity.nombre_completo}`; break;
        case "talleres": return getAssociatedWorkshops(entity, collection);
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
                                    return getAssociatedEntities(item, collectionName);
                                })
                            }
                        </ListGroup>
                }
            </Form.Group>
        );
    }

    sortEntries(entries) {
        return entries;
    }

    sortListItems(data) {
        return data;
    }
}

class ActivityManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Zona", "Categorías asociadas", "Materiales usados"];
        this.formRefs = {
            nombre: React.createRef(),
            zona: React.createRef()
        };
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

    callAPICreateEntity(callbackFunction) {
        let entityData = {
            nombre: this.formRefs.nombre.current.value,
            zona: this.formRefs.zona.current.value
        };
        if (!entityData.nombre | !entityData.zona) {
            let errorAlert = (
                <Alert variant="danger">
                    No puede haber campos vacíos
                </Alert>
            );
            callbackFunction(entityData, errorAlert);
        } else {
            callbackFunction(entityData, null);
        }
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        return (
            <Container>
                <h1>Crear nueva actividad</h1>
                {errorAlert ? errorAlert : null}
                <Form>
                    <Form.Group controlId="activity.form.name">
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.nombre}
                            type="text"
                            placeholder="Jumping Clay"
                        />
                    </Form.Group>
                    <Form.Group controlId="activity.form.area">
                        <Form.Label>Zona: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.zona}
                            type="text"
                            placeholder="A"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callAPICreateEntity(callbackFunction) }}
                    >Crear actividad
                    </Button>
                </Form>
            </Container>
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
        this.formRefs = {
            nombre: React.createRef()
        };
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

    callAPICreateEntity(callbackFunction) {
        console.log("Ejecutando esto");
        let entityData = {
            nombre: this.formRefs.nombre.current.value
        };
        if (!entityData.nombre) {
            let errorAlert = (
                <Alert variant="danger">
                    No puede haber campos vacíos
                </Alert>
            );
            callbackFunction(entityData, errorAlert);
        } else {
            callbackFunction(entityData, null);
        }
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        return (
            <Container>
                <h1>Crear nueva categoría</h1>
                {errorAlert ? errorAlert : null}
                <Form>
                    <Form.Group controlId="category.form.name">
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.nombre}
                            type="text"
                            placeholder="Steam for kids"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callAPICreateEntity(callbackFunction) }}
                    >Crear categoría
                    </Button>
                </Form>
            </Container>
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
        this.formRefs = {
            nombreCompleto: React.createRef(),
            dni: React.createRef(),
            contacto: React.createRef(),
            fechaNacimiento: React.createRef()
        };
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

    callAPICreateEntity(callbackFunction) {
        let bDate = this.formRefs.fechaNacimiento.current.getCurrentDate();
        let year = bDate.getFullYear();
        let month = String(bDate.getMonth() + 1).padStart(2, '0');
        let day = String(bDate.getDate()).padStart(2, '0');
        let entityData = {
            nombre_completo: this.formRefs.nombreCompleto.current.value,
            dni: this.formRefs.dni.current.value,
            contacto: this.formRefs.contacto.current.value,
            fecha_nacimiento: `${year}/${month}/${day}`
        };
        callbackFunction(entityData);
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        return (
            <Container>
                <h1>Crear nuevo cliente</h1>
                {errorAlert ? errorAlert : null}
                <Form>
                    <Form.Group controlId="client.form.name">
                        <Form.Label>Nombre completo: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.nombreCompleto}
                            type="text"
                            placeholder="Javier Sánchez Sáenz"
                        />
                    </Form.Group>
                    <Form.Group controlId="client.form.dni">
                        <Form.Label>DNI: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.dni}
                            type="text"
                            placeholder="78945612S"
                        />
                    </Form.Group>
                    <Form.Group controlId="client.form.contact">
                        <Form.Label>Contacto: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.contacto}
                            type="text"
                            placeholder="Tfno. Móvil, fijo, email, ..."
                        />
                    </Form.Group>
                    <Form.Group controlId="client.form.birthDate">
                        <Form.Label>Fecha de nacimiento: </Form.Label>
                        <br />
                        <MyDatePicker
                            ref={this.formRefs.fechaNacimiento}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callAPICreateEntity(callbackFunction) }}
                    >Crear cliente
                    </Button>
                </Form>
            </Container>
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

    sortListItems(data) {
        return sortWorkshopsByDateAndTime(data.talleres);
    }
}

class InstructorManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre y apellidos", "DNI", "Contacto"];
        this.formRefs = {
            nombreCompleto: React.createRef(),
            dni: React.createRef(),
            contacto: React.createRef()
        };
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

    callAPICreateEntity(callbackFunction) {
        let entityData = {
            nombre_completo: this.formRefs.nombreCompleto.current.value,
            dni: this.formRefs.dni.current.value,
            contacto: this.formRefs.contacto.current.value
        };
        callbackFunction(entityData);
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        return (
            <Container>
                <h1>Crear nuevo/a monitor/a</h1>
                {errorAlert ? errorAlert : null}
                <Form>
                    <Form.Group controlId="instructor.form.name">
                        <Form.Label>Nombre completo: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.nombreCompleto}
                            type="text"
                            placeholder="Javier Sánchez Sáenz"
                        />
                    </Form.Group>
                    <Form.Group controlId="instructor.form.dni">
                        <Form.Label>DNI: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.dni}
                            type="text"
                            placeholder="78945612S"
                        />
                    </Form.Group>
                    <Form.Group controlId="instructor.form.contact">
                        <Form.Label>Contacto: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.contacto}
                            type="text"
                            placeholder="Tfno. Móvil, fijo, email, ..."
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callAPICreateEntity(callbackFunction) }}
                    >Crear monitor/a
                    </Button>
                </Form>
            </Container>
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
        this.formRefs = {
            descripcion: React.createRef(),
            precio: React.createRef()
        };
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

    callAPICreateEntity(callbackFunction) {
        let entityData = {
            descripcion: this.formRefs.descripcion.current.value,
            precio: parseFloat(this.formRefs.precio.current.value)
        };
        callbackFunction(entityData);
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        return (
            <Container>
                <h1>Crear nuevo material</h1>
                {errorAlert ? errorAlert : null}
                <Form>
                    <Form.Group controlId="material.form.cost">
                        <Form.Label>Precio: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.precio}
                            type="text"
                            placeholder="Precio genérico"
                        />
                    </Form.Group>
                    <Form.Group controlId="material.form.description">
                        <Form.Label>Description: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.descripcion}
                            type="text"
                            placeholder="Arcilla blanca para modelar"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callAPICreateEntity(callbackFunction) }}
                    >Crear material
                    </Button>
                </Form>
            </Container>
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
        this.headers = ["# Actividad", "# Monitor", "Fecha", "Hora inicio", "Hora fin", "Plazas totales", "Pago", "Clientes apuntados"];
        this.formRef = React.createRef();
    }

    processTableEntry(entry, index, checkboxes) {
        const { _id, id_actividad, id_monitor, fecha, hora_inicio, hora_fin, plazas, modo_pago, importe, nombre_actividad, nombre_monitor } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles/talleres/${_id}`}>{index + 1}</Link></td>
                <td><Link to={`/detalles/actividades/${id_actividad}`}>{nombre_actividad}</Link></td>
                <td><Link to={`/detalles/monitores/${id_monitor}`}>{nombre_monitor}</Link></td>
                <td>{fecha}</td>
                <td>{hora_inicio}</td>
                <td>{hora_fin}</td>
                <td>{plazas}</td>
                <td>{importe} {modo_pago}</td>
                <td><Link to={`/detalles/talleres/${_id}`}>Ver clientes apuntados</Link></td>
            </tr>
        );
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        return (
            <Container>
                <h1>Crear nuevo taller</h1>
                {errorAlert ? errorAlert : null}
                <CreateWorkshopForm
                    ref={this.formRef}
                    callbackFunction={callbackFunction}
                />
            </Container>
        );
    }
    processEntityCard(data) {
        const { _id, actividad, monitor, fecha, hora_inicio, hora_fin, plazas, modo_pago, importe, clientes } = data;
        return (
            <Container>
                <Container className="m-0 p-0 row justify-content-between">
                    <Container className="p-0 mx-0 col-9">
                        {super.getEntityCardHeadComponent(`Programa: ${actividad.nombre} (${fecha} ${hora_inicio} - ${hora_fin})`)}
                    </Container>
                    <Container className="mx-0 p-0 col-2 align-self-center d-flex flex-row-reverse">
                        <Link className="btn btn-secondary" to={`/detalles/talleres/asistencia/${_id}`}>Ver asistencia</Link>
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
                    {
                        Array.from(Array(plazas)).map(function (item, index) {
                            return getGraphicSeat(clientes, index);
                        })
                    }
                </Form.Group>
            </Container>
        );
    }

    sortEntries(entries) {
        return sortWorkshopsByDateAndTime(entries);
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

export { getManager, getCollectionName };
