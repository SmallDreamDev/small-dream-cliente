import React from "react";
import { Container, Alert, ListGroup, Spinner, Form } from "react-bootstrap";
import { AbstractComponent } from "./../components/AbstractComponent";
import { getParams } from "./../utils/urlParser";
import { v4 } from "uuid";

class AttendanceView extends AbstractComponent {
    constructor() {
        super();
        const id = getParams(window.location.href)[3];
        this.state = {
            id,
            workshopData: null,
            attendanceList: [],
            errorMessage: "",
            successUpdateMessage: ""
        };
        this.loadWorkshopData = this.loadWorkshopData.bind(this);
        this.renderDataError = this.renderDataError.bind(this);
        this.displayWorkshopInformation = this.displayWorkshopInformation.bind(this);
        this.buildClientListItem = this.buildClientListItem.bind(this);
        this.handleAttendedSelected = this.handleAttendedSelected.bind(this);
        this.handleNotAttendedSelected = this.handleNotAttendedSelected.bind(this);
    }

    componentDidMount() {
        this.loadWorkshopData();
    }

    handleAttendedSelected(event) {
        let clientId = event.target.name.split("attendanceRadioGroup")[1];
        let attendance = {
            id_taller: this.state.id,
            id_cliente: clientId
        };
        let _this = this;
        super.getAPIManager().createEntity(attendance, "asistencia", function (isCreated) {
            if (isCreated) {
                let attendanceList = [..._this.state.attendanceList, attendance];
                _this.setState({ attendanceList, successUpdateMessage: "Actualizado correctamente - Cambiado a Asistido" });
                _this.renderSuccessAttendanceUpdate();
            } else {
                _this.setState({ errorMessage: "Ha habido un error al actualizar el estado de la asistencia" });
            }
        });
    }

    handleNotAttendedSelected(event) {
        let clientId = event.target.name.split("attendanceRadioGroup")[1];
        let attendance = this.state.attendanceList.filter(function (att) { return att.id_cliente === clientId; })[0];
        let _this = this;
        super.getAPIManager().deleteEntity(attendance._id, "asistencia", function (isDeleted) {
            if (isDeleted) {
                let attendanceList = _this.state.attendanceList.filter(function (att) { return att.id_cliente !== clientId; });
                _this.setState({ attendanceList, successUpdateMessage: "Actualizado correctamente - Cambiado a No asistido"});
                _this.renderSuccessAttendanceUpdate();
            } else {
                _this.setState({ errorMessage: "Ha habido un error al actualizar el estado de la asistencia" });
            }
        });
    }

    buildClientListItem(client) {
        let hasAttended = this.state.attendanceList.filter(function (att) { return att.id_cliente === client._id; }).length > 0;
        return (
            <Container key={v4()} className="d-flex align-items-center p-0">
                <Container className="p-0 col-7">
                    <ListGroup.Item variant="primary" action href={`/detalles/clientes/${client._id}`}>
                        {client.nombre_completo}
                    </ListGroup.Item>
                </Container>
                <Container>
                    <Form.Check onChange={this.handleAttendedSelected} name={`attendanceRadioGroup${client._id}`} inline label="Asistido" type="radio" defaultChecked={hasAttended} />
                    <Form.Check onChange={this.handleNotAttendedSelected} name={`attendanceRadioGroup${client._id}`} inline label="No asistido" type="radio" defaultChecked={!hasAttended} />
                </Container>
            </Container>
        );
    }

    loadWorkshopData() {
        let _this = this;
        let getAttendance = super.getAPIManager().getAttendance;
        super.getAPIManager().getEntityDetails(this.state.id, "talleres", function (data) {
            if (data) {
                getAttendance(_this.state.id, function (attendanceList, errorMessage) {
                    if (!errorMessage) {
                        _this.setState({ workshopData: data, attendanceList });
                    } else {
                        _this.setState({ workshopData: data, errorMessage });
                        _this.renderDataError();
                    }
                });
            } else {
                _this.setState({ errorMessage: "Ha habido un error al cargar la información requerida" });
                _this.renderDataError();
            }
        });
    }

    renderDataError() {
        if (this.state.errorMessage) {
            return (
                <Container className="px-0 pt-2">
                    <Alert variant="danger">
                        {this.state.errorMessage}
                    </Alert>
                </Container>
            );
        }
    }

    renderSuccessAttendanceUpdate() {
        if (this.state.successUpdateMessage) {
            return (
                <Container className="px-0 pt-2">
                    <Alert variant="success">
                        {this.state.successUpdateMessage}
                    </Alert>
                </Container>
            );
        }
    }

    displayWorkshopInformation() {
        const { workshopData } = this.state;
        return `${workshopData.actividad.nombre} (${workshopData.fecha} ${workshopData.hora_inicio}-${workshopData.hora_fin})`;

    }

    render() {
        const { workshopData } = this.state;
        let buildClientListItem = this.buildClientListItem;
        return (
            <Container>
                {
                    workshopData !== null ?
                        (<Container>
                            {this.renderDataError()}
                            {this.renderSuccessAttendanceUpdate()}
                            <h2 className="py-4">{this.displayWorkshopInformation()}</h2>
                            <h5>Clientes:</h5>
                            <ListGroup>
                                {
                                    workshopData.clientes.map(function (c) {
                                        return buildClientListItem(c);
                                    })
                                }
                            </ListGroup>
                        </Container>)
                        :
                        (<Container className="text-center pt-5">
                            <Spinner animation="border" variant="secondary" />
                        </Container>)
                }
            </Container>
        );
    }
}

export { AttendanceView };