import React, { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to fetch profile" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update profile
  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await api.put("/users/me", { name: user.name, email: user.email });
      setUser(res.data);
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update profile" });
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user.name) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Profile Page</h2>

      {/* Messages */}
      {message && (
        <div className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </div>
      )}

      {/* Profile Form */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          disabled={loading}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          disabled={loading}
        />
      </div>

      <button onClick={updateProfile} disabled={loading}>
        {loading ? "Updating..." : "Update Profile"}
      </button>
    </div>
  );
};

export default Profile;
