import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTonConnectModal } from '@tonconnect/ui-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import { Intro } from '../components/intro/intro';
import { Generate } from '../components/generate';
import { Opportunities } from '../components/opportunities';

export default function Home () {
	const { t } = useTranslation();
	const { open } = useTonConnectModal();

	return (
		<div>
			<Head>
				<title>{t('head.title')}</title>
				<meta name="title" content={t('head.meta.title')} />
				<meta name="description" content={t('head.meta.description')} />
				<meta name="keywords" content={t('head.meta.keyboards')} />
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="Russian" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={t('head.meta.title')} />
				<meta property="og:description" content={t('head.meta.description')} />
				<meta property="og:url" content="https://qr-mint.net" />
				<meta
					property="og:image"
					content={`${process.env.NEXT_PUBLIC_CONNECT_URL}/images/lopo.png`}
				/>
			</Head>
			<Intro t={t} />
			<Generate onAuth={open} t={t} />
			<Opportunities t={t} />
		</div>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
