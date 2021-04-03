import http from "./http-common";

const getAll = () => {
    console.log('GET seasonALL:');
    return http.get("/season");
};

const getAllWithChildren = (year) => {
    return http.get(`/season/children/${year}`);

}

const get = (seasonName) => {
    console.log('GET seasonName:', seasonName);
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


const SeasonService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    getAllWithChildren
};

export default SeasonService;
