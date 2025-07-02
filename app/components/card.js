import Image from "next/image";

export default function Card() {
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
