// ===== TRACKING PENGIRIMAN =====
buatSidebar("tracking.html");
// Gabungkan dataTracking + tracking dari checkout (localStorage)
const semuaDO = Object.assign({}, dataTracking, ambilData("trackingBaru", {}));
const langkah = [["Pesanan diterima", "#FF9F43"], ["Pesanan diproses", "#4F8FEA"], ["Dalam perjalanan", "#6C4AB6"], ["Pesanan diterima pelanggan", "#28A879"]];
const inputDO = document.getElementById("inputDO"), hasil = document.getElementById("hasil");

// Tentukan tahap progress (1-4) dari status & riwayat perjalanan
function langkahStatus(d) {
  const akhir = d.perjalanan[d.perjalanan.length - 1].keterangan;
  if (akhir.includes("Selesai Antar")) return 4;
  const peta = { "Diproses": 2, "Dalam Perjalanan": 3, "Dikirim": 3 };
  return peta[d.status] || 1;
}

function cariDO() {
  const kode = inputDO.value.trim();
  hasil.style.display = "block";
  if (kode === "") { hasil.innerHTML = '<p class="pesan-error">Nomor DO wajib diisi.</p>'; return; }
  const d = semuaDO[kode];
  if (!d) { hasil.innerHTML = '<p class="pesan-error">Nomor DO "' + kode + '" tidak ditemukan.</p>'; return; }

  const tahap = langkahStatus(d), warna = langkah[tahap - 1][1];
  let html = `<h3>${d.nomorDO} <span class="badge" style="background:${warna}">${d.status}</span></h3>
    <div class="baris"><span>Nama pemesan</span><b>${d.nama}</b></div>
    <div class="baris"><span>Ekspedisi</span><b>${d.ekspedisi}</b></div>
    <div class="baris"><span>Tanggal pengiriman</span><b>${d.tanggalKirim}</b></div>
    <div class="baris"><span>Jenis paket</span><b>${d.paket}</b></div>
    <div class="baris"><span>Total pembayaran</span><b>${d.total}</b></div>
    <div class="progress"><div style="width:${tahap * 25}%;background:${warna}"></div></div><div class="langkah">`;
  // Looping 4 tahap status: tahap yang sudah dilewati diberi warna sendiri
  for (let i = 0; i < langkah.length; i++) {
    const aktif = i < tahap;
    html += `<div><div class="titik" style="background:${aktif ? langkah[i][1] : "#ddd"}">${aktif ? "✓" : i + 1}</div>${langkah[i][0]}</div>`;
  }
  html += "</div><br><h3>Riwayat Perjalanan</h3>";
  for (const p of d.perjalanan) html += `<div class="baris"><span>${p.waktu}</span><span style="text-align:right">${p.keterangan}</span></div>`;
  hasil.innerHTML = html;
}
document.getElementById("btnCari").addEventListener("click", cariDO);
inputDO.addEventListener("keydown", e => { if (e.key === "Enter") cariDO(); });
document.getElementById("btnReset").addEventListener("click", () => { inputDO.value = ""; hasil.style.display = "none"; });