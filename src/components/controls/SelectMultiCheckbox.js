import React from "react";
import {
    Checkbox,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    ListItemText,
    MenuItem,
    Select as MuiSelect
} from "@material-ui/core";


const SelectMultipleCheckbox = props => {

    const {name, value, label, onChange, color, error = null, options} = props;


    console.log("OPTIONS::",JSON.stringify(options));
    return (
        <FormControl variant="outlined"
            // fill properties error and helperText
                     {...(error && {error: true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                multiple
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                label={label}
                name={name}
                value={value}
                onChange={onChange}

            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map((option, index) => (
                        <MenuItem color={color} key={index} value={option}>
                            <Checkbox checked={value.indexOf(option) > -1} />
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))

                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
export default SelectMultipleCheckbox;
