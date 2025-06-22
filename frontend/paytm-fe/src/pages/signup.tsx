import { useRef } from "react";
import { Button } from "../components/button";
import { InputBox } from "../components/input";
import axios from "axios";
import { backend_URL } from "../config/backend";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const relink = useNavigate();

  async function getUserInputs(){
    const username = userRef.current?.value;
    const password = passRef.current?.value;

    const response = await axios.post(`${backend_URL}/users/signup`, {
      username : username,
      password : password
    });
    const token = response.data.token;
    window.localStorage.setItem("token", token);
    navigate("/dashboard")
  }
  function naviSignup(){
    relink("/signin")
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-black">Sign Up</h2>
          <p className="text-sm text-gray-600">Enter your information to create an account</p>
        </div>

        <div className="space-y-4 flex flex-col justify-center">
          <InputBox reference={userRef} placeholder="John Doe" text="Username" />
          <InputBox reference={passRef} placeholder="********" text="Password" />
          <div className="flex justify-center items-center mt-4">
          <Button onClick={getUserInputs} text="Sign Up" />
          </div>
        </div>
 
        <div className="mt-4 text-sm text-center text-gray-700">
          Already have an account? <span onClick={naviSignup} className="cursor-pointer">Signin</span>
        </div>
      </div>
    </div>
  );
};
