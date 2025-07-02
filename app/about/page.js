"use client"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl bg-white rounded-xl shadow-md p-10 text-center">
        {/* รูปโปรไฟล์ */}
        <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-6 shadow-lg">
          <img
            src="https://i.pravatar.cc/300"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ชื่อ */}
        <h1 className="text-4xl font-semibold mb-3 text-gray-800">Nuttanawat Manakit</h1>
        <h2>(WA)</h2>

        {/* ตำแหน่ง */}
        <p className="text-indigo-600 font-medium mb-6">Full Stack Developer & UI/UX Designer</p>

        {/* คำอธิบาย */}
        <p className="text-gray-600 leading-relaxed">
          ผมเป็นนักพัฒนาซอฟต์แวร์ที่ชื่นชอบการสร้างสรรค์ประสบการณ์ดิจิทัล
          ด้วยเทคโนโลยี React, Next.js และออกแบบ UI/UX ที่ใช้งานง่ายและสวยงาม
          พร้อมช่วยแก้ปัญหาและเพิ่มประสิทธิภาพให้กับโปรเจคของคุณ
        </p>
      </div>
    </div>
  )
}
