
import { useRef } from "react";
import { Button } from "../components/button";
import { InputBox } from "../components/input";
import axios from "axios";
import { backend_URL } from "../config/backend";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Send = () => {
  const payRef = useRef()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id');
  const name = searchParams.get('name')
  const navigate = useNavigate()

  async function send(){
    const value = payRef.current?.value;
    const response = await axios.post(
      `${backend_URL}/accounts/transfer`,
      {
        account: id,
        amount: value
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    alert(response.data.message);
    navigate("/dashboard")
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        
        {/* Title */}
        <div className="text-2xl font-bold text-center mb-6 text-gray-800">
          Send Money
        </div>

        {/* Avatar and Info */}
        <div className="flex flex-col items-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-semibold">
            U
          </div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <InputBox reference={payRef} text="Amount (₹)" placeholder="Enter amount" />
        </div>

        {/* Button */}
        <div className="mt-4 flex justify-center ">
          <Button onClick={send} text="Send Money" />
        </div>
      </div>
    </div>
  );
};
