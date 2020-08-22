import React from "react";
import {
    Navbar,
    Nav,
    Button
} from "react-bootstrap";
import { FiMenu } from "react-icons/fi";

import "./../styles/navbar.css";

class MyNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.sidebarRef = props.sidebarRef;
        this.bodyRef = props.bodyRef;
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.sidebarRef.current.toggle();
        this.bodyRef.current.toggle();
    }

    render() {
        return (
            <Navbar id="myNavbar" fixed="top" expand="fluid" bg="dark" variant="dark">
                <Nav.Item>
                    <Button variant="outline-light" onClick={this.toggleSidebar}>
                        <FiMenu id="menuIcon"></FiMenu>
                        <span id="menuSpan"> Menu</span>
                    </Button>
                </Nav.Item>
            </Navbar>
        );
    }

}

export { MyNavbar };
