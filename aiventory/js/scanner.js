document.addEventListener('DOMContentLoaded', function() {
    // Initialize barcode scanner
    const scannerElement = document.getElementById('barcode-scanner');
    const scannedItemsList = document.querySelector('.scanned-items-list');
    
    // Initialize the barcode scanner
    const html5QrcodeScanner = new Html5QrcodeScanner(
        "barcode-scanner",
        { fps: 10, qrbox: 250 },
        false
    );
    
    // Start scanning
    html5QrcodeScanner.render(onScanSuccess, onScanError);
    
    function onScanSuccess(decodedText, decodedResult) {
        // Add the scanned item to the list
        addScannedItem(decodedText);
        
        // Play success sound
        playScanSound();
    }
    
    function onScanError(errorMessage) {
        console.error('Scan error:', errorMessage);
    }
    
    function addScannedItem(barcode) {
        const itemElement = document.createElement('div');
        itemElement.className = 'scanned-item';
        itemElement.innerHTML = `
            <span>${barcode}</span>
            <span class="material-icons">delete</span>
        `;
        
        // Add delete functionality
        itemElement.querySelector('.material-icons').addEventListener('click', function() {
            itemElement.remove();
        });
        
        scannedItemsList.appendChild(itemElement);
    }
    
    function playScanSound() {
        const audio = new Audio('assets/sounds/beep.mp3');
        audio.play();
    }
    
    // Manual barcode entry
    document.getElementById('addManualBarcode').addEventListener('click', function() {
        const barcode = document.getElementById('manualBarcode').value;
        if (barcode) {
            addScannedItem(barcode);
            document.getElementById('manualBarcode').value = '';
        }
    });
    
    // Switch camera functionality
    document.getElementById('switchCamera').addEventListener('click', function() {
        // In a real app, you would implement camera switching
        alert('Camera switching functionality would be implemented here');
    });
});