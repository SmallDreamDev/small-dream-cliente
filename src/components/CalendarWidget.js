import React from "react";
import Calendar from "react-calendar";
import { Container } from "react-bootstrap";

import "react-calendar/dist/Calendar.css";

class CalendarWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onClickDay: () => { }
        };
        this.componentRefs = props.componentRefs;
        this.onChange = this.onChange.bind(this);
        this.changeOnClick = this.changeOnClick.bind(this);
    }

    changeOnClick(taskCalendarMounted) {
        if (taskCalendarMounted) {
            this.setState({
                onClickDay: this.onChange
            });
        } else {
            this.setState({
                onClickDay: () => { }
            });
        }
    }

    onChange(value, event) {
        let clickedDate = new Date(value);
        let dateObject = {
            day: clickedDate.getDate(),
            month: clickedDate.getMonth() + 1,
            year: clickedDate.getFullYear(),
        };

        try {
            this.componentRefs.calendarView.current.renderActivitiesOnDate(dateObject);
        } catch (error) {
            // Ignore this error. This catch should never be executed.
        }
    }

    render() {
        return (
            <Container className="pt-3 pb-1">
                <Calendar onClickDay={this.state.onClickDay} />
            </Container>
        );
    }
}

export { CalendarWidget };
