import {React, useEffect, useState} from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Form} from "../../useForm";
import UserService from "../../../services/UserService";

const StepMembers = (props) => {

    const {values,  errors, handleInputChange,useStyles} = props;
    const [members, setMembers] = useState([])
    const classes = useStyles();


    useEffect(() => {
        console.log("StepEvents#useEffect::");
        getMembers();
    }, []);

    const getMembers = () => {
         UserService.getAll().then( response =>{
             setMembers( response.data);
         }).catch (err=> {
             console.log(err);
         }) ;



    }

    return (
        <Paper className={classes.pageContent}>

        <Form>
            <Typography variant="h5" style={{color: "#999", textAlign: "center"}}>
                Select Members
            </Typography>
            <Grid container className={classes.root} alignItems="center" justify="center">
            <Grid item xs={6}>
                    <Controls.Input label="Season Name" name="season_name" value={values.season_name}
                                    onChange={handleInputChange} error={errors.season_name}/>
                    <Controls.SelectMultipleCheckbox
                        name="members"
                        value={values.members}
                        label="Members"
                        color="primary"
                        onChange={handleInputChange}
                        options={members.map(member => (member.user_name))}
                        error={errors.members}

                    >
                    </Controls.SelectMultipleCheckbox>
                </Grid>
            </Grid>
        </Form>
        </Paper>
    )
}
export default StepMembers;
