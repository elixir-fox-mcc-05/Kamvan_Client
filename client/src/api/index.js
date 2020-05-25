import axios from "axios";

const server = axios.create({
  baseURL: "https://stark-thicket-67122.herokuapp.com/"
});

export default server;
