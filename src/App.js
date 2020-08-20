import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";
import { MyNavbar } from "./components/MyNavbar.js";
import { Sidebar } from "./components/Sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

class App extends React.Component {

	render() {
		return (
			<Router>
				<MyNavbar />
				<Sidebar />
				<div id="bodyContainer">
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
			</Router>
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


export default App;
