import axios from "axios";
import { baseUrl } from "../config/global";
import {
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} from "../interceptors";

export const apiLogin = axios.create({
  baseURL: baseUrl
});

apiLogin.defaults.withCredentials = true;

apiLogin.interceptors.request.use(onRequest, onRequestError);
apiLogin.interceptors.response.use(onResponse, onResponseError);
