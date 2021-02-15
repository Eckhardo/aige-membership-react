import http from "./http-common";

const getAll = () => {
    return http.get(`/event`);
};

const get = (name) => {
    console.log('GET event:',  name );
    return http.get(`/event/${name}`);
};

const create = data => {
    console.log('POST event:', data);
    return http.post("/event", {item: data});
};

const update = (data) => {
    console.log("PUT:", data)
    return http.put(`/event`, {item: data});
};

const remove = event_name => {
    return http.delete(`/event/${event_name}`);
};

const removeAll = () => {
    return http.delete(`/event`);
};


export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll
};
