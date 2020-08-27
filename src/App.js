import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar.js";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";
import { LogIn } from "./views/LogIn";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			token : ""
		}
		this.sidebar = React.createRef();
		this.body = React.createRef();
		this.setTokenOnApp = this.setTokenOnApp.bind(this);
	}

	setTokenOnApp(token){
		this.setState({ token : token });
	}

	render() {
		const { token } = this.state;
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
					(<LogIn tokenHandler={this.setTokenOnApp}/>) 
				}
			</Container>
		);
	}

}

export default App;
