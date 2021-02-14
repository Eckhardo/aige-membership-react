import axios from "axios";

export default axios.create({
// baseURL: "https://kdjl9chpp2.execute-api.eu-central-1.amazonaws.com/dev",
baseURL: "http://localhost:3000/dev",
  headers: {
    "Content-type": "application/json"
  }
});
