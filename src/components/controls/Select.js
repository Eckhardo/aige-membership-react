import React from "react";
import {FormControl, FormHelperText, FormLabel, MenuItem, Select as MuiSelect} from "@material-ui/core";


const Select = props => {

    const {className, name, value, label, onChange, color, error = null, options} = props;

    return (
        <FormControl variant="outlined" className={className}
                        // fill properties error and helperText
                     {...(error && {error: true})}
        >
            <FormLabel >{label}</FormLabel>
            <MuiSelect label={label}
                       name={name}
                       value={value}
                       onChange={onChange}
            >
                <MenuItem value="">None</MenuItem>
                {
                    options.map((option, index) => (
                        <MenuItem color={color} key={index} value={option.id}>{option.title}</MenuItem>
                    ))

                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
export default Select;
