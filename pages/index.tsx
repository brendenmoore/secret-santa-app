import Button from "@/components/Button";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Snowfall, { SnowfallProps } from "react-snowfall";

const SNOW_PATH = "/snow.png";
const SANTA_PATH = "/santa (2).png";
const SNOWFALL_CONFIG: SnowfallProps = {
  speed: [0.5, 1] as [number, number],
  wind: [-0.5, 1] as [number, number],
  radius: [1, 4] as [number, number],
  snowflakeCount: 75,
};

export default function Home() {
  const router = useRouter();
  return (
    <div className="custom-background relative flex lg:block justify-center min-h-screen md:min-h-[1175px] md:h-screen md:max-h-[1300px] lg:min-h-[780px] lg:h-screen lg:max-h-[1098px]">
      <Head>
        <title>Secret Santa</title>
      </Head>
      <Snowfall {...SNOWFALL_CONFIG} />

      {/* Snow Image */}
      <div
        style={{ backgroundImage: `url(${SNOW_PATH})` }}
        className="absolute bottom-0 bg-repeat-x bg-center bg-cover h-[300px] w-full transform"
      />
      <div className="mt-10 sm:mt-14 md:mt-20 lg:mt-0 lg:flex gap-24 items-start justify-center lg:absolute top-1/2 left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 font-mono text-white">
        <div className="w-min space-y-6">
          <p className="font-bold text-6xl xs:text-7xl sm:text-8xl md:text-9xl lg:text-8xl 2xl:text-9xl uppercase">
            Christmas
            <br />
            is Coming
          </p>
          <p className="font-sans font-normal text-lg sm:text-xl md:text-2xl 2xl:text-3xl md:text-justify">
            It&apos;s time for a secret santa gift exchange! This site will
            handle the details, so you can focus on finding the perfect gift.
          </p>
          <Button
            onClick={() => router.push("/start")}
            className="w-full md:w-auto"
          >
            Add Names
          </Button>
        </div>

        {/* Santa Image */}
        <div className="relative place-self-center mt-16 mb-14 lg:mb-0 md:mt-0 md:place-self-end w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] 2xl:w-[400px]">
          <span className="absolute bottom-[-18px] rounded-[50%] opacity-50 left-0 right-0 h-16 blur-xl bg-black" />
          <Image
            src={SANTA_PATH}
            alt="Santa Clause illustration"
            width={400}
            height={400}
            className="max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
