import React, { useMemo, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { useAdminLoginMutation } from "../../../services/api/endPoints/auth.endpoints";
import { setCredentials } from "../authSlice";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [adminLogin, { isLoading, error }] = useAdminLoginMutation();

  const errorMsg = useMemo(
    () => error?.data?.message || error?.error || "",
    [error]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await adminLogin(formData).unwrap();

      if (res?.success) {
        dispatch(
          setCredentials({
            token: res.token,
            adminName: res?.admin?.name || "Admin",
          })
        );
        navigate("/dashboard", { replace: true });
      } else {
        // if backend returns success:false with 200 status
        // show message if it exists
      }
    } catch (_) {
      // error shown via errorMsg
    }
  };

  return (
    <div className="login-wrap">
      {/* <div className="login-bg" /> */}

      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">IS</div>
          <div>
            <div className="login-title">InternSharks</div>
            <div className="login-subtitle">Admin Panel</div>
          </div>
        </div>

        <h2 className="login-heading">Sign in</h2>
        <p className="login-desc">Enter your admin credentials to continue.</p>

        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3">
            <Form.Label className="login-label">Email</Form.Label>
            <Form.Control
              className="login-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user name"
              autoComplete="username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="login-label">Password</Form.Label>
            <Form.Control
              className="login-input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              // placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </Form.Group>

          <Button className="login-btn w-100" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner size="sm" animation="border" />{" "}
                <span style={{ marginLeft: 8 }}>Logging in...</span>
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="login-foot">
            <span>© {new Date().getFullYear()} InternSharks</span>
          </div>
        </Form>
      </div>
    </div>
  );
}