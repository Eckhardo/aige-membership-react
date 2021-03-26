import React from "react";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';


//To indicate that instead you want a single expression that happens to be an object,
// you wrap the object with parentheses
const convertToDefEventParam = (name, value) => ({
    target: {
        name,
        value
    }
});
const YearPicker = props => {
    const {color, name, label, value, onChange} = props;


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker variant="outlined" label={label}
                        okLabel="OK"
                        name={name}
                        value={value}
                        format="yyyy"
                        color={color}
                        openTo="year"
                        views={["year"]}
                        helperText="Select year"
                        onChange={date => onChange(convertToDefEventParam(name, date))}>

            </DatePicker>
        </MuiPickersUtilsProvider>
    )

}

export default YearPicker;
