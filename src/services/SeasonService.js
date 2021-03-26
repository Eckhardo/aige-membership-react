import http from "./http-common";

const getAll = () => {
  console.log('GET seasonALL:');
  return http.get("/season");
};

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

const remove = (season_name) => {
  return http.delete(`/season/${season_name}`);
};

const removeAll = () => {
  return http.delete(`/season`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};
