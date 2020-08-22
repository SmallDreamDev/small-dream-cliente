import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import { EntityManagementView } from "./../views/EntityManagementView.js";

import "./../styles/body.css";

class Body extends React.Component {

    constructor() {
        super();
        this.state = {
            className: ""
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if (this.state.className) {
            this.setState({
                className: ""
            });
        } else {
            this.setState({
                className: "active"
            });
        }
    }

    render() {
        return (
            <div
                id="bodyContainer"
                ref={this.body}
                className={this.state.className}
            >
                <Switch>
                    <Route path="/gestion">
                        <EntityManagementView />
                    </Route>
                    {/* <Route path="/">
                        TODO: Add here main calendar view
                    </Route> */}
                </Switch >
            </div>
        );
    }

}

export { Body };
