import { type NextPage } from 'next';
import Head from 'next/head';
import OthentConnect from '~/components/othentConnect';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Othent Uploader</title>
                <meta
                    name="description"
                    content="Test page to quickly upload files to Arweave using Othent"
                />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </Head>
            {/* <Script src="/caller.js" /> */}
            <main className="flex min-h-screen flex-col items-center justify-center bg-white">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <div className="flex flex-row items-center justify-center">
                        <img src="/favicon.svg" alt="Othent" className="flex w-12 sm:w-24" />
                        <span className="text-5xl font-bold tracking-tight text-[#2375EF] sm:text-[5rem]">
                            thent&nbsp;<span className="font-normal">upload</span>
                        </span>
                    </div>
                    <OthentConnect />
                </div>
            </main>
        </>
    );
};

export default Home;
