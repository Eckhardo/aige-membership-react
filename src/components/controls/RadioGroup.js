import React from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as MuiRadioGroup} from "@material-ui/core";


const RadioGroup = props => {

    const {color,name, value, label, onChange, items} = props;
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup aria-label={name} row
                        name={name}
                        value={value}
                        onChange={onChange}>

                {
                    items.map((item, index) => (
                        <FormControlLabel  key={index} value={item.id} control={<Radio color={color}/>} label={item.label}/>)
                    )
                }


            </MuiRadioGroup>
        </FormControl>

    )
}

export default RadioGroup;
