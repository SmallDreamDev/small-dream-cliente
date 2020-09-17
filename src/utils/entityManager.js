import React from "react";
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomCheckbox } from "./../components/CustomCheckbox";
import { v4 } from "uuid";
import DatePicker from "react-date-picker";
import { MyDatePicker } from "../components/MyDatePicker";
import { apiManager } from "./APIManager";

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
        this.formRefs = {
            nombre: React.createRef(),
            zona: React.createRef()
        };
    }

    process(entry, index, checkboxes) {
        const { _id, nombre, zona } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=actividades&id=${_id}`}>{index + 1}</Link></td>
                <td>{nombre}</td>
                <td>{zona}</td>
                <td><Link to={`/detalles?collection=actividades&id=${_id}`}>Ver categorías asociadas</Link></td>
                <td><Link to={`/detalles?collection=actividades&id=${_id}`}>Ver materiales usados</Link></td>
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
}

class CategoryManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["Nombre", "Actividades en esta categoría"];
        this.formRefs = {
            nombre: React.createRef()
        };
    }

    process(entry, index, checkboxes) {
        const { _id, nombre } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=categorias&id=${_id}`}>{index + 1}</Link></td>
                <td>{nombre}</td>
                <td><Link to={`/detalles?collection=categorias&id=${_id}`}>Ver actividades</Link></td>
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

    process(entry, index, checkboxes) {
        const { _id, nombre_completo, dni, contacto, fecha_nacimiento } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=clientes&id=${_id}`}>{index + 1}</Link></td>
                <td>{nombre_completo}</td>
                <td>{dni}</td>
                <td>{contacto}</td>
                <td>{fecha_nacimiento}</td>
                <td><Link to={`/detalles?collection=clientes&id=${_id}`}>Ver actividades</Link></td>
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

    process(entry, index, checkboxes) {
        const { _id, nombre_completo, dni, contacto } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=monitores&id=${_id}`}>{index + 1}</Link></td>
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

    process(entry, index, checkboxes) {
        const { _id, descripcion, precio } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=materiales&id=${_id}`}>{index + 1}</Link></td>
                <td>{descripcion}</td>
                <td>{precio}</td>
                <td><Link to={`/detalles?collection=materiales&id=${_id}`}>Ver actividades</Link></td>
            </tr>
        );
    }

    callAPICreateEntity(callbackFunction) {
        let entityData = {
            descripcion: this.formRefs.descripcion.current.value,
            precio: parseFloat(this.formRefs.precio.current.value)
        };
        console.log(entityData);
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
}

class WorkshopManager extends AbstractManager {
    constructor() {
        super();
        this.headers = ["# Actividad", "# Monitor", "Fecha", "Hora inicio", "Hora fin", "Plazas totales", "Pago", "Clientes apuntados"];
        this.formRefs = {
            actividad: React.createRef(),
            monitor: React.createRef(),
            fecha: React.createRef(),
            horaInicio: React.createRef(),
            horaFin: React.createRef(),
            plazasTotales: React.createRef(),
            modoDepago: React.createRef(),
            importe: React.createRef()
        };
        // combobox activ.
        // combo monit. 
        // input fecha,
        // hora 
        // plazas totales,
        // cbbox modosDePago 
        // importe
    }

    process(entry, index, checkboxes) {
        const { _id, id_actividad, id_monitor, fecha, hora_inicio, hora_fin, plazas, id_modo_pago } = entry;
        return (
            <tr key={v4()}>
                <td>{super.createCheckbox(checkboxes, index)}</td>
                <td><Link id={index} key={v4()} to={`/detalles?collection=talleres&id=${_id}`}>{index + 1}</Link></td>
                <td><Link to={`/detalles?collection=actividades&id=${id_actividad}`}>Ver actividad</Link></td>
                <td><Link to={`/detalles?collection=monitores${id_monitor}`}>Ver monitor</Link></td>
                <td>{fecha}</td>
                <td>{hora_inicio}</td>
                <td>{hora_fin}</td>
                <td>{plazas}</td>
                <td><Link to={`/detalles?collection=modosDePago${id_modo_pago}`}>Ver modo de pago</Link></td>
                <td><Link to={`/detalles?collection=talleres&id=${_id}`}>Ver clientes apuntados</Link></td>
            </tr>
        );
    }

    callAPICreateEntity(callbackFunction) {
        let entityData = {
            id_monitor: "",
            id_actividad: "",
            fecha: "",
            hora_inicio: "",
            hora_fin: "",
            plazas: "",
            modo_pago: "",
            importe: ""
        };
        callbackFunction(entityData);
    }

    processCreateEntityForm(callbackFunction, errorAlert) {
        let monitores, actividades = [];
        // Get monitores
        apiManager.getEntityList("monitores", function (entityList) {
            entityList.forEach(element => {
                monitores.push(element);
            });
        });
        // Get actividades
        apiManager.getEntityList("actividades", function (entityList) {
            entityList.forEach(element => {
                actividades.push(element);
            });
        });
        return (
            <Container>
                <h1>Crear nuevo taller</h1>
                {errorAlert ? errorAlert : null}
                <Form>
                    <Form.Group controlId="workshop.form.instructor">
                        <Form.Label>Seleccionar monitor: </Form.Label>
                        <Form.Control as="select">
                            {
                                monitores.map((monitor) => {
                                    return (<option>{monitor}</option>);
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.activity">
                        <Form.Label>Seleccionar Actividad: </Form.Label>
                        <Form.Control as="select">
                            {
                                actividades.map((monitor) => {
                                    return (<option>{monitor}</option>);
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.date">
                        <Form.Label>Fecha: </Form.Label>
                        <br />
                        <MyDatePicker ref={this.formRefs.fecha} />
                    </Form.Group>
                    <Form.Group controlId="workshop.form.startTime">
                        <Form.Label>Hora inicio: </Form.Label>
                        <Row>
                            <Col className="col-2">
                                <Form.Control as="select">
                                    {
                                        Array.from(Array(24).keys()).map((number) => {
                                            return (<option>{number}</option>);
                                        })
                                    }
                                </Form.Control>
                            </Col>
                                :
                            <Col className="col-2">
                                <Form.Control as="select">
                                    {
                                        Array.from(Array(60).keys()).map((number) => {
                                            return (<option>{number}</option>);
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.endTime">
                        <Form.Label>Hora fin: </Form.Label>
                        <Row>
                            <Col className="col-2">
                                <Form.Control as="select">
                                    {
                                        Array.from(Array(24).keys()).map((number) => {
                                            return (<option>{number}</option>);
                                        })
                                    }
                                </Form.Control>
                            </Col>
                                :
                            <Col className="col-2">
                                <Form.Control as="select">
                                    {
                                        Array.from(Array(60).keys()).map((number) => {
                                            return (<option>{number}</option>);
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.maxPeople">
                        <Form.Label>Plazas totales: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Número de plazas"
                        />
                    </Form.Group>
                    <Form.Group controlId="workshop.form.paymentType">
                        <Form.Label>Modo de pago: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Por hora"
                        />
                    </Form.Group>
                    <Form.Group controlId="workshop.form.amount">
                        <Form.Label>Importe: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Cantidad"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callAPICreateEntity(callbackFunction) }}
                    >Crear taller
                    </Button>
                </Form >
            </Container >
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

export { getManager, getCollectionName };
