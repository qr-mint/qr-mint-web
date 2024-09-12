import React from 'react';
import styles from './style.module.scss';
import { PropTypes } from 'prop-types';

export const PageHead = ({ title, description, button }) => {
	return (
		<div className={styles['p-header']}>
			<div className={styles['p-header__container']}>
				<h1 className={styles['p-title']}>{title}</h1>
				<p className={styles['p-subtitle']}>{description}</p>
				{button && <div>{button}</div>}
			</div>
		</div>
	);
};

PageHead.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	button: PropTypes.any.isRequired
};