import { Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { Navbar } from "../components/Navbar";
import { Search } from "../components/Search";

export function MainLayout() {

  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  return (
    <div className=" flex flex-col">
      <Navbar />
    { isHomePage && (
        <div className="bg-charcoal-10">
        <div className="container mx-auto px-4 md:px-20">
          <Search />
        </div>
      </div>
    )}
      <main className="container mx-auto px-4 md:px-16">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
