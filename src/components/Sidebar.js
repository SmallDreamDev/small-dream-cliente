import React from "react";
import { Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./../styles/sidebar.css";
import { CalendarWidget } from "./CalendarWidget";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.bodyRef = props.bodyRef;
        this.state = {
            className: ""
        };
        this.calendarWidget = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.changeMount = this.changeMount.bind(this);
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

    changeMount(url) {
        this.calendarWidget.current.changeOnClick(url);
    }

    render() {
        return (
            <div id="collapsibleSidebar" className={this.state.className}>
                <CalendarWidget
                    bodyRef={this.bodyRef}
                    ref={this.calendarWidget}
                />
                <Container>
                    <Nav className="flex-column">
                        <Link
                            to="/"
                            className="py-3 my-2 btn btn-secondary"
                            onClick={() => { this.changeMount("") }}
                        >
                            Ver calendario
                        </Link>
                        <Link
                            to="/gestion"
                            className="py-3 my-2 btn btn-secondary"
                            onClick={() => { this.changeMount("gestion") }}
                        >
                            Panel de gestión
                        </Link>
                    </Nav>
                </Container>
            </div >
        );
    }

}

export { Sidebar };