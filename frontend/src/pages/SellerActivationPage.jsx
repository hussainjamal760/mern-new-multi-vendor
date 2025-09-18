import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server.js";
import { toast } from "react-toastify";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          setLoading(true);
          toast.info("Activating your account...");
          
          const requestData = {
            activation_token,
          };
          
          // ✅ FIXED: Corrected the URL path
          const res = await axios.post(`${server}/shop/activation`, requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true
          });
          
          setMessage("Your account has been activated successfully!");
          setError(false);
          toast.success("Account activated successfully! 🎉");
          
          setTimeout(() => {
            navigate('/login-shop');
          }, 3000);
          
        } catch (err) {
          setError(true);
          
          let errorMessage = "Your token is expired or invalid!";
          
          if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.response?.status === 404) {
            errorMessage = "Server endpoint not found. Check your server configuration.";
          } else if (err.response?.status === 500) {
            errorMessage = "Internal server error. Check server logs.";
          }
          
          setMessage(errorMessage);
          toast.error(errorMessage);
          
        } finally {
          setLoading(false);
        }
      };
      
      sendRequest();
    } else {
      setError(true);
      setMessage("No activation token provided!");
      setLoading(false);
      toast.error("No activation token found in URL!");
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
        backgroundColor: "#f8f9fa"
      }}
    >
      {loading ? (
        <div>
          <div style={{ 
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 2s linear infinite",
            margin: "0 auto 20px"
          }}></div>
          <p style={{ fontSize: "18px", color: "#666" }}>
            Activating your account...
          </p>
        </div>
      ) : (
        <div style={{ maxWidth: "500px" }}>
          <div style={{
            fontSize: "48px",
            marginBottom: "20px"
          }}>
            {error ? "❌" : "✅"}
          </div>
          
          <h2 style={{ 
            color: error ? "#dc3545" : "#28a745",
            fontSize: "24px",
            marginBottom: "20px",
            fontWeight: "bold"
          }}>
            {error ? "Activation Failed" : "Account Activated!"}
          </h2>
          
          <p style={{ 
            color: "#666",
            fontSize: "16px",
            marginBottom: "30px",
            lineHeight: "1.5"
          }}>
            {message}
          </p>
          
          {!error && (
            <div style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "12px 20px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #c3e6cb"
            }}>
              Redirecting to login page in 3 seconds...
            </div>
          )}
          
          {error && (
            <button 
              onClick={() => navigate('/shop-create')}
              style={{
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
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

export default SellerActivationPage;