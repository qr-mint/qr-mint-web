import { create } from 'zustand';
import { VERSION } from '../config';
import { createJSONStorage, persist } from 'zustand/middleware';
import { connect, logout, refreshToken } from '../../api/auth';
import { getUser } from '../../api/users';

const initialState = {
	access_token: null,
	user: null,
	connector: null,
};

export const useAuthStore = create()(
	persist(
		(set) => ({
			...initialState,
			connect: async (body) => {
				const access_token = await connect(body);
				set({ access_token });
			},
			refreshToken: async () => {
				const access_token = await refreshToken();
				set({ access_token });
			},
			disconnect: async () => {
				const state = useAuthStore.getState();
				try {
					await logout();
				} catch {}
				if (state.connector) {
					try {
						await state.connector.disconnect(); // Call the TonConnect disconnect function
					} catch (err) {
						console.warn(err);
					}
				}
				set({ access_token: null, user: null });
			},
			clear: () => {
				set({ access_token: null, user: null });
			},
			getMe: async () => {
				const user = await getUser();
				set({ user });
			},
			setTonConnector: (connector) => {
				set({ connector });
			},
		}),
		{
			name: 'auth',
			version: VERSION,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				access_token: state.access_token,
				user: state.user,
			}),
		},
	),
);
