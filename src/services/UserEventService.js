import http from "./http-common";

const getAll = (year, event_name) => {
    console.log("getAll::", event_name);
    return http.get(`/userEvent/${year}/${event_name}`);
};

const get = (year,event_name, user_name) => {
    return http.get(`/userEvent/${year}/${event_name}/${user_name}`);
};


const getEvents = (year) => {
    return http.get(`/userEvent/${year}`);
};
const create = data => {
    return http.post("/userEvent", {item: data});
};

const update = (data) => {
    return http.put(`/userEvent`, {item: data});
};

const remove = (year, event_name,user_name) => {
    return http.delete(`/userEvent/${year}/${event_name}/${user_name}`);
};

const removeAll = () => {
    return http.delete(`/userEvent`);
};


const SeasonUserService= {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    getEvents

};
export default  SeasonUserService;
