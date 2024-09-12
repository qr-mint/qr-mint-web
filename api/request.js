import axios from 'axios';
import { useAuthStore } from '../store/auth';

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
	timeout: 30000,
});

apiClient.interceptors.request.use((config) => {
	const { access_token } = useAuthStore.getState();

	if (access_token) {
		const headers = {
			Authorization: `Bearer ${access_token}`,
		};
		config.headers = headers;
	}
	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (!error.response) {
			// Handle network errors or no response errors
			return Promise.reject(error);
		} else if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const { refreshToken, disconnect, access_token } =
				useAuthStore.getState();
			try {
				await refreshToken();

				if (access_token) {
					const headers = {
						Authorization: `Bearer ${access_token}`,
					};
					originalRequest.headers = headers;
				}
				return apiClient(originalRequest);
			} catch (err) {
				await disconnect();
				return Promise.resolve(err.response);
			}
		} else if (error.response.status === 406) {
			const { disconnect } = useAuthStore.getState();
			await disconnect();
			return Promise.resolve(error.response);
		} else {
			return Promise.reject(error);
		}
	},
);
