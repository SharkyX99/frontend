import Carousel from "./components/carousel";
import Card from "./components/Card"; // Make sure this matches your actual filename


export default function Home() {
  return (
    <div className="row">
      <div className="col-12">
        <Carousel />

        <div className="container my-5">
          <div className="text-center mb-4">
            <h1 className="display-4">Nuttanawat Manakit</h1>
            <p className="lead">Welcome to my Garage</p>
          </div>

          {/* Card Section (Cars) */}
          <Card />

          {/* Additional Info Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <h3 className="card-title">พร้อมที่จะเริ่มต้นโปรเจคใหม่?</h3>
                  <p className="card-text">
                    ไม่ว่าคุณจะต้องการพัฒนาเว็บไซต์ใหม่ หรือปรับปรุงเว็บไซต์เดิม เราพร้อมช่วยเหลือคุณ
                  </p>
                  <a href="/contact" className="btn btn-success btn-lg">เริ่มต้นเลย</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}