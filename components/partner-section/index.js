import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import styles from './style.module.scss';

export const PartnerSection = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.section}>
			<h2 className={classNames(styles.title)}>{t('qr.partner.title')}</h2>
			<p className={styles.subtitle}>{t('qr.mint.subtitle')}</p>
			<div className={classNames('text-center', styles.content)}>
				<Link href="/partner">Partner Link</Link>
			</div>
		</div>
	);
};
