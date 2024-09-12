import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Image from 'next/image';

import { Field } from '../Field/index';
import styles from './style.module.scss';

export const LogoUpload = ({ title, description, image, error, onChange, ...props }) => {
	return (
		<Field
			label={title}
			description={description}
			className={classNames(styles['img-container'], styles['logo'])}
			error={error}
		>
			<label className={styles['file-upload']}>
				<input {...props} type="file" onChange={onChange} />
				{image && <Image width={250} height={250} src={image} alt="" />}
			</label>
		</Field>
	);
};

LogoUpload.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	image: PropTypes.string,
	error: PropTypes.string,
};


export const HeaderUpload = ({ title, description, image, error, onChange, ...props }) => {
	return (
		<Field
			label={title}
			description={description}
			className={classNames(styles['img-container'], styles['header'])}
			error={error}
		>
			<label className={styles['file-upload']}>
				<input {...props} type="file" onChange={onChange} />
				{image && <img className={styles.img} src={image} alt="" />}
			</label>
		</Field>
	);
};

HeaderUpload.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	image: PropTypes.string,
	error: PropTypes.string,
};
