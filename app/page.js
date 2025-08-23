'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

const PremiumCarGallery = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showFab, setShowFab] = useState(false);
    const [heroText, setHeroText] = useState('');
    const [konamiCode, setKonamiCode] = useState([]);
    const [rainbowMode, setRainbowMode] = useState(false);

    const totalSlides = 5;
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    const heroTitle = ' Welcome to my World ';

    const carouselRef = useRef(null);
    const startXRef = useRef(0);
    const currentXRef = useRef(0);

    const cars = [
        {
            id: 1,
            image: '/images/sliders/car1.jpg',
            category: 'Performance',
            title: 'M5 Competition F90',
            description: 'Sport Car',
            specs: '617 HP • 0-100 km/h: 3.3s',
            link: 'https://www.bmw-m.com/en/topics/magazine-article-pool/der-bmw-m5-f90-von-2017.html'
        },
        {
            id: 2,
            image: '/images/sliders/car2.jpg',
            category: 'Hypercar',
            title: 'Lamborghini Aventador SVJ',
            description: 'Supercar',
            specs: '770 HP • 0-100 km/h: 2.8s',
            link: 'https://www.lamborghini.com/en-en/history/aventador-svj#val-ht'
        },
        {
            id: 3,
            image: '/images/sliders/car3.jpg',
            category: 'Luxury SUV',
            title: 'BMW XM (Gold Accent)',
            description: 'Full-size Luxury Performance SUV',
            specs: '644 HP • Hybrid Power',
            link: 'https://www.bmw.co.th/th/all-models/m-series/xm/2023/bmw-xm-overview.html'
        },
        {
            id: 4,
            image: '/images/sliders/car4.jpg',
            category: 'Supercar',
            title: 'Porsche 911 Turbo S',
            description: 'Supercar',
            specs: '650 HP • 0-100 km/h: 2.7s',
            link: 'https://www.porsche.com/pap/_thailand_/models/911/911-turbo-models/911-turbo-s/'
        },
        {
            id: 5,
            image: '/images/sliders/car5.jpg',
            category: 'Luxury Sedan',
            title: 'Mercedes-Maybach S 580 e',
            description: 'Ultra-Luxury Sedan',
            specs: '496 HP • 0-100 km/h: 4.8s',
            link: 'https://www.mercedes-benz.co.th/en/passengercars/mercedes-benz-cars/car-configurator.html/motorization/CCci/TH/en/bm/22397662_TH1,22397662_TH2,22397662_TH3,22397662_THA'
        },
        {
            id: 6,
            image: '/images/sliders/car6.jpg',
            category: 'Super GT',
            title: 'Ferrari 812 Superfast',
            description: 'Super GT (Grand Tourer)',
            specs: '800 HP • 0-100 km/h: 2.8s',
            link: 'https://www.ferrari.com/en-EN/auto/812-superfast'
        }
    ];

    const slides = [
        { type: 'video', content: '/images/sliders/video.mp4' },
        { type: 'image', content: '/images/sliders/1.jpg' }, // ใช้ path จาก public
        { type: 'image', content: '/images/sliders/2.jpg' },
        { type: 'image', content: '/images/sliders/3.jpg' },
        { type: 'image', content: '/images/sliders/4.jpg' }
    ];


    // Initialize effects
    useEffect(() => {
        // Loading screen
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Hero typing effect
        const typingTimer = setTimeout(() => {
            let i = 0;
            const type = () => {
                if (i < heroTitle.length) {
                    if (heroTitle.charAt(i) === '\n') {
                        setHeroText(prev => prev + '<br/>');
                    } else {
                        setHeroText(prev => prev + heroTitle.charAt(i));
                    }
                    i++;
                    setTimeout(type, 100);
                }
            };
            type();
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(typingTimer);
        };
    }, []);

    // Carousel auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % totalSlides);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Scroll events
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollPercent = (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

            // Update FAB visibility
            setShowFab(scrollY > 300);

            // Update progress bar
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }

            // Update background color
            const hue = 220 + (scrollPercent * 0.5);
            document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 8%) 0%, hsl(${hue + 20}, 60%, 12%) 30%, hsl(${hue + 10}, 65%, 15%) 60%, hsl(${hue + 30}, 75%, 18%) 100%)`;
        };

        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
    }, []);

    // Konami code
    useEffect(() => {
        const handleKeyDown = (e) => {
            setKonamiCode(prev => {
                const newCode = [...prev, e.keyCode];
                if (newCode.length > konamiSequence.length) {
                    newCode.shift();
                }

                if (newCode.length === konamiSequence.length &&
                    newCode.every((code, index) => code === konamiSequence[index])) {
                    setRainbowMode(true);
                    setTimeout(() => setRainbowMode(false), 10000);
                }

                return newCode;
            });

            // Carousel keyboard navigation
            if (e.key === 'ArrowLeft') {
                setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
            } else if (e.key === 'ArrowRight') {
                setCurrentSlide(prev => (prev + 1) % totalSlides);
            } else if (e.key === 'Home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Touch handlers
    const handleTouchStart = (e) => {
        startXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        currentXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diffX = startXRef.current - currentXRef.current;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                setCurrentSlide(prev => (prev + 1) % totalSlides);
            } else {
                setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
            }
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openLink = (url) => {
        window.open(url, '_blank');
    };

    // Loading Screen
    if (loading) {
        return (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                    background: 'linear-gradient(135deg, #0f0f23, #1a1a2e)',
                    zIndex: 9999
                }}>
                <div className="text-center">
                    <div className="spinner-border text-danger mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h3 className="text-white">Loading Premium Experience...</h3>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Bootstrap CSS CDN */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />

            {/* Custom Styles */}
            <style jsx>{`
        .premium-container {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          color: white;
          overflow-x: hidden;
          position: relative;
        }

        /* Progress Bar */
        .progress-bar-custom {
          position: fixed;
          top: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(90deg, #ff6b6b, #feca57, #48cae4);
          z-index: 9999;
          transition: width 0.1s ease;
        }

        /* Floating Particles */
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255,107,107,0.8) 0%, rgba(254,202,87,0.4) 100%);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .particle:nth-child(1) { width: 4px; height: 4px; left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { width: 6px; height: 6px; left: 20%; animation-delay: 2s; }
        .particle:nth-child(3) { width: 3px; height: 3px; left: 30%; animation-delay: 4s; }
        .particle:nth-child(4) { width: 5px; height: 5px; left: 40%; animation-delay: 6s; }
        .particle:nth-child(5) { width: 4px; height: 4px; left: 50%; animation-delay: 8s; }
        .particle:nth-child(6) { width: 7px; height: 7px; left: 60%; animation-delay: 10s; }
        .particle:nth-child(7) { width: 3px; height: 3px; left: 70%; animation-delay: 12s; }
        .particle:nth-child(8) { width: 5px; height: 5px; left: 80%; animation-delay: 14s; }
        .particle:nth-child(9) { width: 4px; height: 4px; left: 90%; animation-delay: 16s; }
        .particle:nth-child(10) { width: 6px; height: 6px; left: 95%; animation-delay: 18s; }

        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        /* Hero Section */
        .hero-section {
          height: 100vh;
          background: 
            radial-gradient(ellipse at top, rgba(255,107,107,0.1) 0%, transparent 50%),
            radial-gradient(ellipse at bottom, rgba(72,202,228,0.1) 0%, transparent 50%);
        }

        .hero-title {
          font-size: clamp(3rem, 8vw, 7rem);
          font-weight: 900;
          background: linear-gradient(135deg, #ff6b6b, #feca57, #48cae4, #0096c7);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
          text-shadow: 0 0 50px rgba(255,107,107,0.5);
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-highlight {
          background: linear-gradient(135deg, #ff6b6b, #feca57);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .btn-gradient {
          background: linear-gradient(135deg, #ff6b6b, #feca57);
          border: none;
          color: white;
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 107, 107, 0.4);
          color: white;
        }

        .btn-outline-custom {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .btn-outline-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        /* Section Titles */
        .section-title {
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #48cae4, #0096c7, #feca57);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Gallery Section */
        .gallery-bg {
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }

        .carousel-custom {
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .carousel-item-custom {
          height: 500px;
          background: linear-gradient(45deg, #ff6b6b, #feca57);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          color: white;
          position: relative;
        }

        .media-indicator {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .carousel-control-custom {
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          font-size: 24px;
          transition: all 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
        }

        .carousel-control-custom:hover {
          background: rgba(255, 107, 107, 0.8);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-50%) scale(1.1);
          color: white;
        }

        /* Car Cards */
        .car-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }

        .car-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,107,107,0.1), rgba(72,202,228,0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .car-card:hover::before {
          opacity: 1;
        }

        .car-card:hover {
          transform: translateY(-20px) scale(1.02);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.6),
            0 0 30px rgba(255, 107, 107, 0.3);
          border-color: rgba(255, 107, 107, 0.4);
        }

        .car-image {
          height: 250px;
          background: linear-gradient(45deg, #16213e, #0f3460);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          transition: transform 0.4s ease;
          overflow: hidden;
          border-radius: 15px 15px 0 0;
        }

        .car-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .car-card:hover .car-image {
          transform: scale(1.1);
        }

        .car-card:hover .car-image img {
          transform: scale(1.05);
        }

        .car-category {
          background: linear-gradient(135deg, #ff6b6b, #57adfeff);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: inline-block;
        }

        .car-title {
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .car-btn {
          background: linear-gradient(135deg, #ff6b6b, #feca57);
          border: none;
          color: white;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .car-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .car-btn:hover::before {
          left: 100%;
        }

        .car-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 107, 107, 0.4);
          color: white;
        }

        /* Footer */
        .footer-bg {
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(10px);
        }

        .footer-title {
          background: linear-gradient(135deg, #ff6b6b, #feca57);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .social-btn {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 1.5rem;
        }

        .social-btn:hover {
          background: rgba(255, 107, 107, 0.3);
          transform: translateY(-2px);
          color: white;
          text-decoration: none;
        }

        /* FAB */
        .fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b, #feca57);
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255,107,107,0.4);
          transition: all 0.3s ease;
          z-index: 1000;
          opacity: ${showFab ? '1' : '0'};
          pointer-events: ${showFab ? 'auto' : 'none'};
        }

        .fab:hover {
          transform: scale(1.1);
        }

        /* Rainbow mode */
        .rainbow-mode {
          animation: rainbow 2s infinite;
        }

        @keyframes rainbow {
          0%, 100% { filter: hue-rotate(0deg); }
          16.66% { filter: hue-rotate(60deg); }
          33.33% { filter: hue-rotate(120deg); }
          50% { filter: hue-rotate(180deg); }
          66.66% { filter: hue-rotate(240deg); }
          83.33% { filter: hue-rotate(300deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem !important;
          }
          
          .section-title {
            font-size: 2.5rem !important;
          }
          
          .car-image {
            height: 200px !important;
          }
        }
      `}</style>

            <div className={`premium-container ${rainbowMode ? 'rainbow-mode' : ''}`}>

                {/* Progress Bar */}
                <div id="progressBar" className="progress-bar-custom" style={{ width: '0%' }}></div>

                {/* Floating Particles */}
                <div className="particles">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="particle"></div>
                    ))}
                </div>

                {/* Hero Section */}
                <section className="hero-section d-flex align-items-center justify-content-center text-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h1
                                    className="hero-title mb-4"
                                    dangerouslySetInnerHTML={{ __html: heroText }}
                                />
                                <p className="fs-4 fw-light mb-5 opacity-75">
                                    Welcome to my <span className="hero-highlight">Dream Premium Garage</span>
                                </p>
                                <div className="d-flex gap-3 justify-content-center flex-wrap">
                                    <button
                                        className="btn btn-gradient btn-lg rounded-pill px-4 py-3"
                                        onClick={() => scrollToSection('gallery')}
                                    >
                                        🖼️ View Gallery
                                    </button>
                                    <button
                                        className="btn btn-outline-custom btn-lg rounded-pill px-4 py-3"
                                        onClick={() => scrollToSection('collection')}
                                    >
                                        🚗 Explore Cars
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section id="gallery" className="py-5 gallery-bg">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center mb-5">
                                <h2 className="section-title mb-4">Work Gallery</h2>
                                <p className="fs-5 opacity-75">Experience our premium showcase with images and videos</p>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="carousel-custom position-relative overflow-hidden">
                                    <div
                                        className="d-flex transition-all"
                                        style={{
                                            transform: `translateX(-${currentSlide * 20}%)`,
                                            width: '500%',
                                            transition: 'transform 0.5s ease-in-out'
                                        }}
                                        onTouchStart={handleTouchStart}
                                        onTouchMove={handleTouchMove}
                                        onTouchEnd={handleTouchEnd}
                                    >
                                        {slides.map((slide, index) => (
                                            <div
                                                key={index}
                                                className="flex-shrink-0"
                                                style={{
                                                    width: `${100 / slides.length}%`, // กว้างเท่ากับ container / จำนวน slide
                                                    height: '400px',                 // ความสูงของกรอบ
                                                    overflow: 'hidden',              // ซ่อนส่วนเกิน
                                                    borderRadius: '12px',            // ทำมุมโค้ง
                                                }}
                                            >
                                                {slide.type === 'image' ? (
                                                    <img
                                                        src={slide.content}
                                                        alt={`Slide ${index + 1}`}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                    />
                                                ) : (
                                                    <video
                                                        src={slide.content}
                                                        autoPlay
                                                        muted        // ต้อง muted ถึง autoplay บน browser ได้
                                                        loop
                                                        playsInline  // ป้องกัน fullscreen บนมือถือ
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                    />

                                                )}

                                            </div>
                                        ))}

                                    </div>

                                    {/* Navigation Controls */}
                                    <button
                                        className="carousel-control-custom position-absolute start-0 ms-3 d-flex align-items-center justify-content-center"
                                        onClick={() => setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides)}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        className="carousel-control-custom position-absolute end-0 me-3 d-flex align-items-center justify-content-center"
                                        onClick={() => setCurrentSlide(prev => (prev + 1) % totalSlides)}
                                    >
                                        ›
                                    </button>

                                    {/* Dots Navigation */}
                                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
                                        <div className="d-flex gap-2 bg-dark bg-opacity-50 px-3 py-2 rounded-pill">
                                            {[...Array(totalSlides)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`border-0 rounded-pill ${index === currentSlide
                                                        ? 'bg-white'
                                                        : 'bg-white bg-opacity-50'
                                                        }`}
                                                    style={{
                                                        width: index === currentSlide ? '24px' : '12px',
                                                        height: '12px',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onClick={() => setCurrentSlide(index)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* Cars Collection Section */}
                <section id="collection" className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center mb-5">
                                <h2 className="section-title mb-4">Premium Collection</h2>
                                <p className="fs-5 opacity-75">Explore our luxury car selection</p>
                            </div>
                        </div>

                        <div className="row g-4">
                            {cars.map((car, index) => (
                                <div key={car.id} className="col-lg-4 col-md-6">
                                    <div className="car-card h-100">
                                        <div className="car-image">
                                            <img 
                                                src={car.image} 
                                                alt={car.title}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="p-4 position-relative" style={{ zIndex: 2 }}>
                                            <span className="car-category mb-3">{car.category}</span>
                                            <h3 className="car-title h5 mb-2">{car.title}</h3>
                                            <p className="text-white mb-2">{car.description}</p>
                                            <p className="small opacity-75 mb-4">{car.specs}</p>
                                            <button
                                                className="car-btn btn rounded-pill px-4 py-2"
                                                onClick={() => openLink(car.link)}
                                            >
                                                Learn More →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Floating Action Button */}
                <button
                    className="fab"
                    onClick={scrollToTop}
                >
                    ↑
                </button>

                {/* Bootstrap JS */}
                <Script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
                    strategy="afterInteractive"
                />

            </div>
        </>
    );
};

export default PremiumCarGallery;