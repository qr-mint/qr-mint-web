import { apiClient } from './request';
import { getQueryParams } from '../utils/getQueryParams';

export const connect = async (body) => {
	const code = getQueryParams('code');
	const res = await apiClient.post('/auth/connect', body, {
		params: code ? { code } : {},
	});
	return res.data.data;
};

export const refreshToken = async () => {
	const res = await apiClient.post('/auth/refresh');
	return res.data.data;
};

export const logout = async () => {
	const res = await apiClient.get('/auth/logout');
	return res.data.data;
};

export const generatePayload = async () => {
	const res = await apiClient.post('/auth/generate_payload');
	return res.data.data;
};
