import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./../styles/sidebar.css";
import { CalendarWidget } from "./CalendarWidget";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
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
            <div id="collapsibleSidebar" className={this.state.className}>
                <CalendarWidget />
                <Nav className="flex-column">
                    <Nav.Link>
                        <Link to="/">Ver calendario</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/gestion">Panel de gestión</Link>
                    </Nav.Link>
                </Nav>
            </div >
        );
    }

}

export { Sidebar };