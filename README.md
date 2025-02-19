# Iuranku

## Instalasi

### Spesifikasi
- Nodejs v20
- Database MySQL atau MariaDB

### Cara Install

1. Clone atau download source code
    - Para terminal, clone repo `https://github.com/nipengg/iuranku-fe`
2. `cd iuranku-fe`
3. `npm install`
4. jika terjadi kesalahan versi lakukan `npm install --force`
5. `cp .env.local .env`
    - Jika tidak menggunakan Git, bisa copy file `.env.local` paste menjadi `.env`
6. Isi credential `.env` sesuai kebutuhan
7. Konfigurasi **environment backend** untuk aplikasi ini
8. `npm run dev` pada client untuk menjalani aplikasi
9. `npm run build` untuk menjalani build aplikasi
10. Selesai