# 📖 BOOKSPACE – Modern Online Bookstore

| | |
|---|---|
| **Nama** | Chaya Aulia |
| **NIM** | 312510197 |
| **Kelas** | I251B |
| **Mata Kuliah** | Pemrograman Web |
| **Dosen Pengampu** | Agung Nugroho, S.Kom., M.Kom. |

Proyek **UTS Pemrograman Web 1**. BOOKSPACE adalah website toko buku online bertema *Modern Colorful Bookstore Dashboard* yang dibuat dengan **HTML, CSS, dan JavaScript murni (Vanilla JS)**, tanpa framework, tanpa backend, dan tanpa database. Seluruh perubahan data disimpan di **localStorage** browser.

# Link Youtube :[ https://youtu.be/csc6NMpXK4s](https://youtu.be/csc6NMpXK4s?si=ChPX37xDo75NTd-2)
>
---

## 1. Deskripsi Website

BOOKSPACE membantu pengelola toko buku untuk:

- masuk ke sistem dengan validasi akun,
- melihat ringkasan toko pada dashboard,
- mengelola stok/katalog buku (tambah, ubah, hapus, cari),
- membuat pesanan melalui keranjang belanja,
- melacak pengiriman dengan nomor Delivery Order (DO),
- melihat laporan pemesanan dan riwayat transaksi.

**Warna utama:** Ungu `#6C4AB6`, Biru `#4F8FEA`, Orange `#FF9F43`, Hijau `#28A879`, Merah `#E85D75`, latar `#F6F7FB`. **Font:** Poppins.

---

## 2. Struktur Folder

```
online-bookstore/
│
├── login.html          Halaman login
├── dashboard.html      Halaman dashboard
├── stok.html           Informasi Stok/Katalog
├── checkout.html       Pemesanan
├── tracking.html       Tracking Pengiriman
├── laporan.html        Laporan Pemesanan
├── history.html        History Transaksi
│
├── css/
│   └── style.css       Satu file CSS untuk semua halaman
│
├── js/
│   ├── data.js         Data (pengguna, katalog, pesanan, tracking, transaksi) + fungsi bersama
│   ├── login.js        dashboard.js   stok.js   checkout.js
│   └── tracking.js     laporan.js     history.js
│
├── assets/
│   └── image/          Cover buku dan logo
│
└── screenshots/        Screenshot untuk README ini
```


---

## 3. Cara Menjalankan

1. Buka folder proyek di **Visual Studio Code**.
2. Pasang ekstensi **Live Server** (jika belum).
3. Klik kanan `login.html` → **Open with Live Server**.
4. Website terbuka di browser (biasanya `http://127.0.0.1:5500`).

Alternatif: klik dua kali `login.html` untuk membukanya langsung di browser.

> **Reset data uji:** tekan `F12` → tab **Application** → **Local Storage** → klik kanan alamat website → **Clear**, lalu muat ulang halaman.

---

## 4. Akun dan Data untuk Pengujian

| Keperluan | Data |
|---|---|
| Login User | `rina@gmail.com` / `rina123` |
| Login User | `agus@gmail.com` / `agus123` |
| Login Admin | `siti@gmail.com` / `siti123` |
| Akun baru | Daftar melalui tombol **Daftar** di halaman login |
| Nomor DO (dalam perjalanan) | `20230012` |
| Nomor DO (selesai diantar) | `20230013` |
| Nomor DO pesanan baru | Muncul di modal konfirmasi setelah membuat pesanan |

---

## 5. Fitur Utama per Halaman

### A. Login (`login.html`)

- Validasi email dan password dengan JavaScript.
- Jika salah, muncul alert: *"email/password yang anda masukkan salah"*.
- Jika benar, diarahkan ke `dashboard.html`.
- Tombol tampilkan/sembunyikan password.
- **Lupa Password** dan **Daftar** menggunakan modal box. Akun hasil Daftar disimpan di localStorage dan bisa langsung dipakai login.

📸 **Screenshot yang harus ditambahkan:**

| File | Isi screenshot |
|---|---|
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fa54414c-c5cb-4fe0-86e3-a9ac29b90b20" /> | Halaman login lengkap |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a05ef8b4-b070-4297-8bca-3e732c80a151" /> | Alert pesan error saat password salah |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/59ccd78f-7cb9-49fa-bf0b-c4cdcb2b95f4" /> | Modal Daftar terbuka |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/f68f1e71-fb5b-4667-8597-7c03268d2265" /> | Modal Lupa Password terbuka |

Gambar 01 menampilkan desain login. Gambar 02 diambil setelah mengisi password yang salah lalu menekan Login, untuk membuktikan validasi berfungsi. Gambar 03 dan 04 diambil setelah menekan tombol Daftar dan Lupa Password, untuk menunjukkan penggunaan modal box.

### B. Dashboard (`dashboard.html`)

- Sidebar dengan logo dan 6 menu navigasi yang berfungsi.
- Greeting otomatis (Pagi, Siang, Sore, Malam) berdasarkan jam lokal.
- Nama dan peran pengguna yang sedang login.
- Empat kartu statistik: **Total Buku, Total Stok, Total Pesanan, Total Pendapatan**, semuanya dihitung dari data JavaScript, bukan angka statis.
- Daftar buku terpopuler dan pesanan terbaru.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e23ba9b6-a751-4d35-9cf5-daed41bf7c1d" />

### C. Informasi Stok/Katalog (`stok.html`)

- Tabel buku dari `dataKatalogBuku`: Kode Barang, Nama Barang, Jenis, Edisi, Harga, Stok, Aksi.
- **Tambah Buku** (modal form), **Edit**, dan **Hapus** (dengan konfirmasi).
- Pencarian buku berdasarkan nama.
- Indikator stok: 🟢 hijau (tersedia), 🟠 orange (hampir habis, stok 1–5), 🔴 merah (habis, stok 0).
- Validasi form agar data tidak kosong dan kode barang tidak boleh kembar.
- Perubahan tersimpan di localStorage dan tetap ada setelah halaman dimuat ulang.


| File | Isi screenshot |
|---|---|
|<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/69596d7b-b8cc-40ae-aa4b-c54fe78796df" /> | Tabel katalog lengkap beserta kotak pencarian |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e10e29c5-c18a-4a9e-8a49-e622d54a54c3" />| Modal Tambah Buku terbuka |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe922b4c-48d1-45ca-8dc6-560e8c7abe30" />| Alert validasi saat form dikosongkan |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/634f0dda-64f5-4ad0-b0b4-1746340f312c" />| Kotak konfirmasi hapus |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d7664e69-396c-43ab-869d-7189b509f7c3" />| Tabel yang menampilkan ketiga warna indikator stok |

Gambar 06 menunjukkan data dibaca dari `dataKatalogBuku`. Gambar 07 sampai 09 membuktikan fitur Create, validasi, dan Delete berfungsi. Untuk gambar 10, tambahkan atau ubah satu buku menjadi stok `0` dan satu lagi menjadi stok `3` agar ketiga warna (hijau, orange, merah) terlihat bersamaan.

### D. Pemesanan (`checkout.html`)

- Daftar buku dengan **cover**, nama, kode/edisi, harga, dan stok.
- Pencarian nama buku dan filter jenis.
- Keranjang: tambah/kurang jumlah, hapus item, subtotal dan total dihitung otomatis.
- Jumlah pesanan **tidak boleh melebihi stok**; buku dengan stok 0 tidak bisa dipesan.
- Formulir pemesan (nama, email, telepon, alamat) dan metode pembayaran (Transfer Bank, E-Wallet, COD).
- Validasi sebelum pesanan diproses, lalu modal konfirmasi berisi nomor pesanan dan nomor DO.
- Pesanan, transaksi, dan data tracking disimpan ke localStorage, dan stok buku berkurang otomatis.


| File | Isi screenshot |
|---|---|
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7ece6147-52bd-4504-ae79-90b54ee15ebe" /> | Daftar buku dengan cover |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/54b8c648-d6a7-49ef-86c9-ebdb4914c5d3" /> | Keranjang berisi beberapa buku dan form sudah terisi |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6f36f323-c43a-4215-a8c7-31ef5e5fb5b2" /> | Alert saat jumlah melebihi stok |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/98a033c7-d66e-4666-93fb-37323e7078a6" /> | Modal "Pesanan Berhasil" beserta nomor DO |

Gambar 11 menunjukkan cover dan informasi buku. Gambar 12 menunjukkan perhitungan total otomatis. Untuk gambar 13, tambahkan buku berstok kecil (misalnya yang stoknya 3) berulang kali sampai melewati stok. Gambar 14 menunjukkan pesanan tersimpan; **catat nomor DO-nya** untuk diuji di halaman Tracking.

### E. Tracking Pengiriman (`tracking.html`)

- Input nomor DO, tombol **Cari**, dan tombol **Reset Pencarian**.
- Jika ditemukan: nomor DO, nama pemesan, ekspedisi, tanggal kirim, jenis paket, total, dan riwayat perjalanan.
- Progress bar 4 tahap dengan warna berbeda: Pesanan diterima → Pesanan diproses → Dalam perjalanan → Pesanan diterima pelanggan.
- Jika tidak ditemukan, tampil pesan error.


| File | Isi screenshot |
|---|---|
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/548f4626-fa8d-4c9b-82f4-232849c4d7d4" /> | Hasil pencarian DO `20230012` |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a09e84f0-89e2-4c00-bb91-8a7262156aa1" /> | Hasil pencarian DO `20230013` |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/dd416714-219e-492a-b511-8eeb01c2a891" /> | Pesan error untuk DO yang tidak ada (mis. `99999`) |
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4fb38870-bffc-4220-90cf-f13b61b1b786" /> | Hasil pencarian DO dari pesanan yang baru dibuat |

Gambar 15 dan 16 memperlihatkan warna dan panjang progress bar yang berbeda sesuai status. Gambar 17 membuktikan penanganan DO yang tidak ditemukan. Gambar 18 membuktikan data antarhalaman saling terhubung: pesanan dari halaman Pemesanan langsung bisa dilacak.

### F. Laporan Pemesanan (`laporan.html`)

- Daftar pesanan, total transaksi, jumlah buku terjual, dan total pendapatan.
- Filter status pesanan (Diproses, Dikirim, Selesai); ringkasan ikut berubah mengikuti filter.

📸 **Screenshot yang harus ditambahkan:**

| File | Isi screenshot |
|---|---|
| <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/02bab534-c4fb-49c1-bc25-2a487d3c45ff" /> | Laporan dengan filter "Semua Status" |
|<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2b1b2239-1a34-44c8-b8bd-f3270bd8df7f" />  | Laporan setelah filter diubah (mis. "Selesai") |

 Bandingkan kedua gambar: jumlah baris tabel dan angka pada kartu ringkasan harus berubah setelah filter dipakai.

### G. History Transaksi (`history.html`)

- Riwayat transaksi: nomor transaksi, nama pembeli, tanggal, total pembayaran, dan status.
- Transaksi terbaru dari halaman Pemesanan tampil paling atas.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8cf98530-515c-43fa-89b4-c897d10e839e" />


*Penjelasan:* Ambil setelah membuat minimal satu pesanan baru, agar terlihat transaksi baru berada di atas data dummy.

### H. Tampilan Responsif

📸 **Screenshot yang harus ditambahkan:** `screenshots/22-responsif-hp.png`

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bb1d14ae-6551-4024-af58-281aee3182dd" />

---

## 6. Penerapan Konsep JavaScript

| Konsep | Contoh penerapan |
|---|---|
| DOM Manipulation | `innerHTML`, `textContent`, `classList` untuk tabel, keranjang, dan modal |
| Event Listener | `addEventListener` pada tombol, input pencarian, filter, dan tabel |
| Form Validation | Login, daftar, form buku, dan form pemesan |
| Array of Objects | `dataKatalogBuku`, `dataPesanan`, `dataTransaksi`, `dataPengguna` |
| Function | `tampil()`, `tambah()`, `cariDO()`, `rupiah()`, `angka()`, `buatSidebar()` |
| Conditional | `if/else` untuk login, status stok, greeting, validasi |
| Looping | `for...of` untuk menampilkan data dan menghitung statistik |
| CRUD | Halaman Stok: tambah, tampil, ubah, hapus buku |
| LocalStorage | `ambilData()` dan `simpanData()` di `data.js` |
| Hitung total | Subtotal dan total keranjang, pendapatan, total stok |
| Tabel dinamis | Tabel stok, laporan, dan history dibuat dari array |

---

## 7. Alur Kerja Aplikasi

1. `data.js` menyimpan data awal dan fungsi bersama yang dipakai semua halaman.
2. **Login** memeriksa email dan password; jika benar, nama pengguna disimpan di localStorage dan halaman dashboard dibuka. Halaman lain otomatis kembali ke login jika belum login.
3. **Stok** mengubah data buku dan menyimpannya ke `katalogBuku`.
4. **Pemesanan** membaca `katalogBuku`, lalu saat pesanan dibuat: stok dikurangi, dan data disimpan ke `pesananBaru`, `transaksiBaru`, dan `trackingBaru`.
5. **Dashboard, Tracking, Laporan, dan History** menggabungkan data awal dari `data.js` dengan data baru dari localStorage, sehingga semua halaman saling terhubung.

| Kunci localStorage | Isi | Ditulis oleh | Dibaca oleh |
|---|---|---|---|
| `userLogin`, `roleLogin` | Nama dan peran pengguna | login.js | semua halaman |
| `akunTerdaftar` | Akun hasil Daftar | login.js | login.js |
| `katalogBuku` | Katalog buku | stok.js, checkout.js | dashboard, stok, checkout |
| `pesananBaru` | Pesanan baru | checkout.js | dashboard, laporan |
| `transaksiBaru` | Transaksi baru | checkout.js | history |
| `trackingBaru` | Pengiriman baru | checkout.js | tracking |

📸 **Screenshot yang harus ditambahkan:** `screenshots/23-localstorage.png`

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1bb63e66-ff79-4aee-8b21-7928a2b019ec" />

---

## 8. Checklist Screenshot

| No | File | Halaman |
|---|---|---|
| 00 | `00-struktur-folder.png` | VS Code Explorer |
| 01–04 | `01-login.png` … `04-modal-lupa-password.png` | Login |
| 05 | `05-dashboard.png` | Dashboard |
| 06–10 | `06-stok-tabel.png` … `10-stok-indikator.png` | Stok |
| 11–14 | `11-pemesanan-katalog.png` … `14-pemesanan-sukses.png` | Pemesanan |
| 15–18 | `15-tracking-dalam-perjalanan.png` … `18-tracking-pesanan-baru.png` | Tracking |
| 19–20 | `19-laporan-semua.png`, `20-laporan-filter.png` | Laporan |
| 21 | `21-history.png` | History |
| 22 | `22-responsif-hp.png` | Responsif |
| 23 | `23-localstorage.png` | Penyimpanan data |

---

### Kesimpulan

Dari pengerjaan proyek UTS ini dapat disimpulkan bahwa website toko buku online BOOKSPACE berhasil dibuat sesuai ketentuan soal, menggunakan HTML, CSS, dan JavaScript murni tanpa framework, backend, atau database. Website terdiri dari tujuh halaman yang saling terhubung: Login, Dashboard, Informasi Stok/Katalog, Pemesanan, Tracking Pengiriman, Laporan Pemesanan, dan History Transaksi. Semua halaman memakai satu file CSS dengan warna dan komponen yang seragam, serta dapat menyesuaikan tampilan di laptop, tablet, dan ponsel.

Dari sisi pemrograman, proyek ini menerapkan konsep dasar JavaScript yang diminta soal: manipulasi DOM, event listener, validasi form, array of objects, function, percabangan, perulangan, dan CRUD. Penyimpanan localStorage membuat data antarhalaman saling berhubungan. Misalnya, pesanan yang dibuat di halaman Pemesanan akan mengurangi stok di katalog, menambah angka di Dashboard dan Laporan, muncul di History Transaksi, dan nomor DO-nya bisa langsung dilacak di halaman Tracking. Pemisahan data ke data.js dan satu file JavaScript untuk tiap halaman membuat kode lebih mudah dipahami, dipelihara, dan dijelaskan saat presentasi.

Proyek ini juga memiliki keterbatasan. Data hanya tersimpan di browser yang dipakai, sehingga tidak bisa dibagikan antarperangkat atau antarpengguna. Password masih ditulis apa adanya di data.js dan proses login hanya dicek di sisi klien, sehingga belum aman untuk dipakai sungguhan. Status pengiriman pada Tracking juga masih berupa data simulasi, bukan data dari ekspedisi yang sebenarnya.

Untuk pengembangan selanjutnya, website ini dapat dilengkapi dengan server dan database agar data tersimpan terpusat, password yang dienkripsi, pembatasan fitur berdasarkan peran (Admin dan User), integrasi pembayaran dan ekspedisi sungguhan, serta fitur ekspor laporan ke PDF atau Excel. Meski begitu, sebagai tugas UTS, BOOKSPACE sudah menunjukkan penerapan dasar pemrograman web mulai dari perancangan tampilan, pengolahan data, sampai penyimpanan data di sisi pengguna.

---

*Dibuat oleh Chaya Aulia (NIM 312510197, kelas I251B) untuk memenuhi tugas UTS mata kuliah Pemrograman Web, dosen pengampu Agung Nugroho, S.Kom., M.Kom.*
