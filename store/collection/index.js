import { create } from 'zustand';
import { deploy, place, changeOwner, prepareFolder, prepareImages, prepareMetadata } from '../../api/collections';

const initialState = {
};

export const useCollection = create()(() => ({
	...initialState,
	deploy: async (key) => {
		await deploy(key);
	},
	place: async (key) => {
		await place(key);
	},
	prepareFolder: async (key) => {
		await prepareFolder(key);
	},
	changeOwner: async (key) => {
		await changeOwner(key);
	},
	prepareImages: async (key) => {
		await prepareImages(key);
	},
	prepareMetadata: async (key) => {
		await prepareMetadata(key);
	}
}));
