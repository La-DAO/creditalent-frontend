import Header from "@/components/Header";
import Landing from "@/components/Landing";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50 to-white">
      <Header />
      <Landing />
      <Footer />
    </div>
   );
}
