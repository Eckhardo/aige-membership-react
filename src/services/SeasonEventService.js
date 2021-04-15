import http from "./http-common";

const getAll = (year) => {
    return http.get(`/seasonEvent/${year}`);
};

const get = (year, eventName) => {
    return http.get(`/seasonEvent/${year}/${eventName}`);
};

const create = data => {
    console.log("SeasonEventService::create: ", JSON.stringify(data));
    return http.post("/seasonEvent", {item: data});
};

const update = (data) => {
    return http.put(`/seasonEvent`, {item: data});
};

const remove = (year, event_name) => {
    return http.delete(`/seasonEvent/${year}/${event_name}`);
};

const removeAll = () => {
    return http.delete(`/seasonEvent`);
};


const SeasonEventService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll

};
export default SeasonEventService;
