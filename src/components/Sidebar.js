import React from "react";
import { Link } from "react-router-dom";

import "./../styles/sidebar.css";

class Sidebar extends React.Component {

    constructor(props) {
        super();
        this.props = props;
    }

    render() {
        return (
            <div id="collapsibleSidebar">
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