export class BookList {
    constructor(books, onEdit, onDelete) {
        this.bookListElement = document.getElementById('bookList');
        this.onEdit = onEdit;
        this.onDelete = onDelete;
        this.updateBookList(books);
    }

    updateBookList(books) {
        this.bookListElement.innerHTML = '';
        
        books.forEach((book, index) => {
            const bookCard = this.createBookCard(book);
            bookCard.style.animationDelay = `${index * 0.1}s`;
            this.bookListElement.appendChild(bookCard);
        });
    }

    createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-book-id', book.id);
        
        card.innerHTML = `
            <h3>${book.judul}</h3>
            <p><strong>Penulis:</strong> ${book.penulis}</p>
            <p><strong>Tahun:</strong> ${book.tahun}</p>
            <p><strong>Kategori:</strong> ${book.kategori}</p>
            ${book.deskripsi ? `<p><strong>Deskripsi:</strong> ${book.deskripsi}</p>` : ''}
            <div class="book-actions">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Hapus</button>
            </div>
        `;

        card.querySelector('.btn-edit').addEventListener('click', () => {
            this.onEdit(book.id);
        });

        card.querySelector('.btn-delete').addEventListener('click', () => {
            this.onDelete(book.id);
        });

        return card;
    }
}