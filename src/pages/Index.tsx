import PublicNavbar from "../components/Navbar";
import Hero from "../components/Hero";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="relative">
        <Hero />
      </main>
    </div>
  );
};

export default Index;
