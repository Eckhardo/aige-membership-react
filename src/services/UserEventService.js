import http from "./http-common";

const getAll = (year, event_name) => {
     return http.get(`/userEvent/${year}/${event_name}`);
};

const get = (year,event_name, user_name) => {
    return http.get(`/userEvent/${year}/${event_name}/${user_name}`);
};

const getUsers = (year) => {
    return http.get(`/userEvent/user/${year}`);
};

const getEvents = (year) => {
    return http.get(`/userEvent/event/${year}`);
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

const assembleUsers = (year,user_name) =>{
    return http.get(`/assembleUser/${year}/${user_name}`);
}


const assembleEvents = (year,event_name) =>{
    console.log("assembleEvents::", event_name);
    return http.get(`/assembleEvent/${year}/${event_name}`);
}

const SeasonUserService= {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    getEvents,
    getUsers,
    assembleUsers,
    assembleEvents

};
export default  SeasonUserService;
