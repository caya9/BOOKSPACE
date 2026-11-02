// ===== LAPORAN PEMESANAN =====
buatSidebar("laporan.html");
const semuaPesanan = ambilData("pesananBaru", []).concat(dataPesanan);
const filter = document.getElementById("filterStatus");

function tampil() {
  let html = "", jumlahTransaksi = 0, bukuTerjual = 0, pendapatan = 0;
  for (const p of semuaPesanan) {
    if (filter.value && p.status !== filter.value) continue; // filter status
    jumlahTransaksi++; bukuTerjual += jumlahItem(p); pendapatan += p.total;
    html += `<tr><td>${p.id}</td><td>${p.pembeli}</td><td>${p.tanggal}</td><td>${jumlahItem(p)}</td><td>${rupiah(p.total)}</td><td><span class="badge ${kelasStatus(p.status)}">${p.status}</span></td></tr>`;
  }
  document.getElementById("tabelLaporan").innerHTML = html || '<tr><td colspan="6">Tidak ada pesanan.</td></tr>';
  document.getElementById("ringkasan").innerHTML =
    `<div class="kartu stat c1"><p>Total Transaksi</p><h2>${jumlahTransaksi}</h2></div>
     <div class="kartu stat c2"><p>Buku Terjual</p><h2>${bukuTerjual}</h2></div>
     <div class="kartu stat c4"><p>Total Pendapatan</p><h2>${rupiah(pendapatan)}</h2></div>`;
}
filter.addEventListener("change", tampil);
tampil();