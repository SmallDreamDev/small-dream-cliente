import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar.js";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";
import { LogIn } from "./views/LogIn";
import { AbstractComponent } from "./components/AbstractComponent";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends AbstractComponent {

	constructor() {
		super();
		this.state = {
			token : super.getAPIManager().getToken()
		}
		this.sidebar = React.createRef();
		this.body = React.createRef();
	}

	render() {
		const { token } = this.state;
		console.log( token );
		return (
			<Container>
				{ 
					token  ? 
					(<Router>
						<MyNavbar sidebarRef={this.sidebar} bodyRef={this.body} />
						<Sidebar ref={this.sidebar} />
						<Body ref={this.body} />
					</Router>) 
					: 
					(<LogIn/>) 
				}
			</Container>
		);
	}

}

export default App;
