import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MB = 1024 * 1024;

export const ImageUpload = ({
	onChange,
	error,
	t,
	render,
	validHeight,
	validWeight,
	validMb,
	imageType,
	...props
}) => {
	const [ image, setImage ] = useState(null);
	const [ err, setError ] = useState(error);

	useEffect(() => {
		setError(error);
	}, [error]);

	const onImageUpdate = (e) => {
		const file = e.currentTarget.files[0];
		if (!file) return;

		if (file.size > MB * validMb) {
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
			if (imageType === 'square' && img.width !== img.height && validHeight === validWeight) {
				setError(t('uploadImage.errors.resolution'));
			}
			setImage(img.src);
			setError('');
			if (onChange) onChange(file);			
		};
	
		img.onerror = () => {
			setError('Error loading image');
		};

		e.currentTarget.blur();
	};

	return render({ onChange: onImageUpdate, error: err, image, ...props });
};

ImageUpload.propTypes = {
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string,
	render: PropTypes.func.isRequired,
	mb: PropTypes.number,
	t: PropTypes.func.isRequired,
	imageType: PropTypes.string
};
