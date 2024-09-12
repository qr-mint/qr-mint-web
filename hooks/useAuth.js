import { useEffect, useRef } from 'react';
import {
	useIsConnectionRestored,
	useTonConnectUI,
	useTonWallet,
} from '@tonconnect/ui-react';
import { toast } from 'react-toastify';

import { useAuthStore } from '../store/auth';
import { generatePayload } from '../api/auth';

const payloadTTLMS = 1000 * 60 * 20;

export function useBackendAuth () {
	const { setTonConnector, connect, access_token, getMe } = useAuthStore();
	const isConnectionRestored = useIsConnectionRestored();
	const wallet = useTonWallet();
	const [tonConnectUI] = useTonConnectUI();
	const interval = useRef();

	useEffect(() => {
		setTonConnector(tonConnectUI);
		if (!isConnectionRestored || !connect) {
			//clear();
			return;
		}

		clearInterval(interval.current);
		if (!wallet) {
			const refreshPayload = async () => {
				tonConnectUI.setConnectRequestParameters({ state: 'loading' });
				try {
					const value = await generatePayload();
					if (!value) {
						tonConnectUI.setConnectRequestParameters(null);
					} else {
						tonConnectUI.setConnectRequestParameters({
							state: 'ready',
							value: { tonProof: value },
						});
					}
				} catch (err) {
					toast.error(err.message);
				}
			};

			refreshPayload();
			setInterval(refreshPayload, payloadTTLMS);
			return;
		}

		if (access_token) {
			getMe()
				.catch((err) => {
					toast.warning(err.message);
				});
			return;
		}
		if (
			wallet.connectItems?.tonProof &&
			!('error' in wallet.connectItems.tonProof)
		) {
			connect(wallet)
				.catch(() => {
					tonConnectUI.disconnect();
				});
		} else {
			tonConnectUI.disconnect()
				.catch(console.warn);
		}
	}, [ wallet, isConnectionRestored, connect, tonConnectUI, access_token, getMe, setTonConnector ]);
}
