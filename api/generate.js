import { apiClient } from './request';

export const generate = async (body) => {
	const form = new FormData();
	form.set('text', body.text);
	form.set('image', body.image);
	const res = await apiClient.post('/generate/qrcode', form, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
		responseType: 'blob',
	});
	return res.data;
};
