import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const selectRole = (role: "patient" | "caretaker") => {
    localStorage.setItem("role", role);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          MediCare Companion
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* PATIENT CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Patient
            </h2>

            <p className="text-gray-500 mt-3">
              Track daily medications, view adherence,
              and stay healthy.
            </p>

            <button
              onClick={() => selectRole("patient")}
              className="mt-6 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Continue as Patient
            </button>
          </div>

          {/* CARETAKER CARD */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Caretaker
            </h2>

            <p className="text-gray-500 mt-3">
              Monitor patient progress, adherence,
              and medication status.
            </p>

            <button
              onClick={() => selectRole("caretaker")}
              className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Continue as Caretaker
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landing;
