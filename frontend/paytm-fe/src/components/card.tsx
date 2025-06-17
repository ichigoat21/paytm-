import { Button } from "./button"

interface CardProps {
  text: string;
}

export const Card = ({ text }: CardProps) => {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md my-2">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-500 w-10 h-10 flex items-center justify-center text-white font-bold">
          U
        </div>
        <div className="text-base text-gray-800">{text}</div>
      </div>

      {/* Action Button */}
      <Button text="Send Money" />
    </div>
  );
};
