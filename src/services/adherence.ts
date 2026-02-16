import { getMedicationHistory } from "./history";
import { getLast7Days } from "../utils/dates";

export async function calculateAdherence(uid: string): Promise<number> {
  const history = await getMedicationHistory(uid);
  const days = getLast7Days();

  let takenCount = 0;

  days.forEach(day => {
    const record = history.find(h => h.date === day);
    if (record && record.taken) takenCount++;
  });

  return Math.round((takenCount / days.length) * 100);
}
