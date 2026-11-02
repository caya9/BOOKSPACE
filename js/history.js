// ===== HISTORY TRANSAKSI =====
buatSidebar("history.html");
// Transaksi terbaru (dari checkout) tampil di atas data dummy
const semuaTransaksi = ambilData("transaksiBaru", []).reverse().concat(dataTransaksi);
let html = "";
for (const t of semuaTransaksi) {
  html += `<tr><td>${t.no}</td><td>${t.pembeli}</td><td>${t.tanggal}</td><td>${rupiah(t.total)}</td><td><span class="badge ${kelasStatus(t.status)}">${t.status}</span></td></tr>`;
}
document.getElementById("tabelHistory").innerHTML = html;