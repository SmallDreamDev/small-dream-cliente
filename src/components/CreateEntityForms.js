import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

import { MyDatePicker } from "./MyDatePicker.js";
import { AbstractComponent } from "./AbstractComponent.js";

class CreateWorkshopForm extends AbstractComponent {

    constructor(props) {
        super(props);
        this.state = {
            monitores: [],
            actividades: []
        };
        this.formRefs = {
            actividad: React.createRef(),
            monitor: React.createRef(),
            fecha: React.createRef(),
            horaInicioHoras: React.createRef(),
            horaInicioMinutos: React.createRef(),
            horaFinHoras: React.createRef(),
            horaFinMinutos: React.createRef(),
            plazasTotales: React.createRef(),
            modoDepago: React.createRef(),
            importe: React.createRef()
        };
        this.callbackFunction = props.callbackFunction;
        this.loadEntitiesFromServer = this.loadEntitiesFromServer.bind(this);
    }

    componentDidMount() {
        this.loadEntitiesFromServer();
    }

    async loadEntitiesFromServer() {
        let monitores = [];
        let actividades = [];
        // Get monitores
        super.getAPIManager().getEntityList("monitores", function (entityList) {
            entityList.forEach(element => {
                monitores.push(element);
            });
            this.setState({ monitores: monitores });
        }.bind(this));
        // Get actividades
        super.getAPIManager().getEntityList("actividades", function (entityList) {
            entityList.forEach(element => {
                actividades.push(element);
            });
            this.setState({ actividades: actividades });
        }.bind(this));
    }

    getFormFieldsValues() {
        // Get instructor id
        let id_monitor = this.formRefs.monitor.current.value;
        id_monitor = id_monitor.split("-")[1].trim().replace("(", "").replace(")", "");
        // Get activity id
        let id_actividad = this.formRefs.actividad.current.value;
        id_actividad = id_actividad.split("-")[1].trim().replace("(", "").replace(")", "");
        // Get formatted date of the workshop
        let bDate = this.formRefs.fecha.current.getCurrentDate();
        let year = bDate.getFullYear();
        let month = String(bDate.getMonth() + 1).padStart(2, '0');
        let day = String(bDate.getDate()).padStart(2, '0');
        // Create the entity
        let entity = {
            id_monitor: id_monitor,
            id_actividad: id_actividad,
            fecha: `${year}/${month}/${day}`,
            hora_inicio: `${this.formRefs.horaInicioHoras.current.value}:${this.formRefs.horaInicioMinutos.current.value}`,
            hora_fin: `${this.formRefs.horaFinHoras.current.value}:${this.formRefs.horaFinMinutos.current.value}`,
            plazas: parseInt(this.formRefs.plazasTotales.current.value),
            modo_pago: this.formRefs.modoDepago.current.value,
            importe: parseFloat(this.formRefs.importe.current.value)
        };
        console.log(entity);
        return (entity);
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group controlId="workshop.form.instructor">
                        <Form.Label>Seleccionar monitor: </Form.Label>
                        <Form.Control ref={this.formRefs.monitor} as="select">
                            {
                                this.state.monitores.map((monitor) => {
                                    return (
                                        <option key={uuidV4()}>
                                            {`${monitor.nombre_completo} - (${monitor._id})`}
                                        </option>
                                    );
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.activity">
                        <Form.Label>Seleccionar Actividad: </Form.Label>
                        <Form.Control ref={this.formRefs.actividad} as="select">
                            {
                                this.state.actividades.map((actividad) => {
                                    return (
                                        <option key={uuidV4()}>
                                            {`${actividad.nombre} - (${actividad._id})`}
                                        </option>
                                    );
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
                                <Form.Control ref={this.formRefs.horaInicioHoras} as="select">
                                    {
                                        Array.from(Array(24).keys()).map((number) => {
                                            return (
                                                <option key={uuidV4()}>
                                                    {String(number).padStart(2, '0')}
                                                </option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Col>
                                :
                            <Col className="col-2">
                                <Form.Control ref={this.formRefs.horaInicioMinutos} as="select">
                                    {
                                        Array.from(Array(60).keys()).map((number) => {
                                            return (
                                                <option key={uuidV4()}>
                                                    {String(number).padStart(2, '0')}
                                                </option>
                                            );
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
                                <Form.Control ref={this.formRefs.horaFinHoras} as="select">
                                    {
                                        Array.from(Array(24).keys()).map((number) => {
                                            return (
                                                <option key={uuidV4()}>
                                                    {String(number).padStart(2, '0')}
                                                </option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Col>
                                :
                            <Col className="col-2">
                                <Form.Control ref={this.formRefs.horaFinMinutos} as="select">
                                    {
                                        Array.from(Array(60).keys()).map((number) => {
                                            return (
                                                <option key={uuidV4()}>
                                                    {String(number).padStart(2, '0')}
                                                </option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.maxPeople">
                        <Form.Label>Plazas totales: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.plazasTotales}
                            type="text"
                            placeholder="Número de plazas"
                        />
                    </Form.Group>
                    <Form.Group controlId="workshop.form.paymentType">
                        <Form.Label>Modo de pago: </Form.Label>
                        <Form.Control ref={this.formRefs.modoDepago} as="select">
                            <option>€/hora</option>
                            <option>€/cliente</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="workshop.form.amount">
                        <Form.Label>Importe: </Form.Label>
                        <Form.Control
                            ref={this.formRefs.importe}
                            type="text"
                            placeholder="Cantidad"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={() => { this.callbackFunction(this.getFormFieldsValues()) }}
                    >Crear taller
                    </Button>
                </Form>
            </Container>
        );
    }
}

export { CreateWorkshopForm };
