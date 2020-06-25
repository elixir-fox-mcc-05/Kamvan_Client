import axios from "axios";

const server = axios.create({
  baseURL: "https://murmuring-stream-85707.herokuapp.com/",
});

export default server;
