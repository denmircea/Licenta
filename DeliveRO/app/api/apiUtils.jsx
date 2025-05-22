import axios from 'axios';

const baseApiUrl = 'https://b2a5-86-120-52-229.ngrok-free.app/api';

const axiosInstance = axios.create({
    paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    },
});

axiosInstance.interceptors.response.use((response) => {
    if (!response.body) {
        response.body = response.data;
        response.data = undefined;
    }
    if (response.status) {
        const status = response.status;
        const type = (status / 100) | 0;

        // status / class
        response.statusType = type;

        // basics
        response.info = (1 == type);
        response.ok = (2 == type);
        response.clientError = (4 == type);
        response.serverError = (5 == type);
        response.error = (4 == type) || (5 == type);

        // sugar
        response.accepted = (202 == status);
        response.noContent = (204 == status) || (1223 == status);
        response.badRequest = (400 == status);
        response.unauthorized = (401 == status);
        response.notAcceptable = (406 == status);
        response.notFound = (404 == status);
        response.forbidden = (403 == status);
    }
    return response;
});


const getRequestWithHeaders = async (reqConfig, userContext) => {
    if (userContext) {
        if (userContext.Token) {
            reqConfig.headers = {
                ...reqConfig.headers,
                jwtToken: userContext.Token.toString(),
            };
        }
    }



    return await axiosInstance(reqConfig)
};

export const getCall = async (
    params,
    url,
    userContext,
) => {

    const reqConfig = {
        method: 'get',
        url,
        params,
        headers: {},
    };

    return await getRequestWithHeaders(reqConfig, userContext);
};

export const postCall = async (
    params,
    url,
    userContext,
) => {
    const reqConfig = {
        method: 'post',
        url: baseApiUrl + url,
        data: params,
        headers: {},
    };

    return await getRequestWithHeaders(reqConfig, userContext);
};