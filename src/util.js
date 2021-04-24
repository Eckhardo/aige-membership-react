


const extractYears= (seasons) =>{

    return seasons.map(s => {
        return {id: s.season_year, title:s.season_year}
    })

}

const extractEvents= (userEvents) =>{

    return userEvents.map(s => {
        return {id: s.event_name, title:s.event_name}
    })

}

const UtilityService={extractYears, extractEvents};

export default UtilityService;
