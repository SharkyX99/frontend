import Carousel from "./components/carousel";
import Image from "next/image";

// Inline Card Component
function Card() {
  const cards = [
    {
      title: "M5 competition f90",
      text: "Sport car",
      img: "/images/sliders/car1.jpg",
      link: "https://www.bmw-m.com/en/topics/magazine-article-pool/der-bmw-m5-f90-von-2017.html",
      btnText: "Learn more",
    },
    {
      title: "lamborghini aventador svj",
      text: "Supercar",
      img: "/images/sliders/car2.jpg",
      link: "https://www.lamborghini.com/en-en/history/aventador-svj#val-ht",
      btnText: "Learn more",
    },
    {
      title: "BMW XM (Gold Accent)",
      text: "luxury suv high performance",
      img: "/images/sliders/car3.jpg",
      link: "https://www.bmw.co.th/th/all-models/m-series/xm/2023/bmw-xm-overview.html",
      btnText: "Learn more",
    },
  ];

  return (
    <div className="row justify-content-center">
      {cards.map((card, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card h-100">
            <Image
              src={card.img}
              className="card-img-top"
              alt={card.title}
              width={300}
              height={200}
              style={{ objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text flex-grow-1">{card.text}</p>
              <a href={card.link} className="btn btn-primary mt-auto">{card.btnText}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

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