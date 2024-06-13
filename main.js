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
                convertedList = `${prefix}${farmList.join(`${suffix}${prefix}`)}${suffix}`;
            } else if (direction === 'vertical') {
                convertedList = farmList.map(farm => `${prefix}${farm}${suffix}`).join('\n');
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

function copyResult() {
    const copyText = document.getElementById('convertedResult');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Hasil berhasil disalin!');
}

function toggleFormat() {
    const format = document.getElementById('formatSelect').value;
    const directionSelect = document.getElementById('directionSelect');
    const formatEditor = document.getElementById('formatEditor');

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

function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.classList.toggle('hidden');
}

function saveSettings() {
    const ownerName = document.getElementById('ownerName').value;
    const buttonColor = document.getElementById('buttonColor').value;
    const textColor = document.getElementById('textColor').value;
    const bgImageUrl = document.getElementById('bgImageUrl').value;

    document.getElementById('ownerTitle').innerText = ownerName;
    document.getElementById('convertButton').style.backgroundColor = buttonColor;
    document.getElementById('copyButton').style.backgroundColor = buttonColor;
    document.getElementById('convertButton').style.color = textColor;
    document.getElementById('copyButton').style.color = textColor;

    // Set background image
    document.body.style.backgroundImage = bgImageUrl ? `url(${bgImageUrl})` : 'none';
}

function applyCustomFormat(farmList, formatPattern) {
    return farmList.map(farm => formatPattern.replace(/Nama/g, farm)).join('\n');
}
