import React from "react";
import {Checkbox as MuiCheckbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@material-ui/core";


//To indicate that instead you want a single expression that happens to be an object,
// you wrap the object with parentheses
const convertToDefEventParam = (name, value) => ( {
    target: {
        name,
        value
    }
});

const Checkbox = props => {
    const {color, name, checked, label, onChange, InputProps, disabled=false} = props;
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    disabled={disabled}
                    control={<MuiCheckbox color={color} checked={checked}
                                          InputProps={InputProps}
                                          onChange={e => onChange(convertToDefEventParam(name, e.target.checked))}
                                          name={name}/>}

                />
            </FormGroup>
        </FormControl>
    )

}

export default Checkbox;
