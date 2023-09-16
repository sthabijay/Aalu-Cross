interface props {
  children: any;
}

function TextBox({ children, ...props }: props) {
  return (
    <span
      className={`bg-gradient-to-r from-green-500 to-blue-500 w-full h-full p-1 text-center font-display rounded-md`}
      {...props}
    >
      <div className={`bg-white w-full h-full rounded-md`}>
        <div
          className={`bg-gradient-to-r from-green-500 to-blue-500 w-full h-full bg-clip-text text-transparent flex justify-center items-center`}
        >
          {children}
        </div>
      </div>
    </span>
  );
}
export default TextBox;
