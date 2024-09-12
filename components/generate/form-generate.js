import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import classNames from 'classnames';

import { QRArtUpload } from '../imageUpload/qrArtUpload';
import { ImageUpload } from '../imageUpload/uploadFunction';
import { Input } from '../input';
import { Field } from '../Field';

import styles from './style.module.scss';

export function FormGenerate ({ t, onSubmit, user }) {

	const onHandleValidate = (values) => {
		const errors = {};
		if (!values.text) {
			errors.text = t('home.mint.form.text.invalid');
		}
		if (!values.image) {
			errors.image = t('home.mint.form.image.invalid');
		}
		return errors;
	};

	return (
		<Formik
			initialValues={{
				text: null,
				image: null,
			}}
			onSubmit={onSubmit}
			validateOnBlur={onHandleValidate}
			validate={onHandleValidate}
		>
			{({
				errors,
				touched,
				handleSubmit,
				handleBlur,
				handleChange,
				setFieldValue,
			}) => (
				<form encType="multipart/form-data" onSubmit={handleSubmit}>
					<div
						className={classNames(
							styles['container-form-inner'],
							styles['container-mob'],
						)}
					>
						<div className="mr-5">
							<ImageUpload
								t={t}
								onChange={(file) => setFieldValue('image', file)}
								name="image"
								validHeight={500}
								validWeight={500}
								imageType={'square'}
								error={errors.image && touched.image && errors.image}
								render={(props) => (
									<QRArtUpload
										description={t('home.mint.form.image.description')}
										width={320}
										height={320}
										{...props}
									/>
								)}
								validMb={2}
							/>
						</div>
						<div className="flex flex-col justify-between w-full">
							<Field
								label={t('home.mint.form.text.label')}
								error={errors.text && touched.text && errors.text}
								description={t('home.mint.form.text.description')}
								name="text"
							>
								<Input
									className="px-1"
									name="text"
									placeholder="Text or url"
									onBlur={handleBlur}
									onChange={handleChange}
								/>
							</Field>
							<button role="button" className="btn flex text-center justify-center items-center appearance-none py-1 focus:outline-none cursor-pointer select-none overflow-hidden z-10 w-full relative uppercase duration-100 font-semibold px-2 rounded dark:text-white h-11">
								{user ? t('home.mint.next') : t('home.mint.connect')}
							</button>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
}

FormGenerate.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	user: PropTypes.object,
};
