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
        this.componentRefs = props.componentRefs;
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.componentRefs.sidebar.current.toggle();
        this.componentRefs.body.current.toggle();
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
