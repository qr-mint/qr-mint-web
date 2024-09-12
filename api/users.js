import { apiClient } from './request';

export const getUser = async () => {
	const res = await apiClient.get('users/me');
	return res.data.data;
};
