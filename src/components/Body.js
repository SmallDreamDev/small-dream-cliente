import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import { EntityManagementView } from "./../views/EntityManagementView.js";
import { CalendarView } from "./../views/CalendarView.js";
import { CardView } from "./../views/CardView.js";
import { AttendanceView } from "./../views/AttendanceView";

import "./../styles/body.css";

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            className: ""
        };
        this.componentRefs = props.componentRefs;
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
                ref={this.componentRefs.body}
                className={this.state.className}
            >
                <Switch>
                    <Route path="/gestion">
                        <EntityManagementView />
                    </Route>
                    <Route path="/detalles/talleres/asistencia/:id">
                        <AttendanceView/>
                    </Route>
                    <Route path="/detalles/:coleccion/:id">
                        <CardView/>
                    </Route>            
                    <Route path="/">
                        <CalendarView
                            ref={this.componentRefs.calendarView}
                            componentRefs={this.componentRefs}
                        />
                    </Route>
                </Switch >
            </div>
        );
    }

}

export { Body };
