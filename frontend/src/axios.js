import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:80/api",
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
