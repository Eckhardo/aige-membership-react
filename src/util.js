


const extractYears= (seasons) =>{

    return seasons.map(s => {
        return {id: s.season_year, title:s.season_year}
    })

}

const UtilityService={extractYears};

export default UtilityService;
