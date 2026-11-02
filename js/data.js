var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User",
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User",
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin",
    }
]

var dataKatalogBuku = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: "Rp 180.000",
        cover: "assets/image/pengantar_komunikasi.jpg"
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "Buku Ajar",
        edisi: "3",
        stok: 392,
        harga: "Rp 220.000",
        cover: "assets/image/manajemen_keuangan.jpg"
    },
    {
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "Buku Ajar",
        edisi: "1",
        stok: 278,
        harga: "Rp 150.000",
        cover: "assets/image/kepemimpinan.jpg"
    },
    {
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 165,
        harga: "Rp 200.000",
        cover: "assets/image/mikrobiologi.jpg"
    },
    {
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "Buku Ajar",
        edisi: "4",
        stok: 204,
        harga: "Rp 250.000",
        cover: "assets/image/paud_perkembangan.jpg"
    }
]

var dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan:[
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            },
        ]
    },
    "20230013": {
        nomorDO: "20230013",
        nama: "Agus Pranoto",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan:[
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },      
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
}

// ===== DATA TAMBAHAN (melengkapi data dari soal) =====
// AKUN LOGIN UJI : rina@gmail.com / rina123 (User) | siti@gmail.com / siti123 (Admin)
// NOMOR DO UJI   : 20230012 (Dalam Perjalanan) | 20230013 (Selesai diantar)
var dataPesanan = [
    { id: "ORD-001", pembeli: "Rina Wulandari", tanggal: "2025-08-25", total: 180000, status: "Dikirim", items: [{ kode: "ASIP4301", jumlah: 1 }] },
    { id: "ORD-002", pembeli: "Agus Pranoto", tanggal: "2025-08-25", total: 220000, status: "Selesai", items: [{ kode: "EKMA4002", jumlah: 1 }] },
    { id: "ORD-003", pembeli: "Siti Marlina", tanggal: "2025-08-27", total: 300000, status: "Diproses", items: [{ kode: "EKMA4310", jumlah: 2 }] }
]

var dataTransaksi = [
    { no: "TRX-9001", pembeli: "Rina Wulandari", tanggal: "2025-08-25", total: 180000, status: "Dikirim" },
    { no: "TRX-9002", pembeli: "Agus Pranoto", tanggal: "2025-08-25", total: 220000, status: "Selesai" },
    { no: "TRX-9003", pembeli: "Siti Marlina", tanggal: "2025-08-27", total: 300000, status: "Diproses" }
]

// ===== FUNGSI BANTU (dipakai semua halaman) =====
function rupiah(angka) { return "Rp " + angka.toLocaleString("id-ID"); }

// Ambil data dari localStorage; jika belum ada, pakai data dummy
function ambilData(kunci, bawaan) {
  const simpan = localStorage.getItem(kunci);
  return simpan ? JSON.parse(simpan) : bawaan;
}
function simpanData(kunci, data) { localStorage.setItem(kunci, JSON.stringify(data)); }

// Sidebar dipakai bersama agar semua halaman konsisten
function buatSidebar(aktif) {
  const menu = [
    ["dashboard.html", "🏠", "Dashboard"], ["stok.html", "📚", "Informasi Stok/Katalog"],
    ["checkout.html", "🛒", "Pemesanan"], ["tracking.html", "🚚", "Tracking Pengiriman"],
    ["laporan.html", "📊", "Laporan Pemesanan"], ["history.html", "🧾", "History Transaksi"]
  ];
  let html = '<div class="logo">📖 BOOK<span>SPACE</span></div><nav>';
  for (const m of menu) {
    html += `<a href="${m[0]}" class="${m[0] === aktif ? "aktif" : ""}">${m[1]} ${m[2]}</a>`;
  }
  html += '<a href="login.html" id="btnKeluar">🚪 Keluar</a></nav>';
  document.getElementById("sidebar").innerHTML = html;
  document.getElementById("btnKeluar").addEventListener("click", () => localStorage.removeItem("userLogin"));
  // Proteksi: wajib login
  if (!localStorage.getItem("userLogin")) location.href = "login.html";
}

// Warna badge sesuai status pesanan/transaksi
function kelasStatus(s) { return s === "Selesai" ? "hijau" : (s === "Diproses" ? "orange" : ""); }

// Harga di data berupa teks "Rp 180.000" -> ubah jadi angka agar bisa dihitung
function angka(teks) { return Number(String(teks).replace(/\D/g, "")); }
// Jumlah buku dalam satu pesanan (looping array items)
function jumlahItem(p) { let n = 0; for (const it of p.items) n += it.jumlah; return n; }

// Bersihkan data format lama di localStorage (hanya sekali) agar tidak bentrok dengan struktur data baru
if (localStorage.getItem("versiData") !== "3") {
  for (const k of ["katalogBuku", "pesananBaru", "transaksiBaru", "pengirimanBaru", "trackingBaru"]) localStorage.removeItem(k);
  localStorage.setItem("versiData", "3");
}