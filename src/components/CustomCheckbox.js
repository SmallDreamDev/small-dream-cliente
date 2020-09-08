import React from "react";
import { Form } from "react-bootstrap";
import { v4 } from "uuid";

class CustomCheckbox extends React.Component {

    constructor(props) {
        super(props);
        this.id = props.id;
        this.ref = React.createRef();
    }

    toggleCheck(value) {
        this.ref.current.checked = value;
    }

    checked() {
        return this.ref.current.checked;
    }

    render() {
        return (
            <Form.Check key={v4()} ref={this.ref} type="checkbox" />
        );
    }

}

export { CustomCheckbox };
