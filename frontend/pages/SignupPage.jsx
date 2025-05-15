import { useState } from "react";
import { Eye, EyeOff, Loader2, School } from "lucide-react";

// Main color styles
const mainColor = "#088cd4";
const errorColor = "#ef4444";
const successColor = "#10b981";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    empId: "",
    email: "",
    password: "",
    role: "EMPLOYEE", // Default role
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", message: "" });

  const validateForm = () => {
    const newErrors = {};

    // Validate Employee ID
    if (!formData.empId.trim()) {
      newErrors.empId = "Employee ID is required";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@saveetha\.ac\.in$/.test(formData.email)) {
      newErrors.email = "Email must end with @saveetha.ac.in";
    }

    // Validate Password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain at least one uppercase, one lowercase, one number, and one special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitMessage({ type: "", message: "" });

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          message: data || "Registration successful! Redirecting to login...",
        });
        // Redirect to login page after a delay
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setSubmitMessage({
          type: "error",
          message: data || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Style definitions for consistent application
  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "3rem 1.5rem",
  };

  const cardStyle = {
    maxWidth: "28rem",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow:
      "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    padding: "2rem",
    border: "1px solid #e5e7eb",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginTop: "0.25rem",
  };

  const inputErrorStyle = {
    ...inputStyle,
    border: "1px solid " + errorColor,
  };

  const buttonStyle = {
    backgroundColor: mainColor,
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: "500",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    opacity: "0.5",
    cursor: "not-allowed",
  };

  const linkButtonStyle = {
    backgroundColor: "white",
    color: "#374151",
    border: "1px solid #d1d5db",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    fontWeight: "500",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                height: "5rem",
                width: "5rem",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <img
                src='/saveetha.jpeg'
                alt='Saveetha Engineering College Logo'
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
        <h2
          style={{
            marginTop: "1.5rem",
            fontSize: "1.875rem",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          Saveetha Engineering College
        </h2>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          Staff Registration Portal
        </p>
      </div>

      <div style={cardStyle}>
        {submitMessage.message && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              backgroundColor:
                submitMessage.type === "success" ? "#d1fae5" : "#fee2e2",
              color: submitMessage.type === "success" ? "#065f46" : "#b91c1c",
            }}
          >
            {submitMessage.message}
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            Employee ID
          </label>
          <input
            id='empId'
            name='empId'
            type='text'
            autoComplete='off'
            style={errors.empId ? inputErrorStyle : inputStyle}
            value={formData.empId}
            onChange={handleChange}
          />
          {errors.empId && (
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: errorColor,
              }}
            >
              {errors.empId}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            College Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder='your.name@saveetha.ac.in'
            style={errors.email ? inputErrorStyle : inputStyle}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: errorColor,
              }}
            >
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id='password'
              name='password'
              type={showPassword ? "text" : "password"}
              autoComplete='new-password'
              style={{
                ...(errors.password ? inputErrorStyle : inputStyle),
                paddingRight: "2.5rem",
              }}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type='button'
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color='#9ca3af' />
              ) : (
                <Eye size={20} color='#9ca3af' />
              )}
            </button>
          </div>
          {errors.password && (
            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: errorColor,
              }}
            >
              {errors.password}
            </p>
          )}
          <p
            style={{
              marginTop: "0.25rem",
              fontSize: "0.75rem",
              color: "#6b7280",
            }}
          >
            Password must be at least 8 characters and include uppercase,
            lowercase, number, and special character.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "0.25rem",
            }}
          >
            Role
          </label>
          <select
            id='role'
            name='role'
            style={inputStyle}
            value={formData.role}
            onChange={handleChange}
          >
            <option value='EMPLOYEE'>EMPLOYEE</option>
          </select>
        </div>

        <div>
          <button
            type='button'
            onClick={handleSubmit}
            disabled={isLoading}
            style={isLoading ? disabledButtonStyle : buttonStyle}
          >
            {isLoading ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Loader2
                  className='animate-spin'
                  style={{ marginRight: "0.5rem" }}
                  size={16}
                />
                <span>Processing...</span>
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </div>

        <div
          style={{
            marginTop: "1.5rem",
            position: "relative",
            textAlign: "center",
          }}
        >
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              position: "absolute",
              top: "50%",
              width: "100%",
            }}
          ></div>
          <span
            style={{
              backgroundColor: "white",
              padding: "0 0.5rem",
              position: "relative",
              color: "#6b7280",
              fontSize: "0.875rem",
            }}
          >
            Already registered?
          </span>
        </div>

        <a href='/login' style={linkButtonStyle}>
          Sign in to your account
        </a>
      </div>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.75rem",
          color: "#6b7280",
        }}
      >
        <p>
          © {new Date().getFullYear()} Saveetha Engineering College. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
