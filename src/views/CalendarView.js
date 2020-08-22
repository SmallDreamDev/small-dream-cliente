import React from "react";
import { Container } from "react-bootstrap";

class CalendarView extends React.Component {

    constructor(props) {
        super(props);
        this.sidebarRef = props.sidebarRef;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
    }

    componentDidMount() {
        this.sidebarRef.current.changeCalendarWidgetOnClick(true);
    }

    componentWillUnmount() {
        this.sidebarRef.current.changeCalendarWidgetOnClick(false);
    }

    render() {
        return (
            <Container>
                <h1>Test</h1>
            </Container>
        );
    }
}

export { CalendarView };
