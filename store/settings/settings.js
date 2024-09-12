import { create } from "zustand";
import { VERSION } from "../config";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState = {
	language: null,
};

export const useSettingsStore = create()(
	persist(
		(set) => ({
			...initialState,

			setLanguage: (language) => {
				set({ language });
			},
		}),
		{
			name: "settings",
			version: VERSION,
			storage: createJSONStorage(() => localStorage),
		},
	),
);
