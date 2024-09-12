import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';

import styles from './style.module.scss';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const Card = ({ t, data }) => {
	const cover = data.images.find((image) => image.type === 'cover').image_url;
	const logo = data.images.find((image) => image.type === 'logo').image_url;

	return (
		<div className={styles.card}>
			<div
				className={styles['card-image']}
				style={{
					backgroundImage: `linear-gradient(rgba(22, 24, 28, 0) 0%, rgba(22, 24, 28, 0.008) 6.67%, rgba(22, 24, 28, 0.035) 13.33%, rgba(22, 24, 28, 0.082) 20%, rgba(22, 24, 28, 0.15) 26.67%, rgba(22, 24, 28, 0.23) 33.33%, rgba(22, 24, 28, 0.333) 40%, rgba(22, 24, 28, 0.443) 46.67%, rgba(22, 24, 28, 0.557) 53.33%, rgba(22, 24, 28, 0.667) 60%, rgba(22, 24, 28, 0.77) 66.67%, rgba(22, 24, 28, 0.85) 73.33%, rgba(22, 24, 28, 0.918) 80%, rgba(22, 24, 28, 0.965) 86.67%, rgba(22, 24, 28, 0.992) 93.33%, rgb(22, 24, 28) 100%), url(${BASE_URL}/${cover})`
				}}
			>
			</div>
			<div className="flex items-center mb-2">
				<Image src={`${BASE_URL}/${logo}`} alt="" width="88" height="88" />
				<p className={classNames(styles['card-title'], 'py-1 ml-2')}>{data.name}</p>
			</div>
			<div className={styles['card-description']}>
				{data.description}
			</div>
			<div className={classNames(styles['card-actions'], 'py-2')}>
				<Link className="bg-blue-500 p-2 rounded w-whole" href={`/collections/${data.key}`}>
					{t('collections.card.view')}
				</Link>
			</div>
		</div>
	);
};

Card.propTypes = {
	t: PropTypes.func.isRequired,
	data: PropTypes.shape({
		key: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		images: PropTypes.array.isRequired,
	}).isRequired
};