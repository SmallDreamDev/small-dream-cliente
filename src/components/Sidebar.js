import React from "react";
import { Nav, Container } from "react-bootstrap";
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
                <Container>
                    <Nav className="flex-column">
                        <Link to="/" className="py-3 my-2 btn btn-secondary">
                            Ver calendario
                        </Link>
                        <Link to="/gestion" className="py-3 my-2 btn btn-secondary">
                            Panel de gestión
                        </Link>
                    </Nav>
                </Container>
            </div >
        );
    }

}

export { Sidebar };