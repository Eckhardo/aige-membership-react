import React from "react";
import {
    Chip,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    makeStyles,
    MenuItem,
    Select as MuiSelect,
    useTheme
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }
}));

function getStyles(item, items, theme) {
    return {
        fontWeight:
            items.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const SelectMultipleChip = props => {

    const {name, value, label, onChange, color, error = null, options} = props;

    const classes = useStyles();
    const theme = useTheme();


    console.log("options::", JSON.stringify(options));
    return (

        <FormControl className={classes.formControl}
            // fill properties error and helperText
                     {...(error && {error: true})}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                multiple
                input={<Input/>}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip}/>
                        ))}
                    </div>
                )}
                MenuProps={MenuProps}
                name={name}
                value={value}
                onChange={onChange}
                color={color}

            >
                {options.map((option) => (
                    <MenuItem key={option} value={option} style={getStyles(option, value, theme)}>
                        {option}
                    </MenuItem>
                ))}
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>

    )
}
export default SelectMultipleChip;
