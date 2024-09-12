import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./style.module.scss";

export const selectedTypes = {
	sequential: "sequential",
	random: "random",
};

export const SelectRandomMint = ({ onChange, t, selected }) => {
	return (
		<div className="flex">
			<div
				onClick={() => onChange(selectedTypes.sequential)}
				className={classNames(styles.select_block, {
					[styles.selected]: selected === selectedTypes.sequential,
				})}
			>
				<div className="font-bold mb-1">
					{t("collections.add.form.archive.noRandom.title")}
				</div>
				<div className={styles.description}>
					{t("collections.add.form.archive.noRandom.subtitle")}
				</div>
			</div>
			<div
				onClick={() => onChange(selectedTypes.random)}
				className={classNames(styles.select_block, {
					[styles.selected]: selected === selectedTypes.random,
				})}
			>
				<div className="font-bold mb-1">
					{t("collections.add.form.archive.random.title")}
				</div>
				<div className={styles.description}>
					{t("collections.add.form.archive.random.subtitle")}
				</div>
			</div>
		</div>
	);
};

SelectRandomMint.propTypes = {
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	selected: PropTypes.bool.isRequired,
};

export const ArchiverFile = ({ onChange, className, ...props }) => {
	const onUpdate = (e) => {
		const file = e.currentTarget.files?.[0];
		if (!file) return;
		console.log(file);
		if (onChange) onChange(file);

		e.currentTarget.blur();
	};

	return (
		<div className={classNames(styles.input, className)}>
			<input
				{...props}
				type="file"
				accept=".zip,.rar,.7z,.tar,.gz"
				onChange={onUpdate}
			/>
		</div>
	);
};

ArchiverFile.propTypes = {
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
};

ArchiverFile.defaultProps = {
	className: "",
};
