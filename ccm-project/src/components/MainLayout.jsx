import { Outlet } from "react-router-dom";
import { Header, Footer } from "./header";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default MainLayout;