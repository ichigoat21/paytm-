import { Button } from "../components/button";
import { InputBox } from "../components/input";

export const Send = () => {
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
          <h2 className="text-lg font-semibold text-gray-800">Friend's Name</h2>
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <InputBox text="Amount (₹)" placeholder="Enter amount" />
        </div>

        {/* Button */}
        <div className="mt-4 flex justify-center ">
          <Button text="Send Money" />
        </div>
      </div>
    </div>
  );
};
