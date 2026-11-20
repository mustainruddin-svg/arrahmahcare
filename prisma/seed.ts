import { PrismaClient } from "@prisma/client";
import crypto from "node:crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function main() {
  console.log("🌱 Seeding Ar-Rahmah Care database...");

  // 1. Organization Settings
  await prisma.organizationSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      organizationName: "Ar-Rahmah Care",
      tagline: "Amanah, Transparan, Berkelanjutan",
      address: "Kompleks Yayasan Ar-Rahmah Sulawesi, Jl. Perintis Kemerdekaan, Makassar, Sulawesi Selatan",
      email: "care@arrahmahsulawesi.org",
      phone: "(0411) 587-XXX",
      whatsapp: "0812-4200-XXXX",
      socialInstagram: "https://instagram.com/arrahmahcare",
      socialYoutube: "https://youtube.com/@arrahmahcare",
      socialFacebook: "https://facebook.com/arrahmahcare",
      legalDisclosure:
        "Unit filantropi & sosial resmi di bawah naungan Yayasan Ar-Rahmah Sulawesi (Makassar). Informasi dan dokumentasi disajikan secara transparan dan bertanggung jawab. (Mode Sandbox Aktif)",
      verifiedBankName: "Bank Syariah Indonesia (BSI)",
      verifiedAccountName: "Ar-Rahmah Care - Yayasan Ar-Rahmah Sulawesi",
      verifiedAccountNo: "7192-8831-22 (Demo Sandbox)",
      isQrisActive: true,
      isBankTransferActive: true,
      donationMinAmount: 10000,
      donationMaxAmount: 100000000,
      featureZakat: false, // Menunggu izin/kewenangan resmi
      featureWakaf: false,
      featureQurban: false,
      demoMode: true,
    },
  });

  // 2. Users (Admin, Finance, Program)
  const superadminPassword = hashPassword("AdminCare2026!");
  const financePassword = hashPassword("FinanceCare2026!");
  const programPassword = hashPassword("ProgramCare2026!");

  const adminUser = await prisma.user.upsert({
    where: { email: "superadmin@arrahmahsulawesi.org" },
    update: {},
    create: {
      email: "superadmin@arrahmahsulawesi.org",
      displayName: "Administrator Pusat",
      passwordHash: superadminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "keuangan@arrahmahsulawesi.org" },
    update: {},
    create: {
      email: "keuangan@arrahmahsulawesi.org",
      displayName: "Bendahara Yayasan",
      passwordHash: financePassword,
      role: "FINANCE",
      isActive: true,
    },
  });

  await prisma.user.upsert({
    where: { email: "program@arrahmahsulawesi.org" },
    update: {},
    create: {
      email: "program@arrahmahsulawesi.org",
      displayName: "Koordinator Program",
      passwordHash: programPassword,
      role: "ADMIN_PROGRAM",
      isActive: true,
    },
  });

  // 3. Categories
  const catPendidikan = await prisma.category.upsert({
    where: { slug: "pendidikan" },
    update: {},
    create: {
      slug: "pendidikan",
      name: "Pendidikan & Beasiswa",
      description: "Program dukungan pendidikan bagi anak yatim, dhuafa, dan keluarga prasejahtera.",
      sortOrder: 1,
    },
  });

  const catKemanusiaan = await prisma.category.upsert({
    where: { slug: "kemanusiaan" },
    update: {},
    create: {
      slug: "kemanusiaan",
      name: "Kemanusiaan & Bencana",
      description: "Bantuan tanggap darurat dan logistik pangan bagi korban bencana alam di Sulawesi.",
      sortOrder: 2,
    },
  });

  const catSarana = await prisma.category.upsert({
    where: { slug: "sarana-ibadah" },
    update: {},
    create: {
      slug: "sarana-ibadah",
      name: "Sarana Ibadah & Sekolah",
      description: "Dukungan fasilitas musholla, ruang tahfizh, dan sarana belajar siswa.",
      sortOrder: 3,
    },
  });

  const catPangan = await prisma.category.upsert({
    where: { slug: "pangan-sosial" },
    update: {},
    create: {
      slug: "pangan-sosial",
      name: "Pangan & Bantuan Sosial",
      description: "Penyaluran sembako dan protein daging untuk keluarga kurang mampu di sekitar sekolah.",
      sortOrder: 4,
    },
  });

  // 4. Programs
  const progBeasiswa = await prisma.program.upsert({
    where: { slug: "beasiswa-siswa-yatim-dhuafa" },
    update: {},
    create: {
      slug: "beasiswa-siswa-yatim-dhuafa",
      title: "Beasiswa Siswa Yatim & Dhuafa SIT Ar-Rahmah",
      summary:
        "Memastikan anak-anak yatim dan keluarga prasejahtera tetap dapat mengenyam pendidikan Islam terpadu berkualitas dari jenjang PAUD hingga SMAIT.",
      body: `Program Beasiswa Siswa Yatim & Dhuafa Ar-Rahmah Care didedikasikan untuk menjamin keberlanjutan pendidikan anak-anak berprestasi dari kalangan kurang mampu di bawah naungan Yayasan Ar-Rahmah Sulawesi.

Setiap donasi yang Anda titipkan digunakan secara terarah untuk:
1. Pembebasan SPP dan biaya operasional belajar bulanan.
2. Penyediaan seragam sekolah lengkap, sepatu, dan tas belajar.
3. Paket buku pelajaran, modul tahfizh Al-Quran, dan perlengkapan kelas.
4. Pembinaan karakter dan pendampingan akademik berkala.

Seluruh data penerima manfaat telah diverifikasi langsung oleh pihak sekolah dan tim kesejahteraan sosial yayasan. Laporan kemajuan belajar dan laporan penyaluran dana disajikan secara transparan di platform ini.`,
      categoryId: catPendidikan.id,
      status: "PUBLISHED",
      targetAmount: 150000000,
      isFeatured: true,
      coverImage: "/brand/ar-rahmah-care.jpg",
      beneficiaryDescription: "Siswa-siswi yatim dan dhuafa di unit PAUD, SDIT, SMPIT, dan SMAIT Ar-Rahmah Makassar",
      usageOfFunds: "75% SPP dan biaya pendidikan, 15% perlengkapan & seragam, 10% pembinaan tahfizh dan monitoring",
      locationLabel: "Makassar, Sulawesi Selatan",
    },
  });

  const progBencana = await prisma.program.upsert({
    where: { slug: "bantuan-pangan-bencana-darurat" },
    update: {},
    create: {
      slug: "bantuan-pangan-bencana-darurat",
      title: "Bantuan Pangan & Tanggap Bencana Sulawesi",
      summary:
        "Aksi respon cepat penyaluran paket sembako, makanan siap saji, dan kebutuhan darurat bagi warga terdampak bencana alam di Sulawesi Selatan.",
      body: `Wilayah Sulawesi kerap menghadapi tantangan bencana alam seperti banjir bandang dan tanah longsor di musim hujan. Ar-Rahmah Care berkolaborasi bersama relawan santri dan guru untuk merespon cepat keadaan darurat kemanusiaan.

Penyaluran bantuan difokuskan pada:
- Paket sembako darurat (beras, minyak, makanan balita, air bersih).
- Obat-obatan dasar dan perlengkapan higienis keluarga.
- Dapur umum lapangan untuk warga yang mengungsi.

Aksi sosial ini juga menjadi wadah pendidikan empati nyata bagi para siswa dan masyarakat sekitar.`,
      categoryId: catKemanusiaan.id,
      status: "PUBLISHED",
      targetAmount: 80000000,
      isFeatured: true,
      coverImage: "/brand/ar-rahmah-care.jpg",
      beneficiaryDescription: "Keluarga terdampak bencana alam dan banjir di Sulawesi Selatan",
      usageOfFunds: "80% paket pangan & logistik pengungsian, 15% transportasi relawan, 5% obat-obatan dasar",
      locationLabel: "Sulawesi Selatan",
    },
  });

  const progSarana = await prisma.program.upsert({
    where: { slug: "renovasi-sarana-musholla-sekolah" },
    update: {},
    create: {
      slug: "renovasi-sarana-musholla-sekolah",
      title: "Renovasi Sarana Musholla & Ruang Tahfizh Terpadu",
      summary:
        "Mewujudkan fasilitas ibadah dan ruang halaqah Al-Quran yang layak, nyaman, dan berkapasitas memadai bagi ratusan siswa-siswi.",
      body: `Musholla sekolah adalah jantung pendidikan adab dan spiritual di lingkungan SIT Ar-Rahmah. Seiring bertambahnya jumlah siswa, kapasitas musholla dan fasilitas wudhu memerlukan perluasan serta peremajaan.

Pekerjaan yang didanai melalui program ini meliputi:
- Perluasan area shalat berjamaah agar mampu menampung shalat Dzuhur dan Ashar terpadu.
- Perbaikan fasilitas tempat wudhu yang hemat air dan higienis.
- Pengadaan karpet masjid berkualitas dan sistem tata suara yang memadai.
- Penambahan rak Al-Quran untuk ruang halaqah tahfizh.`,
      categoryId: catSarana.id,
      status: "PUBLISHED",
      targetAmount: 200000000,
      isFeatured: true,
      coverImage: "/brand/ar-rahmah-care.jpg",
      beneficiaryDescription: "Lebih dari 600 siswa, guru, dan jamaah warga sekitar kompleks sekolah",
      usageOfFunds: "70% material renovasi bangunan & wudhu, 20% karpet & audio visual, 10% pemeliharaan",
      locationLabel: "Kompleks SIT Ar-Rahmah Makassar",
    },
  });

  const progDaging = await prisma.program.upsert({
    where: { slug: "sedekah-daging-keluarga-dhuafa" },
    update: {},
    create: {
      slug: "sedekah-daging-keluarga-dhuafa",
      title: "Sedekah Daging & Protein Keluarga Dhuafa",
      summary:
        "Berbagi paket daging segar sepanjang tahun untuk mencukupi kebutuhan gizi anak-anak dan keluarga kurang mampu di sekitar lingkungan sekolah.",
      body: `Kebutuhan gizi hewani merupakan faktor penting dalam tumbuh kembang anak-anak. Melalui Program Sedekah Daging Sepanjang Tahun, donatur dapat berbagi kebahagiaan tanpa harus menunggu momentum hari raya kurban.

Satu paket sedekah senilai Rp 150.000 sudah mencakup 1 kg daging segar yang disembelih sesuai syariat dan didistribusikan langsung kepada keluarga buruh harian lepas, pemulung, dan janda lansia di sekitar kompleks yayasan.`,
      categoryId: catPangan.id,
      status: "PUBLISHED",
      targetAmount: 50000000,
      isFeatured: false,
      coverImage: "/brand/ar-rahmah-care.jpg",
      beneficiaryDescription: "300+ keluarga prasejahtera di kelurahan binaan sekitar sekolah",
      usageOfFunds: "85% pembelian hewan & daging segar, 10% kemasan higienis, 5% distribusi langsung",
      locationLabel: "Makassar",
    },
  });

  // 5. Donors & Seed Verified Donations (PAID)
  const donor1 = await prisma.donor.upsert({
    where: { email: "ahmad.fauzan@example.com" },
    update: {},
    create: {
      name: "Ahmad Fauzan",
      email: "ahmad.fauzan@example.com",
      phone: "081242334455",
      anonymousPublic: false,
    },
  });

  const donor2 = await prisma.donor.upsert({
    where: { email: "siti.nurhaliza@example.com" },
    update: {},
    create: {
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@example.com",
      phone: "081355442211",
      anonymousPublic: false,
    },
  });

  // Seed donations (PAID) - purely verifiable ledger records for testing!
  const donationsToCreate = [
    {
      orderId: "ARC-202611-001",
      programId: progBeasiswa.id,
      donorId: donor1.id,
      amount: 5000000,
      status: "PAID",
      paymentMethod: "mock_qris",
      paymentChannel: "QRIS BSI (Simulator)",
      donorName: "Ahmad Fauzan",
      donorEmail: "ahmad.fauzan@example.com",
      donorPhone: "081242334455",
      isAnonymous: false,
      message: "Semoga berkah untuk adik-adik yatim di Ar-Rahmah.",
      paidAt: new Date(Date.now() - 5 * 24 * 3600 * 1000),
    },
    {
      orderId: "ARC-202611-002",
      programId: progBeasiswa.id,
      donorId: null,
      amount: 1500000,
      status: "PAID",
      paymentMethod: "mock_qris",
      paymentChannel: "QRIS BCA (Simulator)",
      donorName: "Hamba Allah",
      isAnonymous: true,
      message: "Bismillah, istiqomah belajar ya nak.",
      paidAt: new Date(Date.now() - 4 * 24 * 3600 * 1000),
    },
    {
      orderId: "ARC-202611-003",
      programId: progBencana.id,
      donorId: donor2.id,
      amount: 2500000,
      status: "PAID",
      paymentMethod: "manual_bank_transfer",
      paymentChannel: "BSI Transfer",
      donorName: "Siti Nurhaliza",
      donorEmail: "siti.nurhaliza@example.com",
      donorPhone: "081355442211",
      isAnonymous: false,
      message: "Semoga saudara kita di lokasi bencana diberi ketabahan.",
      paidAt: new Date(Date.now() - 3 * 24 * 3600 * 1000),
    },
    {
      orderId: "ARC-202611-004",
      programId: progSarana.id,
      donorId: null,
      amount: 10000000,
      status: "PAID",
      paymentMethod: "mock_qris",
      paymentChannel: "QRIS Mandiri (Simulator)",
      donorName: "Hamba Allah",
      isAnonymous: true,
      message: "Wakaf sarana musholla untuk kedua orang tua kami tercinta.",
      paidAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    },
    {
      orderId: "ARC-202611-005",
      programId: progDaging.id,
      donorId: donor1.id,
      amount: 750000,
      status: "PAID",
      paymentMethod: "mock_qris",
      paymentChannel: "QRIS BSI (Simulator)",
      donorName: "Ahmad Fauzan",
      donorEmail: "ahmad.fauzan@example.com",
      donorPhone: "081242334455",
      isAnonymous: false,
      message: "Paket sedekah daging 5 paket untuk warga dhuafa.",
      paidAt: new Date(Date.now() - 1 * 24 * 3600 * 1000),
    },
  ];

  for (const item of donationsToCreate) {
    const existing = await prisma.donation.findUnique({ where: { orderId: item.orderId } });
    if (!existing) {
      await prisma.donation.create({
        data: item,
      });
    }
  }

  // 6. Seed Disbursements (POSTED)
  const disb1 = await prisma.disbursement.findFirst({
    where: { description: { contains: "Tahap 1 Penyaluran Beasiswa" } },
  });

  if (!disb1) {
    await prisma.disbursement.create({
      data: {
        programId: progBeasiswa.id,
        amount: 4500000,
        description: "Tahap 1 Penyaluran Beasiswa SPP & Perlengkapan Belajar untuk 12 Siswa Yatim",
        categoryLabel: "Pendidikan",
        beneficiaryCount: 12,
        status: "POSTED",
        submittedBy: "program@arrahmahsulawesi.org",
        approvedBy: "superadmin@arrahmahsulawesi.org",
        postedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000),
        evidenceNotes: "Kuitansi resmi tata usaha sekolah dan bukti serah terima perlengkapan belajar",
      },
    });
  }

  const disb2 = await prisma.disbursement.findFirst({
    where: { description: { contains: "Penyaluran 50 Paket Sembako" } },
  });

  if (!disb2) {
    await prisma.disbursement.create({
      data: {
        programId: progBencana.id,
        amount: 2000000,
        description: "Penyaluran 50 Paket Sembako Darurat Bencana Banjir",
        categoryLabel: "Logistik Kemanusiaan",
        beneficiaryCount: 50,
        status: "POSTED",
        submittedBy: "program@arrahmahsulawesi.org",
        approvedBy: "superadmin@arrahmahsulawesi.org",
        postedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
        evidenceNotes: "Berita acara serah terima bersama posko bantuan bencana",
      },
    });
  }

  // 7. Program Updates
  const update1 = await prisma.programUpdate.findFirst({
    where: { title: "Penyaluran Perlengkapan Sekolah Siswa Binaan" },
  });

  if (!update1) {
    await prisma.programUpdate.create({
      data: {
        programId: progBeasiswa.id,
        title: "Penyaluran Perlengkapan Sekolah Siswa Binaan",
        body: "Alhamdulillah, amanah paket seragam dan buku tulis telah diserahkan langsung kepada 12 santri yatim penerima beasiswa Ar-Rahmah Care.",
        publishedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
      },
    });
  }

  // 8. Articles / News
  const article1 = await prisma.article.upsert({
    where: { slug: "menumbuhkan-karakter-berbagi-sejak-dini" },
    update: {},
    create: {
      slug: "menumbuhkan-karakter-berbagi-sejak-dini",
      title: "Menumbuhkan Jiwa Berbagi Sejak Dini Melalui Infaq Jumat Sekolah",
      excerpt:
        "Bagaimana pembiasaan sedekah rutin di lingkungan SIT Ar-Rahmah melatih empati siswa terhadap sesama sejak masa kanak-kanak.",
      body: `Pendidikan karakter tidak cukup diajarkan lewat teori di dalam kelas. Di Sekolah Islam Terpadu Ar-Rahmah, pembiasaan infaq setiap hari Jumat telah menjadi tradisi yang mengakar kuat.

Setiap siswa diajak menyisihkan sebagian uang sakunya secara sukarela. Bukan besaran nominal yang menjadi penilaian, melainkan ketulusan dan kesadaran bahwa dalam rezeki yang kita miliki terdapat hak bagi mereka yang membutuhkan.

Dana yang terkumpul dikelola secara bertanggung jawab oleh pengurus yayasan dan unit Ar-Rahmah Care untuk membantu teman sebaya yang membutuhkan serta program sosial kemanusiaan.`,
      status: "PUBLISHED",
      publishedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000),
      authorName: "Humas SIT Ar-Rahmah",
      coverImage: "/brand/ar-rahmah-care.jpg",
    },
  });

  const article2 = await prisma.article.upsert({
    where: { slug: "transparansi-penyaluran-dana-sosial-makassar" },
    update: {},
    create: {
      slug: "transparansi-penyaluran-dana-sosial-makassar",
      title: "Komitmen Transparansi dan Akuntabilitas Ar-Rahmah Care",
      excerpt:
        "Mengenal tata kelola pencatatan dan pelaporan berkala dana donasi di bawah pengawasan Yayasan Ar-Rahmah Sulawesi.",
      body: `Kepercayaan donatur adalah pilar utama bagi setiap lembaga sosial. Ar-Rahmah Care berkomitmen menyajikan setiap transaksi secara transparan dan terukur.

Setiap rupiah yang dititipkan melalui program-program kami tercatat dalam pembukuan internal yang diaudit secara berjenjang oleh dewan pengurus yayasan. Kami memastikan setiap penyaluran memiliki dokumentasi, berita acara, dan pertanggungjawaban yang jelas.`,
      status: "PUBLISHED",
      publishedAt: new Date(Date.now() - 3 * 24 * 3600 * 1000),
      authorName: "Tim Media Ar-Rahmah",
      coverImage: "/brand/ar-rahmah-care.jpg",
    },
  });

  // 9. Impact Stories
  await prisma.impactStory.upsert({
    where: { slug: "kisah-ibu-rahmawati-dan-beasiswa-pendidikan" },
    update: {},
    create: {
      slug: "kisah-ibu-rahmawati-dan-beasiswa-pendidikan",
      title: "Kisah Ibu Rahmawati: Harapan Baru untuk Pendidikan Sang Buah Hati",
      summary:
        "Perjuangan seorang ibu tunggal di Makassar yang melihat anaknya dapat terus bersekolah dan berprestasi berkat uluran tangan para donatur.",
      body: `"Sebagai orang tua tunggal, kekhawatiran terbesar saya adalah jika anak saya harus putus sekolah karena kendala biaya. Namun melalui program beasiswa Ar-Rahmah Care, putra saya bisa terus menuntut ilmu di sekolah Islam terpadu, menghafal Al-Quran, dan memiliki cita-cita yang tinggi. Kami sangat bersyukur atas kebaikan para donatur." — Ibu Rahmawati (Orang Tua Penerima Manfaat)`,
      beneficiaryLabel: "Wali Murid Siswa Penerima Beasiswa",
      consentVerified: true,
      status: "PUBLISHED",
      coverImage: "/brand/ar-rahmah-care.jpg",
    },
  });

  // 10. Reports
  await prisma.report.upsert({
    where: { slug: "laporan-penyaluran-semester-ganjil-2026" },
    update: {},
    create: {
      slug: "laporan-penyaluran-semester-ganjil-2026",
      title: "Laporan Penyaluran Semester Ganjil 2026",
      summary: "Ringkasan realisasi penyaluran dana beasiswa pendidikan dan logistik pangan periode berjalan.",
      periodStart: new Date("2026-01-01"),
      periodEnd: new Date("2026-06-30"),
      status: "PUBLISHED",
      totalCollected: 19750000,
      totalDisbursed: 6500000,
      publishedAt: new Date(),
    },
  });

  // 11. Initial Audit Log
  await prisma.auditLog.create({
    data: {
      actorId: adminUser.id,
      action: "INITIAL_DATABASE_SEED",
      entity: "System",
      entityId: "default",
      details: "Inisialisasi data master, akun pengurus, kategori, dan program awal Ar-Rahmah Care",
    },
  });

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
