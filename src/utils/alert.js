export function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.style.display = 'block';
    
    if (type === 'success') {
        alert.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#f44336';
    }

    // Auto hide after 3 seconds
    setTimeout(() => {
        alert.style.display = 'none';
    }, 3000);
}