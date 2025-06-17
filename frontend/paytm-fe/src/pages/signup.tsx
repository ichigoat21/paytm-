import { Button } from "../components/button";
import { InputBox } from "../components/input";


export const Signup = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-black">Sign Up</h2>
          <p className="text-sm text-gray-600">Enter your information to create an account</p>
        </div>

        <div className="space-y-4 flex flex-col justify-center">
          <InputBox placeholder="John Doe" text="Username" />
          <InputBox placeholder="********" text="Password" />
          <div className="flex justify-center items-center mt-4">
          <Button text="Sign Up" />
          </div>
        </div>
 
        <div className="mt-4 text-sm text-center text-gray-700">
          Already have an account? Login
        </div>
      </div>
    </div>
  );
};
