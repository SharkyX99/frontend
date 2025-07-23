"use client";

import { useState, useEffect } from 'react';

// Carousel component integrated directly
function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      src: "/images/sliders/1.png",
      alt: "First slide"
    },
    {
      src: "/images/sliders/2.png", 
      alt: "Second slide"
    },
    {
      src: "/images/sliders/3.png",
      alt: "Third slide"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '400px',
      overflow: 'hidden',
      borderRadius: '20px'
    }}>
      {/* Slides */}
      <div style={{
        display: 'flex',
        width: `${slides.length * 100}%`,
        height: '100%',
        transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
        transition: 'transform 0.5s ease-in-out'
      }}>
        {slides.map((slide, index) => (
          <div key={index} style={{
            width: `${100 / slides.length}%`,
            height: '100%',
            position: 'relative'
          }}>
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        &#8249;
      </button>

      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
        }}
      >
        &#8250;
      </button>

      {/* Dots Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: currentSlide === index 
                ? 'linear-gradient(135deg, #ff6b6b, #feca57)' 
                : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const cars = [
    {
      title: "M5 Competition F90",
      text: "Sport Car",
      img: "/images/sliders/car1.jpg",
      link: "https://www.bmw-m.com/en/topics/magazine-article-pool/der-bmw-m5-f90-von-2017.html",
      btnText: "Learn More",
      category: "Performance",
      specs: "617 HP • 0-100 km/h: 3.3s"
    },
    {
      title: "Lamborghini Aventador SVJ",
      text: "Supercar",
      img: "/images/sliders/car2.jpg",
      link: "https://www.lamborghini.com/en-en/history/aventador-svj#val-ht",
      btnText: "Learn More",
      category: "Hypercar",
      specs: "770 HP • 0-100 km/h: 2.8s"
    },
    {
      title: "BMW XM (Gold Accent)",
      text: "Full-size Luxury Performance SUV",
      img: "/images/sliders/car3.jpg",
      link: "https://www.bmw.co.th/th/all-models/m-series/xm/2023/bmw-xm-overview.html",
      btnText: "Learn More",
      category: "Luxury Performance SUV",
      specs: "644 HP • Hybrid Power"
    },
    {
      title: "Porsche 911 Turbo S",
      text: "Supercar",
      img: "/images/sliders/car4.jpg",
      link: "https://www.porsche.com/pap/_thailand_/models/911/911-turbo-models/911-turbo-s/",
      btnText: "Learn More",
      category: "Supercar",
      specs: "650 HP • 0-100 km/h: 2.7s"
    },
    {
      title: "Mercedes-Maybach S 580 e Premium (Maybach two-tone paint)",
      text: "Ultra-Luxury Sedan",
      img: "/images/sliders/car5.jpg",
      link: "https://www.mercedes-benz.co.th/en/passengercars/mercedes-benz-cars/car-configurator.html/configuration/CCci/TH/en/en_TH__22397662_THA__L-922_P-515_S-13U-14U-16U-17U-223-224-233-235-236-243-249-260-266-275-276-282-292-293-297-2U3-302-306-317-321-322-323-325-326-32U-33U-351-355-365-367-382-401-402-406-413-421-439-43B-447-449-452-453-475-481-489-49U-501-534-53R-540-543-561-562-581-582-587-596-5U2-628-63B-65U-726-727-72B-735-77B-78B-805-810-82B-83B-854-868-871-874-878-881-883-887-889-88B-891-897-898-902-903-942-B36-B51-B53-C31-H17-L2D-P07-P09-P20-P21-P34-P43-P47-P53-P64-PBG-R06-U01-U07-U10-U14-U19-U22-U25-U35-U58/summary",
      btnText: "Learn More",
      category: "Luxury Sedan",
      specs: "496 HP • 0-100 km/h: 4.8s"
    },
    {
      title: "Ferrari 812 Superfast",
      text: "Super GT (Grand Tourer)",
      img: "/images/sliders/car6.jpg",
      link: "https://www.ferrari.com/en-EN/auto/812-superfast",
      btnText: "Learn More",
      category: "Super GT",
      specs: "800 HP • 0-100 km/h: 2.8s"
    },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: 0.3,
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'linear-gradient(45deg, #48cae4, #0096c7)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: 0.2,
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        {/* Hero Content */}
        <div style={{
          textAlign: 'center',
          zIndex: 2,
          maxWidth: '800px',
          padding: '0 2rem'
        }}>
          <div style={{
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 'bold',
              margin: 0,
              background: 'linear-gradient(135deg, #ff6b6b, #feca57, #48cae4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 50px rgba(255, 107, 107, 0.3)',
              animation: 'glow 3s ease-in-out infinite alternate'
            }}>
              Nuttanawat Manakit
            </h1>
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '4px',
              background: 'linear-gradient(90deg, #ff6b6b, #feca57, #48cae4)',
              borderRadius: '2px',
              animation: 'pulse 2s ease-in-out infinite'
            }}></div>
          </div>
          
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '3rem',
            opacity: 0.9,
            fontWeight: '300',
            letterSpacing: '1px'
          }}>
            Welcome to my <span style={{
              background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '600'
            }}>Premium Garage</span>
          </p>

          <button
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '50px',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 107, 107, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 107, 107, 0.3)';
            }}
            onClick={() => {
              document.getElementById('carousel-section').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            🏎️ Explore Collection
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '25px',
            position: 'relative'
          }}>
            <div style={{
              width: '4px',
              height: '10px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '2px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scroll 2s infinite'
            }}></div>
          </div>
        </div>
      </div>

      {/* Carousel Section - NEW ADDITION */}
      <div id="carousel-section" style={{
        padding: '4rem 0',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #feca57, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Work gallery
          </h2>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.8,
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Experience our premium showcase in motion
          </p>
        </div>
        
        {/* Carousel Container with styling to match the theme */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <Carousel />
        </div>
      </div>

      {/* Cars Section */}
      <div id="cars-section" style={{
        padding: '5rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #48cae4, #0096c7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Premium Collection
          </h2>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.8,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover the finest selection of high-performance vehicles, each representing the pinnacle of automotive engineering
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {cars.map((car, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                boxShadow: hoveredCard === index 
                  ? '0 25px 50px rgba(0, 0, 0, 0.3)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                position: 'relative',
                height: '250px',
                overflow: 'hidden'
              }}>
                <img
                  src={car.img}
                  alt={car.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                    transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(255, 107, 107, 0.9)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {car.category}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))'
                }}></div>
              </div>

              <div style={{
                padding: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: 'white'
                }}>
                  {car.title}
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                  fontSize: '1rem'
                }}>
                  {car.text}
                </p>
                <p style={{
                  color: '#feca57',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  {car.specs}
                </p>
                <a
                  href={car.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #48cae4, #0096c7)',
                    color: 'white',
                    padding: '0.8rem 2rem',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(72, 202, 228, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(72, 202, 228, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(72, 202, 228, 0.3)';
                  }}
                >
                  {car.btnText} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
          100% { text-shadow: 0 0 30px rgba(255, 107, 107, 0.8), 0 0 40px rgba(254, 202, 87, 0.5); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes scroll {
          0% { transform: translateX(-50%) translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-50%) translateY(15px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}