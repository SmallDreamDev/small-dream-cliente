import React from "react";
import DatePicker from "react-date-picker";

class MyDatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: new Date()
        };
        this.internalRef = React.createRef();
        this.manageDateChange = this.manageDateChange.bind(this);
    }

    manageDateChange(newValue) {
        this.setState({
            value: newValue
        });
    }

    getCurrentDate() {
        return this.state.value;
    }

    render() {
        return (
            <DatePicker
                value={this.state.value}
                onChange={this.manageDateChange}
                minDate={new Date("1900-01-01T00:14:44.000Z")}
                ref={this.internalRef}
            />
        );
    }
}

export { MyDatePicker };
