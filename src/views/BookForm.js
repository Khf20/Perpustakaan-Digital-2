export class BookForm {
    constructor(onSubmit) {
        this.form = document.getElementById('bookForm');
        this.onSubmit = onSubmit;
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const bookData = {
                id: document.getElementById('bookId').value,
                judul: document.getElementById('judul').value,
                penulis: document.getElementById('penulis').value,
                tahun: parseInt(document.getElementById('tahun').value),
                kategori: document.getElementById('kategori').value,
                deskripsi: document.getElementById('deskripsi').value
            };

            this.onSubmit(bookData);
            this.resetForm();
        });
    }

    populateForm(book) {
        document.getElementById('bookId').value = book.id;
        document.getElementById('judul').value = book.judul;
        document.getElementById('penulis').value = book.penulis;
        document.getElementById('tahun').value = book.tahun;
        document.getElementById('kategori').value = book.kategori;
        document.getElementById('deskripsi').value = book.deskripsi || '';
    }

    resetForm() {
        document.getElementById('bookId').value = '';
        this.form.reset();
    }
}