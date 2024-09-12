import React, { useState } from 'react';
import { Formik, FieldArray } from 'formik';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';
import { FaLink, FaPlus, FaRegCircleXmark, FaTelegram, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';

import {
	HeaderUpload,
	LogoUpload,
} from '../imageUpload';
import { NFTUpload } from '../imageUpload/NFTUpload';
import { ArchiverFile, SelectRandomMint } from '../archiverFile';
import { ImageUpload } from '../imageUpload/uploadFunction';
import { Field } from '../Field';
import { Input } from '../input';
import { Textarea } from '../textarea';
import Validator from '../../utils/Validator';
import styles from './style.module.scss';
import { SelectLink } from './SelectLink';

export const CollectionForm = ({ t, onSubmit, isLoading }) => {
	const [ link, setLink ] = useState(false);
	const onHandleValidate = (values) => {
		const errors = {};
		if (!values.telegram_contact_url || !values.telegram_contact_url.includes('https://t.me')) {
			errors.telegram_contact_url = t('collections.add.form.telegram_contact.invalid');
		}
		if (!values.name) {
			errors.name = t('collections.add.form.name.invalid');
		} else if (values.name.length > 30) {
			errors.name = t('collections.add.form.name.max');
		}
		if (!values.description) {
			errors.description = t('collections.add.form.description.invalid');
		} else if (values.description.length < 50) {
			errors.description = t('collections.add.form.description.min');
		} else if (values.description.length > 500) {
			errors.description = t('collections.add.form.description.max');
		}
		if (!values.mint_price) {
			errors.mint_price = t('collections.add.form.price.invalid');
		}
		if (!values.royalty_fee) {
			errors.royalty_fee = t('collections.add.form.royalty_fee.invalid');
		}
		if (!values.cover) {
			errors.cover = t('collections.add.form.cover.invalid');
		}
		if (!values.logo) {
			errors.logo = t('collections.add.form.logo.invalid');
		}
		if (!values.archive) {
			errors.archive = t('collections.add.form.archive.invalid');
		}
		if (values.nfts.length !== 4) {
			errors.nfts = t('collections.add.form.nft.invalid');
		}
		if (!values.mint_type) {
			errors.mint_type = t('collections.add.form.mint_type.invalid');
		}
		if (values.links.length > 0) {
			for (const link of values.links) {
				if (!Validator.url(link.url)) {
					errors.links = t('collections.add.form.links.website.invalid');
					break;
				}
			}
		} else {
			errors.links = t('collections.add.form.links.website.invalid');
		}
		let started_at, ended_at;
		const now = Date.now();
		if (values.start_date && values.start_time) {
			started_at = new Date(`${values.start_date}T${values.start_time}`).getTime();
			if (isNaN(started_at)) {
				errors.start_date = 'Invalid start date or time';
			} else if (started_at <= now) {
				errors.start_date = 'Start date must be in the future';
			}
		}
		if (values.end_date && values.end_time) {
			ended_at = new Date(`${values.end_date}T${values.end_time}`).getTime();
			if (isNaN(ended_at)) {
				errors.end_date = 'Invalid end date or time';
			} else if (ended_at <= now) {
				errors.end_date = 'End date must be in the future';
			}
		}
		if (started_at && ended_at) {
			if (ended_at <= started_at) {
				errors.start_date = 'Start date must be before end date';
				errors.end_date = 'End date must be after start date';
			}
		}
		return errors;
	};

	const renderPrefix = (name) => {
		if (name === 'website') {
			return <FaLink />;
		} else if (name === 'telegram') {
			return <FaTelegram />;
		} else if (name === 'x') {
			return <FaTwitter />;
		} else if (name === 'youtube') {
			return <FaYoutube />;
		} else if (name === 'instagram') {
			return <FaInstagram />;
		}
		return;
	};

	return (
		<Formik
			initialValues={{
				name: '',
				description: '',
				mint_price: null,
				royalty_fee: null,
				cover: null,
				logo: null,
				archive: null,
				mint_type: null,
				dynamic_address: false,
				end_date: null,
				end_time: null,
				start_date: null,
				start_time: null,
				links: [
					{ url: '', name: 'website' }
				],
				nfts: []
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
				setFieldTouched,
				values,
			}) => (
				<form encType="multipart/form-data" onSubmit={handleSubmit}>
					<Field
						label={t('collections.add.form.name.label')}
						error={errors.name && touched.name && errors.name}
					>
						<Input max={30} name="name" onBlur={handleBlur} onChange={handleChange} />
					</Field>
					<Field
						label={t('collections.add.form.description.label')}
						error={errors.description && touched.description && errors.description}
					>
						<Textarea max={500} name="description" onBlur={handleBlur} onChange={handleChange} />
					</Field>
					<Field
						label={t('collections.add.form.price.label')}
						description={t('collections.add.form.price.description')}
						error={errors.mint_price && touched.mint_price && errors.mint_price}
					>
						<Input name="mint_price" onBlur={handleBlur} onChange={handleChange} />
					</Field>
					<Field
						label={t('collections.add.form.royalty_fee.label')}
						description={t('collections.add.form.royalty_fee.description')}
						error={errors.royalty_fee && touched.royalty_fee && errors.royalty_fee}
					>
						<Input name="royalty_fee" onBlur={handleBlur} onChange={handleChange} />
					</Field>
					<div className={styles.socials}>
						<FieldArray
							name="links"
							render={(links) => (
								<Field
									label={t('collections.add.form.links.label')}
									error={errors.links && touched.links && errors.links}
								>	
									{values.links.map((link, index) => (
										<div key={link.name} className="mb-1">
											<Input
												name={`links[${index}].url`}
												placeholder="https://..."
												onBlur={handleBlur}
												onChange={handleChange}
												prefix={renderPrefix(link.name)}
											/>
											{index > 0 && (
												<button role="button" onClick={() => links.pop(index)}>
													<div className={styles.btn_remove}>
														Delete <div className="ml-2"><FaRegCircleXmark /></div>
													</div>
												</button>
											)}
										</div>
									))}
									{link && <SelectLink
										onAdd={(name) => links.push({ url: '', name })}
										onClose={() => setLink(false)}
										t={t}
									/>}
									<div className="mb-1">
										<button
											role="button"
											className={styles.btn_add}
											onClick={() => setLink(true)}
										>
											<FaPlus/>
												Add
										</button>
									</div> 
								</Field>
							)}
						/>
					</div>
					{/* <Field
						label={t('collections.add.form.dynamicNFTQRAddress.label')}
						description={t('collections.add.form.dynamicNFTQRAddress.description')}
						error={errors.dynamic_address && touched.dynamic_address && errors.dynamic_address}
					>
						<Switch
							name="dynamic_address"
							value={values.dynamic_address}
							onChange={(e) => {
								handleChange(e);
								setFieldTouched('dynamic_address', !values.dynamic_address);
							}}
							onBlur={handleBlur}
						/> 
					</Field> */}
					<Field
						label={t('collections.add.form.mintType.label')}
						error={errors.mint_type && touched.mint_type && errors.mint_type}
					>
						<SelectRandomMint
							selected={values.mint_type}
							onChange={(mintType) => mintType && setFieldValue('mint_type', mintType)}
							t={t}
						/>
					</Field>
					<Field
						label={t('collections.add.form.archive.label')}
						description={t('collections.add.form.archive.description')}
						error={errors.archive && touched.archive && errors.archive}
					>
						<ArchiverFile
							type="file"
							name="archive"
							onBlur={handleBlur}
							onChange={(file) => file && setFieldValue('archive', file)}
							t={t}
						/>
					</Field>
					<ImageUpload
						t={t}
						onChange={(file) => file && setFieldValue('logo', file)}
						name="logo"
						validHeight={500}
						validWeight={500}
						imageType={'square'}
						error={errors.logo && touched.logo && errors.logo}
						validMb={2}
						render={(props) =>
							<LogoUpload
								title={t('collections.add.form.logo.label')}
								description={t('collections.add.form.logo.description')}
								t={t}
								{...props}
							/>
						}
					/>
					<ImageUpload
						t={t}
						onChange={(file) => file && setFieldValue('cover', file)}
						validHeight={266}
						validWeight={1132}
						name="cover"
						validMb={10}
						error={errors.cover && touched.cover && errors.cover}
						render={(props) =>
							<HeaderUpload
								title={t('collections.add.form.cover.label')}
								description={t('collections.add.form.cover.description')}
								t={t}
								{...props}
							/>
						}
					/>
					<NFTUpload
						label={t('collections.add.form.nft.label')}
						description={t('collections.add.form.nft.description')}
						error={errors.nfts && touched.nfts && errors.nfts}
						t={t}
					/>
					<div className="flex flex-wrap">
						<Field
							label={t('collections.add.form.startedAt.label')}
							description={t('collections.add.form.startedAt.description')}
							error={errors.start_date && touched.start_date && errors.start_date}
							className="mr-5"
						>
							<div className="flex">
								<div className="mr-1">
									<Input name="start_date" onChange={handleChange} onBlur={handleBlur} type="date" placeholder="11.08.2022" />
								</div>
								<Input name="start_time" onChange={handleChange} onBlur={handleBlur} type="time" placeholder="00:01" />
							</div>
						</Field>
						<Field
							label={t('collections.add.form.endedAt.label')}
							description={t('collections.add.form.endedAt.description')}
							error={errors.end_date && touched.end_date && errors.end_date}
							className="ml-5"
						>
							<div className="flex">
								<div className="mr-1">
									<Input name="end_date" onChange={handleChange} onBlur={handleBlur} type="date" placeholder="11.08.2022" />
								</div>
								<Input name="end_time" onChange={handleChange} onBlur={handleBlur} type="time" placeholder="00:01" />
							</div>
						</Field>
					</div>
					<Field
						label={t('collections.add.form.telegram_contact.label')}
						description={t('collections.add.form.telegram_contact.description')}
						error={errors.telegram_contact_url}
					>
						<Input name="telegram_contact_url" onBlur={handleBlur} onChange={handleChange} />
					</Field>
					<div className="mt-5">
						<button
							className={classNames('btn btn-primary')}
							type="submit"
							disabled={isLoading}
						>
							{t('collections.add.form.add')}
						</button>
						<p>{t('collections.add.form.moderation')}</p>
					</div>
				</form>
			)}
		</Formik>
	);
};

CollectionForm.propTypes = {
	t: PropTypes.func.isRequired,
	onSubmit: PropTypes.func,
	isLoading: PropTypes.boolean,
};
