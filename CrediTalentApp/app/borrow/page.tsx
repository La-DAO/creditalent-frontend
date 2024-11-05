import Borrow from "@/components/Borrow";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50 to-white">
      <Header />
      <Borrow />
      <Footer />
    </div>
   );
}