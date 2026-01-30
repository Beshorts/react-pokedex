
export function LoadingSpinner() {

  return (
    <div
      className="flex min-h-125 items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Animated Spinner"
    >
      <div className="text-center">
        <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
          <span className="sr-only">Loading...</span>
        </div>
        <h1 className="font-extrabold  text-red-700">
          Loading Data...
        </h1>
      </div>
    </div>
  );
}