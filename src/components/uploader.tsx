/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';
import { type ChangeEvent, useEffect, useRef, useState } from 'react';

const oth = () => window.othent;

type ArweaveUploadProps = {
    errorMessage: string;
    buttonName: string;
    setErrorMessage: (errorMessage: string) => void;
    functionName1: string;
    functionName2: string;
};

const Uploader = (props: ArweaveUploadProps) => {
    const { buttonName, setErrorMessage, functionName1, functionName2 } = props;

    const [txId, setTxId] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) return;

        const uploadFile = () => {
            const o = oth();
            o[functionName1]({
                othentFunction: 'uploadData',
                data: file,
                tags: [{ name: 'Content-Type', value: file.type }]
            }).then((signedTx: any) => {
                o[functionName2](signedTx).then((result: any) => {
                    if (!result.success) setErrorMessage(`${functionName2} failed`);
                    else {
                        setTxId(result.transactionId);
                        setFileName(file.name);
                    }
                    setFile(null);
                });
            });
        };

        uploadFile();
    }, [file]);

    const handleChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        setFile(!event.target.files ? null : !event.target.files[0] ? null : event.target.files[0]);
    };

    const selectFile = () => {
        fileInputRef.current?.click();
    };

    const openViewblock = () => window.open(`https://viewblock.io/arweave/tx/${txId}`, '_blank');

    const openUploadedFile = () => window.open(`https://arweave.net/${txId}`, '_blank');

    const clearTxInfo = () => {
        setFile(null);
        setFileName('');
        setTxId('');
    };

    return (
        <div className="flex w-full flex-col gap-2">
            <input type="file" ref={fileInputRef} onChange={handleChangeFile} className="hidden" />
            {!txId && (
                <button
                    className="flex w-full cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:cursor-wait disabled:bg-[#3385ff]"
                    disabled={txId ? true : false}
                    onClick={selectFile}>
                    {buttonName}
                </button>
            )}
            {txId && (
                <div className="flex w-full flex-row items-center justify-end gap-1">
                    {fileName}
                    <button
                        className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:cursor-wait disabled:bg-[#3385ff]"
                        disabled={!txId}
                        onClick={openViewblock}>
                        View Tx
                    </button>
                    <button
                        className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:cursor-wait disabled:bg-[#3385ff]"
                        disabled={!txId}
                        onClick={openUploadedFile}>
                        Open Image Link
                    </button>
                    <button
                        className="flex cursor-pointer flex-row items-center justify-center rounded-lg bg-[#2375EF] px-4 py-2 text-white hover:shadow-md hover:shadow-[#2375EFcc] active:shadow-sm active:shadow-[#2375EFcc] disabled:cursor-wait disabled:bg-[#3385ff]"
                        disabled={!txId}
                        onClick={clearTxInfo}>
                        X
                    </button>
                </div>
            )}
        </div>
    );
};

export default Uploader;
