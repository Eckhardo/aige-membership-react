import React from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


//To indicate that instead you want a single expression that happens to be an object,
// you wrap the object with parentheses
const convertToDefEventParam = (name, value) => ({
    target: {
        name,
        value
    }
});

const DatePicker = props => {
    const {color, name, label, value, onChange} = props;

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar inputVariant="outlined" label={label}
                                okLabel="OK"
                                format="dd/MMM/yyyy"
                                name={name}
                                value={value}
                                color={color}
                                onChange={date => onChange(convertToDefEventParam(name, date))}>

            </KeyboardDatePicker>
        </MuiPickersUtilsProvider>
    )

}

export default DatePicker;
