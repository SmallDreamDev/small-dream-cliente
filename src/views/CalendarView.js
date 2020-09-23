import React from "react";
import { Container } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import "./../styles/calendarView.css";

class CalendarView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateObject: {}
        };
        this.componentRefs = props.componentRefs;
        this.zoneHeaders = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
        this.times = [10, 21];
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.renderActivitiesOnDate = this.renderActivitiesOnDate.bind(this);
        this.generateTimestamps = this.generateTimestamps.bind(this);
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

    generateTimestamps() {
        let timeStrings = [];
        for (let i = this.times[0]; i <= this.times[1]; i++) {
            timeStrings.push(`${i}:00`);
        }
        return timeStrings;
    }

    render() {
        return (
            <Container id="container-main" className="p-0 ml-0">
                <Container className="p-0" id="container-times">
                    {
                        this.generateTimestamps().map(function (timestamp) {
                            return (
                                <Container className="p-0" key={uuidv4()}>
                                    <span>{timestamp}</span>
                                </Container>
                            );
                        })
                    }
                </Container>
                <Container className="p-0" id="container-zones">
                    {
                        this.zoneHeaders.map(function (header) {
                            return (
                                <Container className="p-0 zone-column" key={uuidv4()}>
                                </Container>
                            );
                        })
                    }
                </Container>
            </Container >
        );
    }
}

export { CalendarView };
