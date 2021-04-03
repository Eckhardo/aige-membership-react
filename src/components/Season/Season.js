import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {CheckBox, CheckBoxOutlineBlank, PeopleOutlined} from "@material-ui/icons";
import {Checkbox, FormControl, FormControlLabel, Grid, makeStyles, Paper, TextField, Toolbar} from "@material-ui/core";
import Control from "../controls/Controls";
import SeasonService from "../../services/SeasonService";
import Notification from "../controls/Notification";
import SeasonUserService from "../../services/SeasonUserService";
import SeasonEventService from "../../services/SeasonEventService";

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>;

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(5)

    },
    formControl: {
        minWidth: 120,
    },
    selectControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }

}))

const Season = () => {

    const classes = useStyles();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [seasons, setSeasons] = useState([]);
    const [season, setSeason] = useState();
    const [seasonUsers, setSeasonUsers] = useState([]);
    const [seasonEvents, setSeasonEvents] = useState([]);

    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
    useEffect(() => {
        console.log("Seasons::useEffect()");
        retrieveSeasonYears();
        retrieveSeason();
        retrieveSeasonUsers();
        retrieveSeasonEvents();

    }, [])
    useEffect(() => {
        console.log("Season::useEffect()");
        retrieveSeason();
        retrieveSeasonUsers();
        retrieveSeasonEvents();

    }, [selectedYear])

    const retrieveSeasonYears = () => {
        SeasonService.getAll().then((response) => {
            let seasons = response.data;
            let myTuple = seasons.map(s => {
                return { id: new Date(s.season_year).getFullYear(), title: new Date(s.season_year).getFullYear()}
            })
            setSeasons(myTuple);
        }).catch(err => {
            setNotify({isOpen: true, message: "Create new Season failed", type: "error"});
        })
    }
    const retrieveSeason = () => {
        SeasonService.get(selectedYear)
            .then((resp) => {
                setSeason(resp.data);
            }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Season failed", type: "error"});
        })
    }

    const retrieveSeasonUsers = () =>{
        SeasonUserService.getAll(selectedYear).then( response =>{
            setSeasonUsers(response.data);
            console.log("Season Users::", response.data);

        }).catch( err =>{
            setNotify({isOpen: true, message: "Retrieve Season Users failed", type: "error"});

        })
    }

    const retrieveSeasonEvents = () =>{
        SeasonEventService.getAll(selectedYear).then( response =>{
            setSeasonEvents(response.data);
            console.log("Season Events::", response.data);

        }).catch( err =>{
            setNotify({isOpen: true, message: "Retrieve Season Events failed", type: "error"});

        })
    }
    /**
     * Writes changed form control value into the corresponding key of  the user object
     * @param event the event object
     */
    const handleInputChange = event => {
        console.log("name::", event.target.name);
        console.log("value::", event.target.value);
        setSelectedYear(event.target.value);

    }
    return (
        <>
            <PageHeader elevation={3} icon={<PeopleOutlined/>} title="Current Season"
                        subTitle={new Date().getFullYear()}/>
            <Paper className={classes.pageContent}>

                <Toolbar>

                    <Control.Select
                        className={classes.formControl}
                        label="Year"
                        name="selectedYear"
                        value={selectedYear}
                        color="primary"
                        onChange={handleInputChange}
                        options={seasons}
                    />


                    <Grid container>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={8}>

                            <TextField

                                id="filled-read-only-input"
                                label="Season Name"
                                value={season && season.season_name}
                                InputProps={{
                                    readOnly: true,
                                }}

                            />
                            <FormControl className={classes.selectControl}>
                                <FormControlLabel
                                    value="start"
                                    control={season && season.is_active === true ?
                                        <Checkbox checkedIcon={checkedIcon} disabled={true} checked={true}/> :
                                        <Checkbox icon={icon}
                                                  disabled={true} checked={false}/>}
                                    label="Is active: "
                                    labelPlacement="start"
                                />
                            </FormControl>
                       </Grid>
                    </Grid>
                </Toolbar>
            </Paper>
            <Notification notify={notify} setNotify={setNotify}/>
        </>
    )
}
export default Season;
