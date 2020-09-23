import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar.js";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";
import { LogIn } from "./views/LoginView";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			token: ""
		};
		this.componentRefs = {
			navbar: React.createRef(),
			sidebar: React.createRef(),
			body: React.createRef(),
			calendarWidget: React.createRef(),
			calendarView: React.createRef()
		};
		this.setTokenOnApp = this.setTokenOnApp.bind(this);
	}

	setTokenOnApp(token) {
		this.setState({ token });
	}

	render() {
		return (
			<Container id="container-root" className="p-0">
				{
					// this.state.token ?
					(<Router>
						<MyNavbar ref={this.componentRefs.navbar} componentRefs={this.componentRefs} />
						<Sidebar ref={this.componentRefs.sidebar} componentRefs={this.componentRefs} />
						<Body ref={this.componentRefs.body} componentRefs={this.componentRefs} />
					</Router>)
					// :
					// (<LogIn tokenHandler={this.setTokenOnApp} />)
				}
			</Container>
		);
	}

}

export default App;
