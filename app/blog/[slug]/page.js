// เอาบรรทัดนี้ออก
// import Navigation from '../../../components/Navigation';

// เหลือแค่ components อื่น ๆ ที่จำเป็น
export default function BlogPost({ params }) {
  return (
    <div className="row">
      <div className="col-12">
        {/* เนื้อหาของ blog post */}
        <h1>Blog Post: {params.slug}</h1>
        <p>This is the blog post content.</p>
      </div>
    </div>
  );
}