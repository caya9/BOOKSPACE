// ===== CHECKOUT / PEMESANAN =====
buatSidebar("checkout.html");
let buku = ambilData("katalogBuku", dataKatalogBuku);
let keranjang = []; // isi: { id (kodeBarang), jumlah }
const warna = ["#6C4AB6", "#4F8FEA", "#FF9F43", "#28A879", "#E85D75"];

const elBuku = document.getElementById("daftarBuku");
const elKeranjang = document.getElementById("keranjang");
const elKategori = document.getElementById("filterKategori");

// Isi pilihan filter dari jenis barang
for (const k of [...new Set(buku.map(b => b.jenisBarang))]) elKategori.innerHTML += `<option>${k}</option>`;

// Tampilkan daftar buku (pencarian & filter). Jika gambar cover tidak ada, warna pengganti tampil
function tampilBuku() {
  const kata = document.getElementById("cari").value.toLowerCase();
  let html = "";
  for (let i = 0; i < buku.length; i++) {
    const b = buku[i];
    if (!b.namaBarang.toLowerCase().includes(kata)) continue;
    if (elKategori.value && b.jenisBarang !== elKategori.value) continue;
    // Cover selalu diambil dari dataKatalogBuku (data.js) agar path terbaru yang dipakai
    const asli = dataKatalogBuku.find(x => x.kodeBarang === b.kodeBarang);
    const cover = asli ? asli.cover : b.cover;
    const gambar = cover ? `<img src="${cover}" alt="${b.namaBarang}" onerror="console.warn('Gambar tidak ditemukan:', this.src); this.style.display='none'">` : "";
    html += `<div class="produk"><div class="cover" style="background:${warna[i % 5]}">${gambar}<span>📕</span>${b.namaBarang}</div>
      <b>${b.namaBarang}</b><br>${b.kodeBarang} - Edisi ${b.edisi}<br>${b.harga}<br>Stok: ${b.stok}
      <button data-id="${b.kodeBarang}" ${b.stok === 0 ? "disabled" : ""}>${b.stok === 0 ? "Stok Habis" : "Tambah ke Keranjang"}</button></div>`;
  }
  elBuku.innerHTML = html || "<p>Buku tidak ditemukan.</p>";
}

// Tampilkan keranjang + hitung total otomatis
function tampilKeranjang() {
  let html = "", total = 0;
  for (const item of keranjang) {
    const b = buku.find(x => x.kodeBarang === item.id);
    const subtotal = angka(b.harga) * item.jumlah;
    total += subtotal;
    html += `<div class="item-keranjang"><span>${b.namaBarang}<br><small>${rupiah(subtotal)}</small></span>
      <span class="qty"><button data-aksi="kurang" data-id="${b.kodeBarang}">-</button>${item.jumlah}<button data-aksi="tambah" data-id="${b.kodeBarang}">+</button>
      <button class="btn-bahaya" data-aksi="hapus" data-id="${b.kodeBarang}">x</button></span></div>`;
  }
  elKeranjang.innerHTML = html || "<p>Keranjang masih kosong.</p>";
  document.getElementById("total").textContent = rupiah(total);
  return total;
}

// Tambah ke keranjang (jumlah tidak boleh melebihi stok)
function tambah(id) {
  const b = buku.find(x => x.kodeBarang === id);
  const item = keranjang.find(x => x.id === id);
  if (item) {
    if (item.jumlah + 1 > b.stok) { alert("Jumlah melebihi stok! Stok tersedia: " + b.stok); return; }
    item.jumlah++;
  } else keranjang.push({ id: id, jumlah: 1 });
  tampilKeranjang();
}

elBuku.addEventListener("click", e => { if (e.target.dataset.id) tambah(e.target.dataset.id); });
elKeranjang.addEventListener("click", function (e) {
  const id = e.target.dataset.id, aksi = e.target.dataset.aksi;
  if (!id) return;
  if (aksi === "tambah") tambah(id);
  if (aksi === "kurang") {
    const item = keranjang.find(x => x.id === id);
    item.jumlah--;
    if (item.jumlah === 0) keranjang = keranjang.filter(x => x.id !== id);
  }
  if (aksi === "hapus") keranjang = keranjang.filter(x => x.id !== id);
  tampilKeranjang();
});
document.getElementById("cari").addEventListener("input", tampilBuku);
elKategori.addEventListener("change", tampilBuku);

// Buat pesanan: validasi -> simpan ke localStorage -> modal konfirmasi
document.getElementById("btnPesan").addEventListener("click", function () {
  const nama = document.getElementById("nama").value.trim(), email = document.getElementById("email").value.trim();
  const telp = document.getElementById("telp").value.trim(), alamat = document.getElementById("alamat").value.trim();
  const bayar = document.getElementById("bayar").value;
  if (keranjang.length === 0) { alert("Keranjang masih kosong!"); return; }
  if (nama === "" || alamat === "" || bayar === "") { alert("Nama, alamat, dan metode pembayaran wajib diisi!"); return; }
  if (!email.includes("@") || !email.includes(".")) { alert("Format email tidak valid!"); return; }
  if (isNaN(telp) || telp.length < 10 || telp.length > 13) { alert("Nomor telepon harus 10-13 angka!"); return; }

  const total = tampilKeranjang();
  const items = [];
  for (const item of keranjang) {
    items.push({ kode: item.id, jumlah: item.jumlah });
    buku.find(x => x.kodeBarang === item.id).stok -= item.jumlah; // stok berkurang
  }
  const kode = String(Date.now()).slice(-4), tgl = new Date().toISOString().slice(0, 10);
  const idPesan = "ORD-" + kode, noDO = "2026" + kode;

  const pesananBaru = ambilData("pesananBaru", []);
  pesananBaru.push({ id: idPesan, pembeli: nama, tanggal: tgl, total: total, status: "Diproses", items: items });
  const transaksiBaru = ambilData("transaksiBaru", []);
  transaksiBaru.push({ no: "TRX-" + kode, pembeli: nama, tanggal: tgl, total: total, status: "Diproses" });
  // Data tracking baru memakai format yang sama dengan dataTracking
  const trackingBaru = ambilData("trackingBaru", {});
  trackingBaru[noDO] = { nomorDO: noDO, nama: nama, status: "Diproses", ekspedisi: "JNE", tanggalKirim: tgl, paket: "0JKT01", total: rupiah(total),
    perjalanan: [{ waktu: tgl + " " + new Date().toTimeString().slice(0, 8), keterangan: "Pesanan diterima dan sedang diproses" }] };

  simpanData("pesananBaru", pesananBaru); simpanData("transaksiBaru", transaksiBaru);
  simpanData("trackingBaru", trackingBaru); simpanData("katalogBuku", buku);

  document.getElementById("isiSukses").innerHTML = `No. Pesanan: <b>${idPesan}</b><br>No. DO: <b>${noDO}</b><br>Total: <b>${rupiah(total)}</b><br>Pembayaran: ${bayar}`;
  document.getElementById("modalSukses").classList.add("buka");
});

document.getElementById("btnSelesai").addEventListener("click", function () {
  keranjang = [];
  for (const id of ["nama", "email", "telp", "alamat", "bayar"]) document.getElementById(id).value = "";
  document.getElementById("modalSukses").classList.remove("buka");
  tampilBuku(); tampilKeranjang();
});
tampilBuku(); tampilKeranjang();