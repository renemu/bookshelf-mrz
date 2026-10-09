# Bookshelf

Rak buku pribadi berbasis web untuk mengatur bacaanmu. Dibangun dengan HTML, CSS, dan JavaScript tanpa framework, dengan antarmuka berbahasa Indonesia.

## Fitur

- Tambahkan buku dengan judul, penulis, dan tanggal bacaan.
- Kelompokkan koleksi ke rak **Belum dibaca** dan **Sudah dibaca**.
- Pindahkan buku antar rak, edit detail, atau hapus buku dengan konfirmasi.
- Cari berdasarkan judul, penulis, atau tanggal; pencarian tidak membedakan huruf besar dan kecil.
- Lihat jumlah koleksi dan jumlah buku di setiap rak.
- Simpan koleksi otomatis menggunakan `localStorage`.

## Tampilan

Desain bernuansa hijau sage dengan ilustrasi buku, kartu koleksi, tampilan rak kosong, dan label formulir yang jelas. Layout menggunakan tiga kolom pada desktop, dua kolom pada tablet, dan satu kolom pada ponsel. Footer mengikuti alur halaman sehingga tidak menutupi konten. Font sistem dan ikon lokal digunakan tanpa layanan font eksternal.

## Menjalankan secara lokal

Tidak ada dependensi npm atau proses build. Gunakan server statis, misalnya Python 3:

```bash
git clone https://github.com/renemu/bookshelf-mrz.git
cd bookshelf-mrz
python3 -m http.server 8000
```

Buka `http://localhost:8000` di browser. Jika menggunakan checkout yang sudah tersedia, cukup jalankan perintah server dari direktori repository.

Koneksi internet diperlukan untuk memuat **SweetAlert2** dari `cdn.jsdelivr.net`, yang digunakan untuk notifikasi dan dialog konfirmasi.

## Penyimpanan data

Data disimpan pada browser dan origin yang digunakan, dengan kunci `BOOKSELF_APPS`. Gunakan browser, profil, alamat, dan port yang sama untuk mengakses koleksi yang tersimpan. Data tidak disinkronkan ke server atau perangkat lain; menghapus data situs/browser akan menghapus koleksi. Jangan mengandalkan penyimpanan mode privat untuk koleksi permanen.

## Struktur proyek

```text
bookshelf-mrz/
├── index.html      # Struktur halaman dan formulir
├── style.css       # Styling, layout responsif, dan modal
├── main.js         # Pengelolaan buku, pencarian, dan localStorage
└── assets/
    ├── icon/       # Ikon aksi buku
    └── img/        # Ikon aplikasi
```

## Pemeriksaan manual

1. Tambahkan buku dan pastikan muncul di rak belum dibaca.
2. Tandai selesai, lalu muat ulang halaman untuk memeriksa penyimpanan.
3. Cari judul atau penulis, termasuk dengan huruf besar dan teks yang ditempelkan.
4. Edit buku, kembalikan ke rak belum dibaca, lalu hapus dengan konfirmasi.
5. Periksa tampilan desktop dan ponsel, termasuk judul buku yang panjang.

Belum tersedia test suite otomatis di repository. Untuk pemeriksaan sintaks JavaScript, jalankan `node --check main.js` jika Node.js tersedia.

Dibuat oleh **MrZ**.
