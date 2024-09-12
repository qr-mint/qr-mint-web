import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { PropTypes } from 'prop-types';

export const Field = ({ className, label, description, children, error }) => (
	<div className={classNames(styles.field, { invalid: error }, className)}>
		<div className={styles.field__info}>
			{label && (
				<label className={styles.field__label}>
					{label}
					<i>*</i>
				</label>
			)}
			{description && (
				<p className={styles.field__description}>
					<span>{description}</span>
				</p>
			)}
		</div>
		{children}
		{error && <div className={styles.field__feedback}>{error}</div>}
	</div>
);

Field.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	description: PropTypes.string,
	children: PropTypes.element.isRequired,
	error: PropTypes.string
};