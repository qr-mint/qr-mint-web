import { apiClient } from './request';

export const getCollections = async () => {
	const res = await apiClient.get('nft/collections');
	return res.data.data;
};

export const getAttributes = async (text) => {
	const res = await apiClient.get(`nft/attributes?text=${encodeURI(text)}`);
	return res.data.data;
};

export const mint = async (data) => {
	const form = new FormData();
	form.set('image', data.image);
	form.set('info', data.info);
	form.set('attributes', JSON.stringify(data.attributes));
	const res = await apiClient.post('nft/mint', form, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return res.data.data;
};

export const getQrNfts = async (limit, offset, chain, tags) => {
	const res = await apiClient.get(`nft?limit=${limit}&offset=${offset}&chain=${chain}&${tags && tags?.length ? `tags=${tags}` : ''}`);
	return res.data.data;
};


export const getCollection = async () => {
	const res = await apiClient.get('nft/collection');
	return res.data.data;
};
