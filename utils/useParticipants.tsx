import { useState } from "react";

export interface Participant {
  id: number;
  name: string;
  email: string;
}

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = (participant: Omit<Participant, "id">) => {
    const newId =
      Math.max(...participants.map((participant) => participant.id), 0) + 1;
    (participant as Participant).id = newId;
    setParticipants((prevParticipants) => [
      ...prevParticipants,
      participant as Participant,
    ]);
  };

  const removeParticipant = (id: number) => {
    console.log(id);
    setParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== id)
    );
  };

  return { participants, addParticipant, removeParticipant };
};
