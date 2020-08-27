import React from "react";
import { apiManager } from "./../utils/APIManager";

class AbstractComponent extends React.Component {

    constructor() {
        super();
        this.apiManager = apiManager;
    }

    getAPIManager(){
        return apiManager;
    }
}

export { AbstractComponent };
