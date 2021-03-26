import React from "react";
import {TextField} from "@material-ui/core";


const Input = (props) => {

    const {name, value, label, onChange,error=null,InputProps} = props;
     return (
        <TextField variant="outlined"
                   label={label}
                   size="small"
                   name={name}
                   value={value}
                   onChange={onChange}
                   InputProps={InputProps}
                   // fill properties error and helperText
                   {...(error && {error:true, helperText:error})}
        />

    )
}

export default Input;
