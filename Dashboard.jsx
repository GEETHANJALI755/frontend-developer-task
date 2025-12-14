import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToTasks = () => {
    navigate("/tasks"); // Navigate to the Task page
  };

  const goToProfile = () => {
  navigate("/profile"); // Navigate to Profile page
};


  return (
    <div>
      <h2>Dashboard Page</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={goToTasks} style={{ marginLeft: "10px" }}>
        Go to Tasks
      </button>
      <button onClick={goToProfile} style={{ marginLeft: "10px" }}>
      Go to Profile
    </button>
    </div>
  );
};

export default Dashboard;
