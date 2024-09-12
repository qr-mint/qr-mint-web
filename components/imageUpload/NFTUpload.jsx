import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Field } from '../Field/index';
import styles from './style.module.scss';
import { FieldArray } from 'formik';

export const NFTUpload = ({ label, description, error, validWeight, validHeight, t }) => {
	const [ images, setImages ] = useState([]);
	const [ err, setError ] = useState(null);

	const onUpload = (index, e, insert) => {
		const file = e.currentTarget.files[0];
		if (!file) return;

		if (file.size > 1024 * 1024 * 2) { // 2MB size limit
			setError(t('uploadImage.errors.maxFileSize'));
			return;
		}

		const fileType = file.type;
		if (
			!fileType.includes('webp') &&
			!fileType.includes('jpeg') &&
			!fileType.includes('png')
		) {
			setError(t('uploadImage.errors.allowType'));
			return;
		}
		// Check image dimensions
		const img = new Image();
		img.src = URL.createObjectURL(file);
		img.onload = () => {
			if (img.width < validWeight || img.height < validHeight) {
				setError(t('uploadImage.errors.resolution'));
			} else if (img.width === img.height) {
				const updatedImages = [...images];
				updatedImages[index] = img.src;
				setImages(updatedImages);
				setError('');
				insert(index, file);
			} else {
				setError(t('uploadImage.errors.resolution'));
			}
		};
		img.onerror = () => {
			setError('Error loading image');
		};
  
		e.currentTarget.blur();
	};


	return (
		<Field
			label={label}
			description={description}
			className={classNames(styles['img-container'], styles['nft'])}
			error={err || error}
		>
			<FieldArray
				name="nfts"
				render={(nfts) => (
					<div className="flex flex-wrap">
						{Array.from({ length: 4 }).map((_, index) => (
							<label key={index} className={styles['file-upload']}>
								<input 
									name={`${nfts.name}[${index}]`} 
									type="file" 
									onChange={(e) => onUpload(index, e, nfts.replace)} 
								/>
								{images[index] && <img className={styles.img} src={images[index]} alt="" />}
							</label>
						))}
					</div>
				)}
			/>
		</Field>
	);
};

NFTUpload.propTypes = {
	label: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired,
	validHeight: PropTypes.number.isRequired,
	validWeight: PropTypes.number.isRequired,
};