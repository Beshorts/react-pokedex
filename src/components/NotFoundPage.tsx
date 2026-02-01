import { Link } from "react-router";


export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-charcoal-100 flex flex-col rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          404 - PAGE NOT FOUND
        </h1>
        <Link className="text-white text-h3 cursor-pointer text-center underline" to="/">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
