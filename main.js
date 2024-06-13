document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settings-button');
    const settingsPanel = document.getElementById('settings-panel');
    const titleInput = document.getElementById('title-input');
    const tableTitle = document.getElementById('table-title');
    const buttonColorInput = document.getElementById('button-color');
    const textColorInput = document.getElementById('text-color');
    const saveSettingsButton = document.getElementById('save-settings');
    const formatSelector = document.getElementById('format-selector');
    const resultArea = document.getElementById('result');
    const copyButton = document.getElementById('copy-button');
    const toggleCustomButton = document.getElementById('toggle-custom');
    const customSettingsRow = document.getElementById('custom-settings-row');
    const farmList = document.getElementById('farm-list');
    const idDoorInput = document.getElementById('id-door');
    const itemIdInput = document.getElementById('item-id');
    const itemIdLabel = document.getElementById('item-id-label');
    const extraInputs = document.getElementById('extra-inputs');
    const convertButton = document.getElementById('convert-button');

    settingsButton.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    saveSettingsButton.addEventListener('click', () => {
        tableTitle.textContent = titleInput.value;
        document.documentElement.style.setProperty('--button-color', buttonColorInput.value);
        document.documentElement.style.setProperty('--text-color', textColorInput.value);
        settingsPanel.classList.add('hidden');
    });

    formatSelector.addEventListener('change', () => {
        const format = formatSelector.value;
        if (format.startsWith('dirt') || format.startsWith('plant')) {
            extraInputs.classList.remove('hidden');
            const showItemId = format === 'plant1' || format === 'plant2';
            itemIdInput.classList.toggle('hidden', !showItemId);
            itemIdLabel.classList.toggle('hidden', !showItemId);
        } else {
            extraInputs.classList.add('hidden');
        }
    });

    toggleCustomButton.addEventListener('click', () => {
        customSettingsRow.classList.toggle('hidden');
    });

    function updateResult() {
        const format = formatSelector.value;
        const farms = farmList.value.trim().split('\n').filter(farm => farm.trim() !== '');
        let prefix = document.getElementById('prefix-input').value || '';
        let suffix = document.getElementById('suffix-input').value || '';
        let separator = document.getElementById('separator-input').value || ', ';
        
        if (customSettingsRow.classList.contains('hidden')) {
            prefix = '';
            suffix = '';
            separator = format.startsWith('dirt') || format.startsWith('plant') ? '\n' : ', ';
        }

        let result = farms.map(farm => {
            let line = '';
            switch (format) {
                case 'horizontal':
                    line = `"${farm}"`;
                    break;
                case 'vertical':
                    line = `{"${farm}"}`;
                    break;
                case 'dirt1':
                    line = `"${farm}|${idDoorInput.value}"`;
                    break;
                case 'dirt2':
                    line = `${farm}|${idDoorInput.value}`;
                    break;
                case 'plant1':
                    line = `"${farm}|${idDoorInput.value}|${itemIdInput.value}"`;
                    break;
                case 'plant2':
                    line = `${farm}|${idDoorInput.value}|${itemIdInput.value}`;
                    break;
            }
            return prefix + line + suffix;
        }).join(separator);

        resultArea.value = result;
    }

    convertButton.addEventListener('click', updateResult);
    copyButton.addEventListener('click', () => {
        resultArea.select();
        document.execCommand('copy');
    });
});
