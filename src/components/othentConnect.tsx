/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { useEffect, useState } from "react";
import Uploader from "./uploader";

// @ts-expect-error expecting othent object injected from web extension
const oth = () => window.othent;

const installOthentMsg =
  "Please, Install & Enable Othent Mobile Safari Extension and try again";

const OthentConnect = () => {
  const [userDetails, setUserDetails] = useState<{ given_name: string } | null>(
    null
  );
  const [loginClicked, setLoginClicked] = useState(false);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tryLogin = () => {
    setLoginClicked(true);

    const othent = oth();

    if (!othent) {
      setErrorMessage(installOthentMsg);
      setLoginClicked(false);
      return;
    }

    try {
      othent.logIn().then((details: unknown) => {
        setUserDetails(details as { given_name: string });
        console.log(details);
      });
    } catch (e) {
      console.log("Login error:");
      console.log(e);
      setLoginClicked(false);
    }
  };

  const tryLogout = () => {
    setLogoutClicked(true);

    const othent = oth();
    if (!othent) {
      setErrorMessage(installOthentMsg);
      setLogoutClicked(false);
      return;
    }

    try {
      othent.logOut().then((result: any) => {
        if (!result) return;
        setUserDetails(null);
        console.log(result);
      });
    } catch (e) {
      console.log("Login error:");
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
    setTimeout(() => setErrorMessage(""), 5000);
  }, [errorMessage]);

  return (
    <>
      {!userDetails && (
        <button
          className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:bg-[#3385ff]"
          onClick={tryLogin}
          disabled={loginClicked}
        >
          <img
            src="/favicon-inverted.svg"
            alt="Othent"
            className="flex w-6 pr-[1px]"
          />
          thent&nbsp;Connect
        </button>
      )}

      <span className="text-red-600">{errorMessage}</span>

      {userDetails && (
        <div className="flex w-full flex-col gap-2">
          <div className="mb-12 flex w-full flex-row justify-between">
            Welcome, {userDetails.given_name}!
            <button
              className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:cursor-wait disabled:bg-[#3385ff]"
              onClick={tryLogout}
              disabled={logoutClicked}
            >
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
