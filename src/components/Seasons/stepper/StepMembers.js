import React, {useEffect, useState} from "react";
import {Grid, Paper} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Form} from "../../useForm";
import UserService from "../../../services/UserService";

const StepMembers = (props) => {

    const {values, errors, handleInputChange, useStyles} = props;
    const [members, setMembers] = useState([])
    const classes = useStyles();

    useEffect(() => {
         getMembers();
    }, []);

    const getMembers = () => {
        UserService.getAll().then(response => {
            setMembers(response.data.map(member => member.user_name));
       }).catch(err => {
            console.log(err);
        });
    }


    return (

            <Form>
                <Grid container className={classes.root} alignItems="center" justify="center">
                    <Grid item xs={6}>
                        <Controls.SelectMultipleChip
                            name="members"
                            value={values.members}
                            label="Possible Members"
                            color="primary"
                            onChange={handleInputChange}
                            options={members}
                            InputProps={{
                                readOnly: true,
                            }}
                            error={errors.members}
                        >
                        </Controls.SelectMultipleChip>
                    </Grid>
                </Grid>
            </Form>

    )
}
export default StepMembers;
