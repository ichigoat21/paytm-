import { Button } from "./button"

interface CardProps {
  text: string;
  onclick : ()=> void
}

export const Card = ({ text, onclick }: CardProps) => {
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
      <Button onClick={onclick} text="Send Money" />
    </div>
  );
};
