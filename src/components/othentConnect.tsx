/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { useEffect, useState } from 'react';
import Uploader from './uploader';

declare global {
    interface Window {
        othentInstalled: boolean;
        othentLoaded: boolean;
        // initOthent: (params?: { API_ID: string }) => Promise<boolean>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        arweaveWallet: { walletName: string; walletVersion: string } & any;
        // othent: any;
    }
}

const installOthentMsg = 'Please, Install & Enable Othent Mobile Safari Extension and try again';

const OthentConnect = () => {
    const [walletLoaded, setWalletLoaded] = useState(false);
    const [userDetails, setUserDetails] = useState<{ given_name: string } | null>(null);
    const [loginClicked, setLoginClicked] = useState(false);
    const [logoutClicked, setLogoutClicked] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const getOthent = () => {
        // const installed = window.othentInstalled;
        // console.log('Installed: ', installed);

        // if (!installed) {
        //     setErrorMessage(installOthentMsg);
        //     return null;
        // }

        // const loaded = await window.initOthent();

        if (!walletLoaded) {
            setErrorMessage('Othent wallet not loaded yet, please try again later');
            return null;
        }

        return window.arweaveWallet;
    };

    const tryLogin = async () => {
        setLoginClicked(true);

        const othent = await getOthent();

        if (!othent) {
            setLoginClicked(false);
            return;
        }

        try {
            othent.logIn().then((details: unknown) => {
                setUserDetails(details as { given_name: string });
                console.log(details);
            });
        } catch (e) {
            console.log('Login error:');
            console.error(e);
            setLoginClicked(false);
        }
    };

    const tryLogout = async () => {
        setLogoutClicked(true);

        const othent = await getOthent();

        if (!othent) {
            setLogoutClicked(false);
            return;
        }

        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            othent.logOut().then((result: any) => {
                if (!result) return;
                setUserDetails(null);
                console.log(result);
            });
        } catch (e) {
            console.log('Login error:');
            console.log(e);
        }
        setLogoutClicked(false);
    };

    useEffect(() => {
        if (!userDetails) return;
        setLoginClicked(false);
    }, [userDetails]);

    useEffect(() => {
        if (!errorMessage) return;
        setTimeout(() => setErrorMessage(''), 5000);
    }, [errorMessage]);

    // Listen for the arweaveWalletLoaded DOM CustomEvent
    useEffect(() => {
        const handleArweaveWalletLoaded = (e: Event) => {
            // Called when browser triggers a custom event
            if (e.type === 'arweaveWalletLoaded') {
                console.log('From React: Arweave Wallet Loaded!!!');
                setWalletLoaded(true);
            } else console.log('From React: Some other event');
        };

        window.addEventListener('arweaveWalletLoaded', handleArweaveWalletLoaded);
        return () => {
            window.removeEventListener('arweaveWalletLoaded', handleArweaveWalletLoaded);
        };
    }, []);

    return (
        <>
            {!userDetails && walletLoaded && (
                <button
                    className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:bg-[#888]"
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={tryLogin}
                    disabled={loginClicked && !walletLoaded}>
                    <img src="/favicon-inverted.svg" alt="Othent" className="flex w-6 pr-[1px]" />
                    thent&nbsp;Connect
                </button>
            )}

            <span className="text-red-600">{errorMessage}</span>
            {/* {!walletLoaded && <span className="text-red-600">"Wallet still not loaded"</span>}
            {walletLoaded && <span className="text-green-600">"Wallet loaded!"</span>} */}

            {userDetails && (
                <div className="flex w-full flex-col gap-2">
                    <div className="mb-12 flex w-full flex-row justify-between">
                        Welcome, {userDetails.given_name}!
                        <button
                            className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:cursor-wait disabled:bg-[#3385ff]"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            onClick={tryLogout}
                            disabled={logoutClicked}>
                            Disconnect
                        </button>
                    </div>

                    <Uploader
                        errorMessage={errorMessage}
                        buttonName="Upload with Arweave"
                        setErrorMessage={setErrorMessage}
                        functionName1="signTransactionArweave"
                        functionName2="sendTransactionArweave"
                    />

                    <Uploader
                        errorMessage={errorMessage}
                        buttonName="Upload with Bundlr"
                        setErrorMessage={setErrorMessage}
                        functionName1="signTransactionBundlr"
                        functionName2="sendTransactionBundlr"
                    />
                </div>
            )}
        </>
    );
};

export default OthentConnect;
