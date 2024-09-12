import React, { createContext, useContext, useEffect, useState } from 'react';

import { mint } from '../../../api/nft';
import { createClient } from '../../../utils/socket_connection';
import { useAuthStore } from '../../../store/auth';
import PropTypes from 'prop-types';

export const steps = {
	save: 'save',
	deploy: 'deploy',
	transfer: 'transfer',
	success: 'success',
};

export const MintContext = createContext();

export const useMint = () => useContext(MintContext);

export const MintProvider = ({ children }) => {
	const [ step, setStep ] = useState(steps.save);
	const [ error, setError ] = useState(null);
	const [ socket, setSocket ] = useState(null);
	const [ index, setIndex ] = useState(null);
	const [ address, setAddress ] = useState(null);
	const { user } = useAuthStore();

	const send = async (data) => {
		try {
			const { nft_index } = await mint(data);
			setIndex(nft_index);
			setStep(steps.deploy);
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		if (socket || !index) return;
		createClient().then((socket) => {
			setSocket(socket);
			socket.on('mint-state', (data) => {
				if (index === data.index && data.owner === user?.address) {
					if (address) {
						setAddress(data.address);
					}
					setStep(data.status);
				}
			});

			socket.on('err', (data) => {
				setError(data.error_message);
			});
		});
		return () => {
			if (socket) {
				socket.off('mint-state');
				socket.off('err');
				socket.disconnect();
			}
		};
	}, [ socket, index ]);

	return (
		<MintContext.Provider value={{ error, step, address, send }}>
			{children}
		</MintContext.Provider>
	);
};

MintProvider.propTypes = {
	children: PropTypes.element.isRequired,
};