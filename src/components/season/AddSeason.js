import React, {useState} from "react";
import SeasonService from "../../services/SeasonService";
import SeasonForm from "./SeasonForm";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

const AddSeason = props => {
    const initialState = {
        membership_name: "",
        membership_year: "",
        comments :[],
        is_active: true
    };
    const [season, setSeason] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleInputChange:", value);
        setSeason({...season, [name]: value});
    }
    const saveSeason = () => {
        console.log("season save:", season);
        SeasonService.create(season)
            .then(response => {
                console.log('response:', response);
                setSeason(response.data);
                props.history.push("/seasons");
            })
            .catch((e) => {

                if(e.response.data) {
                    setErrorMessage(e.response.data);
                    console.log('error :', e);
                    console.log('error message data:', e.response.data);
                }
                else {
                    setErrorMessage(e);
                    console.log('error:', e);
                }

            });
    };


    return (
        <div>

            <div className="text-center">
                <h3>Add new Season:</h3>
               <ErrorBoundary> <SeasonForm season={season}
                          handleInputChange={handleInputChange}
                          saveSeason={saveSeason}/></ErrorBoundary>
                {errorMessage ? (<div>{errorMessage}</div>): null
                }
            </div>
        </div>
    )
}

export default AddSeason;
