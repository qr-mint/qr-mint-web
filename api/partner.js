import { apiClient } from './request';

export const getPartnerLink = async () => {
	const res = await apiClient.get('partners/link');
	return res.data.data;
};

export const getReferrals = async () => {
	const res = await apiClient.get('partners/referrals');
	return res.data.data;
};
