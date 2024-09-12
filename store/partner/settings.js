import { create } from 'zustand';
import { getPartnerLink } from '../../api/partner';

const initialState = {
	partnerLink: null,
	code: null,
};

export const usePartnerStore = create()((set) => ({
	...initialState,
	loadLink: async () => {
		const { link, code } = await getPartnerLink();
		set({ partnerLink: link, code });
	},
}));
