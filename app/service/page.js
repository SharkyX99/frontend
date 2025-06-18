import Navigation from '../components/navigation.js';

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1>เกี่ยวกับ Nuttanawat Manakit</h1>
        <p>สวัสดีครับ ผมชื่อ Nuttanawat หรือ Shar นักพัฒนาเว็บด้วย Next.js...</p>
      </main>
    </>
  );
}

