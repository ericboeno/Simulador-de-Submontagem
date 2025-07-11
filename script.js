// Arquivo: Simulador de Submontagem/script.js
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Definição dos Conectores e Seus Slots ---
    const connectorDefinitions = {
        '7287-1144-40': { // Conector existente
            imageSrc: 'images/7287-1144-40.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 315, left: 415, idSuffix: '1' },
                { top: 315, left: 315, idSuffix: '2' },
                { top: 315, left: 225, idSuffix: '3' },
                { top: 315, left: 130, idSuffix: '4' },
                { top: 410, left: 415, idSuffix: '5' },
                { top: 410, left: 315, idSuffix: '6' },
                { top: 410, left: 225, idSuffix: '7' },
                { top: 410, left: 130, idSuffix: '8' }
            ]
        },
        '7283-8850-30': { // Conector existente
            imageSrc: 'images/7283-8850-30.png',
            width: 600,
            height: 350,
            slotSize: 60,
            slotPositions: [
                { top: 330, left: 155, idSuffix: '1' },
                { top: 330, left: 230, idSuffix: '2' },
                { top: 330, left: 385, idSuffix: '3' },
                { top: 330, left: 460, idSuffix: '4' }
            ]
        },
        '7287-4904-30': { // Conector existente
            imageSrc: 'images/7287-4904-30.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 327, left: 77, idSuffix: '1' },
                { top: 327, left: 152, idSuffix: '2' },
                { top: 327, left: 232, idSuffix: '3' },
                { top: 327, left: 307, idSuffix: '4' },
                { top: 327, left: 383, idSuffix: '5' },
                { top: 327, left: 465, idSuffix: '6' }
            ]
        },
        '7283-8857-80': { // Conector existente
            imageSrc: 'images/7283-8857-80.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 342, left: 374, idSuffix: '1' },
                { top: 342, left: 303, idSuffix: '2' },
                { top: 342, left: 235, idSuffix: '3' },
                { top: 342, left: 163, idSuffix: '4' }
            ]
        },
        '7282-9812-30': { // Conector existente
            imageSrc: 'images/7282-9812-30.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 260, left: 77, idSuffix: '1' },
                { top: 260, left: 152, idSuffix: '2' },
                { top: 260, left: 230, idSuffix: '3' },
                { top: 260, left: 308, idSuffix: '4' },
                { top: 260, left: 390, idSuffix: '5' },
                { top: 260, left: 468, idSuffix: '6' },
                { top: 352, left: 77, idSuffix: '7' },
                { top: 352, left: 152, idSuffix: '8' },
                { top: 352, left: 230, idSuffix: '9' },
                { top: 352, left: 308, idSuffix: '10' },
                { top: 352, left: 390, idSuffix: '11' },
                { top: 352, left: 468, idSuffix: '12' }
            ]
        },
        '7287-3333-90': { // Conector existente
            imageSrc: 'images/7287-3333-90.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 315, left: 411, idSuffix: '1' },
                { top: 315, left: 315, idSuffix: '2' },
                { top: 315, left: 225, idSuffix: '3' },
                { top: 315, left: 130, idSuffix: '4' },
                { top: 410, left: 411, idSuffix: '5' },
                { top: 410, left: 315, idSuffix: '6' },
                { top: 410, left: 225, idSuffix: '7' },
                { top: 410, left: 130, idSuffix: '8' }
            ]
        },
        '7287-0853-30': { // Conector existente
            imageSrc: 'images/7287-0853-30.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 315, left: 411, idSuffix: '1' },
                { top: 315, left: 315, idSuffix: '2' },
                { top: 315, left: 225, idSuffix: '3' },
                { top: 315, left: 130, idSuffix: '4' },
                { top: 410, left: 411, idSuffix: '5' },
                { top: 410, left: 315, idSuffix: '6' },
                { top: 410, left: 225, idSuffix: '7' },
                { top: 410, left: 130, idSuffix: '8' }
            ]
        },
        '7287-1856-30': { // Conector existente
            imageSrc: 'images/7287-1856-30.png',
            width: 800,
            height: 850,
            slotSize: 40,
            slotPositions: [
                { top: 320, left: 85, idSuffix: '1' },
                { top: 320, left: 143, idSuffix: '2' },
                { top: 320, left: 202, idSuffix: '3' },
                { top: 320, left: 256, idSuffix: '4' },
                { top: 320, left: 314, idSuffix: '5' },
                { top: 320, left: 370, idSuffix: '6' },
                { top: 320, left: 427, idSuffix: '7' },
                { top: 320, left: 486, idSuffix: '8' },
                { top: 320, left: 542, idSuffix: '9' },
                { top: 320, left: 600, idSuffix: '10' },
                { top: 380, left: 85, idSuffix: '11' },
                { top: 380, left: 143, idSuffix: '12' },
                { top: 380, left: 202, idSuffix: '13' },
                { top: 380, left: 256, idSuffix: '14' },
                { top: 380, left: 314, idSuffix: '15' },
                { top: 380, left: 370, idSuffix: '16' },
                { top: 380, left: 427, idSuffix: '17' },
                { top: 380, left: 486, idSuffix: '18' },
                { top: 380, left: 542, idSuffix: '19' },
                { top: 380, left: 600, idSuffix: '20' },
                { top: 380, left: 660, idSuffix: '21' },
                { top: 438, left: 85, idSuffix: '22' },
                { top: 438, left: 143, idSuffix: '23' },
                { top: 438, left: 202, idSuffix: '24' },
                { top: 438, left: 256, idSuffix: '25' },
                { top: 438, left: 314, idSuffix: '26' },
                { top: 438, left: 370, idSuffix: '27' },
                { top: 438, left: 427, idSuffix: '28' },
                { top: 438, left: 486, idSuffix: '29' },
                { top: 438, left: 542, idSuffix: '30' },
                { top: 438, left: 600, idSuffix: '31' },
                { top: 438, left: 660, idSuffix: '32' },
                { top: 495, left: 85, idSuffix: '33' },
                { top: 495, left: 143, idSuffix: '34' },
                { top: 495, left: 202, idSuffix: '35' },
                { top: 495, left: 256, idSuffix: '36' },
                { top: 495, left: 314, idSuffix: '37' },
                { top: 495, left: 370, idSuffix: '38' },
                { top: 495, left: 427, idSuffix: '39' },
                { top: 495, left: 486, idSuffix: '40' },
                { top: 495, left: 542, idSuffix: '41' },
                { top: 495, left: 600, idSuffix: '42' }
            ]
        },
        '7287-1892': { // Conector existente
            imageSrc: 'images/7287-1892.png',
            width: 600,
            height: 650,
            slotSize: 48,
            slotPositions: [
                { top: 315, left: 62, idSuffix: '1' },
                { top: 315, left: 122, idSuffix: '2' },
                { top: 315, left: 182, idSuffix: '3' },
                { top: 315, left: 245, idSuffix: '4' },
                { top: 315, left: 304, idSuffix: '5' },
                { top: 315, left: 364, idSuffix: '6' },
                { top: 315, left: 425, idSuffix: '7' },
                { top: 315, left: 486, idSuffix: '8' },
                { top: 377, left: 62, idSuffix: '9' },
                { top: 377, left: 122, idSuffix: '10' },
                { top: 377, left: 182, idSuffix: '11' },
                { top: 377, left: 245, idSuffix: '12' },
                { top: 377, left: 304, idSuffix: '13' },
                { top: 377, left: 364, idSuffix: '14' },
                { top: 377, left: 425, idSuffix: '15' },
                { top: 377, left: 486, idSuffix: '16' }
            ]
        },
        '7287-8592': { // Conector existente
            imageSrc: 'images/7287-8592.png',
            width: 600,
            height: 650,
            slotSize: 120,
            slotPositions: [
                { top: 325, left: 169, idSuffix: '1' },
                { top: 325, left: 310, idSuffix: '2' }
            ]
        },

        '701': { // Solda existente
            imageSrc: 'images/701.png',
            width: 600,
            height: 650,
            slotSize: 120,
            slotPositions: [
                { top: 90, left: 112, idSuffix: '1' },
                { top: 90, left: 312, idSuffix: '2' },
                { top: 220, left: 312, idSuffix: '3' },
                { top: 350, left: 312, idSuffix: '4' }
            ]
        },
        '702': { // Solda existente
            imageSrc: 'images/702.png',
            width: 600,
            height: 650,
            slotSize: 120,
            slotPositions: [
                { top: 90, left: 112, idSuffix: '1' },
                { top: 90, left: 312, idSuffix: '2' },
                { top: 220, left: 312, idSuffix: '3' }
            ]
        },
        '703': { // Solda existente
            imageSrc: 'images/703.png',
            width: 600,
            height: 650,
            slotSize: 60,
            slotPositions: [
                { top: 60, left: 195, idSuffix: '1' },
                { top: 60, left: 320, idSuffix: '2' },
                { top: 142, left: 195, idSuffix: '3' },
                { top: 142, left: 320, idSuffix: '4' },
                { top: 212, left: 195, idSuffix: '5' },
                { top: 292, left: 195, idSuffix: '6' },
                { top: 372, left: 195, idSuffix: '7' },
                { top: 452, left: 195, idSuffix: '8' },
                { top: 532, left: 195, idSuffix: '9' },
                { top: 612, left: 195, idSuffix: '10' }
            ]
        },

        '704': { // Solda existente
            imageSrc: 'images/704.png',
            width: 600,
            height: 650,
            slotSize: 100,
            slotPositions: [
                { top: 92, left: 120, idSuffix: '1' },
                { top: 221, left: 120, idSuffix: '2' },
                { top: 351, left: 120, idSuffix: '3' }
            ]
        },

        '705': { // Solda existente
            imageSrc: 'images/705.png',
            width: 600,
            height: 650,
            slotSize: 100,
            slotPositions: [
                { top: 92, left: 120, idSuffix: '1' },
                { top: 221, left: 120, idSuffix: '2' },
                { top: 351, left: 120, idSuffix: '3' }
            ]
        },

        // --- NOVOS COMPONENTES GROMMETS (SEM SLOTS) ---
        'GROMMET1': {
            imageSrc: 'images/GROMMET1.png',
            width: 200,
            height: 200,
        },
        'GROMMET2': {
            imageSrc: 'images/GROMMET2.png',
            width: 250,
            height: 250,
        }
    };

    // --- Referências aos Elementos do DOM ---
    const numPostosSelect = document.getElementById('numPostos');
    const gerarPostosBtn = document.getElementById('gerarPostosBtn');
    const otPalette = document.getElementById('ot-palette');
    const postosArea = document.getElementById('postos-area');
    const connectorPalette = document.getElementById('connector-palette');
    const taktTimeInput = document.getElementById('taktTime');
    const gerarRelatorioBtn = document.getElementById('gerarRelatorioBtn');
    const limparRelatorioBtn = document.getElementById('limparRelatorioBtn');
    const reportArea = document.getElementById('report-area');
    const goToPacoPacoBtn = document.getElementById('goToPacoPacoBtn');

    // --- Variáveis de Controle ---
    let draggedOt = null;
    let draggedConnectorType = null;
    let postoTimes = {};
    let connectorTypeCounts = {};
    let slotContents = {};
    let originalOtsByPosto = {};

    let otOriginalOwners = {};

    let availableOts = new Set();
    let initialOtOrder = [];
    let otElementsMap = new Map();
    let otGroupElementsMap = new Map();
    let scrollInterval = null;
    let postoActionLog = {};
    let connectorInstanceAddTimes = {};

    // NOVO: Lista fixa de OTs de Solda (copiado de paco-paco-script.js)
    const SOLDER_OTS = [
        'ot0344', 'ot0300', 'ot0301', 'ot0302', 'ot0311', 'ot0304', 'ot0342', 'ot0343',
        'ot0305', 'ot0312', 'ot0190', 'ot0229', 'ot0192', 'ot0332', 'ot0333', 'ot0334',
        'ot0193', 'ot0310', 'ot0309', 'ot0335', 'ot0336', 'ot0337'
    ];
    // NOVO: Converte para um Set para pesquisa eficiente
    const SOLDER_OTS_SET = new Set(SOLDER_OTS);

    // --- Constantes de Tempo (em segundos) ---
    const TIME_PER_OT = 5;
    const TIME_PER_CONNECTOR_GRAB_TO_HOUSE = 2.88;
    const TIME_BARCODE_SCAN = 1.74;
    const TIME_TAKE_SAO_BAR_TO_TABLE = 2.82;
    const TIME_PLACE_KANBAN_LABEL = 5.16;
    const TIME_GROMMET_PASS_CIRCUIT = 10.04;
    const TIME_REMOVE_CONNECTOR_TO_COMB = 2.04;
    const TIME_LOCK_CONNECTOR = 2.16;
    const TIME_CHECK_CONNECTOR_LOCK = 2.58;
    const TIME_PASS_SAO = 1.74;
    const TIME_REMOVE_SAO_FROM_SUB = 8.04;
    const UNIQUE_CONNECTOR_ADD_TIME = 2.88;
    const DUPLICATE_CONNECTOR_ADD_TIME = 1;

    const SCROLL_SPEED = 10;
    const SCROLL_ZONE_HEIGHT = 50;

    // --- Funções de Salvar e Carregar Estado ---
    function saveAppState() {
        try {
            localStorage.setItem('numPostos', numPostosSelect.value);
            localStorage.setItem('taktTime', taktTimeInput.value);
            localStorage.setItem('postoTimes', JSON.stringify(postoTimes));
            localStorage.setItem('connectorTypeCounts', JSON.stringify(connectorTypeCounts));
            localStorage.setItem('slotContents', JSON.stringify(slotContents));
            const otsByPostoForStorage = {};
            for (const postoId in originalOtsByPosto) {
                otsByPostoForStorage[postoId] = Array.from(originalOtsByPosto[postoId]);
            }
            localStorage.setItem('originalOtsByPosto', JSON.stringify(otsByPostoForStorage));
            localStorage.setItem('otOriginalOwners', JSON.stringify(otOriginalOwners));

            localStorage.setItem('postoActionLog', JSON.stringify(postoActionLog));
            localStorage.setItem('connectorInstanceAddTimes', JSON.stringify(connectorInstanceAddTimes));

            localStorage.setItem('postosAreaHTML', postosArea.innerHTML);
            console.log("Estado da simulação salvo com sucesso!");
        } catch (e) {
            console.error("Erro ao salvar o estado no localStorage:", e);
        }
    }

    function loadAppState() {
        try {
            const savedNumPostos = localStorage.getItem('numPostos');
            const savedTaktTime = localStorage.getItem('taktTime');
            const savedPostoTimes = localStorage.getItem('postoTimes');
            const savedConnectorTypeCounts = localStorage.getItem('connectorTypeCounts');
            const savedSlotContents = localStorage.getItem('slotContents');
            const savedOriginalOtsByPosto = localStorage.getItem('originalOtsByPosto');
            const savedOtOriginalOwners = localStorage.getItem('otOriginalOwners');
            const savedPostoActionLog = localStorage.getItem('postoActionLog');
            const savedConnectorInstanceAddTimes = localStorage.getItem('connectorInstanceAddTimes');
            const savedPostosAreaHTML = localStorage.getItem('postosAreaHTML');

            if (savedNumPostos) {
                numPostosSelect.value = savedNumPostos;
                taktTimeInput.value = savedTaktTime;
                postoTimes = JSON.parse(savedPostoTimes);
                connectorTypeCounts = JSON.parse(savedConnectorTypeCounts);
                slotContents = JSON.parse(savedSlotContents);

                const loadedOtsByPosto = JSON.parse(savedOriginalOtsByPosto);
                for (const postoId in loadedOtsByPosto) {
                    originalOtsByPosto[postoId] = new Set(loadedOtsByPosto[postoId]);
                }
                otOriginalOwners = JSON.parse(savedOtOriginalOwners || '{}');

                postoActionLog = JSON.parse(savedPostoActionLog);
                connectorInstanceAddTimes = JSON.parse(savedConnectorInstanceAddTimes);

                postosArea.innerHTML = savedPostosAreaHTML;
                console.log("HTML dos postos restaurado.");

                reattachListeners();
                console.log("Listeners reanexados.");

                Object.keys(postoTimes).forEach(updateProgressBar);

                syncOtPaletteVisibility();
                console.log("Estado da simulação carregado com sucesso!");
                return true;
            }
            return false;
        } catch (e) {
            console.error("Erro ao carregar o estado do localStorage:", e);
            clearSavedState();
            return false;
        }
    }

    function clearSavedState() {
        localStorage.clear();
        console.log("Estado salvo limpo.");
    }

    // Função para reanexar listeners após carregar HTML
    function reattachListeners() {
        document.querySelectorAll('.posto-content .conector').forEach(conectorDiv => {
            const removeButton = conectorDiv.querySelector('.remove-connector-btn');
            if (removeButton) {
                removeButton.onclick = null;
                removeButton.addEventListener('click', () => {
                    const postoId = conectorDiv.closest('.posto-container').id;
                    let timeToSubtract = 0;
                    let actionsLogged = [];

                    const type = conectorDiv.dataset.connectorType;
                    const originalAddTimeForThisInstance = connectorInstanceAddTimes[conectorDiv.id] || 0;

                    if (originalAddTimeForThisInstance === 0) {
                        timeToSubtract += DUPLICATE_CONNECTOR_ADD_TIME;
                        actionsLogged.push({
                            action: `Conector ${type} removido (Débito padrão por falta de registro original): -${DUPLICATE_CONNECTOR_ADD_TIME.toFixed(2)}s.`,
                            time: -DUPLICATE_CONNECTOR_ADD_TIME,
                            type: 'subtract',
                            conectorId: conectorDiv.id,
                            conectorType: type
                        });
                    } else {
                        timeToSubtract += originalAddTimeForThisInstance;
                        actionsLogged.push({
                            action: `Conector ${type} removido (Débito do tempo de adição original): -${originalAddTimeForThisInstance.toFixed(2)}s.`,
                            time: -originalAddTimeForThisInstance,
                            type: 'subtract',
                            conectorId: conectorDiv.id,
                            conectorType: type
                        });
                    }

                    const checkboxInput = conectorDiv.querySelector('.conector-trava-checkbox');
                    if (checkboxInput && checkboxInput.checked) {
                        const checkboxTime = TIME_LOCK_CONNECTOR + TIME_CHECK_CONNECTOR_LOCK;
                        timeToSubtract += checkboxTime;
                        actionsLogged.push({
                            action: `Checkbox "Travar/Checar Conector" de ${type} desmarcado automaticamente (devido à remoção do conector): -${checkboxTime.toFixed(2)}s.`,
                            time: -checkboxTime,
                            type: 'subtract',
                            conectorId: conectorDiv.id,
                            conectorType: type
                        });
                    }

                    const definition = connectorDefinitions[type];
                    if (definition && definition.slotPositions) {
                        const slotsInConnector = conectorDiv.querySelectorAll('.slot');
                        slotsInConnector.forEach(slot => {
                            const otInSlot = slot.querySelector('.ot');
                            if (otInSlot) {
                                const otIsPropagated = otInSlot.dataset.isPropagated === 'true';
                                const otDataInSlot = slotContents[postoId]?.[conectorDiv.id]?.[slot.id];
                                const otOriginalId = otDataInSlot?.otId || otInSlot.id;

                                if (!otIsPropagated) {
                                    timeToSubtract += TIME_PER_OT;
                                    actionsLogged.push({
                                        action: `OT ${otOriginalId} removida do slot ${slot.id.split('-').pop()} do conector ${type} (devido à remoção do conector). (Remoção de Circuitos): -${TIME_PER_OT.toFixed(2)}s.`,
                                        time: -TIME_PER_OT,
                                        type: 'subtract',
                                        otId: otOriginalId,
                                        conectorId: conectorDiv.id,
                                        conectorType: type,
                                        slotId: slot.id
                                    });
                                    depropagateOt(postoId, conectorDiv.id, slot.id, otOriginalId);

                                    const otToReturn = otElementsMap.get(otOriginalId);
                                    if (otToReturn) {
                                        otToReturn.style.display = 'block';
                                        otToReturn.draggable = true;
                                        availableOts.add(otToReturn.id);

                                        otToReturn.classList.remove('propagated-ot');
                                        delete otToReturn.dataset.isPropagated;
                                        delete otToReturn.dataset.originalPosto;
                                        delete otToReturn.dataset.isOriginalForPacoPaco;
                                        const paletteOtLabel = otToReturn.querySelector('.origin-label');
                                        if(paletteOtLabel) {
                                            otToReturn.removeChild(paletteOtLabel);
                                        }
                                    }
                                }
                                slot.removeChild(otInSlot);
                                const originLabelInSlot = slot.querySelector('.origin-label');
                                if (originLabelInSlot) {
                                    slot.removeChild(originLabelInSlot);
                                }
                                slot.classList.remove('has-ot');

                                if (slotContents[postoId] && slotContents[postoId][conectorDiv.id]) {
                                    delete slotContents[postoId][conectorDiv.id][slot.id];
                                }
                            }
                        });
                    }
                    if (slotContents[postoId]) {
                        delete slotContents[postoId][conectorDiv.id];
                        if (Object.keys(slotContents[postoId]).length === 0) {
                            delete slotContents[postoId];
                        }
                    }

                    postoTimes[postoId] -= timeToSubtract;
                    updateProgressBar(postoId);

                    connectorTypeCounts[type] = (connectorTypeCounts[type] || 0) - 1;
                    if (connectorTypeCounts[type] < 0) connectorTypeCounts[type] = 0;

                    conectorDiv.parentNode.removeChild(conectorDiv);
                    delete connectorInstanceAddTimes[conectorDiv.id];

                    if (!postoActionLog[postoId]) postoActionLog[postoId] = [];
                    postoActionLog[postoId].push(...actionsLogged);

                    syncOtPaletteVisibility();
                    updateOriginalOtsByPosto();
                    saveAppState();
                });
            }

            const checkboxInput = conectorDiv.querySelector('.conector-trava-checkbox');
            if (checkboxInput) {
                checkboxInput.onchange = null;
                checkboxInput.addEventListener('change', (e) => {
                    const currentPostoId = conectorDiv.closest('.posto-container').id;
                    const isChecked = e.target.checked;
                    let timeChange = 0;
                    let actionDescription = "";
                    const type = conectorDiv.dataset.connectorType;

                    if (isChecked) {
                        timeChange += TIME_LOCK_CONNECTOR;
                        timeChange += TIME_CHECK_CONNECTOR_LOCK;
                        actionDescription = `Checkbox "Travar/Checar Conector" de ${type} marcado (Travar: ${TIME_LOCK_CONNECTOR.toFixed(2)}s, Checar: ${TIME_CHECK_CONNECTOR_LOCK.toFixed(2)}s).`;
                    } else {
                        timeChange -= TIME_LOCK_CONNECTOR;
                        timeChange -= TIME_CHECK_CONNECTOR_LOCK;
                        actionDescription = `Checkbox "Travar/Checar Conector" de ${type} desmarcado (Remover Travar: ${TIME_LOCK_CONNECTOR.toFixed(2)}s, Remover Checar: ${TIME_CHECK_CONNECTOR_LOCK.toFixed(2)}s).`;
                    }

                    postoTimes[currentPostoId] += timeChange;
                    updateProgressBar(currentPostoId);

                    if (!postoActionLog[currentPostoId]) postoActionLog[currentPostoId] = [];
                    postoActionLog[currentPostoId].push({
                        action: actionDescription,
                        time: timeChange,
                        type: 'add',
                        conectorId: conectorDiv.id,
                        conectorType: type
                    });
                    saveAppState();
                });
            }
        });

        addOTDragDropToSlots();
        document.querySelectorAll('.posto-content').forEach(postoContent => {
            postoContent.removeEventListener('dragover', postoContent._dragOverListener);
            postoContent.removeEventListener('dragenter', postoContent._dragEnterListener);
            postoContent.removeEventListener('dragleave', postoContent._dragleaveListener);
            postoContent.removeEventListener('drop', postoContent._dropListener);
            addPostoDragDropListeners(postoContent);
        });
        setupOtDragDropListeners();
        generateConnectorPalette();
    }

    function areAllSlotsFilled(conectorElement) {
        const conectorType = conectorElement.dataset.connectorType;
        const definition = connectorDefinitions[conectorType];

        if (!definition || !definition.slotPositions || definition.slotPositions.length === 0) {
            return false;
        }

        const slots = conectorElement.querySelectorAll('.slot');
        if (slots.length !== definition.slotPositions.length) {
            console.warn(`Mismatch in slot count for connector ${conectorType}. DOM: ${slots.length}, Definition: ${definition.slotPositions.length}`);
            return false;
        }

        for (const slot of slots) {
            if (!slot.querySelector('.ot')) {
                return false;
            }
        }
        return true;
    }

    function propagateOt(sourcePostoId, sourceConectorId, sourceSlotId, otId) {
        const sourcePostoNumber = parseInt(sourcePostoId.replace('posto-p', ''));
        const totalPostos = parseInt(numPostosSelect.value);

        const sourceConectorElement = document.getElementById(sourceConectorId);
        if (!sourceConectorElement) return;
        const sourceConectorType = sourceConectorElement.dataset.connectorType;
        const sourceSlotSuffix = sourceSlotId.split('-').pop();

        const originalOtElement = otElementsMap.get(otId);
        if (!originalOtElement) {
            console.error(`OT com ID ${otId} não encontrada no mapa de elementos.`);
            return;
        }

        const postoSoldaId = 'posto-solda-01';
        const postoSoldaElement = document.getElementById(postoSoldaId);
        if (postoSoldaElement) {
            const targetConectorElement = postoSoldaElement.querySelector(`.conector-${sourceConectorType}`);
            if (targetConectorElement) {
                const targetSlot = targetConectorElement.querySelector(`[id$="-${sourceSlotSuffix}"]`);
                if (targetSlot && !targetSlot.querySelector('.ot')) {
                    const otCopy = originalOtElement.cloneNode(true);
                    otCopy.classList.remove('dragging');
                    otCopy.style.position = '';
                    otCopy.style.top = '';
                    otCopy.style.left = '';
                    otCopy.dataset.isPropagated = 'true';
                    otCopy.draggable = false;

                    otCopy.classList.add('propagated-ot');
                    otCopy.dataset.originalPosto = sourcePostoId.startsWith('posto-p') ? `P${sourcePostoNumber}` : sourcePostoId;
                    otCopy.dataset.isOriginalForPacoPaco = 'false';

                    targetSlot.appendChild(otCopy);
                    targetSlot.classList.add('has-ot');

                    const originLabel = document.createElement('span');
                    originLabel.classList.add('origin-label');
                    originLabel.textContent = sourcePostoId.startsWith('posto-p') ? `P${sourcePostoNumber}` : postoId; // Changed to postoId
                    targetSlot.appendChild(originLabel);

                    const targetConectorId = targetConectorElement.id;
                    const targetSlotId = targetSlot.id;
                    if (!slotContents[postoSoldaId]) slotContents[postoSoldaId] = {};
                    if (!slotContents[postoSoldaId][targetConectorId]) slotContents[postoSoldaId][targetConectorId] = {};
                    slotContents[postoSoldaId][targetConectorId][targetSlotId] = { otId: otId, isPropagated: true, isOriginalForPacoPaco: false };
                }
            }
        }

        for (let i = sourcePostoNumber + 1; i <= totalPostos; i++) {
            const targetPostoId = `posto-p${String(i).padStart(2, '0')}`;
            const targetPostoElement = document.getElementById(targetPostoId);
            if (!targetPostoElement) continue;

            const targetConectorElement = targetPostoElement.querySelector(`.conector-${sourceConectorType}`);

            if (targetConectorElement) {
                const targetSlot = targetConectorElement.querySelector(`[id$="-${sourceSlotSuffix}"]`);

                if (targetSlot && !targetSlot.querySelector('.ot')) {
                    const otCopy = originalOtElement.cloneNode(true);
                    otCopy.classList.remove('dragging');
                    otCopy.style.position = '';
                    otCopy.style.top = '';
                    otCopy.style.left = '';
                    otCopy.dataset.isPropagated = 'true';
                    otCopy.draggable = false;

                    otCopy.classList.add('propagated-ot');
                    otCopy.dataset.originalPosto = `P${sourcePostoNumber}`;
                    otCopy.dataset.isOriginalForPacoPaco = 'false';

                    targetSlot.appendChild(otCopy);
                    targetSlot.classList.add('has-ot');

                    const originLabel = document.createElement('span');
                    originLabel.classList.add('origin-label');
                    originLabel.textContent = `P${sourcePostoNumber}`;
                    targetSlot.appendChild(originLabel);

                    const targetConectorId = targetConectorElement.id;
                    const targetSlotId = targetSlot.id;
                    if (!slotContents[targetPostoId]) slotContents[targetPostoId] = {};
                    if (!slotContents[targetPostoId][targetConectorId]) slotContents[targetPostoId][targetConectorId] = {};
                    slotContents[targetPostoId][targetConectorId][targetSlotId] = { otId: otId, isPropagated: true, isOriginalForPacoPaco: false };
                }
            }
        }
    }

    function depropagateOt(sourcePostoId, sourceConectorId, sourceSlotId, otId) {
        const sourcePostoNumber = parseInt(sourcePostoId.replace('posto-p', ''));
        const totalPostos = parseInt(numPostosSelect.value);

        const sourceConectorElement = document.getElementById(sourceConectorId);
        if (!sourceConectorElement) return;
        const sourceConectorType = sourceConectorElement.dataset.connectorType;
        const sourceSlotSuffix = sourceSlotId.split('-').pop();

        const postoSoldaId = 'posto-solda-01';
        const postoSoldaElement = document.getElementById(postoSoldaId);
        if (postoSoldaElement) {
            const targetConectorElement = postoSoldaElement.querySelector(`.conector-${sourceConectorType}`);
            if (targetConectorElement) {
                const targetSlot = targetConectorElement.querySelector(`[id$="-${sourceSlotSuffix}"]`);
                if (targetSlot) {
                    const otInSlot = targetSlot.querySelector('.ot');
                    const originLabelInSlot = targetSlot.querySelector('.origin-label');
                    if (otInSlot && otInSlot.id === otId && otInSlot.dataset.isPropagated === 'true') {
                        targetSlot.removeChild(otInSlot);
                        if (originLabelInSlot) {
                            targetSlot.removeChild(originLabelInSlot);
                        }
                        targetSlot.classList.remove('has-ot');

                        const targetConectorId = targetConectorElement.id;
                        const targetSlotId = targetSlot.id;
                        if (slotContents[postoSoldaId] && slotContents[postoSoldaId][targetConectorId]) {
                            delete slotContents[postoSoldaId][targetConectorId][targetSlotId];
                        }
                    }
                }
            }
        }

        for (let i = sourcePostoNumber + 1; i <= totalPostos; i++) {
            const targetPostoId = `posto-p${String(i).padStart(2, '0')}`;
            const targetPostoElement = document.getElementById(targetPostoId);
            if (!targetPostoElement) continue;

            const targetConectorElement = targetPostoElement.querySelector(`.conector-${sourceConectorType}`);

            if (targetConectorElement) {
                const targetSlot = targetConectorElement.querySelector(`[id$="-${sourceSlotSuffix}"]`);

                if (targetSlot) {
                    const otInSlot = targetSlot.querySelector('.ot');
                    const originLabelInSlot = targetSlot.querySelector('.origin-label');

                    if (otInSlot && otInSlot.id === otId && otInSlot.dataset.isPropagated === 'true') {
                        targetSlot.removeChild(otInSlot);
                        if (originLabelInSlot) {
                            targetSlot.removeChild(originLabelInSlot);
                        }
                        targetSlot.classList.remove('has-ot');

                        const targetConectorId = targetConectorElement.id;
                        const targetSlotId = targetSlot.id;
                        if (slotContents[targetPostoId] && slotContents[targetPostoId][targetConectorId]) {
                            delete slotContents[targetPostoId][targetConectorId][targetSlotId];
                        }
                    }
                }
            }
        }
    }

    function updateOriginalOtsByPosto() {
        originalOtsByPosto = {};
        const allPostoElements = document.querySelectorAll('.posto-container');
        allPostoElements.forEach(postoElement => {
            const postoId = postoElement.id;
            originalOtsByPosto[postoId] = new Set();
            const postoData = slotContents[postoId];

            if (postoData) {
                for (const conectorId in postoData) {
                    for (const slotId in postoData[conectorId]) {
                        const otData = postoData[conectorId][slotId];
                        if (!otData.isPropagated && otData.isOriginalForPacoPaco === true) {
                            const baseOtId = otData.otId.endsWith('D') ? otData.otId.slice(0, -1) : otData.otId;
                            originalOtsByPosto[postoId].add(baseOtId);
                        }
                    }
                }
            }
        });
        const otsByPostoForSessionStorage = {};
        for (const postoId in originalOtsByPosto) {
            otsByPostoForSessionStorage[postoId] = Array.from(originalOtsByPosto[postoId]);
        }
        sessionStorage.setItem('allOriginalOtsByPosto', JSON.stringify(otsByPostoForSessionStorage));
        console.log("OTs originais por posto atualizadas para a nova aba:", otsByPostoForSessionStorage);
    }

    function handleAutoScroll(e) {
        const clientY = e.clientY;
        const windowHeight = window.innerHeight;

        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }

        if (clientY < SCROLL_ZONE_HEIGHT) {
            window.scrollBy(0, -SCROLL_SPEED);
            scrollInterval = setInterval(() => {
                window.scrollBy(0, -SCROLL_SPEED);
            }, 20);
        } else if (clientY > windowHeight - SCROLL_ZONE_HEIGHT) {
            window.scrollBy(0, SCROLL_SPEED);
            scrollInterval = setInterval(() => {
                window.scrollBy(0, SCROLL_SPEED);
            }, 20);
        }
    }

    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    function updateProgressBar(postoId) {
        const postoContainer = document.getElementById(postoId);
        if (!postoContainer) return;

        const fillElement = postoContainer.querySelector('.progress-bar-fill');
        const labelElement = postoContainer.querySelector('.progress-time-label');
        const taktTime = parseFloat(taktTimeInput.value) || 45;
        const currentTime = postoTimes[postoId] || 0;

        const percentage = Math.min((currentTime / taktTime) * 100, 100);

        fillElement.style.width = `${percentage}%`;
        labelElement.textContent = `${currentTime.toFixed(2)}s / ${taktTime}s`;

        fillElement.classList.remove('warning', 'danger');
        if (percentage > 90) {
            fillElement.classList.add('danger');
        } else if (percentage > 70) {
            fillElement.classList.add('warning');
        }
    }

    function createFullConnectorElement(type, instanceId) {
        const definition = connectorDefinitions[type];
        if (!definition) return null;

        const conectorDiv = document.createElement('div');
        conectorDiv.classList.add('conector', `conector-${type}`);
        conectorDiv.id = `conector-${instanceId}`;
        conectorDiv.dataset.connectorType = type;
        conectorDiv.style.width = `${definition.width}px`;
        conectorDiv.style.height = `${definition.height}px`;

        const img = document.createElement('img');
        img.src = definition.imageSrc;
        img.alt = `Conector ${type}`;
        img.classList.add('conector-bg-image');
        conectorDiv.appendChild(img);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-connector-btn');
        removeButton.textContent = 'X';
        conectorDiv.appendChild(removeButton);

        let checkboxInput = null;

        if (definition.slotPositions && definition.slotPositions.length > 0) {
            const checkboxContainer = document.createElement('div');
            checkboxContainer.classList.add('conector-checkbox-container');

            checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.id = `checkbox-trava-${instanceId}`;
            checkboxInput.classList.add('conector-trava-checkbox');
            checkboxInput.dataset.conectorId = conectorDiv.id;

            const checkboxLabel = document.createElement('label');
            checkboxLabel.htmlFor = `checkbox-trava-${instanceId}`;
            checkboxLabel.textContent = 'Travar/Checar Conector';

            checkboxContainer.appendChild(checkboxInput);
            checkboxContainer.appendChild(checkboxLabel);
            conectorDiv.appendChild(checkboxContainer);

            checkboxInput.addEventListener('change', (e) => {
                const currentPostoId = conectorDiv.closest('.posto-container').id;
                const isChecked = e.target.checked;
                let timeChange = 0;
                let actionDescription = "";

                if (isChecked) {
                    timeChange += TIME_LOCK_CONNECTOR;
                    timeChange += TIME_CHECK_CONNECTOR_LOCK;
                    actionDescription = `Checkbox "Travar/Checar Conector" de ${type} marcado (Travar: ${TIME_LOCK_CONNECTOR.toFixed(2)}s, Checar: ${TIME_CHECK_CONNECTOR_LOCK.toFixed(2)}s).`;
                } else {
                    timeChange -= TIME_LOCK_CONNECTOR;
                    timeChange -= TIME_CHECK_CONNECTOR_LOCK;
                    actionDescription = `Checkbox "Travar/Checar Conector" de ${type} desmarcado (Remover Travar: ${TIME_LOCK_CONNECTOR.toFixed(2)}s, Remover Checar: ${TIME_CHECK_CONNECTOR_LOCK.toFixed(2)}s).`;
                }

                postoTimes[currentPostoId] += timeChange;
                updateProgressBar(currentPostoId);

                if (!postoActionLog[currentPostoId]) postoActionLog[currentPostoId] = [];
                postoActionLog[currentPostoId].push({
                    action: actionDescription,
                    time: timeChange,
                    type: 'add',
                    conectorId: conectorDiv.id,
                    conectorType: type
                });
                saveAppState();
            });
        }

        removeButton.addEventListener('click', () => {
            const postoId = conectorDiv.closest('.posto-container').id;
            let timeToSubtract = 0;
            let actionsLogged = [];

            const originalAddTimeForThisInstance = connectorInstanceAddTimes[conectorDiv.id] || 0;

            if (originalAddTimeForThisInstance === 0) {
                console.warn(`Tempo de adição original não encontrado para o conector ${conectorDiv.id}. Usando DUPLICATE_CONNECTOR_ADD_TIME como fallback.`);
                timeToSubtract += DUPLICATE_CONNECTOR_ADD_TIME;
                actionsLogged.push({
                    action: `Conector ${type} removido (Débito padrão por falta de registro original): -${DUPLICATE_CONNECTOR_ADD_TIME.toFixed(2)}s.`,
                    time: -DUPLICATE_CONNECTOR_ADD_TIME,
                    type: 'subtract',
                    conectorId: conectorDiv.id,
                    conectorType: type
                });
            } else {
                timeToSubtract += originalAddTimeForThisInstance;
                actionsLogged.push({
                    action: `Conector ${type} removido (Débito do tempo de adição original): -${originalAddTimeForThisInstance.toFixed(2)}s.`,
                    time: -originalAddTimeForThisInstance,
                    type: 'subtract',
                    conectorId: conectorDiv.id,
                    conectorType: type
                });
            }

            const checkboxInput = conectorDiv.querySelector('.conector-trava-checkbox');
            if (checkboxInput && checkboxInput.checked) {
                const checkboxTime = TIME_LOCK_CONNECTOR + TIME_CHECK_CONNECTOR_LOCK;
                timeToSubtract += checkboxTime;
                actionsLogged.push({
                    action: `Checkbox "Travar/Checar Conector" de ${type} desmarcado automaticamente (devido à remoção do conector): -${checkboxTime.toFixed(2)}s.`,
                    time: -checkboxTime,
                    type: 'subtract',
                    conectorId: conectorDiv.id,
                    conectorType: type
                });
            }

            const definition = connectorDefinitions[type];
            if (definition && definition.slotPositions) {
                const slotsInConnector = conectorDiv.querySelectorAll('.slot');
                slotsInConnector.forEach(slot => {
                    const otInSlot = slot.querySelector('.ot');
                    if (otInSlot) {
                        const otIsPropagated = otInSlot.dataset.isPropagated === 'true';
                        const otDataInSlot = slotContents[postoId]?.[conectorDiv.id]?.[slot.id];
                        const otOriginalId = otDataInSlot?.otId || otInSlot.id;

                        if (!otIsPropagated) {
                            timeToSubtract += TIME_PER_OT;
                            actionsLogged.push({
                                action: `OT ${otOriginalId} removida do slot ${slot.id.split('-').pop()} do conector ${type} (devido à remoção do conector). (Remoção de Circuitos): -${TIME_PER_OT.toFixed(2)}s.`,
                                time: -TIME_PER_OT,
                                type: 'subtract',
                                otId: otOriginalId,
                                conectorId: conectorDiv.id,
                                conectorType: type,
                                slotId: slot.id
                            });
                            depropagateOt(postoId, conectorDiv.id, slot.id, otOriginalId);

                            const otToReturn = otElementsMap.get(otOriginalId);
                            if (otToReturn) {
                                otToReturn.style.display = 'block';
                                otToReturn.draggable = true;
                                availableOts.add(otToReturn.id);

                                otToReturn.classList.remove('propagated-ot');
                                delete otToReturn.dataset.isPropagated;
                                delete otToReturn.dataset.originalPosto;
                                delete otToReturn.dataset.isOriginalForPacoPaco;
                                const paletteOtLabel = otToReturn.querySelector('.origin-label');
                                if(paletteOtLabel) {
                                    otToReturn.removeChild(paletteOtLabel);
                                }
                            }
                        }
                        slot.removeChild(otInSlot);
                        const originLabelInSlot = slot.querySelector('.origin-label');
                        if (originLabelInSlot) {
                            slot.removeChild(originLabelInSlot);
                        }
                        slot.classList.remove('has-ot');

                        if (slotContents[postoId] && slotContents[postoId][conectorDiv.id]) {
                            delete slotContents[postoId][conectorDiv.id][slot.id];
                        }
                    }
                });
            }
            if (slotContents[postoId]) {
                delete slotContents[postoId][conectorDiv.id];
                if (Object.keys(slotContents[postoId]).length === 0) {
                    delete slotContents[postoId];
                }
            }

            postoTimes[postoId] -= timeToSubtract;
            updateProgressBar(postoId);

            connectorTypeCounts[type] = (connectorTypeCounts[type] || 0) - 1;
            if (connectorTypeCounts[type] < 0) connectorTypeCounts[type] = 0;

            conectorDiv.parentNode.removeChild(conectorDiv);
            delete connectorInstanceAddTimes[conectorDiv.id];

            if (!postoActionLog[postoId]) postoActionLog[postoId] = [];
            postoActionLog[postoId].push(...actionsLogged);

            syncOtPaletteVisibility();
            updateOriginalOtsByPosto();
            saveAppState();
        });

        if (definition.slotPositions) {
            definition.slotPositions.forEach((slotPos, slotIndex) => {
                const slotDiv = document.createElement('div');
                slotDiv.classList.add('slot');
                slotDiv.id = `${conectorDiv.id}-${slotPos.idSuffix || `slot${slotIndex + 1}`}`;
                slotDiv.style.top = `${slotPos.top}px`;
                slotDiv.style.left = `${slotPos.left}px`;
                slotDiv.style.width = `${definition.slotSize}px`;
                slotDiv.style.height = `${definition.slotSize}px`;
                conectorDiv.appendChild(slotDiv);
            });
        }

        return conectorDiv;
    }

    function generatePostos(num) {
        postosArea.innerHTML = '';
        postoTimes = {};
        connectorTypeCounts = {};
        slotContents = {};
        postoActionLog = {};
        connectorInstanceAddTimes = {};
        originalOtsByPosto = {};
        otOriginalOwners = {};

        syncOtPaletteVisibility();

        const postoSoldaId = 'posto-solda-01';
        const postoSoldaContainer = document.createElement('div');
        postoSoldaContainer.classList.add('posto-container');
        postoSoldaContainer.id = postoSoldaId;

        const postoSoldaHeader = document.createElement('div');
        postoSoldaHeader.classList.add('posto-header');

        const postoSoldaTitle = document.createElement('h3');
        postoSoldaTitle.textContent = `Posto de Solda 01`;
        postoSoldaHeader.appendChild(postoSoldaTitle);

        const postoSoldaProgressBarContainer = document.createElement('div');
        postoSoldaProgressBarContainer.classList.add('progress-bar-container');
        const postoSoldaProgressBarFill = document.createElement('div');
        postoSoldaProgressBarFill.classList.add('progress-bar-fill');
        const postoSoldaProgressTimeLabel = document.createElement('span');
        postoSoldaProgressTimeLabel.classList.add('progress-time-label');

        postoSoldaProgressBarContainer.appendChild(postoSoldaProgressBarFill);
        postoSoldaProgressBarContainer.appendChild(postoSoldaProgressTimeLabel);
        postoSoldaHeader.appendChild(postoSoldaProgressBarContainer);

        const postoSoldaContent = document.createElement('div');
        postoSoldaContent.classList.add('posto-content');

        postoSoldaContainer.appendChild(postoSoldaHeader);
        postoSoldaContainer.appendChild(postoSoldaContent);
        postosArea.appendChild(postoSoldaContainer);

        let soldaBaseTime = 0;
        if (!postoActionLog[postoSoldaId]) postoActionLog[postoSoldaId] = [];

        soldaBaseTime += TIME_BARCODE_SCAN;
        postoActionLog[postoSoldaId].push({
            action: 'Realizar a leitura do código de barras do kanban (Posto de Solda)',
            time: TIME_BARCODE_SCAN,
            type: 'add',
            category: 'Base Time'
        });

        postoTimes[postoSoldaId] = soldaBaseTime;
        updateProgressBar(postoSoldaId);
        addPostoDragDropListeners(postoSoldaContent);

        originalOtsByPosto[postoSoldaId] = new Set();

        for (let i = 1; i <= num; i++) {
            const postoId = `posto-p${String(i).padStart(2, '0')}`;
            const postoContainer = document.createElement('div');
            postoContainer.classList.add('posto-container');
            postoContainer.id = postoId;

            const postoHeader = document.createElement('div');
            postoHeader.classList.add('posto-header');

            const postoTitle = document.createElement('h3');
            postoTitle.textContent = `Posto ${String(i).padStart(2, '0')}`;

            const progressBarContainer = document.createElement('div');
            progressBarContainer.classList.add('progress-bar-container');
            const progressBarFill = document.createElement('div');
            progressBarFill.classList.add('progress-bar-fill');
            const progressTimeLabel = document.createElement('span');
            progressTimeLabel.classList.add('progress-time-label');

            progressBarContainer.appendChild(progressBarFill);
            progressBarContainer.appendChild(progressTimeLabel);

            postoHeader.appendChild(postoTitle);
            postoHeader.appendChild(progressBarContainer);

            const postoContent = document.createElement('div');
            postoContent.classList.add('posto-content');

            postoContainer.appendChild(postoHeader);
            postoContainer.appendChild(postoContent);
            postosArea.appendChild(postoContainer);

            let baseTime = 0;
            if (!postoActionLog[postoId]) postoActionLog[postoId] = [];

            if (i === 1) {
                baseTime += TIME_TAKE_SAO_BAR_TO_TABLE;
                postoActionLog[postoId].push({
                    action: 'Pegar barra de SAO e colocar na mesa',
                    time: TIME_TAKE_SAO_BAR_TO_TABLE,
                    type: 'add',
                    category: 'Base Time'
                });
            }
            baseTime += TIME_BARCODE_SCAN;
            postoActionLog[postoId].push({
                action: 'Realizar a leitura do código de barras do kanban',
                time: TIME_BARCODE_SCAN,
                type: 'add',
                category: 'Base Time'
            });
            if (i === 1) {
                baseTime += TIME_PLACE_KANBAN_LABEL;
                postoActionLog[postoId].push({
                    action: 'Colocar etiqueta kanban no S A O',
                    time: TIME_PLACE_KANBAN_LABEL,
                    type: 'add',
                    category: 'Base Time'
                });
            }
            const totalPostos = parseInt(numPostosSelect.value);
            if (i < totalPostos) {
                baseTime += TIME_PASS_SAO;
                postoActionLog[postoId].push({
                    action: 'Passar o pente entre os postos',
                    time: TIME_PASS_SAO,
                    type: 'add',
                    category: 'Base Time'
                });
            }
            if (i === num) {
                baseTime += TIME_REMOVE_SAO_FROM_SUB;
                postoActionLog[postoId].push({
                    action: 'Remover pente da sub e colocar na área de montagem',
                    time: TIME_REMOVE_SAO_FROM_SUB,
                    type: 'add',
                    category: 'Base Time'
                });
            }

            postoTimes[postoId] = baseTime;
            updateProgressBar(postoId);
            addPostoDragDropListeners(postoContent);

            originalOtsByPosto[postoId] = new Set();
        }

        if (reportArea) reportArea.innerHTML = '';
        updateOriginalOtsByPosto();
        saveAppState();
    }

    function generateConnectorPalette() {
        connectorPalette.innerHTML = '<h2>Conectores</h2>';
        for (const type in connectorDefinitions) {
            const definition = connectorDefinitions[type];
            const draggableConnector = document.createElement('div');
            draggableConnector.classList.add('connector-draggable-item');
            draggableConnector.id = `palette-${type}`;
            draggableConnector.draggable = true;
            draggableConnector.dataset.connectorType = type;

            const img = document.createElement('img');
            img.src = definition.imageSrc;
            img.alt = `Conector ${type}`;
            draggableConnector.appendChild(img);
            const nameSpan = document.createElement('span');
            nameSpan.textContent = type;
            draggableConnector.appendChild(nameSpan);
            connectorPalette.appendChild(draggableConnector);

            draggableConnector.addEventListener('dragstart', (e) => {
                draggedConnectorType = type;
                e.dataTransfer.setData('text/plain', type);
                draggableConnector.classList.add('dragging');
            });
            draggableConnector.addEventListener('dragend', () => {
                draggableConnector.classList.remove('dragging');
                draggedConnectorType = null;
                stopAutoScroll();
            });
            draggableConnector.addEventListener('dragover', handleAutoScroll);
        }
    }

    function setupOtDragDropListeners() {
        const ots = document.querySelectorAll('.ot-palette .ot');
        ots.forEach(ot => {
            if (ot._dragStartListener) ot.removeEventListener('dragstart', ot._dragStartListener);
            if (ot._dragEndListener) ot.removeEventListener('dragend', ot._dragEndListener);
            if (ot._dragOverListener) ot.removeEventListener('dragover', ot._dragOverListener);

            ot.draggable = true;

            ot._dragStartListener = (e) => {
                draggedOt = e.target;
                if (!availableOts.has(draggedOt.id)) {
                    e.preventDefault();
                    return;
                }
                e.dataTransfer.setData('text/plain', draggedOt.id);
                draggedOt.classList.add('dragging');
            };
            ot.addEventListener('dragstart', ot._dragStartListener);

            ot._dragEndListener = () => {
                draggedOt.classList.remove('dragging');
                draggedOt = null;
                stopAutoScroll();
            };
            ot.addEventListener('dragend', ot._dragEndListener);

            ot._dragOverListener = handleAutoScroll;
            ot.addEventListener('dragover', ot._dragOverListener);
        });
    }

    function syncOtPaletteVisibility() {
        availableOts.clear();

        const originalPaletteH2 = otPalette.querySelector('h2');
        otPalette.innerHTML = '';
        if (originalPaletteH2) {
            otPalette.appendChild(originalPaletteH2);
        }

        otGroupElementsMap.forEach(originalGroup => {
            const clonedGroup = originalGroup.cloneNode(true);
            otPalette.appendChild(clonedGroup);

            const otsInClonedGroup = clonedGroup.querySelectorAll('.ot');
            otsInClonedGroup.forEach(ot => {
                let isInUse = false;
                for (const postoId in slotContents) {
                    for (const conectorId in slotContents[postoId]) {
                        for (const slotId in slotContents[postoId][conectorId]) {
                            const otData = slotContents[postoId][conectorId][slotId];
                            if (otData.otId === ot.id && otData.isPropagated === false) {
                                isInUse = true;
                                break;
                            }
                        }
                        if (isInUse) break;
                    }
                    if (isInUse) break;
                }

                if (isInUse) {
                    ot.style.display = 'none';
                    ot.draggable = false;
                } else {
                    ot.style.display = 'block';
                    ot.draggable = true;
                    availableOts.add(ot.id);

                    ot.classList.remove('propagated-ot');
                    delete ot.dataset.isPropagated;
                    delete ot.dataset.originalPosto;
                    delete ot.dataset.isOriginalForPacoPaco;
                    const paletteOtLabel = ot.querySelector('.origin-label');
                    if(paletteOtLabel) {
                        ot.removeChild(paletteOtLabel);
                    }
                }
            });
        });

        setupOtDragDropListeners();
    }


    function addOTDragDropToSlots() {
        const slots = document.querySelectorAll('.posto-container .conector .slot');
        slots.forEach(slot => {
            if (slot._dragOverListener) slot.removeEventListener('dragover', slot._dragOverListener);
            if (slot._dragEnterListener) slot.removeEventListener('dragenter', slot._dragEnterListener);
            if (slot._dragleaveListener) slot.removeEventListener('dragleave', slot._dragleaveListener);
            if (slot._dropListener) slot.removeEventListener('drop', slot._dropListener);
            if (slot._clickListener) slot.removeEventListener('click', slot._clickListener);

            slot._dragOverListener = (e) => {
                e.preventDefault();
                if (draggedOt && !slot.querySelector('.ot') && draggedOt.closest('.ot-palette') && availableOts.has(draggedOt.id)) {
                    slot.classList.add('drag-over');
                    handleAutoScroll(e);
                } else {
                    slot.classList.remove('drag-over');
                }
            };
            slot.addEventListener('dragover', slot._dragOverListener);

            slot._dragEnterListener = (e) => {
                e.preventDefault();
                if (draggedOt && !slot.querySelector('.ot') && draggedOt.closest('.ot-palette') && availableOts.has(draggedOt.id)) slot.classList.add('drag-over');
            };
            slot.addEventListener('dragenter', slot._dragEnterListener);

            slot._dragLeaveListener = () => {
                slot.classList.remove('drag-over');
                stopAutoScroll();
            };
            slot.addEventListener('dragleave', slot._dragLeaveListener);

            slot._dropListener = (e) => {
                e.preventDefault();
                slot.classList.remove('drag-over');
                stopAutoScroll();

                if (draggedOt && !slot.querySelector('.ot') && draggedOt.closest('.ot-palette') && availableOts.has(draggedOt.id)) {
                    const otId = e.dataTransfer.getData('text/plain');
                    const droppedOtOriginalFromPalette = otElementsMap.get(otId);

                    if (!droppedOtOriginalFromPalette) {
                        console.error(`Elemento original da OT ${otId} não encontrada.`);
                        return;
                    }

                    const postoId = slot.closest('.posto-container').id;
                    const conectorElement = slot.closest('.conector');
                    const conectorId = conectorElement.id;
                    const conectorType = conectorElement.dataset.connectorType;
                    const slotId = slot.id;

                    const otCopy = droppedOtOriginalFromPalette.cloneNode(true);
                    otCopy.classList.remove('dragging');
                    otCopy.style.position = '';
                    otCopy.style.top = '';
                    otCopy.style.left = '';
                    otCopy.dataset.isPropagated = 'false';

                    const baseOtId = otId.endsWith('D') ? otId.slice(0, -1) : otId;

                    let isOriginalForPacoPaco = false; // Valor padrão
                    const isSolderOt = SOLDER_OTS_SET.has(baseOtId); // Verifica se é uma OT de solda
                    const isSolderPosto = postoId === 'posto-solda-01';

                    if (isSolderOt) { // Se é uma OT de solda
                        if (isSolderPosto) { // E está sendo dropada no Posto de Solda
                            if (!otOriginalOwners.hasOwnProperty(baseOtId)) {
                                otOriginalOwners[baseOtId] = postoId; // Posto de Solda é o dono
                            }
                            if (otOriginalOwners[baseOtId] === postoId) { // Confirma que o Posto de Solda é o dono
                                isOriginalForPacoPaco = true; // É original para o Paco-Paco do Posto de Solda
                            }
                        } else { // É OT de Solda, mas está sendo dropada em um Posto NUMÉRICO
                            // Ela NUNCA é original para o Paco-Paco deste posto numérico.
                            // E este posto numérico NUNCA pode se tornar seu dono.
                            isOriginalForPacoPaco = false; // Permite a inserção, mas não aparece no Paco-Paco do posto numérico
                            // Não alteramos otOriginalOwners aqui, garantindo que o posto numérico não se torne o dono.
                        }
                    } else { // Não é OT de Solda (é uma OT normal)
                        if (!otOriginalOwners.hasOwnProperty(baseOtId)) {
                            otOriginalOwners[baseOtId] = postoId; // Este posto se torna o dono
                            isOriginalForPacoPaco = true;
                        } else if (otOriginalOwners[baseOtId] === postoId) {
                            isOriginalForPacoPaco = true; // Já é dono, continua original para Paco-Paco
                        } else {
                            // OT normal, mas já tem dono em outro posto. Não é original para o Paco-Paco deste posto.
                            isOriginalForPacoPaco = false;
                        }
                    }

                    otCopy.dataset.isOriginalForPacoPaco = isOriginalForPacoPaco.toString();

                    otCopy.classList.remove('propagated-ot');
                    delete otCopy.dataset.originalPosto;
                    const existingOriginLabel = otCopy.querySelector('.origin-label');
                    if (existingOriginLabel) {
                        otCopy.removeChild(existingOriginLabel);
                    }

                    slot.appendChild(otCopy);
                    slot.classList.add('has-ot');

                    if (!slotContents[postoId]) slotContents[postoId] = {};
                    if (!slotContents[postoId][conectorId]) slotContents[postoId][conectorId] = {};
                    slotContents[postoId][conectorId][slotId] = {
                        otId: otId,
                        isPropagated: false,
                        isOriginalForPacoPaco: isOriginalForPacoPaco
                    };

                    postoTimes[postoId] += TIME_PER_OT;
                    updateProgressBar(postoId);

                    if (!postoActionLog[postoId]) postoActionLog[postoId] = [];
                    postoActionLog[postoId].push({
                        action: `OT ${otId} dropada no slot ${slotId.split('-').pop()} do conector ${conectorType}. (Inserção de Circuitos)`,
                        time: TIME_PER_OT,
                        type: 'add',
                        otId: otId,
                        conectorId: conectorId,
                        conectorType: conectorType,
                        slotId: slotId
                    });

                    if (droppedOtOriginalFromPalette.parentNode) {
                        droppedOtOriginalFromPalette.style.display = 'none';
                        droppedOtOriginalFromPalette.draggable = false;
                        availableOts.delete(droppedOtOriginalFromPalette.id);
                    }
                    syncOtPaletteVisibility();

                    propagateOt(postoId, conectorId, slotId, droppedOtOriginalFromPalette.id);
                    updateOriginalOtsByPosto();
                    saveAppState();
                }
            };
            slot.addEventListener('drop', slot._dropListener);

            slot._clickListener = (e) => {
                const clickedOt = e.target.closest('.ot');
                if (clickedOt && clickedOt.closest('.slot')) {
                    const parentSlot = clickedOt.closest('.slot');
                    const postoId = parentSlot.closest('.posto-container').id;
                    const conectorElement = parentSlot.closest('.conector');
                    const conectorId = conectorElement.id;
                    const conectorType = conectorElement.dataset.connectorType;
                    const slotId = parentSlot.id;

                    const otData = slotContents[postoId]?.[conectorId]?.[slotId];
                    if (!otData || !otData.otId) {
                        console.error('Dados da OT não encontrados para remoção.');
                        return;
                    }
                    const otOriginalId = otData.otId;
                    const isPropagated = otData.isPropagated;
                    const isOriginalForPacoPaco = otData.isOriginalForPacoPaco;

                    if (!isPropagated) {
                        postoTimes[postoId] -= TIME_PER_OT;
                        updateProgressBar(postoId);

                        if (!postoActionLog[postoId]) postoActionLog[postoId] = [];
                        postoActionLog[postoId].push({
                            action: `OT ${otOriginalId} removida do slot ${slotId.split('-').pop()} do conector ${conectorType}. (Remoção de Circuitos)`,
                            time: -TIME_PER_OT,
                            type: 'subtract',
                            otId: otOriginalId,
                            conectorId: conectorId,
                            conectorType: conectorType,
                            slotId: slotId
                        });

                        depropagateOt(postoId, conectorId, slotId, otOriginalId);

                        const otToReturn = otElementsMap.get(otOriginalId);
                        if (otToReturn) {
                            otToReturn.style.display = 'block';
                            otToReturn.draggable = true;
                            availableOts.add(otToReturn.id);

                            otToReturn.classList.remove('propagated-ot');
                            delete otToReturn.dataset.isPropagated;
                            delete otToReturn.dataset.originalPosto;
                            delete otToReturn.dataset.isOriginalForPacoPaco;
                            const paletteOtLabel = otToReturn.querySelector('.origin-label');
                            if(paletteOtLabel) {
                                otToReturn.removeChild(paletteOtLabel);
                            }
                        }
                    } else {
                        // OT propagada: apenas remove do DOM/slotContents sem alterar tempo ou log.
                    }
                    parentSlot.removeChild(clickedOt);
                    const originLabelInSlot = parentSlot.querySelector('.origin-label');
                    if (originLabelInSlot) {
                        parentSlot.removeChild(originLabelInSlot);
                    }
                    parentSlot.classList.remove('has-ot');

                    if (slotContents[postoId] && slotContents[postoId][conectorId]) {
                        delete slotContents[postoId][conectorId][slot.id];
                    }

                    syncOtPaletteVisibility();
                    updateOriginalOtsByPosto();
                    saveAppState();
                }
            };
            slot.addEventListener('click', slot._clickListener);

            slot.dataset.listenersAdded = 'true';
        });
    }

    function addPostoDragDropListeners(postoContent) {
        if (postoContent._dragOverListener) postoContent.removeEventListener('dragover', postoContent._dragOverListener);
        if (postoContent._dragEnterListener) postoContent.removeEventListener('dragenter', postoContent._dragEnterListener);
        if (postoContent._dragleaveListener) postoContent.removeEventListener('dragleave', postoContent._dragleaveListener);
        if (postoContent._dropListener) postoContent.removeEventListener('drop', postoContent._dropListener);

        postoContent._dragOverListener = (e) => {
            e.preventDefault();
            if (draggedConnectorType) {
                postoContent.classList.add('drag-over-posto');
                handleAutoScroll(e);
            }
        };
        postoContent.addEventListener('dragover', postoContent._dragOverListener);

        postoContent._dragEnterListener = (e) => {
            e.preventDefault();
            if (draggedConnectorType) postoContent.classList.add('drag-over-posto');
        };
        postoContent.addEventListener('dragenter', postoContent._dragEnterListener);

        postoContent._dragleaveListener = () => {
            postoContent.classList.remove('drag-over-posto');
            stopAutoScroll();
        };
        postoContent.addEventListener('dragleave', postoContent._dragleaveListener);

        postoContent._dropListener = (e) => {
            e.preventDefault();
            postoContent.classList.remove('drag-over-posto');
            stopAutoScroll();
            if (draggedConnectorType) {
                const type = e.dataTransfer.getData('text/plain');
                const postoContainer = postoContent.closest('.posto-container');
                const postoId = postoContainer.id;
                const instanceId = `${postoId}-${type}-${Date.now()}`;
                const newConnectorElement = createFullConnectorElement(type, instanceId);

                if (newConnectorElement) {
                    postoContent.appendChild(newConnectorElement);

                    let timeToAdd = 0;
                    let actionDescription = "";

                    const initialTypeCount = connectorTypeCounts[type] || 0;
                    const existsInOtherPost = (initialTypeCount > 0);

                    if (!existsInOtherPost) {
                        timeToAdd += UNIQUE_CONNECTOR_ADD_TIME;
                        actionDescription = `Conector ${type} adicionado (Conector retirado da caixa e direcionado no house).`;
                    } else {
                        timeToAdd += DUPLICATE_CONNECTOR_ADD_TIME;
                        actionDescription = `Conector ${type} adicionado (Conector já presente no sistema, direcionado no house).`;
                    }

                    if (type === 'GROMMET1' || type === 'GROMMET2') {
                        timeToAdd += TIME_GROMMET_PASS_CIRCUIT;
                        actionDescription += ` Passar circuito pelo grommet (associado ao Grommet ${type}).`;
                    }

                    postoTimes[postoId] += timeToAdd;
                    updateProgressBar(postoId);

                    connectorTypeCounts[type] = (connectorTypeCounts[type] || 0) + 1;

                    connectorInstanceAddTimes[newConnectorElement.id] = timeToAdd;

                    if (!postoActionLog[postoId]) postoActionLog[postoId] = [];
                    postoActionLog[postoId].push({
                        action: actionDescription,
                        time: timeToAdd,
                        type: 'add',
                        conectorId: newConnectorElement.id,
                        conectorType: type
                    });

                    const isPostoNumerado = postoId.startsWith('posto-p');
                    const currentPostoNumber = isPostoNumerado ? parseInt(postoId.replace('posto-p', '')) : 0;

                    const newConnectorType = newConnectorElement.dataset.connectorType;
                    const newConnectorId = newConnectorElement.id;
                    const newConnectorDefinition = connectorDefinitions[newConnectorType];

                    if (newConnectorDefinition && newConnectorDefinition.slotPositions) {
                        newConnectorDefinition.slotPositions.forEach((slotPos) => {
                            const newSlotId = `${newConnectorId}-${slotPos.idSuffix || `slot${slotPos.idSuffix}`}`;
                            const targetSlotElement = newConnectorElement.querySelector(`#${newSlotId}`);

                            if (targetSlotElement && !targetSlotElement.querySelector('.ot')) {
                                if (isPostoNumerado) {
                                    const postoSoldaRefId = 'posto-solda-01';
                                    if (slotContents[postoSoldaRefId]) {
                                        for (const prevConectorId in slotContents[postoSoldaRefId]) {
                                            const prevConectorElement = document.getElementById(prevConectorId);
                                            if (prevConectorElement && prevConectorElement.dataset.connectorType === newConnectorType) {
                                                const prevSlotId = `${prevConectorId}-${slotPos.idSuffix || `slot${slotPos.idSuffix}`}`;
                                                const otData = slotContents[postoSoldaRefId][prevConectorId][prevSlotId];

                                                if (otData && !otData.isPropagated) {
                                                    const originalOtElement = otElementsMap.get(otData.otId);
                                                    if (originalOtElement) {
                                                        const otCopy = originalOtElement.cloneNode(true);
                                                        otCopy.classList.remove('dragging');
                                                        otCopy.style.position = '';
                                                        otCopy.style.top = '';
                                                        otCopy.style.left = '';
                                                        otCopy.dataset.isPropagated = 'true';
                                                        otCopy.draggable = false;

                                                        otCopy.classList.add('propagated-ot');
                                                        otCopy.dataset.originalPosto = postoSoldaRefId;
                                                        otCopy.dataset.isOriginalForPacoPaco = 'false';

                                                        targetSlotElement.appendChild(otCopy);
                                                        targetSlotElement.classList.add('has-ot');

                                                        const originLabel = document.createElement('span');
                                                        originLabel.classList.add('origin-label');
                                                        originLabel.textContent = `Solda`;
                                                        targetSlotElement.appendChild(originLabel);

                                                        if (!slotContents[postoId]) slotContents[postoId] = {};
                                                        if (!slotContents[postoId][newConnectorId]) slotContents[postoId][newConnectorId] = {};
                                                        slotContents[postoId][newConnectorId][newSlotId] = { otId: otData.otId, isPropagated: true, isOriginalForPacoPaco: false };
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                if (!targetSlotElement.querySelector('.ot')) {
                                    for (let i = 1; i < currentPostoNumber; i++) {
                                        const prevPostoId = `posto-p${String(i).padStart(2, '0')}`;
                                        if (slotContents[prevPostoId]) {
                                            for (const prevConectorId in slotContents[prevPostoId]) {
                                                const prevConectorElement = document.getElementById(prevConectorId);
                                                if (prevConectorElement && prevConectorElement.dataset.connectorType === newConnectorType) {
                                                    const prevSlotId = `${prevConectorId}-${slotPos.idSuffix || `slot${slotPos.idSuffix}`}`;
                                                    const otData = slotContents[prevPostoId][prevConectorId][prevSlotId];

                                                    if (otData && !otData.isPropagated) {
                                                        const originalOtElement = otElementsMap.get(otData.otId);
                                                        if (originalOtElement) {
                                                            const otCopy = originalOtElement.cloneNode(true);
                                                            otCopy.classList.remove('dragging');
                                                            otCopy.style.position = '';
                                                            otCopy.style.top = '';
                                                            otCopy.style.left = '';
                                                            otCopy.dataset.isPropagated = 'true';
                                                            otCopy.draggable = false;

                                                            otCopy.classList.add('propagated-ot');
                                                            const originalDropPostoNumber = parseInt(prevPostoId.replace('posto-p', ''));
                                                            otCopy.dataset.originalPosto = `P${originalDropPostoNumber}`;
                                                            otCopy.dataset.isOriginalForPacoPaco = 'false';

                                                            targetSlotElement.appendChild(otCopy);
                                                            targetSlotElement.classList.add('has-ot');

                                                            const originLabel = document.createElement('span');
                                                            originLabel.classList.add('origin-label');
                                                            originLabel.textContent = `P${originalDropPostoNumber}`;
                                                            targetSlotElement.appendChild(originLabel);

                                                            if (!slotContents[postoId]) slotContents[postoId] = {};
                                                            if (!slotContents[postoId][newConnectorId]) slotContents[postoId][newConnectorId] = {};
                                                            slotContents[postoId][newConnectorId][newSlotId] = { otId: otData.otId, isPropagated: true, isOriginalForPacoPaco: false };
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (targetSlotElement.querySelector('.ot')) break;
                                    }
                                }
                            }
                        });
                    }
                    addOTDragDropToSlots();
                    updateOriginalOtsByPosto();
                    saveAppState();
                }
            }
        };
        postoContent.addEventListener('drop', postoContent._dropListener);
    }

    function generateDetailedReport() {
        console.log("Função generateDetailedReport iniciada.");
        let reportOutput = "<h2>Relatório Detalhado de Tempos por Posto</h2>";

        const allPostoIds = Object.keys(postoTimes).sort((a, b) => {
            const isA_Solda = a === 'posto-solda-01';
            const isB_Solda = b === 'posto-solda-01';

            if (isA_Solda && !isB_Solda) return -1;
            if (!isA_Solda && isB_Solda) return 1;
            if (isA_Solda && isB_Solda) return 0;

            const numA = parseInt(a.replace('posto-p', ''));
            const numB = parseInt(b.replace('posto-p', ''));
            return numA - numB;
        });

        if (allPostoIds.length === 0) {
            reportOutput += "<p>Nenhum posto gerado ou atividade registrada ainda.</p>";
        } else {
            for (const postoId of allPostoIds) {
                const postoElement = document.getElementById(postoId);
                const postoTitleText = postoElement ? postoElement.querySelector('h3').textContent : postoId;

                reportOutput += `<div class="report-posto-section">`;
                reportOutput += `<h3>${postoTitleText}</h3>`;
                reportOutput += `<p><strong>Tempo Total Acumulado: ${postoTimes[postoId].toFixed(2)}s</strong></p>`;
                reportOutput += `<h4>Detalhes das Ações Atuais:</h4>`;
                reportOutput += `<ul>`;

                const currentPostoLog = (postoActionLog[postoId] || []).filter(logEntry => logEntry.type === 'add');

                if (currentPostoLog.length === 0 && postoTimes[postoId] === 0) {
                    reportOutput += `<li>Nenhuma ação de tempo específica registrada além dos tempos base.</li>`;
                } else {
                    currentPostoLog.forEach(logEntry => {
                        const sign = logEntry.time >= 0 ? '+' : '';
                        reportOutput += `<li>${logEntry.action} ${sign}${logEntry.time.toFixed(2)}s</li>`;
                    });
                }

                reportOutput += `</ul>`;
                reportOutput += `</div>`;
            }
        }

        if (reportArea) {
            reportArea.innerHTML = reportOutput;
        } else {
            console.error("Erro: reportArea não encontrado ao gerar relatório.");
        }
        console.log("Função generateDetailedReport finalizada.");
    }

    function clearReportArea() {
        console.log("Função clearReportArea iniciada.");
        if (reportArea) {
            reportArea.innerHTML = '';
        } else {
            console.error("Erro: reportArea não encontrado ao limpar relatório.");
        }
        clearSavedState();
        generatePostos(parseInt(numPostosSelect.value));
        console.log("Simulação, relatório e estado salvo limpos.");
        console.log("Função clearReportArea finalizada.");
    }

    // --- Listeners Globais ---
    console.log("Tentando anexar listeners globais...");

    try {
        gerarPostosBtn.addEventListener('click', () => {
            console.log("Botão 'Gerar Postos' clicado.");
            generatePostos(parseInt(numPostosSelect.value));
        });

        taktTimeInput.addEventListener('change', () => {
            console.log("Takt Time alterado.");
            Object.keys(postoTimes).forEach(updateProgressBar);
            saveAppState();
        });

        gerarRelatorioBtn.addEventListener('click', () => {
            console.log("Botão 'Gerar Relatório Detalhado' clicado.");
            generateDetailedReport();
        });
        limparRelatorioBtn.addEventListener('click', () => {
            console.log("Botão 'Limpar Relatório' clicado.");
            clearReportArea();
        });

        goToPacoPacoBtn.addEventListener('click', () => {
            console.log("Botão 'Ir para Paco-Paco' clicado.");
            sessionStorage.removeItem('selectedPacoPostoIdForTab');
            window.open('paco-paco.html', '_blank');
        });
        console.log("Listeners globais anexados com sucesso.");
    } catch (e) {
        console.error("Erro ao anexar listeners globais:", e);
    }

    // --- Inicialização ---
    console.log("Iniciando a simulação...");
    const initialOts = document.querySelectorAll('.ot-palette .ot');
    initialOts.forEach(ot => {
        initialOtOrder.push(ot.id);
        otElementsMap.set(ot.id, ot);
    });

    const initialOtGroups = document.querySelectorAll('.ot-palette .ot-group');
    initialOtGroups.forEach((group, index) => {
        const groupId = `ot-group-${index}`;
        group.id = groupId;
        otGroupElementsMap.set(groupId, group);
    });

    if (!loadAppState()) {
        console.log("Nenhum estado salvo encontrado ou erro ao carregar. Gerando estado inicial.");
        generatePostos(parseInt(numPostosSelect.value));
        generateConnectorPalette();
    } else {
        console.log("Estado salvo carregado com sucesso.");
        generateConnectorPalette();
    }
    console.log("Simulação inicializada.");
});