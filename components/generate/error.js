import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './style.module.scss';

export const Error = ({ error }) => {
	return (
		<div className={classNames('flex', 'text-center', 'flex-col', styles['container-mob'])}>
			<p className="mb-5">{error}</p>
			<a className="bg-blue-500 shadow-lg shadow-blue-500/50" target="_blank" href="https://t.me/qrmint_support" rel="noreferrer">Support</a>
		</div>
	);
};

Error.propTypes = {
	error: PropTypes.string.isRequired,
};