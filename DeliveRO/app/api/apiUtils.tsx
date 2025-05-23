import axios from 'axios';
import { selectAuth } from '../store/authReducer';
import { store } from '../store/store';

const baseApiUrl = 'https://c092-86-120-52-229.ngrok-free.app/api';

const axiosInstance = axios.create({

});


const getRequestWithHeaders = async (reqConfig: any, token = null) => {
    if (token) {
        reqConfig.headers = {
            ...reqConfig.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    reqConfig.headers = {
        ...reqConfig.headers,
        "ngrok-skip-browser-warning": "69420"
    }
    return await axiosInstance(reqConfig)
};

export const getCall = async (
    params,
    url,
) => {
    const state = store.getState();
    const auth = selectAuth(state);
    const token = auth?.token || null;
    const reqConfig = {
        method: 'get',
        url: baseApiUrl + url,
        params,
        headers: {},
    };

    return await getRequestWithHeaders(reqConfig, token);
};

export const postCall = async (
    params,
    url,
) => {
    const state = store.getState();
    const auth = selectAuth(state);
    const token = auth?.token || null;
    const reqConfig = {
        method: 'post',
        url: baseApiUrl + url,
        data: params,
        headers: {},
    };

    return await getRequestWithHeaders(reqConfig, token);
};