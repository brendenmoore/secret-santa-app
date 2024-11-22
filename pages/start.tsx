import Button from "@/components/Button";
import Head from "next/head";
import SmallButton from "@/components/SmallButton";
import { useParticipants } from "@/utils/useParticipants";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import { useSendNames } from "@/utils/useSendNames";

export default function Start() {
  const { participants, addParticipant, removeParticipant } = useParticipants();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { sendNames, isSending, progress, error, isSuccess } = useSendNames();
  console.log(participants);
  return (
    <div className=" min-h-screen">
      <Head>
        <title>Secret Santa - Draw Names</title>
      </Head>

      <div className="p-10 font-mono text-white">
        <div className="space-y-6">
          <p className="font-bold text-4xl xs:text-5xl sm:text-6xl uppercase">
            Participants
          </p>
          <p className="font-mono font-normal text-lg sm:text-xl md:text-justify">
            Add the names and emails for each member of your group. Don&apos;t
            forget to add yourself! When you&apos;re done, click &quot;Draw
            Names&quot; to randomly assign a secret santa to each person.
          </p>
          <div className="drop-shadow-lg">
            <div
              className="bg-white relative min-h-[400px] w-full max-w-md rounded-b-3xl before:absolute before:w-6 before:h-6 before:rounded-full before:bg-green-600/60 before:top-4 before:left-1/2 before:-translate-x-1/2 before:shadow-inner before:shadow-green-700/60 flex items-center"
              style={{
                clipPath:
                  "polygon(0 50px, 50px 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 0 100%)",
              }}
            >
              <form
                className="p-8 pt-12 w-full space-y-6 text-gray-700"
                onSubmit={(e) => {
                  e.preventDefault();
                  addParticipant({
                    name: (e.currentTarget.participantName as HTMLInputElement)
                      .value,
                    email: (e.currentTarget.email as HTMLInputElement).value,
                  });
                  e.currentTarget.reset();
                }}
              >
                <div className="space-y-2">
                  <label htmlFor="participantName" className="block font-mono ">
                    Name
                  </label>
                  <input
                    type="text"
                    id="participantName"
                    name="participantName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter participant&apos;s name"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block font-mono ">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter participant&apos;s email"
                  />
                </div>

                <div className="flex justify-center">
                  <SmallButton type="submit">Add</SmallButton>
                </div>
              </form>
            </div>
          </div>

          <Button
            className="w-full md:w-auto"
            onClick={() => setIsDialogOpen(true)}
          >
            Draw Names
          </Button>
          <div>
            {participants.length > 0 && (
              <div className="mt-10 space-y-4">
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex justify-between items-center"
                    >
                      <span>{participant.name}</span>
                      <SmallButton
                        onClick={() => removeParticipant(participant.id)}
                      >
                        Remove
                      </SmallButton>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Draw Names</h2>
          <p className="text-gray-600">
            Ready to assign Secret Santas? This will randomly pair each
            participant with someone to give a gift to.
          </p>
          <div className="flex justify-end space-x-3">
            <SmallButton onClick={() => setIsDialogOpen(false)}>
              Cancel
            </SmallButton>
            <SmallButton
              onClick={() => sendNames(participants)}
              disabled={isSending}
            >
              Draw Names
            </SmallButton>
          </div>
          {isSending && (
            <p className="text-gray-600 mt-4">
              Sending emails... {progress}/{participants.length}
            </p>
          )}
          {error && (
            <p className="text-red-600 mt-4">
              There was an error sending the emails. Please try again.
            </p>
          )}
          {isSuccess && (
            <p className="text-green-600 mt-4">
              Success! All emails have been sent.
            </p>
          )}
        </div>
      </Dialog>
    </div>
  );
}
