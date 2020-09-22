import React from "react";
import { apiManager } from "./../utils/APIManager";

class AbstractComponent extends React.Component {

    constructor() {
        super();
        this.apiManager = apiManager;
        this.getAPIManager = this.getAPIManager.bind(this);
    }

    getAPIManager() {
        return apiManager;
    }

}

export { AbstractComponent };
