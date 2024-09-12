import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, Trans } from 'next-i18next';
import classNames from 'classnames';
import { FaLink, FaTelegram, FaTwitter, FaRegClone, FaYoutube, FaInstagram } from 'react-icons/fa';
import { HiMiniArrowUpRight } from 'react-icons/hi2';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';

import { getCollection, mint } from '../../../api/collections';
import { Moderation } from '../../../components/collections/moderation';
import styles from './style.module.scss';
import { QRCode } from '../../../components/collections/QRCode';
import { useAuthStore } from '../../../store/auth';
import { formatAddress } from '../../../helpers/addressFormatter';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import { Timer } from '../../../components/collections/timer';

const Social = ({ icon, href, text }) => {
	return (
		<a href={href} target="_blank" rel="noreferrer" className={styles.social}>
			<div className="flex items-center">
				<div className={styles.social_icon}>
					{icon}
				</div>
				<div>{text}</div>			
			</div>
		</a>
	);
};

Social.propTypes = {
	icon: PropTypes.any,
	href: PropTypes.string,
	text: PropTypes.string
};

const statuses = {
	closed: 'closed',
	opened: 'opened',
	upcoming: 'upcoming'
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Collection () {
	const [ buttonLoading, setButtonLoading ] = useState(false);
	const router = useRouter();
	const { t } = useTranslation();
	const [connector] = useTonConnectUI();
	const { open } = useTonConnectModal();
	const { access_token } = useAuthStore();
	const [ isLoading, setLoading ] = useState(true);
	const [ data, setCollection ] = useState();
	const params = useParams();

	const fetchCollection = async (key) => {
		try {
			const collection = await getCollection(key);
			const ended_at = new Date(collection.ended_at).getTime();
			const now = Date.now();
			const started_at = new Date(collection.started_at).getTime();
			collection.status = now > ended_at ? statuses.closed : now >= started_at ? statuses.opened : statuses.upcoming;
			setCollection(collection);
		} catch (err) {
			if (err.response.status === 404) {
				router.push('/404');
			} else {
				toast.error(err.message);
			}
		} finally {
			setLoading(false);
		}
	};
	
	useEffect(() => {
		if (isLoading) {
			fetchCollection(params.key);
		}
	}, []);

	const handleCopy = async (address) => {
		try {
			await copyToClipboard(address);
			toast.success('collections.copy.message');
		} catch (err) {
			toast.error(err.message);
		}
	};

	const onMint = async () => {
		try {
			const collection = await getCollection();
			const myTransaction = {
				validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
				messages: [
					{
						address: collection.address,
						amount: data?.mint_price.value,
					},
				]
			};
			setLoading(true);
			await connector.sendTransaction(myTransaction);
			await mint(params.key);
			await fetchCollection(params.key);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setButtonLoading(false);
		}
	};

	const renderPrefix = (name) => {
		if (name === 'website') {
			return <FaLink />;
		} else if (name === 'telegram') {
			return <FaTelegram />;
		} else if (name === 'x') {
			return <FaTwitter />;
		} else if (name === 'youtube') {
			return <FaYoutube />;
		} else if (name === 'instagram') {
			return <FaInstagram />;
		}
	};

	const renderLinks = (links) => {
		return links?.map((link) =>
			<Social key={link.id} text={link.url.replace('https://', '')} href={link.url} icon={renderPrefix(link.name)} />
		);
	};

	const cover = data?.images.find((image) => image.type === 'cover').image_url;
	const logo = data?.images.find((image) => image.type === 'logo').image_url;
	const nfts = data?.images.filter((image) => image.type === 'nft');
	const renderMintButton = (access_token, buttonLoading) => {
		if (data?.closed || data?.mint_count === data?.supply) {
			return <></>;
		}
		if (access_token) {
			return (
				<button
					onClick={onMint}
					disabled={buttonLoading}
					className="p-4 mt-3 text-center bg-violet-800 w-full rounded"
				>
					{t('collections.mint')}
				</button>
			);
		}
		return (
			<button
				onClick={open}
				className="p-4 mt-3 text-center bg-blue-500 w-full rounded"
			>
				{t('collections.connect')}
			</button>
		); 
		
	};
	const renderDatetime = (data) => {
		if (!data) {
			return;
		}
		if (data?.status === statuses.closed) {
			return <div></div>;
		}
	
		return <Timer
			label={data.status === statuses.opened ? t('collections.timer.label.ongoing') : t('collections.timer.label.upcoming')}
			date={data.status === statuses.opened ? data.ended_at : data.started_at}
			updateReques={fetchCollection}
		/>;
	};
	return (
		<main>
			<Head>
				<title>QR Mint - {data?.name}</title>
				<meta name="title" content={data?.name} />
				<meta name="description" content={data?.description} />
				<meta name="robots" content="index, follow" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta name="language" content="Russian" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={data?.name} />
				<meta property="og:description" content={data?.description} />
				<meta property="og:url" content="https://qr-mint.net" />
				<meta
					property="og:image"
					content={`${BASE_URL}/${logo}`}
				/>
			</Head>
			<div
				className={styles.header}
				style={{
					background: `url(${BASE_URL}/${cover}) center center / 100% no-repeat`,
				}}
			>
			</div>
			<div className={styles['bg-color']}>
				<div className={classNames('mt-4', 'container')}>
					<div className="flex justify-between flex-wrap">
						<div className={styles['content']}>
							<div className={styles.logo} style={{ backgroundImage: `url(${BASE_URL}/${logo})` }} />
							<h1 className="text-4xl font-bold mt-3">{data?.name}</h1>
							<div className="flex items-center mb-2">
								<div className="text-blue-500 flex items-center mr-4">
									<a href={`https://getgems.io/${data?.address}`} target="_blank" rel="noreferrer">Go to collection</a>
									<HiMiniArrowUpRight />
								</div>
								<div onClick={() => handleCopy(data?.address)} className={styles.address_container}>
									<span>{formatAddress(data?.address)}</span>
									<div className={styles.address_icon}>
										<FaRegClone />
									</div>
								</div>
							</div>
							<div className={classNames(styles['socials'])}>
								{renderLinks(data?.links)}
							</div>	
							<div className="mt-5">{data?.description}</div>
							<div className={styles.carousel}>
								<div className="flex gap-2">
									{nfts?.map((image, index) => (
										<Image key={index} src={`${BASE_URL}/${image?.image_url}`} width={150} height={150} alt="" />
									))}
								</div>
							</div>	
						</div>
						<div className={styles['right-col']}>
							{renderDatetime(data)}
							<div className={classNames(styles['right-panel'])}>
								<div className="pb-2 text-2xl">
									{data?.mint_price.human} TON
								</div>
								<div className={styles['qr-image']}>
									<div className="text-sm mb-2">
										<Trans i18nKey="collections.scan.info">
											Scan via <a className="text-blue-500" target="_blank" href="https://t.me/QrMint_Bot" rel="noreferrer">mini app</a>
										</Trans>
									</div>
									<QRCode t={t} collectionKey={data?.key} />
									{renderMintButton(access_token, buttonLoading)}
								</div>
								<div className="text-center py-4 text-2xl">
									<Trans
										i18nKey="collections.sold.description"
										values={{ mint_count: data?.mint_count, supply: data?.supply }}
									>
										Sold <b>{data?.mint_count}</b> from <b>{data?.supply}</b> NFTs
									</Trans>
								</div>
							</div>
							{!data?.closed && <Moderation collectionKey={data?.key} url={data?.url} address={data?.address} />}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Collection;

export const getServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
