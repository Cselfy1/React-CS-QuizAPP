import { useState } from "react";
import { LoginForm } from "./components/Auth/LoginForm";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { Quiz } from "./components/Quiz/Quiz";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      {!isLoggedIn ? (
        isRegistering ? (
          <RegisterForm
            onRegisterSuccess={(msg) => {
              setServerMessage(msg);
              setIsRegistering(false);
            }}
            switchToLogin={() => setIsRegistering(false)}
          />
        ) : (
          <LoginForm
            onLoginSuccess={(msg) => {
              setServerMessage(msg);
              setIsLoggedIn(true);
            }}
            switchToRegister={() => setIsRegistering(true)}
          />
        )
      ) : (
        <Quiz />
      )}

      {!isLoggedIn && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            style={{
              background: "none",
              border: "none",
              color: "#000",
              fontSize: "14px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>

          {serverMessage && (
            <p style={{ marginTop: "10px", color: "green" }}>{serverMessage}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
