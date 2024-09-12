import React from 'react';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

export const Card = ({ data }) => {
	return (
		<div className={styles.card}>
			<div
				className={styles['card-image']}
				style={{
					backgroundImage: `url(${data.image_url})`
				}}
			>
			</div>
			<div className={styles['card-tags']}>
				{data.attributes.map((attribute) => <div key={attribute} className={styles['card-tag']}>#{attribute}</div>)}
			</div>
		</div>
	);
};

Card.propTypes = {
	t: PropTypes.func.isRequired,
	data: PropTypes.shape({
		attributes: PropTypes.array.isRequired,
		image_url: PropTypes.string.isRequired,
	}).isRequired
};