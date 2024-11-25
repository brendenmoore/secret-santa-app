import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Head from "next/head";
import Image from "next/image";
import SmallButton from "@/components/SmallButton";
import { ParticipantListItem } from "@/components/ParticipantListItem";
import { DEMO_EMAIL } from "@/utils/constants";
import { useParticipants } from "@/utils/useParticipants";
import { useSendNames } from "@/utils/useSendNames";
import { useRouter } from "next/router";
import { useState } from "react";

const PRESENT_ICON = {
  src: "/christmas-icons/1.png",
  width: 50,
  height: 50,
  alt: "Present icon",
};

const FORM_CLIP_PATH = "polygon(0 50px, 50px 0, calc(100% - 50px) 0, 100% 50px, 100% 100%, 0 100%)";

interface FormElements extends HTMLFormControlsCollection {
  participantName: HTMLInputElement;
  email: HTMLInputElement;
}

interface ParticipantForm extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Start() {
  const router = useRouter();
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { participants, addParticipant, removeParticipant } = useParticipants();
  const { sendNames, isSending, progress, error, isSuccess } = useSendNames();
  
  const demoParticipants = participants.filter(
    (participant) => participant.email === DEMO_EMAIL
  );

  const handleSubmit = (e: React.FormEvent<ParticipantForm>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    addParticipant({
      name: form.elements.participantName.value,
      email: isDemoMode ? DEMO_EMAIL : form.elements.email.value,
    });

    form.elements.participantName.value = "";
    if (!isDemoMode) {
      form.elements.email.value = "";
    }
  };

  return (
    <div className="custom-background min-h-screen">
      <Head>
        <title>Secret Santa - Draw Names</title>
      </Head>

      <div className="relative max-w-7xl mx-auto p-10 font-mono text-white lg:grid grid-cols-2 gap-10">
        
        {/* Left Column - Form */}
        <div className="space-y-6 mx-auto max-w-lg">
          <p className="font-bold text-4xl xs:text-5xl sm:text-6xl uppercase">
            Participants
          </p>
          <p className="font-sans font-normal sm:text-lg max-w-lg">
            Add the names and emails for each member of your group.
          </p>

          <div className="drop-shadow-lg font-sans">
            <div
              className="bg-white mx-auto relative min-h-[400px] w-full max-w-xs rounded-b-3xl before:absolute before:w-6 before:h-6 before:rounded-full before:bg-green-600/60 before:top-4 before:left-1/2 before:-translate-x-1/2 before:shadow-inner before:shadow-green-700/60 flex items-center"
              style={{ clipPath: FORM_CLIP_PATH }}
            >
              <form
                className="p-8 pt-12 w-full space-y-6 text-gray-700"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2 mt-6">
                  <label htmlFor="participantName" className="block">
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
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={isDemoMode}
                    value={isDemoMode ? DEMO_EMAIL : undefined}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
                    placeholder="Enter participant's email"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isDemoMode}
                      onChange={(e) => setIsDemoMode(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span>Demo Mode</span>
                  </label>
                  <p className="text-xs text-gray-500">
                    When enabled, no emails will be sent and a fake email will
                    be used for all participants.
                  </p>
                </div>

                <div className="flex justify-center font-mono">
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

        {/* Right Column - Participant List */}
        <div className="mt-10 lg:mt-0 mx-auto lg:flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-3 w-full max-w-max lg:max-w-full">
          {participants.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <p>Add some participants to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm">
                {participants.length} participants added
              </p>
              <div className="space-y-2">
                {participants.map((participant) => (
                  <ParticipantListItem
                    key={participant.id}
                    participant={participant}
                    removeParticipant={removeParticipant}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Draw Names Dialog */}
      <Dialog
        isOpen={isDialogOpen && !isSuccess}
        onClose={() => setIsDialogOpen(false)}
      >
        <div className="space-y-4">
          <Image
            className="mx-auto"
            {...PRESENT_ICON}
          />
          <h2 className="text-2xl font-bold text-red-500 uppercase">
            {isSending ? "Sending" : "Get Ready!"}
          </h2>
          <p className="text-gray-600 max-w-sm font-sans">
            You are about to send {participants.length} emails. Each participant
            will receive an email with their assigned person. Did you remember
            to add yourself? Once you send, you will not be able to edit the
            list again.
          </p>
          {demoParticipants.length > 0 && (
            <p className="text-gray-600 max-w-sm font-sans font-bold">
              {demoParticipants.length} participant(s) are in demo mode.
              <br />
              {participants.length - demoParticipants.length} email(s) will
              actually be sent.
            </p>
          )}
          <div className="flex flex-col items-center justify-end gap-3">
            <Button
              className="mt-16"
              onClick={() => sendNames(participants)}
              disabled={isSending}
            >
              {isSending ? "Sending" : "Send"}
            </Button>
            {!isSending && (
              <button
                className="hover:underline"
                onClick={() => setIsDialogOpen(false)}
              >
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
            <p className="text-red-500 mt-4">
              Error sending emails. Please try again.
            </p>
          )}
        </div>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        isOpen={isSuccess && isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <div>
          <div className="space-y-4">
            <Image
              className="mx-auto"
              {...PRESENT_ICON}
            />
            <h2 className="text-2xl font-bold text-green-600 uppercase">
              Success!
            </h2>
            <p className="text-gray-600 mb-18 font-sans">
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
