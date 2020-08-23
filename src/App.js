import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar.js";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {

	constructor(props) {
		super(props);
		this.componentRefs = {
			navbar: React.createRef(),
			sidebar: React.createRef(),
			body: React.createRef(),
			calendarWidget: React.createRef(),
			calendarView: React.createRef()
		};
	}

	render() {
		return (
			<Router>
				<MyNavbar
					ref={this.componentRefs.navbar}
					componentRefs={this.componentRefs}
				/>
				<Sidebar
					ref={this.componentRefs.sidebar}
					componentRefs={this.componentRefs}
				/>
				<Body
					ref={this.componentRefs.body}
					componentRefs={this.componentRefs}
				/>
			</Router>
		);
	}

}

export default App;
