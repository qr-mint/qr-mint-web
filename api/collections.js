import { apiClient } from './request';

export const addCollection = async (data) => {
	const newMessage = new FormData();
	newMessage.append('name', data.name);
	newMessage.append('description', data.description);
	newMessage.append('logo', data.logo);
	newMessage.append('cover', data.cover);
	newMessage.append('links', JSON.stringify(data.links));
	newMessage.append('mint_price', data.mint_price);
	newMessage.append('mint_type', data.mint_type);
	newMessage.append('royalty_fee', data.royalty_fee);
	newMessage.append('archive', data.archive);
	newMessage.append('telegram_contact_url', data.telegram_contact_url);
	newMessage.append('dynamic_address', data.dynamic_address);
	const ended_at = new Date(`${data.end_date}T${data.end_time}`).toISOString();
	newMessage.append('ended_at', ended_at);
	const started_at = new Date(`${data.start_date}T${data.start_time}`).toISOString();
	newMessage.append('started_at', started_at);
	data.nfts.forEach((nft) => {
		newMessage.append('nfts', nft);
	});

	const res = await apiClient.post('/collections', newMessage, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return res.data;
};


export const getCollection = async (key) => {
	const res = await apiClient.get(`/collections/${key}`);
	return res.data.data;
};

export const get = async () => {
	const res = await apiClient.get(`/collections${location.search}`);
	return res.data.data;
};

export const mint = async (key) => {
	const res = await apiClient.post(`/collections/${key}/mint`);
	return res.data;
};

export const qrcode = async (key, qrArt) => {
	const res = await apiClient.post(`/collections/${key}/qrcode`, { qrArt }, {
		responseType: 'blob',
	});
	return res.data;
};

export const prepareFolder = async (key) => {
	const res = await apiClient.post(`/collections/moderation/${key}/prepare-folder${location.search}`);
	return res.data;
};


export const changeOwner = async (key) => {
	const res = await apiClient.post(`/collections/moderation/${key}/change-owner${location.search}`);
	return res.data;
};

export const prepareImages = async (key) => {
	const res = await apiClient.post(`/collections/moderation/${key}/prepare-images${location.search}`);
	return res.data;
};

export const prepareMetadata = async (key) => {
	const res = await apiClient.post(`/collections/moderation/${key}/prepare-metadata${location.search}`);
	return res.data;
};

export const deploy = async (key) => {
	const res = await apiClient.post(`/collections/moderation/${key}/deploy${location.search}`);
	return res.data;
};

export const place = async (key) => {
	const res = await apiClient.post(`/collections/moderation/${key}/place${location.search}`);
	return res.data;
};