import http from "./http-common";

const getAll = () => {
  return http.get("/membership");
};

const get = (membershipName) => {
  console.log('GET membershipName:', membershipName);
  return http.get(`/membership/${membershipName}`);
};

const create = (data) => {
  console.log('POST membershipName:', data);
  return http.post("/membership", {item: data});
};

const update = (data) => {
  console.log("PUT:", data)
  return http.put(`/membership`, {item: data});
};

const remove = (membership_name) => {
  return http.delete(`/membership/${membership_name}`);
};

const removeAll = () => {
  return http.delete(`/membership`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};
