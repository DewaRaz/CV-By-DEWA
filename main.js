document.addEventListener('DOMContentLoaded', () => {
    const toggleCustomButton = document.getElementById('toggle-custom');
    const extraInputs = document.getElementById('extra-inputs');
    const formatSelect = document.getElementById('format');
    const convertButton = document.getElementById('convert-button');
    const copyButton = document.getElementById('copy-button');
    const resultArea = document.getElementById('result');
    const farmList = document.getElementById('farm-list');
    const extraInputsDirtPlant = document.getElementById('extra-inputs-dirt-plant');
    const idDoorInput = document.getElementById('id-door');
    const itemIdInput = document.getElementById('item-id');
    const settingsButton = document.getElementById('settings-button');
    const settingsPanel = document.getElementById('settings-panel');
    const saveSettingsButton = document.getElementById('save-settings');
    const tableName = document.getElementById('table-name');
    const buttonColor = document.getElementById('button-color');
    const textColor = document.getElementById('text-color');
    
    toggleCustomButton.addEventListener('click', () => {
        extraInputs.classList.toggle('hidden');
    });

    formatSelect.addEventListener('change', () => {
        const format = formatSelect.value;
        if (format.startsWith('dirt') || format.startsWith('plant')) {
            extraInputsDirtPlant.classList.remove('hidden');
            if (format.startsWith('plant')) {
                itemIdInput.classList.remove('hidden');
                itemIdInput.previousElementSibling.classList.remove('hidden');
            } else {
                itemIdInput.classList.add('hidden');
                itemIdInput.previousElementSibling.classList.add('hidden');
            }
        } else {
            extraInputsDirtPlant.classList.add('hidden');
            itemIdInput.classList.add('hidden');
            itemIdInput.previousElementSibling.classList.add('hidden');
        }
    });

    convertButton.addEventListener('click', () => {
        const format = formatSelect.value;
        const list = farmList.value.split('\n').filter(Boolean);
        let result = '';
        let prefix = '';
        let suffix = '';
        let separator = ', ';

        if (!extraInputs.classList.contains('hidden')) {
            prefix = document.getElementById('prefix').value;
            suffix = document.getElementById('suffix').value;
            separator = document.getElementById('separator').value;
        }

        switch (format) {
            case 'horizontal':
                result = `{${list.map(item => `${prefix}"${item}"${suffix}`).join(separator)}}`;
                break;
            case 'vertical':
                result = list.map(item => `{${prefix}"${item}"${suffix}}`).join(',\n');
                break;
            case 'dirt1':
                result = list.map(item => `"${item}|${idDoorInput.value}"`).join(',\n');
                break;
            case 'dirt2':
                result = list.map(item => `${item}|${idDoorInput.value}`).join('\n');
                break;
            case 'plant1':
                result = list.map(item => `"${item}|${idDoorInput.value}|${itemIdInput.value}"`).join(',\n');
                break;
            case 'plant2':
                result = list.map(item => `${item}|${idDoorInput.value}|${itemIdInput.value}`).join('\n');
                break;
        }

        resultArea.value = result;
    });

    copyButton.addEventListener('click', () => {
        resultArea.select();
        document.execCommand('copy');
    });

    settingsButton.addEventListener('click', () => {
        settingsPanel.classList.toggle('hidden');
    });

    saveSettingsButton.addEventListener('click', () => {
        document.querySelector('header > div').textContent = tableName.value;
        document.documentElement.style.setProperty('--button-color', buttonColor.value);
        document.documentElement.style.setProperty('--text-color', textColor.value);
        settingsPanel.classList.add('hidden');
    });
});
