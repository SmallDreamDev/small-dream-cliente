import React from 'react';
import Calendar from 'react-calendar';
import { Container } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

class CalendarWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onClickDay: this.onChange
        };
        this.onChange = this.onChange.bind(this);
        this.changeOnClick = this.changeOnClick.bind(this);
    }

    changeOnClick(taskCalendarMounted) {
        console.log(taskCalendarMounted);
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
        console.log(value);
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
