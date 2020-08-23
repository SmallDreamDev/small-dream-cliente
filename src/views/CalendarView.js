import React from "react";
import { Container } from "react-bootstrap";

class CalendarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateObject: {}
        };
        this.componentRefs = props.componentRefs;
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.renderActivitiesOnDate = this.renderActivitiesOnDate.bind(this);
    }

    componentDidMount() {
        this.componentRefs.calendarWidget.current.changeOnClick(true);
    }

    componentWillUnmount() {
        this.componentRefs.calendarWidget.current.changeOnClick(false);
    }

    renderActivitiesOnDate(dateObject) {
        // TODO: Ask for activities or w/e we need to display on such date
        // Store them inside the state with setState and let the magic happen
        this.setState({ dateObject });
    }

    render() {
        return (
            <Container>
                <h1>Test</h1>
                <p>{this.state.dateObject.day}</p>
                <p>{this.state.dateObject.month}</p>
                <p>{this.state.dateObject.year}</p>
            </Container>
        );
    }
}

export { CalendarView };
