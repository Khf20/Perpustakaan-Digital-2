import { LibraryController } from './controllers/LibraryController.js';
import { initTheme } from './utils/theme.js';

document.addEventListener('DOMContentLoaded', () => {
    const libraryController = new LibraryController();
    initTheme();
});