import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
// import { EntityManagementView } from "./../views/EntityManagementView.js";
import { CalendarView } from "./../views/CalendarView.js";

import "./../styles/body.css";

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            className: ""
        };
        this.sidebarRef = props.sidebarRef;
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
                        {/* <EntityManagementView /> */}
                    </Route>
                    <Route path="/">
                        <CalendarView
                            sidebarRef={this.sidebarRef}
                        />
                    </Route>
                </Switch >
            </div>
        );
    }

}

export { Body };
