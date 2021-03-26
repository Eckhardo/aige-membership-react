import React, {useEffect, useState} from "react";

import {PeopleOutlined} from "@material-ui/icons";
import {Button, makeStyles, Step, StepLabel, Stepper, Typography} from '@material-ui/core';
import PageHeader from "../PageHeader";
import StepBaseData from "./stepper/StepBaseData";
import StepEvents from "./stepper/StepEvents";
import StepMembers from "./stepper/StepMembers";
import {useForm} from "../useForm";
import StepSubmit from "./stepper/StepSubmit";
import SeasonService from "../../services/SeasonService";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const useStylesSteps = makeStyles(theme => (
    {
        root: {
            margin: theme.spacing(1),
            padding: theme.spacing(5),
            borderStyle: 'solid',
            borderWidth: '1px'
        },
        pageContent: {
            margin: theme.spacing(1),
            padding: theme.spacing(5)
        }
    }
));

const initialSeasonState = {

    PK: "",
    SK: "",
    season_year: new Date(),
    season_name: "",
    is_active: true,
    members: [],
    events: []

};


const SeasonStepsForm = props => {
    const {addOrEdit, recordForEdit} = props;
    /**
     *
     */
    useEffect(() => {
        console.log("SeasonStepsForm#useEffect::");
        if (recordForEdit != null) {
            setValues({...recordForEdit});
        }
    }, [recordForEdit])

    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('season_name' in fieldValues) {
            temp.season_name = fieldValues.season_name ? "" : "This field is required";
        }
        if ('season_year' in fieldValues) {
            temp.season_year = fieldValues.season_year ? "" : "This field is required";
        }

        setErrors({
            ...temp
        });
        if (fieldValues === values) {
            return Object.values(temp).every(val => val === "");
        }
    }


    // Build Form from template
    const {values, setValues, errors, setErrors, handleInputChange, resetForm}
        = useForm(initialSeasonState, true, validate);


    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const classes = useStyles();


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    /**
     *
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Is valid");
            addOrEdit(values, resetForm)
        }
        ;
    }


    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function getSteps() {
        return ['Base Data', 'Select members', 'Select events', 'Submit'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <StepBaseData
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    handleInputChange={handleInputChange}
                    resetForm={resetForm}
                    validate={validate}
                    useStyles={useStylesSteps}/>;
            case 1:
                return <StepMembers
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    handleInputChange={handleInputChange}
                    resetForm={resetForm}
                    validate={validate} useStyles={useStylesSteps}/>;

            case 2:
                return <StepEvents
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    handleInputChange={handleInputChange}
                    resetForm={resetForm}
                    validate={validate} useStyles={useStylesSteps}/>;


            case 3:
                return <StepSubmit
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                    validate={validate} useStyles={useStylesSteps}/>;


            default:
                return 'Unknown stepIndex';
        }
    }


    return (
        <div>
            <PageHeader
                title="SeasonStepsForm list"
                subTitle="AIGE SeasonStepsForm"
                icon={<PeopleOutlined/>}/>

            <div className={classes.root}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )

}

export default SeasonStepsForm;
