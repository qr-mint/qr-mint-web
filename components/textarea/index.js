import React from 'react';
import styles from './style.module.scss';

export const Textarea = ({ ...props }) => (
	<textarea {...props} rows="4" wrap="virtual" className={styles.textarea} />
);
