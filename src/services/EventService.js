import http from "./http-common";

const getAll = () => {
    return http.get(`/event`);
};

const get = (SK) => {
    console.log('GET event:',  SK );
    return http.get(`/event/${SK}`);
};

const create = data => {
    console.log('POST event:', data);
    return http.post("/event", {item: data});
};

const update = (data) => {
    console.log("PUT:", data)
    return http.put(`/event`, {item: data});
};

const remove = SK => {
    return http.delete(`/event/${SK}`);
};

const removeAll = () => {
    return http.delete(`/event`);
};


const search = (searchTerm) => {
    console.log('Search event:',  searchTerm );
    return http.get(`/event/search/${searchTerm}`);
};

const EventService= {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    search
};
export default EventService;
