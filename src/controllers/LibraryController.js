import { Book } from '../models/Book.js';
import { BookForm } from '../views/BookForm.js';
import { BookList } from '../views/BookList.js';
import { showAlert } from '../utils/alert.js';

export class LibraryController {
    constructor() {
        this.books = JSON.parse(localStorage.getItem('books')) || [];
        this.bookForm = new BookForm(this.handleAddBook.bind(this));
        this.bookList = new BookList(
            this.books,
            this.handleEditBook.bind(this),
            this.handleDeleteBook.bind(this)
        );
        this.initializeSearch();
        this.updateEmptyMessage();
        this.updateBookCount();
    }

    initializeSearch() {
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredBooks = this.books.filter(book => 
                book.judul.toLowerCase().includes(searchTerm) ||
                book.penulis.toLowerCase().includes(searchTerm) ||
                book.kategori.toLowerCase().includes(searchTerm)
            );
            this.bookList.updateBookList(filteredBooks);
            this.updateEmptyMessage(filteredBooks.length === 0);
        });
    }

    updateBookCount() {
        const bookCount = document.getElementById('bookCount');
        if (bookCount) {
            bookCount.textContent = this.books.length;
        }
    }

    handleAddBook(bookData) {
        const loadingElement = document.querySelector('.loading') || document.createElement('div');
        loadingElement.className = 'loading';
        document.body.appendChild(loadingElement);
        loadingElement.style.display = 'block';

        try {
            if (bookData.id) {
                const index = this.books.findIndex(book => book.id === parseInt(bookData.id));
                if (index !== -1) {
                    this.books[index] = {
                        ...bookData,
                        id: parseInt(bookData.id)
                    };
                    showAlert('Buku berhasil diperbarui!', 'success');
                }
            } else {
                const newBook = new Book(
                    Date.now(),
                    bookData.judul,
                    bookData.penulis,
                    bookData.tahun,
                    bookData.kategori,
                    bookData.deskripsi
                );
                this.books.push(newBook);
                showAlert('Buku berhasil ditambahkan!', 'success');
            }

            localStorage.setItem('books', JSON.stringify(this.books));
            this.bookList.updateBookList(this.books);
            this.updateEmptyMessage();
            this.updateBookCount();
        } catch (error) {
            showAlert('Terjadi kesalahan!', 'error');
            console.error(error);
        } finally {
            loadingElement.remove();
        }
    }

    handleEditBook(bookId) {
        const book = this.books.find(book => book.id === parseInt(bookId));
        if (book) {
            this.bookForm.populateForm(book);
        }
    }

    handleDeleteBook(bookId) {
        const bookElement = document.querySelector(`[data-book-id="${bookId}"]`);
        if (bookElement) {
            bookElement.classList.add('delete-shake');
            setTimeout(() => {
                if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
                    this.books = this.books.filter(book => book.id !== parseInt(bookId));
                    localStorage.setItem('books', JSON.stringify(this.books));
                    this.bookList.updateBookList(this.books);
                    this.updateEmptyMessage();
                    this.updateBookCount();
                    showAlert('Buku berhasil dihapus!', 'success');
                }
                bookElement.classList.remove('delete-shake');
            }, 500);
        }
    }

    updateEmptyMessage(forceShow = false) {
        const emptyMessage = document.getElementById('emptyMessage');
        if (emptyMessage) {
            emptyMessage.style.display = forceShow || this.books.length === 0 ? 'block' : 'none';
        }
    }
}
