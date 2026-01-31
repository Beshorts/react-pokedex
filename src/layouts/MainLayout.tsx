import { ErrorBoundary } from "../components/ErrorBoundary";
import { Navbar } from "../components/Navbar";
import { Search } from "../components/Search";
import { Home } from "../pages/Home";

export function MainLayout() {
  return (
    <div className=" flex flex-col">
      <Navbar />
      <div className="bg-charcoal-10">
        <div className="container mx-auto px-4 md:px-20">
          <Search />
        </div>
      </div>
      <main className="container mx-auto px-4 md:px-16">
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
      </main>
    </div>
  );
}
