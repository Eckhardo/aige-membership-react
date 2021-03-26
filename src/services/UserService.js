import http from "./http-common";

const getAll = () => {
  return http.get("/user");
};

const get = userName => {
  console.log('GET username:', userName);
  return http.get(`/user/${userName}`);
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


const UserService= {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};
export default UserService;
