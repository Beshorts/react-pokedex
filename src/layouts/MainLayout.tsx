import { ErrorBoundary } from "../components/ErrorBoundary";
import { Navbar } from "../components/Navbar";
import { Home } from "../pages/Home";

export function MainLayout() {
  return (
    <div className=" flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 md:px-16">
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </main>
    </div>
  );
}
