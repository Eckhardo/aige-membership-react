import http from "./http-common";

const getAll = () => {
    return http.get("/user");
};

const get = userName => {
    console.log('GET username:', userName);
    return http.get(`/user/${userName}`);
};

const search = (searchTerm) => {
    console.log('Search user:', searchTerm);
    return http.get(`/user/search/${searchTerm}`);
};
const create = data => {
    console.log('POST username:', data);
    return http.post("/user", {item: data});
};

const update = (data) => {
    console.log("PUT:", data)
    return http.put(`/user`, {item: data});
};

const remove = user_name => {
    return http.delete(`/user/${user_name}`);
};

const removeAll = () => {
    return http.delete(`/user`);
};
const checkLogin = (data) => {
    console.log('POST login:', data);
    return http.post("/user/login", {item: data});
};

const UserService = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    search,
    checkLogin
};
export default UserService;
