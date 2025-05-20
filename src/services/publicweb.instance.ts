import axios from "axios";
import { baseUrlPublicWeb } from "../config/global";
import {
    onRequest,
    onRequestError,
    onResponse,
    onResponseError,
} from "../interceptors";

export const apiPublicWeb = axios.create({
  baseURL: baseUrlPublicWeb
});

apiPublicWeb.defaults.withCredentials = false;

apiPublicWeb.interceptors.request.use(onRequest, onRequestError);
apiPublicWeb.interceptors.response.use(onResponse, onResponseError);