// main.js

// Function to convert farm list based on selected format
function convert() {
    const farmList = document.getElementById('farmList').value.trim().split('\n').filter(Boolean);
    const format = document.getElementById('formatSelect').value;
    const direction = document.getElementById('directionSelect').value;
    const doorId = document.getElementById('doorId').value.trim();
    const itemId = document.getElementById('itemId').value.trim();
    const separator = document.getElementById('separator').value.trim();
    const formatPattern = document.getElementById('formatPattern').value.trim();
    const prefix = document.getElementById('prefix').value.trim();
    const suffix = document.getElementById('suffix').value.trim();

    let convertedList = '';

    switch (format) {
        case 'ROTASI':
            if (direction === 'horizontal') {
                if (formatPattern) {
                    convertedList = `${prefix}${farmList.join(`${suffix}${prefix}`)}${suffix}`;
                } else {
                    convertedList = `${prefix}${farmList.join(`${suffix}${prefix}`)}${suffix}`;
                }
            } else if (direction === 'vertical') {
                if (formatPattern) {
                    convertedList = farmList.map(farm => `${prefix}${farm}${suffix}`).join('\n');
                } else {
                    convertedList = farmList.map(farm => `${prefix}${farm}${suffix}`).join('\n');
                }
            }
            break;
        case 'DF':
            convertedList = farmList.map(farm => `${prefix}${farm}${separator}${doorId}${suffix}`).join('\n');
            break;
        case 'PLANT':
            convertedList = farmList.map(farm => `${prefix}${farm}${separator}${doorId}${separator}${itemId}${suffix}`).join('\n');
            break;
        default:
            alert('Pilih format yang valid');
            return;
    }

    document.getElementById('convertedResult').value = convertedList;
}

// Function to copy converted result to clipboard
function copyResult() {
    const copyText = document.getElementById('convertedResult');
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    alert('Hasil berhasil disalin!');
}

// Function to toggle format options visibility and default behavior
function toggleFormat() {
    const format = document.getElementById('formatSelect').value;
    const directionSelect = document.getElementById('directionSelect');
    const formatEditor = document.getElementById('formatEditor');
    const prefixInput = document.getElementById('prefix');
    const suffixInput = document.getElementById('suffix');
    const separatorInput = document.getElementById('separator');

    // Reset prefix and suffix input values to default if empty
    if (format === 'ROTASI' && !prefixInput.value.trim() && !suffixInput.value.trim()) {
        prefixInput.value = '{"';
        suffixInput.value = '"},';
    }

    // Reset separator input value to default if empty
    if (format !== 'ROTASI' && !separatorInput.value.trim()) {
        separatorInput.value = '|';
    }

    if (format === 'ROTASI') {
        directionSelect.disabled = false;
        formatEditor.classList.remove('hidden');
        document.getElementById('formatPattern').placeholder = '{"Nama1","Nama2"}';
    } else {
        directionSelect.disabled = true;
        directionSelect.value = 'horizontal';
        formatEditor.classList.remove('hidden');
        if (format === 'DF') {
            document.getElementById('formatPattern').placeholder = '"Nama|ID"';
        } else if (format === 'PLANT') {
            document.getElementById('formatPattern').placeholder = 'Nama|ID|Item';
        }
    }
}

// Function to toggle settings panel visibility
function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.classList.toggle('hidden');
}

// Function to save settings (including background image URL)
function saveSettings() {
    const ownerName = document.getElementById('ownerName').value;
    const buttonColor = document.getElementById('buttonColor').value;
    const textColor = document.getElementById('textColor').value;
    const bgImageUrl = document.getElementById('bgImageUrl').value.trim();

    document.getElementById('ownerTitle').innerText = ownerName;
    document.getElementById('convertButton').style.backgroundColor = buttonColor;
    document.getElementById('copyButton').style.backgroundColor = buttonColor;
    document.getElementById('convertButton').style.color = textColor;
    document.getElementById('copyButton').style.color = textColor;

    // Set background image if URL is provided
    if (bgImageUrl) {
        document.body.style.backgroundImage = `url('${bgImageUrl}')`;
    } else {
        document.body.style.backgroundImage = 'none';
    }
}

// Function to apply custom format pattern
function applyCustomFormat(farmList, formatPattern) {
    return farmList.map(farm => formatPattern.replace(/Nama/g, farm)).join('\n');
}

// Function to start RGB animation around the converter
function startRGBAnimation() {
    const converter = document.querySelector('.converter');
    let hue = 0;

    setInterval(() => {
        hue = (hue + 1) % 360;
        converter.style.boxShadow = `0 0 10px hsl(${hue}, 70%, 50%)`;
    }, 50); // Adjust speed here (milliseconds)
}

// Call the function to start the RGB animation
startRGBAnimation();
