import React from 'react';
import classNames from 'classnames';

import styles from './style.module.scss';
import { PropTypes } from 'prop-types';

export const Switch = ({ name, value, onChange, onBlur }) => {
	return (
		<label className={styles.switch}>
			<input name={name} checked={value} onChange={onChange} onBlur={onBlur} type="checkbox" />
			<span className={classNames(styles.slider, styles.round)}></span>
		</label>
	);
};

Switch.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.boolean,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
};