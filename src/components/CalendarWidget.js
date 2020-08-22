import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Container } from 'react-bootstrap';

function CalendarWidget() {
    const [value, onChange] = useState(new Date());

    return (
        <Container className="pt-3 pb-1">
            <Calendar
                onChange={() => { console.log(value); onChange(); }}
                value={value}
            />
        </Container>
    );
}

export { CalendarWidget };
