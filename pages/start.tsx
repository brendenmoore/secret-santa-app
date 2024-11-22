import Button from "@/components/button";
import Head from "next/head";
import SmallButton from "@/components/SmallButton";

export default function Home() {
  return (
    <div className="background min-h-screen">
      <Head>
        <title>Secret Santa - Draw Names</title>
      </Head>

      <div className="p-10 font-mono text-white">
        <div className="space-y-6">
          <p className="font-bold text-4xl xs:text-5xl sm:text-6xl uppercase">
            Participants
          </p>
          <p className="font-mono font-normal text-lg sm:text-xl md:text-justify">
            Add the names and emails for each member of your group. Don't forget
            to add yourself! When you're done, click "Draw Names" to randonly
            assign a secret santa to each person.
          </p>
          <div className="drop-shadow-lg">
            <div
              className="bg-white relative min-h-[400px] w-full max-w-md rounded-b-3xl before:absolute before:w-6 before:h-6 before:rounded-full before:bg-green-600/60 before:top-4 before:left-1/2 before:-translate-x-1/2 before:shadow-inner before:shadow-green-700/60 flex items-center"
              style={{
                clipPath:
                  "polygon(0 50px, 50px 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 0 100%)",
              }}
            >
              <form className="p-8 pt-12 w-full space-y-6 text-gray-700" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
              }}>
                <div className="space-y-2">
                  <label htmlFor="name" className="block font-mono ">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter participant's name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono ">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter participant's email"
                  />
                </div>

                <div className="flex justify-center">
                  <SmallButton type="submit">Add</SmallButton>
                </div>
              </form>
            </div>
          </div>

          <Button className="w-full md:w-auto">Draw Names</Button>
        </div>
      </div>
    </div>
  );
}
