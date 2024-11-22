import { useState } from "react";
import { Participant } from "./useParticipants";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useSendNames = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendNames = async (participants: Participant[]) => {
    setIsSending(true);
    setProgress(0);
    setError(null);
    setIsSuccess(false);

    try {
      const randomizedNames = [...participants].sort(() => 0.5 - Math.random());

      for (let i = 0; i < randomizedNames.length; i++) {
        const participant = randomizedNames[i];
        const assignee = randomizedNames[(i + 1) % randomizedNames.length].name;

        try {
          await sendIndividualEmail(participant, assignee);
          setProgress(i + 1);
          if (i < randomizedNames.length - 1) {
            await sleep(500); // 1/2 second delay between emails
          }
        } catch (error) {
          console.error(error);
          setError("Error sending emails");
          setIsSuccess(false);
          return;
        }
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Error sending emails");
      setIsSuccess(false);
    } finally {
      setIsSending(false);
    }
  };

  return { sendNames, progress, error, isSending, isSuccess };
};

const sendIndividualEmail = async (
  participant: Participant,
  assignee: string
) => {
  const response = await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: participant.name,
      assignee: assignee,
      email: participant.email,
    }),
  });
  const data = await response.json();
  return data;
};
