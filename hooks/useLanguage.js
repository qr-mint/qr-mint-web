import { useCallback, useMemo } from "react";
import { useTranslation } from "next-i18next";

import { useSettingsStore } from "../store/settings/settings";

export const useLanguage = () => {
	const { i18n } = useTranslation();
	const { setLanguage } = useSettingsStore();

	const handleChangeLanguage = useCallback(
		async (locale) => {
			setLanguage(locale);
			await i18n.changeLanguage(locale);
		},
		[i18n],
	);

	return useMemo(
		() => ({
			language: i18n.language,
			setLanguage: handleChangeLanguage,
		}),
		[handleChangeLanguage, i18n.language],
	);
};
