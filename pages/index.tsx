import Button from "@/components/button";
import Head from "next/head";
import Snowfall from "react-snowfall";

export default function Home() {
  return (
    <div className="background h-screen">
      <Head>
        <title>Secret Santa</title>
      </Head>
      <Snowfall />
      <div className="absolute bottom-0 bg-[url('/img/snow.png')] bg-repeat-x bg-center bg-cover h-[300px] w-full transform" />
      <div className=" flex gap-24 items-start justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-white">
        <div className="w-min space-y-6">
          <p className="font-bold text-8xl uppercase">
            Christmas
            <br />
            is Coming
          </p>
          <p className="font-mono font-normal text-2xl text-justify">
            It's time for a secret santa gift exchange! This site will handle
            the details, so you can focus on finding the perfect gift.
          </p>
          <Button>Add Names</Button>
        </div>
        <div className="w-[350px] relative">
          <span className="absolute bottom-[-18px] rounded-[50%] opacity-50 left-0 right-0 h-16 blur-xl bg-black"></span>
          <img
            className="max-w-full h-auto"
            src="./santa (2).png"
            alt="santa"
          />
        </div>
      </div>
      {/* <svg id="noice" width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0, opacity: 0.5}}>
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="1.34" numOctaves="4" stitchTiles="stitch"></feTurbulence>
        <feColorMatrix type="saturate" values="0"></feColorMatrix>
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.46"></feFuncR>
          <feFuncG type="linear" slope="0.46"></feFuncG>
          <feFuncB type="linear" slope="0.46"></feFuncB>
          <feFuncA type="linear" slope="0.56"></feFuncA>
        </feComponentTransfer>
        <feComponentTransfer>
          <feFuncR type="linear" slope="1.47" intercept="-0.23" />
          <feFuncG type="linear" slope="1.47" intercept="-0.23" />
          <feFuncB type="linear" slope="1.47" intercept="-0.23" />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
    </svg> */}
    </div>
  );
}
