import React from "react";
import {
    Navbar,
    Nav,
    Button
} from "react-bootstrap";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AsideBar } from "./AsideBar";

class NavbarTop extends React.Component {

    render() {
        return (
            <Router>
                <Navbar sticky="top" expand="fluid" bg="dark" variant="dark">
                    <Nav.Item>
                        <Button variant="outline-light">
                            <FiMenu style={{ fontSize: "25px" }}></FiMenu>
                            <span style={{ verticalAlign: "middle" }}> Menu</span>
                        </Button>
                    </Nav.Item>
                </Navbar>
                <nav
                    style={{
                        position: "fixed",
                        width: "20%",
                        height: "100%",
                        background: "gray"
                    }}
                ></nav>
            </Router>
        );
    }

}

export { NavbarTop };