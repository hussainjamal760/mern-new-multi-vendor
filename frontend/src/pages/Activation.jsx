import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server.js";

const Activation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      console.log("🎯 Frontend: Token received:", activation_token);
      console.log("🌐 Frontend: Server URL:", server);
      
      const sendRequest = async () => {
        try {
          setLoading(true);
          
          const requestData = {
            activation_token,
          };
          
          console.log("📤 Frontend: Sending request:", requestData);
          console.log("📍 Frontend: Full URL:", `${server}/user/activation`);
          
          const res = await axios.post(`${server}/user/activation`, requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          });
          
          console.log("✅ Frontend: Activation successful:", res.data);
          setMessage("Your account has been created successfully!");
          setError(false);
          
          // Optional: Redirect to login page after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
          
        } catch (err) {
          console.error("❌ Frontend: Activation error:", err);
          console.error("❌ Frontend: Error response:", err.response?.data);
          console.error("❌ Frontend: Error status:", err.response?.status);
          
          setError(true);
          
          if (err.response?.data?.message) {
            setMessage(err.response.data.message);
          } else if (err.response?.status === 404) {
            setMessage("Server endpoint not found. Check your server configuration.");
          } else if (err.response?.status === 500) {
            setMessage("Internal server error. Check server logs.");
          } else {
            setMessage("Your token is expired or invalid!");
          }
        } finally {
          setLoading(false);
        }
      };
      
      sendRequest();
    } else {
      console.log("❌ Frontend: No activation token in URL");
      setError(true);
      setMessage("No activation token provided!");
      setLoading(false);
    }
  }, [activation_token, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {loading ? (
        <div>
          <p>Activating your account...</p>
          <div style={{ 
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
            margin: "20px auto"
          }}></div>
        </div>
      ) : (
        <div>
          <p style={{ 
            color: error ? "red" : "green",
            fontSize: "18px",
            marginBottom: "20px"
          }}>
            {message}
          </p>
          
          {!error && (
            <p style={{ color: "#666", fontSize: "14px" }}>
              Redirecting to login page in 3 seconds...
            </p>
          )}
          
          {error && (
            <button 
              onClick={() => navigate('/sign-up')}
              style={{
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Try Again
            </button>
          )}
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Activation;