// ===== STOK / KATALOG (CRUD) =====
buatSidebar("stok.html");
let buku = ambilData("katalogBuku", dataKatalogBuku);
simpanData("katalogBuku", buku);

const tabel = document.getElementById("tabelBuku");
const modal = document.getElementById("modalBuku");
const f = { id: fId, kode: fKode, nama: fNama, jenis: fJenis, edisi: fEdisi, harga: fHarga, stok: fStok };

// Indikator stok: hijau (tersedia), orange (hampir habis), merah (habis)
function statusStok(s) {
  if (s === 0) return ["Habis", "merah"];
  if (s <= 5) return ["Hampir habis", "orange"];
  return ["Tersedia", "hijau"];
}

// READ: tampilkan data ke tabel (sekaligus filter pencarian)
function tampil() {
  const kata = document.getElementById("cari").value.toLowerCase();
  let html = "";
  for (const b of buku) {
    if (!b.namaBarang.toLowerCase().includes(kata)) continue;
    const st = statusStok(b.stok);
    html += `<tr><td>${b.kodeBarang}</td><td>${b.namaBarang}</td><td>${b.jenisBarang}</td><td>${b.edisi}</td><td>${b.harga}</td>
      <td>${b.stok} <span class="badge ${st[1]}">${st[0]}</span></td>
      <td class="aksi"><button class="btn-aksen" data-aksi="edit" data-id="${b.kodeBarang}">Edit</button><button class="btn-bahaya" data-aksi="hapus" data-id="${b.kodeBarang}">Hapus</button></td></tr>`;
  }
  tabel.innerHTML = html || '<tr><td colspan="7">Buku tidak ditemukan.</td></tr>';
}

function bukaForm(b) {
  document.getElementById("judulModal").textContent = b ? "Edit Buku" : "Tambah Buku";
  f.id.value = b ? b.kodeBarang : "";   // id terisi = mode edit
  f.kode.value = b ? b.kodeBarang : ""; f.kode.disabled = !!b;
  f.nama.value = b ? b.namaBarang : ""; f.jenis.value = b ? b.jenisBarang : "";
  f.edisi.value = b ? b.edisi : ""; f.harga.value = b ? angka(b.harga) : ""; f.stok.value = b ? b.stok : "";
  modal.classList.add("buka");
}

// CREATE & UPDATE
document.getElementById("btnSimpan").addEventListener("click", function () {
  const harga = Number(f.harga.value), stok = Number(f.stok.value), kode = f.kode.value.trim().toUpperCase();
  // Validasi: tidak boleh kosong
  if (kode === "" || f.nama.value.trim() === "" || f.jenis.value.trim() === "" || f.edisi.value.trim() === "" ||
      f.harga.value === "" || f.stok.value === "" || harga <= 0 || stok < 0) {
    alert("Semua kolom wajib diisi dengan benar (harga > 0, stok >= 0)!"); return;
  }
  if (f.id.value === "") {
    if (buku.some(b => b.kodeBarang === kode)) { alert("Kode barang sudah dipakai!"); return; }
    buku.push({ kodeBarang: kode, namaBarang: f.nama.value.trim(), jenisBarang: f.jenis.value.trim(),
      edisi: f.edisi.value.trim(), stok: stok, harga: rupiah(harga), cover: "" });
    alert("Buku baru berhasil ditambahkan!");
  } else {
    for (const b of buku) {
      if (b.kodeBarang === f.id.value) {
        b.namaBarang = f.nama.value.trim(); b.jenisBarang = f.jenis.value.trim(); b.edisi = f.edisi.value.trim();
        b.harga = rupiah(harga); b.stok = stok;
      }
    }
    alert("Data buku berhasil diubah!");
  }
  simpanData("katalogBuku", buku); // simpan ke localStorage
  modal.classList.remove("buka"); tampil();
});

// Tombol Edit / Hapus (event delegation pada tabel)
tabel.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.dataset.aksi === "edit") bukaForm(buku.find(b => b.kodeBarang === id));
  if (e.target.dataset.aksi === "hapus" && confirm("Yakin ingin menghapus buku " + id + "?")) {
    buku = buku.filter(b => b.kodeBarang !== id);
    simpanData("katalogBuku", buku); tampil();
  }
});

document.getElementById("btnTambah").addEventListener("click", () => bukaForm(null));
document.getElementById("btnBatal").addEventListener("click", () => modal.classList.remove("buka"));
document.getElementById("cari").addEventListener("input", tampil);
tampil();