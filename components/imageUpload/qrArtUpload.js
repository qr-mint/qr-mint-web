import React from 'react';
import NextImage from 'next/image';

import styles from './style.module.scss';
import { PropTypes } from 'prop-types';

export const QRArtUpload = ({
	onChange,
	image,
	height,
	width,
	error,
	description,
	...props
}) => {
	const _renderImage = (image) => {
		return (
			<div className={styles.img}>
				<NextImage
					src={image || '/images/placeholder.png'}
					width={width}
					height={height}
					alt=""
				/>
			</div>
		);
	};

	return (
		<div className={styles['file-container']}>
			{error && <div className={styles.invalid}>{error}</div>}
			<label className={styles['file-upload']}>
				<input {...props} type="file" onChange={onChange} />
				{_renderImage(image)}
			</label>
			{description && <div className={styles['image-description']}>{description}</div>}
		</div>
	);
};

QRArtUpload.propTypes = {
	onChange: PropTypes.func,
	description: PropTypes.string,
	image: PropTypes.any,
	error: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
};
