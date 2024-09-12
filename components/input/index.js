import React from 'react';
import styles from './style.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Input = ({ prefix, ...props }) => (
	<div className={classNames(styles.input, {
		[styles.prefix]: prefix 
	})}>
		{prefix && 
			<div className={styles.input__prefix}>
				{prefix}
			</div>
		}
		<input {...props} />
	</div>
);

Input.propTypes = {
	prefix: PropTypes.element
};
