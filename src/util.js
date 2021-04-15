


const extractYears= (seasons) =>{

    let years= seasons.map(s => {
        return {id: new Date(s.season_date).getFullYear(), title: new Date(s.season_date).getFullYear()}
    })
    console.log("the years array::", JSON.stringify(years))
    return years;
}

const UtilityService={extractYears};

export default UtilityService;
