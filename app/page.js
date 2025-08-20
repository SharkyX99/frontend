'use client';

import { useState, useEffect } from 'react';

// Carousel component
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: '/images/sliders/video.mp4', alt: 'First slide', type: 'video' },
    { src: '/images/sliders/2.jpg', alt: 'Second slide', type: 'image' },
    { src: '/images/sliders/3.jpg', alt: 'Third slide', type: 'image' },
    { src: '/images/sliders/4.jpg', alt: 'Fourth slide', type: 'image' },
    { src: '/images/sliders/5.jpg', alt: 'Fifth slide', type: 'image' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', borderRadius: '20px', background: '#000' }}>
      <div style={{
        display: 'flex',
        width: `${slides.length * 100}%`,
        height: '100%',
        transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
        transition: 'transform 0.5s ease-in-out'
      }}>
        {slides.map((slide, index) => (
          <div key={index} style={{ width: `${100 / slides.length}%`, height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {slide.type === 'video' ? (
              <video
                src={slide.src}
                autoPlay={currentSlide === index}
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img src={slide.src} alt={slide.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}

            {/* Media Type Indicator */}
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              {slide.type === 'video' ? <>🎥 VIDEO</> : <>📸 IMAGE</>}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button onClick={prevSlide} style={arrowStyle(false)}>❮</button>
      <button onClick={nextSlide} style={arrowStyle(true)}>❯</button>

      {/* Dots */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        background: 'rgba(0,0,0,0.3)',
        padding: '10px 15px',
        borderRadius: '25px',
        backdropFilter: 'blur(10px)'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentSlide === index ? '24px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Arrow button style helper
const arrowStyle = (next) => ({
  position: 'absolute',
  top: '50%',
  left: next ? 'auto' : '20px',
  right: next ? '20px' : 'auto',
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.7)',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white',
  fontSize: '24px',
  zIndex: 10,
  border: '2px solid rgba(255,255,255,0.3)'
});

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cars = [
    { title: "M5 Competition F90", text: "Sport Car", img: "/images/sliders/car1.jpg", link: "https://www.bmw-m.com/en/topics/magazine-article-pool/der-bmw-m5-f90-von-2017.html", btnText: "Learn More", category: "Performance", specs: "617 HP • 0-100 km/h: 3.3s" },
    { title: "Lamborghini Aventador SVJ", text: "Supercar", img: "/images/sliders/car2.jpg", link: "https://www.lamborghini.com/en-en/history/aventador-svj#val-ht", btnText: "Learn More", category: "Hypercar", specs: "770 HP • 0-100 km/h: 2.8s" },
    { title: "BMW XM (Gold Accent)", text: "Full-size Luxury Performance SUV", img: "/images/sliders/car3.jpg", link: "https://www.bmw.co.th/th/all-models/m-series/xm/2023/bmw-xm-overview.html", btnText: "Learn More", category: "Luxury Performance SUV", specs: "644 HP • Hybrid Power" },
    { title: "Porsche 911 Turbo S", text: "Supercar", img: "/images/sliders/car4.jpg", link: "https://www.porsche.com/pap/_thailand_/models/911/911-turbo-models/911-turbo-s/", btnText: "Learn More", category: "Supercar", specs: "650 HP • 0-100 km/h: 2.7s" },
    { title: "Mercedes-Maybach S 580 e Premium", text: "Ultra-Luxury Sedan", img: "/images/sliders/car5.jpg", link: "https://www.mercedes-benz.co.th/en/passengercars/mercedes-benz-cars/car-configurator.html", btnText: "Learn More", category: "Luxury Sedan", specs: "496 HP • 0-100 km/h: 4.8s" },
    { title: "Ferrari 812 Superfast", text: "Super GT (Grand Tourer)", img: "/images/sliders/car6.jpg", link: "https://www.ferrari.com/en-EN/auto/812-superfast", btnText: "Learn More", category: "Super GT", specs: "800 HP • 0-100 km/h: 2.8s" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', zIndex: 2, maxWidth: '800px', padding: '0 2rem' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 'bold',
            margin: 0,
            background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48cae4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome to My World
          </h1>
          <p style={{ fontSize: '1.5rem', marginTop: '1rem', fontWeight: '300' }}>
            Welcome to my <span style={{ fontWeight: '600', background: 'linear-gradient(135deg, #ff6b6b, #feca57)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium Garage</span>
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div id="carousel-section" style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #feca57, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Work Gallery</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>Experience our premium showcase with images and videos</p>
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
          <Carousel />
        </div>
      </div>

      {/* Cars Section */}
      <div id="cars-section" style={{ padding: '5rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #48cae4, #0096c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium Collection</h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Explore our luxury car selection</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
          gap: '2rem'
        }}>
          {cars.map((car, index) => (
            <a
              href={car.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#111',
                borderRadius: '20px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'white',
                boxShadow: hoveredCard === index ? '0 15px 40px rgba(0,0,0,0.5)' : '0 10px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
            >
              <img src={car.img} alt={car.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.6rem', fontWeight: '700' }}>{car.title}</h3>
                <p style={{ margin: '0 0 1rem', fontSize: '0.95rem', color: '#aaa' }}>{car.text}</p>
                <p style={{ fontSize: '0.85rem', color: '#fff', opacity: 0.8 }}>{car.category} • {car.specs}</p>
                <button style={{
                  marginTop: '1rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#ff6b6b',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: '0.3s'
                }}>{car.btnText}</button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
