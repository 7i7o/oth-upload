import { type NextPage } from "next";
import Head from "next/head";
// import Script from "next/script";
// import FileInputTest from "~/components/fileInputTest";
import OthentConnect from "~/components/othentConnect";

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
            <img
              src="/favicon.svg"
              alt="Othent"
              className="flex w-12 sm:w-24"
            />
            <span className="text-5xl font-bold tracking-tight text-[#2375EF] sm:text-[5rem]">
              thent&nbsp;<span className="font-normal">upload</span>
            </span>
          </div>

          <OthentConnect />
          {/* <FileInputTest /> */}
          {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div> */}
        </div>
      </main>
    </>
  );
};

export default Home;
