import Image from "next/image";

export default function Home() {
  return (
<main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1>Nuttanawat Manakit</h1>
        <p>Home page</p>
      </main>
  );
}
