import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

type Tab = "overview" | "activity" | "calendar" | "notifications";

const CaretakerDashboard = () => {
  const navigate = useNavigate();

  /* -------------------- STATE -------------------- */
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /* Dummy stats (later Firestore se replace kar sakta hai) */
  const adherence = 85;
  const streak = 5;
  const missedMonth = 3;
  const takenWeek = 4;

  /* -------------------- ACTIONS -------------------- */
  const sendReminder = () => {
    alert("Reminder email sent to patient");
  };

  /* -------------------- COMPONENTS -------------------- */

  const Overview = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Today's Status */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4">Today's Status</h2>
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
            <div>
              <p className="font-medium">Daily Medication Set</p>
              <p className="text-sm text-gray-500">08:00 AM</p>
            </div>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
              Pending
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="font-semibold text-lg mb-4">Quick Actions</h2>

          <button
            onClick={sendReminder}
            className="w-full border rounded-lg p-3 mb-3 hover:bg-gray-50 text-left"
          >
            📧 Send Reminder Email
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className="w-full border rounded-lg p-3 mb-3 hover:bg-gray-50 text-left"
          >
            🔔 Configure Notifications
          </button>

          <button
            onClick={() => setActiveTab("calendar")}
            className="w-full border rounded-lg p-3 hover:bg-gray-50 text-left"
          >
            📅 View Full Calendar
          </button>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="font-semibold text-lg mb-4">
          Monthly Adherence Progress
        </h2>

        <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
            style={{ width: `${adherence}%` }}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-green-600">22 days Taken</span>
          <span className="text-red-500">3 days Missed</span>
          <span className="text-blue-500">5 days Remaining</span>
        </div>
      </div>
    </>
  );

  const RecentActivity = () => (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="font-semibold text-lg mb-4">
        Recent Medication Activity
      </h2>

      {[
        { date: "Monday, June 10", status: "Taken", time: "8:30 AM" },
        { date: "Sunday, June 9", status: "Taken", time: "8:15 AM" },
        { date: "Saturday, June 8", status: "Missed" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex justify-between items-center border p-4 rounded-lg mb-3"
        >
          <div>
            <p className="font-medium">{item.date}</p>
            <p className="text-sm text-gray-500">
              {item.status === "Taken"
                ? `Taken at ${item.time}`
                : "Medication missed"}
            </p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.status === "Taken"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );

  const CalendarView = () => (
    <div className="bg-white rounded-xl p-6 shadow grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="font-semibold text-lg mb-4">
          Medication Calendar Overview
        </h2>

        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(d) => d && setSelectedDate(d)}
          className="border rounded-xl p-4"
        />

        <div className="flex gap-4 text-sm mt-4">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 bg-green-500 rounded-full" />
            Taken
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 bg-red-500 rounded-full" />
            Missed
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 border-2 border-blue-500 rounded-full" />
            Today
          </span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-semibold mb-2">
          Details for {format(selectedDate, "PPP")}
        </h3>
        <p className="text-sm text-gray-600">
          Monitor patient medication status for selected date.
        </p>
      </div>
    </div>
  );

  const Notifications = () => (
    <>
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <h2 className="font-semibold text-lg mb-4">
          Notification Preferences
        </h2>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">
              Receive medication alerts via email
            </p>
          </div>
          <input type="checkbox" />
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Missed Medication Alerts</p>
            <p className="text-sm text-gray-500">
              Get notified when medication is missed
            </p>
          </div>
          <input type="checkbox" />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow">
        <h2 className="font-semibold text-lg mb-2">Email Preview</h2>
        <p className="text-sm text-gray-600">
          Subject: Medication Alert
        </p>
        <p className="text-sm mt-2">
          This is a reminder that the patient has not taken medication today.
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Save Notification Settings
        </button>
      </div>
    </>
  );

  /* -------------------- UI -------------------- */

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-bold text-xl">MediCare Companion</h1>
            <p className="text-sm text-gray-500">Caretaker View</p>
          </div>

          <button
            onClick={() => navigate("/patient")}
            className="border px-4 py-2 rounded-lg"
          >
            👤 Switch to Patient
          </button>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">Caretaker Dashboard</h2>
          <p className="mb-6">Monitoring patient medication adherence</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Stat label="Adherence Rate" value={`${adherence}%`} />
            <Stat label="Current Streak" value={streak} />
            <Stat label="Missed This Month" value={missedMonth} />
            <Stat label="Taken This Week" value={takenWeek} />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6 w-full">

          {[
            ["overview", "Overview"],
            ["activity", "Recent Activity"],
            ["calendar", "Calendar View"],
            ["notifications", "Notifications"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as Tab)}
              className={`px-6 py-2 rounded-lg ${
                activeTab === key
                  ? "bg-white shadow font-semibold"
                  : "text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <Overview />}
        {activeTab === "activity" && <RecentActivity />}
        {activeTab === "calendar" && <CalendarView />}
        {activeTab === "notifications" && <Notifications />}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-white/20 rounded-xl p-4">
    <p className="text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default CaretakerDashboard;
