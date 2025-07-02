import Carousel from "./components/carousel";
import Footer from "./components/footer"; // ✅ ตัวใหญ่ตรง Export
import navigation from './components/navigation';

export default function Home() {
  return (
    <>
      <Carousel />
      <h1 className="text-center">Nuttanawat Manakit</h1>
      <Footer /> {/* ✅ เรียกเป็นตัวใหญ่ตรง Export */}
    </>
  );
}
