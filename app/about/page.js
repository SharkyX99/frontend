import navigation from './components/navigation';
export default function AboutPage() {
  return (
    <>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        
        <Carousel />
        <h1>Nuttanawat Manakit</h1>
        <p>About</p>
      </main>
    </>
  );
}

