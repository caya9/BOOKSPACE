// ===== LOGIN =====
const inputEmail = document.getElementById("email");
const inputPass = document.getElementById("password");

// Tombol lihat/sembunyikan password
document.getElementById("btnLihat").addEventListener("click", function () {
  const tersembunyi = inputPass.type === "password";
  inputPass.type = tersembunyi ? "text" : "password";
  this.textContent = tersembunyi ? "Sembunyi" : "Lihat";
});

// Cek akun: akun dummy + akun hasil daftar (localStorage)
document.getElementById("btnLogin").addEventListener("click", function () {
  const daftarAkun = ambilData("akunTerdaftar", []).concat(dataPengguna);
  let ketemu = null;
  for (const a of daftarAkun) {
    if (a.email === inputEmail.value.trim() && a.password === inputPass.value) ketemu = a;
  }
  if (ketemu) {
    localStorage.setItem("userLogin", ketemu.nama);
    localStorage.setItem("roleLogin", ketemu.role);
    location.href = "dashboard.html";
  } else {
    alert("email/password yang anda masukkan salah");
  }
});

// Modal: buka & tutup
function bukaModal(id) { document.getElementById(id).classList.add("buka"); }
document.getElementById("btnLupa").addEventListener("click", () => bukaModal("modalLupa"));
document.getElementById("btnDaftar").addEventListener("click", () => bukaModal("modalDaftar"));
document.querySelectorAll(".tutup").forEach(b => b.addEventListener("click", () =>
  document.querySelectorAll(".modal").forEach(m => m.classList.remove("buka"))));

document.getElementById("kirimLupa").addEventListener("click", function () {
  if (document.getElementById("emailLupa").value.trim() === "") { alert("Email wajib diisi!"); return; }
  alert("Link reset password sudah dikirim ke email Anda.");
  document.getElementById("modalLupa").classList.remove("buka");
});

// Daftar akun baru (disimpan ke localStorage)
document.getElementById("kirimDaftar").addEventListener("click", function () {
  const nama = document.getElementById("namaDaftar").value.trim();
  const email = document.getElementById("emailDaftar").value.trim();
  const pass = document.getElementById("passDaftar").value;
  if (nama === "" || email === "" || pass.length < 6) { alert("Semua kolom wajib diisi, password minimal 6 karakter."); return; }
  const daftarAkun = ambilData("akunTerdaftar", []);
  daftarAkun.push({ nama: nama, email: email, password: pass, role: "User" });
  simpanData("akunTerdaftar", daftarAkun);
  alert("Pendaftaran berhasil! Silakan login.");
  document.getElementById("modalDaftar").classList.remove("buka");
});