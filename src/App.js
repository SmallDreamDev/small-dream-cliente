import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar.js";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {

	constructor() {
		super();
		this.sidebar = React.createRef();
		this.body = React.createRef();
	}

	render() {
		return (
			<Router>
				<MyNavbar
					sidebarRef={this.sidebar}
					bodyRef={this.body}
				/>
				<Sidebar
					ref={this.sidebar}
					bodyRef={this.body}
				/>
				<Body
					ref={this.body}
				/>
			</Router>
		);
	}

}

export default App;
