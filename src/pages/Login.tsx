import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const role = localStorage.getItem("role");

      if (role === "patient") navigate("/patient");
      else if (role === "caretaker") navigate("/caretaker");
      else alert("Role not selected");

    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <p className="mb-2">
          Selected Role: <b>{localStorage.getItem("role")}</b>
        </p>

        <input
          id="email"
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
        />

        <input
          id="password"
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm mt-4">
          New user?{" "}
          <span
            className="text-blue-600 cursor-pointer font-semibold"
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
