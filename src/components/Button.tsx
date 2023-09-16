import { ButtonHTMLAttributes } from "react";

interface Buttonprops extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

function Button({ children, selected, disabled, ...props }: Buttonprops) {
  return (
    <button
      className={`bg-gradient-to-r from-green-500 to-blue-500 w-full h-full p-1 text-center font-display rounded-md transition-all duration-300  active:scale-95 disabled:opacity-2 disabled:hue-rotate-0 disabled:scale-100 ${
        selected
          ? "hover:scale-100 hover:hue-rotate-30"
          : "hover:hue-rotate-90 hover:scale-105"
      } ${disabled ? "opacity-25" : null}`}
      disabled={disabled ? true : false}
      {...props}
    >
      <div
        className={`bg-white w-full h-full rounded-md ${
          selected ? "bg-gradient-to-r from-green-500 to-blue-500" : ""
        }`}
      >
        <div
          className={`bg-gradient-to-r from-green-500 to-blue-500 w-full h-full bg-clip-text text-transparent grid place-content-center ${
            selected ? "text-white" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </button>
  );
}
export default Button;
