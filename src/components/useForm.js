import React, {useState} from "react";
import {makeStyles} from "@material-ui/core";

export const useForm = (initialFieldValues, validateOnChange=false, validate) => {

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    /**
     * Writes changed form control value into the corresponding key of  the user object
     * @param event the event object
     */
    const handleInputChange = event => {
        const {value, name} = event.target;
        console.log("value::", value);
        console.log("name::", name);

        setValues({...values, [name]: value})
        if (validateOnChange){
            validate({[name]:value});
        }
    }

    const resetForm = ()=>{
        setValues(initialFieldValues);
        setErrors({});
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
     }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    }
}))

export const Form = (props) => {
    const classes = useStyles();
    // onSubmit will be inside "other" property
    const {children, ...other}=props;

    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {children}
        </form>
    )
}


