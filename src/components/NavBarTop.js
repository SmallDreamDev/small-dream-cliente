import React, { useState } from "react";
import {
    Navbar,
    Nav,
    Button,
    Collapse
} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Sidebar } from "./Sidebar";

function NavbarTop() {
    const [open, setOpen] = useState(false);
    return (
        <Router>
            <Navbar
                fixed="top"
                expand="fluid"
                bg="dark"
                variant="dark"
                style={{ height: "60px" }}
            >
                <Nav.Item>
                    <Button
                        variant="outline-light"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        <FiMenu style={{ fontSize: "25px" }}></FiMenu>
                        <span style={{ verticalAlign: "middle" }}> Menu</span>
                    </Button>
                </Nav.Item>
            </Navbar>
            <Collapse
                in={!open}
                dimension="width" // Debemos crear nuestra propia función de redimensión
            >
                <Sidebar />
            </Collapse>
            <div
                style={{
                    marginTop: "60px",
                    marginLeft: "20%"
                }}
            >
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch >
            </div >
        </Router >
    );

}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export { NavbarTop };