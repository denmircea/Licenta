import axios from 'axios';
import { constants } from '../constants/constants';
import { selectAuth } from '../store/authReducer';
import { store } from '../store/store';


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
        url: constants.BASEAPIURL + url,
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
        url: constants.BASEAPIURL + url,
        data: params,
        headers: {},
    };

    return await getRequestWithHeaders(reqConfig, token);
};