import axios from "axios";
import { baseUrl } from "../config/global";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "../interceptors";

export const apiMain = axios.create({
  baseURL: baseUrl
});

apiMain.defaults.withCredentials = true;

apiMain.interceptors.request.use(onRequest, onRequestError);

apiMain.interceptors.response.use(onResponse, onResponseError);
