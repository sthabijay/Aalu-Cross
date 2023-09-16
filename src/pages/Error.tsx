function Error() {
  return (
    <div
      className={`bg-red-100 h-[200px] w-[800px] rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-content-center text-5xl font-display border-4 border-red-500 text-center text-red-500`}
    >
      Page Not Found <br /> Error 404
    </div>
  );
}
export default Error;
