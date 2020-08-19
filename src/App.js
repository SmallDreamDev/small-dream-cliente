import React from "react";
import { NavbarTop as Navbar } from "./components/NavbarTop.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbarStyle.scss';

class App extends React.Component {

	render() {
		return (
			<Navbar />
		);
	}

}

export default App;
