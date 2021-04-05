import http from "./http-common";

const getAll = (year) => {
    return http.get(`/seasonUser/${year}`);
};

const get = (year,userName) => {
     return http.get(`/seasonUser/${year}/${userName}`);
};

const create = data => {
    return http.post("/seasonUser", {item: data});
};

const update = (data) => {
    return http.put(`/seasonUser`, {item: data});
};

const remove = (year, user_name) => {
    return http.delete(`/seasonUser/${year}/${user_name}`);
};

const removeAll = () => {
    return http.delete(`/seasonUser`);
};


const SeasonUserService= {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll

};
export default  SeasonUserService;
