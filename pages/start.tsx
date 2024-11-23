import Button from "@/components/Button";
import Head from "next/head";
import SmallButton from "@/components/SmallButton";
import { useParticipants } from "@/utils/useParticipants";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import { useSendNames } from "@/utils/useSendNames";
import { ParticipantListItem } from "@/components/ParticipantListItem";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Start() {
  const { participants, addParticipant, removeParticipant } = useParticipants();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { sendNames, isSending, progress, error, isSuccess } = useSendNames();
  const router = useRouter();

  return (
    <div className=" min-h-screen background">
      <Head>
        <title>Secret Santa - Draw Names</title>
      </Head>

      <div className="relative max-w-7xl mx-auto p-10 font-mono text-white lg:grid grid-cols-2 gap-10">
        <div className="space-y-6 mx-auto max-w-lg">
          <p className="font-bold text-4xl xs:text-5xl sm:text-6xl uppercase">
            Participants
          </p>
          <p className="font-mono font-normal sm:text-lg md:text-justify max-w-lg">
            Add the names and emails for each member of your group. Don&apos;t
            forget to add yourself! When you&apos;re done, click &quot;Draw
            Names&quot; to randomly assign a secret santa to each person.
          </p>
          <div className="drop-shadow-lg">
            <div
              className="bg-white mx-auto relative min-h-[400px]w-full max-w-xs rounded-b-3xl before:absolute before:w-6 before:h-6 before:rounded-full before:bg-green-600/60 before:top-4 before:left-1/2 before:-translate-x-1/2 before:shadow-inner before:shadow-green-700/60 flex items-center"
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
                    placeholder="Enter participant's name"
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
                    placeholder="Enter participant's email"
                  />
                </div>

                <div className="flex justify-center">
                  <SmallButton type="submit">Add</SmallButton>
                </div>
              </form>
            </div>
          </div>

          {participants.length >= 3 && (
            <Button
              className="w-full max-w-xs mx-auto block md:w-auto"
              onClick={() => setIsDialogOpen(true)}
            >
              Draw Names
            </Button>
          )}
        </div>
        <div className="flex-1 ">
          {participants.length > 0 && (
            <div className="mt-10 space-y-4">
              <div className="space-y-2">
                {participants.map((participant) => (
                  <ParticipantListItem
                    participant={participant}
                    removeParticipant={removeParticipant}
                    key={participant.id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog
        isOpen={isDialogOpen && !isSuccess}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="space-y-4">
          <Image
            className="mx-auto"
            src="/christmas-icons/1.png"
            width={50}
            height={50}
            alt="present"
          />
          <h2 className="text-2xl font-bold text-red-500 uppercase">
            {isSending ? "Sending" : "Get Ready!"}
          </h2>
          <p className="text-gray-600 max-w-sm">
            You are about to send {participants.length} emails. Each participant
            will recieve and email with their assigned person. Did you remember
            to add yourself? Once you send, you will not be able to edit the
            list again.
          </p>
          <div className="flex flex-col items-center justify-end gap-3">
            <Button
              className="mt-16"
              onClick={() => sendNames(participants)}
              disabled={isSending}
            >
              {isSending ? "Sending" : "Send"}
            </Button>
            {!isSending && (
              <button onClick={() => setIsDialogOpen(false)}>
                Back to Form
              </button>
            )}
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
        </div>
      </Dialog>

      <Dialog
        isOpen={isSuccess && isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <div>
          <div className="space-y-4">
            <Image
              className="mx-auto"
              src="/christmas-icons/1.png"
              width={50}
              height={50}
              alt="present"
            />
            <h2 className="text-2xl font-bold text-green-600 uppercase">
              Success!
            </h2>
            <p className="text-gray-600 mb-18">
              {progress}/{participants.length} emails sent.
            </p>
          </div>

          <Button
            className="mt-16 mx-auto block"
            onClick={() => router.push("/")}
          >
            Start Over
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
