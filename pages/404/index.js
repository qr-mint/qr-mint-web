import React from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';

const Error404 = () => {
	const { t } = useTranslation();
	return (
		<main className="h-full container">
			<Head>
				<title>QR Mint - 404</title>
			</Head>
			<section className={styles['container']}>
				<div className={styles['error-top']}>
					<div className={styles['container']}>
						<h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight'>{t('404.Title')}</h1>
						<p className="mt-2 text-lg">{t('404.Description')}</p>
					</div>
				</div>

				<div className={styles['error-bottom']}>
					<div className={styles.container}>
						<a href="/" className="p-4 mt-3 text-center bg-violet-800 w-full rounded">{t('404.GoToMain')}</a>
					</div>
				</div>
			</section>
		</main>
	);
};

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
});

export default Error404;