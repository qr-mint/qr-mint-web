import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';

import './style.scss';

const { SingleValue, Option } = components;

export const Select = ({ id, ...props }) => {
	return (
		<ReactSelect classNamePrefix="custom-select" {...props} instanceId={id} />
	);
};

Select.propTypes = {
	id: PropTypes.string.isRequired,
};

const IconSingleValue = ({ children, data, ...props }) => {
	return (
		<SingleValue {...props} color={data.color}>
			{children}
		</SingleValue>
	);
};

IconSingleValue.propTypes = {
	children: PropTypes.any,
	data: PropTypes.object.isRequired,
};

const IconOption = ({ data, ...props }) => {
	return (
		<Option color={data.color} {...props}>
			{data.label}
		</Option>
	);
};

IconOption.propTypes = {
	innerProps: PropTypes.object,
	data: PropTypes.object.isRequired,
};

export const IconSelect = ({ ...props }) => {
	return (
		<Select
			{...props}
			components={{ Option: IconOption, SingleValue: IconSingleValue }}
		/>
	);
};
