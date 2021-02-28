document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if ('serviceWorker' in navigator && navigator.onLine) {
        navigator.serviceWorker.register('/pwa/service-worker.js', { scope: '/pwa/' })
        .then((reg) => {
            console.log('Registrasi service worker Berhasil', reg);
        }, (err) => {
            console.error('Registrasi service worker Gagal', err);
        });
    }
}
