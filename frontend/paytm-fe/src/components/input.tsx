interface InputProps {
    text?: string;
    placeholder?: string;
    addStyles? : string,
    reference : any,
    onchange : ()=> {},
    value : string
  }
  
  export const InputBox = ({ text, placeholder, addStyles, reference, onchange, value }: InputProps) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-medium dark:text-white">
          {text}
        </label>
        <input
          ref={reference}
          placeholder={placeholder}
          className={`mx-4 p-3 rounded-lg border text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${addStyles}`}
          onChange={onchange}
          value={value}
        />
      </div>
    );
  };
  