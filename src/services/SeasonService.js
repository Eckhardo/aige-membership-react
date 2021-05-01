import http from "./http-common";
import UtilityService from "../util";

const getAll = () => {
    return http.get("/season");
};

const getAllWithChildren = (year) => {
    return http.get(`/season/children/${year}`);

}

const get = (seasonName) => {
     return http.get(`/season/${seasonName}`);
};

const create = (data) => {
    console.log('POST seasonName:', data);
    return http.post("/season", {item: data});
};

const update = (data) => {
    console.log("PUT:", data)
    return http.put(`/season`, {item: data});
};

const remove = (season_year) => {
    return http.delete(`/season/${season_year}`);
};

const removeAll = () => {
    return http.delete(`/season`);
};

const getSeasonYears =  () => {

    const fetchYears = async api => {
        let response = await getAll();
        return UtilityService.extractYears(response.data);
    };

    fetchYears().then( (response =>{
        return response;
    })).catch( (err) =>{
        console.log(err);
    });


}

const SeasonService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    getAllWithChildren,
    getSeasonYears
};

export default SeasonService;
