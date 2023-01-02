import axios from "axios";

const instance = axios.create({
  baseURL: "https://wp111-finalproject-production.up.railway.app/api",
  headers: { "X-Custom-Header": "foobar" },
});
// baseURL: "https://wp111-finalproject-production.up.railway.app/api",
export default instance;
