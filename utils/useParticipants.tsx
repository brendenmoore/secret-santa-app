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

  // --- CSV Utilities ---
  const escapeCsvField = (value: string) => {
    if (value == null) return "";
    const needsQuotes = /[",\n]/.test(value);
    let escaped = value.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  };

  const exportToCsv = () => {
    const header = "Name,Email";
    const rows = participants.map((p) => `${escapeCsvField(p.name)},${escapeCsvField(p.email)}`);
    const csv = [header, ...rows].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const date = new Date().toISOString().slice(0, 10);
    link.download = `secret-santa-participants-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const parseCsvLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (inQuotes) {
        if (char === '"') {
          // Lookahead for escaped quote
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += char;
        }
      } else {
        if (char === ',') {
          result.push(current);
          current = "";
        } else if (char === '"') {
          inQuotes = true;
        } else {
          current += char;
        }
      }
    }
    result.push(current);
    return result.map((s) => s.trim());
  };

  const importFromCsv = (csvText: string) => {
    const lines = csvText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lines.length === 0) return { added: 0 };

    let startIdx = 0;
    // Detect header
    const firstCols = parseCsvLine(lines[0]).map((c) => c.toLowerCase());
    if (firstCols.length >= 2 && firstCols[0].includes("name") && firstCols[1].includes("email")) {
      startIdx = 1;
    }

    const incoming: Omit<Participant, "id">[] = [];
    for (let i = startIdx; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length < 2) continue;
      const name = cols[0]?.trim();
      const email = cols.slice(1).join(",").trim();
      if (!name || !email) continue;
      incoming.push({ name, email });
    }

    if (incoming.length === 0) return { added: 0 };

    setParticipants((prev) => {
      const maxId = prev.length ? Math.max(...prev.map((p) => p.id)) : 0;
      const withIds: Participant[] = incoming.map((p, idx) => ({ id: maxId + idx + 1, ...p }));
      return [...prev, ...withIds];
    });

    return { added: incoming.length };
  };

  return { participants, addParticipant, removeParticipant, exportToCsv, importFromCsv };
};
