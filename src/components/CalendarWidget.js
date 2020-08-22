import React from 'react';
import Calendar from 'react-calendar';
import { Container } from 'react-bootstrap';

import 'react-calendar/dist/Calendar.css';

class CalendarWidget extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value, event) {
        console.log(value);
    }

    render() {
        return (
            <Container className="pt-3 pb-1">
                <Calendar onClickDay={this.onChange} />
            </Container>
        );
    }
}

export { CalendarWidget };
