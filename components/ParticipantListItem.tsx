import { useState } from "react";
import type { Participant } from "@/utils/useParticipants";
import Image from "next/image";
import { DropdownMenu } from "./DropdownMenu";
import { MenuItem } from "./MenuItem";
import { TrashIcon } from "./icons/TrashIcon";

interface ParticipantListItemProps {
  participant: Participant;
  removeParticipant: (id: number) => void;
}

export function ParticipantListItem({
  participant,
  removeParticipant,
}: ParticipantListItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const imageNumber = (participant.id % 15) + 1;

  return (
    <div className="flex max-w-md mx-auto items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
      <div className="shrink-0">
        <Image
          src={`/christmas-icons/${imageNumber}.png`}
          width={48}
          height={48}
          alt="Christmas Icon"
        />
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-lg font-semibold truncate">{participant.name}</p>
        <p className="text-sm text-white/80 truncate">{participant.email}</p>
      </div>
      <DropdownMenu isOpen={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <MenuItem
          variant="danger"
          onClick={() => {
            removeParticipant(participant.id);
            setIsMenuOpen(false);
          }}
        >
          <TrashIcon className="w-4 h-4" />
          Remove
        </MenuItem>
      </DropdownMenu>
    </div>
  );
}
