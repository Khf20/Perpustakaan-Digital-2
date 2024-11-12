export class Book {
    constructor(id, judul, penulis, tahun, kategori, deskripsi) {
        this.id = parseInt(id);
        this.judul = judul;
        this.penulis = penulis;
        this.tahun = parseInt(tahun);
        this.kategori = kategori;
        this.deskripsi = deskripsi;
    }
}