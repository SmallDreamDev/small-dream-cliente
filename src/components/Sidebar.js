import React from "react";
import { Link } from "react-router-dom";

import "./../styles/sidebar.css";

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
                <div>Calendar</div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };

}

export { Sidebar };