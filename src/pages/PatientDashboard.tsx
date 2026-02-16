import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { isSameDay, isAfter, isBefore } from "date-fns";

// import { getMedicationHistory } from "../services/history";
import { calculateAdherence } from "../services/adherence";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  /* ---------------- STATE ---------------- */
  const [todayTaken, setTodayTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendar, setCalendar] = useState<Record<string, boolean>>({});
//   const [history, setHistory] = useState<any[]>([]);

  const [adherence, setAdherence] = useState(0);

  /* ---------------- DATES ---------------- */
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const selectedStr = selectedDate.toISOString().split("T")[0];

  const isToday = isSameDay(selectedDate, today);
  const isFuture = isAfter(selectedDate, today);
  const isPast = isBefore(selectedDate, today);

  const docId = user ? `${user.uid}_${todayStr}` : "";

  /* ---------------- HELPERS ---------------- */
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  /* ---------------- ACTION ---------------- */
  const markAsTaken = async () => {
    if (!user) return;
  if (!isSameDay(new Date(), selectedDate)) return;

    try {
      setLoading(true);
      await setDoc(
        doc(db, "medications", docId),
        {
          uid: user.uid,
          date: todayStr,
          taken: true,
          time: "08:00 AM",
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      setTodayTaken(true);
      loadCalendar();
    //   loadHistory();
      loadAdherence();
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOADERS ---------------- */
  const checkTodayStatus = async () => {
    if (!user) return;
    const snap = await getDoc(doc(db, "medications", docId));
    setTodayTaken(snap.exists());
  };

  const loadCalendar = async () => {
  if (!user) return;

  const result: Record<string, boolean> = {};

  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];

    const snap = await getDoc(
      doc(db, "medications", `${user.uid}_${key}`)
    );

    result[key] = snap.exists() && snap.data()?.taken === true;
  }

  setCalendar(result);
};


//   const loadHistory = async () => {
//     if (!user) return;
//     const data = await getMedicationHistory(user.uid);
//     setHistory(data.slice(-7).reverse());
//   };

  const loadAdherence = async () => {
    if (!user) return;
    const score = await calculateAdherence(user.uid);
    setAdherence(score);
  };

  useEffect(() => {
    checkTodayStatus();
    loadCalendar();
    // loadHistory();
    loadAdherence();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">
              M
            </div>
            <div>
              <h1 className="font-semibold">MediCare Companion</h1>
              <p className="text-sm text-gray-500">Patient View</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/caretaker")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            👥 Switch to Caretaker
          </button>
        </div>

        {/* HERO */}
        <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-2xl p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-1">{getGreeting()} 👋</h2>
          <p className="opacity-90 mb-6">
            Ready to stay on track with your medication?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/15 rounded-xl p-4">
              <p className="text-sm">Day Streak</p>
              <p className="text-2xl font-bold">1</p>
            </div>

            <div className="bg-white/15 rounded-xl p-4">
              <p className="text-sm">Today's Status</p>
              <p className="text-2xl font-bold">
                {todayTaken ? "✓ Taken" : "Pending"}
              </p>
            </div>

            <div className="bg-white/15 rounded-xl p-4">
              <p className="text-sm">Monthly Rate</p>
              <p className="text-2xl font-bold">{adherence}%</p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border">

            <h3 className="text-lg font-semibold mb-4">
              Medication for {selectedDate.toDateString()}
            </h3>

            {/* MED ITEM */}
            <div className="flex justify-between items-center border rounded-xl p-4 mb-4">
              <div>
                <p className="font-medium">Daily Medication Set</p>
                <p className="text-sm text-gray-500">
                  Complete set of daily tablets
                </p>
              </div>
              <span className="border rounded-full px-3 py-1 text-sm">
                ⏰ 08:00 AM
              </span>
            </div>

            {/* PHOTO */}
            <div className="border-2 border-dashed rounded-xl p-6 text-center text-gray-500 mb-4">
              <p className="font-medium">Add Proof Photo (Optional)</p>
              <p className="text-sm mb-3">
                Take a photo of your medication or pill organizer
              </p>
              <button className="border px-4 py-2 rounded-lg">
                📷 Take Photo
              </button>
            </div>

            {/* ACTION AREA */}
            {isFuture && (
              <div className="bg-green-100 text-green-700 rounded-xl p-4 text-center font-semibold">
                ✓ Cannot mark future dates
                <p className="text-sm font-normal">
                  You can only mark today's medication as taken
                </p>
              </div>
            )}

            {isPast && !isToday && !calendar[selectedStr] && (
              <div className="bg-red-100 text-red-600 rounded-xl p-4 text-center font-semibold">
                ❌ Missed medication
              </div>
            )}

            {isToday && todayTaken && (
              <div className="bg-green-100 text-green-700 rounded-xl p-4 text-center font-semibold">
                ✅ Medication Completed!
              </div>
            )}

            {isToday && !todayTaken && (
              <button
                onClick={markAsTaken}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
              >
                {loading ? "Saving..." : "✓ Mark as Taken"}
              </button>
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl p-6 border">
            <h3 className="font-semibold mb-4">Medication Calendar</h3>

            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(d) => d && setSelectedDate(d)}
              modifiers={{
                taken: Object.keys(calendar)
                  .filter((d) => calendar[d])
                  .map((d) => new Date(d)),
                today,
              }}
              modifiersClassNames={{
                taken: "bg-green-500 text-white",
                today: "ring-2 ring-blue-500",
              }}
            />

            <div className="flex gap-4 text-sm mt-4">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 bg-green-500 rounded-full" />
                Taken
              </span>
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 border-2 border-blue-500 rounded-full" />
                Today
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
