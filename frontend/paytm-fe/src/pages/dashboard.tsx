import { useEffect, useState } from "react";
import { Card } from "../components/card";
import { InputBox } from "../components/input";
import axios from "axios";
import { backend_URL } from "../config/backend";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBalance() {
      try {
        const response = await axios.get(`${backend_URL}/accounts/balance`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    }

    fetchBalance();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(`${backend_URL}/users/bulk?filter=${filter}`);
        setUsers(response.data.user);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [filter]);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-6">
        <div className="text-2xl font-bold text-gray-800">Payments App</div>
        <div className="flex items-center gap-3">
          <div className="text-base text-gray-600">Hello, User</div>
          <div className="rounded-full bg-blue-500 w-8 h-8 flex items-center justify-center text-white font-semibold">
            U
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="w-full max-w-4xl mb-4">
        <div className="text-lg font-medium text-gray-700">
          Your Balance: <span className="font-bold">${balance}</span>
        </div>
      </div>

      {/* Users label */}
      <div className="w-full max-w-4xl mb-2">
        <div className="text-xl font-semibold text-gray-800">Users</div>
      </div>

      {/* Search input */}
      <div className="w-full max-w-4xl mb-4">
        <InputBox
          value={filter}
          onchange={(e) => setFilter(e.target.value)}
          text="Search users..."
          placeholder="Search users..."
        />
      </div>

      {/* User list */}
      <div className="w-full max-w-4xl space-y-2">
        {users.map((user) => (
          <Card
            key={user._id}
            text={user.username}
            onClick={() => {
              navigate(`/send?id=${user._id}&name=${user.username}`);
            }}
          />
        ))}
      </div>
    </div>
  );
};
