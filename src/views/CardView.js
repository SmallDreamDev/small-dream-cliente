import React from "react";
import { Container, Alert } from "react-bootstrap";
import { AbstractComponent } from "./../components/AbstractComponent";
import { getParams } from "./../utils/urlParser";
import { getManager } from "./../utils/entityManager";

class CardView extends AbstractComponent {
    constructor() {
        super();
        const collection = getParams(window.location.href)[1];
        const id = getParams(window.location.href)[2];
        this.state = {
            collection: collection,
            id: id,
            entityData: null,
            dataErrorMessage: ""
        };
        this.loadEntityData = this.loadEntityData.bind(this);
        this.renderDataError = this.renderDataError.bind(this);
        this.showEntityCard = this.showEntityCard.bind(this);
        this.editHandler = this.editHandler.bind(this);
    }

    componentDidMount(){
        this.manager = getManager(this.state.collection);
        this.loadEntityData();
    }

    editHandler(event){
        console.log(event.target.id);
    }

    showEntityCard(data){
        if(data){
            return this.manager.processEntityCard(data, this.editHandler);
        }
    }

    loadEntityData() {
        let _this = this;
        super.getAPIManager().getEntityDetails(this.state.id, this.state.collection, function (data) {
            if (data) {
                _this.setState({ entityData: data });
            } else {
                _this.setState({ dataErrorMessage: "Ha habido un error al cargar la ficha" });
                _this.renderDataError();
            }
        });
    }

    renderDataError() {
        if (this.state.dataErrorMessage) {
            return (
                <Alert variant="danger">
                    {this.state.dataErrorMessage}
                </Alert>
            );
        }
    }

    render() {
        const { entityData } = this.state;
        return (
            <Container>
                <Container>
                    {this.renderDataError()}
                </Container>
                {this.showEntityCard(entityData)}
            </Container>
        );
    }
}

export { CardView };
