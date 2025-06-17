import { Card } from "../components/card";
import { InputBox } from "../components/input"

export const Dashboard = () => {
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
        <div className="text-lg font-medium text-gray-700">Your Balance: <span className="font-bold">$5000</span></div>
      </div>

      {/* Users label */}
      <div className="w-full max-w-4xl mb-2">
        <div className="text-xl font-semibold text-gray-800">Users</div>
      </div>

      {/* Search input */}
      <div className="w-full max-w-4xl">
        <InputBox text="Search users..." placeholder="Search users..." />
      </div>
      <div className="w-full max-w-4xl">
        <Card text="User 1"></Card>
        <Card text="User 2"></Card>
        <Card text="User 3"></Card>
      </div>
    </div>
  );
}
