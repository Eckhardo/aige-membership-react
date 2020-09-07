import axios from "axios";

export default axios.create({
  baseURL: "https://d3qfc54q37.execute-api.eu-central-1.amazonaws.com/dev",
  headers: {
    "Content-type": "application/json"
  }
});
