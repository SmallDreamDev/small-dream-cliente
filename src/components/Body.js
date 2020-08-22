import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

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
            </div>
        );
    }

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


export { Body };
