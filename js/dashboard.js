// ===== DASHBOARD =====
buatSidebar("dashboard.html");

// Greeting otomatis berdasarkan jam lokal
const jam = new Date().getHours();
let sapaan = "Selamat Malam";
if (jam >= 4 && jam < 11) sapaan = "Selamat Pagi";
else if (jam < 15) sapaan = "Selamat Siang";
else if (jam < 18) sapaan = "Selamat Sore";
document.getElementById("greeting").textContent = sapaan + ", " + localStorage.getItem("userLogin") + "!";
document.getElementById("namaUser").textContent = "Peran: " + (localStorage.getItem("roleLogin") || "User") + " - ringkasan toko Anda hari ini.";

// Data dari localStorage (hasil stok.js & checkout.js) atau data dummy
const buku = ambilData("katalogBuku", dataKatalogBuku);
const pesanan = ambilData("pesananBaru", []).concat(dataPesanan);

// Hitung statistik dengan looping
let totalStok = 0, totalPendapatan = 0;
for (const b of buku) totalStok += b.stok;
for (const p of pesanan) totalPendapatan += p.total;

const kartu = [
  ["Total Buku", buku.length, "c1"], ["Total Stok", totalStok, "c2"],
  ["Total Pesanan", pesanan.length, "c3"], ["Total Pendapatan", rupiah(totalPendapatan), "c4"]
];
let htmlStat = "";
for (const k of kartu) htmlStat += `<div class="kartu stat ${k[2]}"><p>${k[0]}</p><h2>${k[1]}</h2></div>`;
document.getElementById("statistik").innerHTML = htmlStat;

// Hitung jumlah terjual per buku dari item pesanan
const terjual = {};
for (const p of pesanan) for (const it of p.items) terjual[it.kode] = (terjual[it.kode] || 0) + it.jumlah;
const populer = [...buku].sort((a, b) => (terjual[b.kodeBarang] || 0) - (terjual[a.kodeBarang] || 0)).slice(0, 3);
let htmlPop = "";
for (const b of populer) htmlPop += `<div class="baris"><span>${b.namaBarang}</span><span class="badge">${terjual[b.kodeBarang] || 0} terjual</span></div>`;
document.getElementById("populer").innerHTML = htmlPop;

// 3 pesanan terbaru
const terbaru = [...pesanan].sort((a, b) => b.tanggal.localeCompare(a.tanggal)).slice(0, 3);
let htmlBaru = "";
for (const p of terbaru) htmlBaru += `<div class="baris"><span>${p.pembeli}<br><small>${p.id}</small></span><span>${rupiah(p.total)}<br><span class="badge ${kelasStatus(p.status)}">${p.status}</span></span></div>`;
document.getElementById("terbaru").innerHTML = htmlBaru;