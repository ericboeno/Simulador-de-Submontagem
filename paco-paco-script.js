// Arquivo: Simulador de Submontagem/paco-paco-script.js
document.addEventListener('DOMContentLoaded', () => {
    const pacoPacoPostosContainer = document.getElementById('paco-paco-postos-container');
    const backToSimulationBtn = document.getElementById('backToSimulationBtn');

    // Constantes do Paco-Paco (4 fileiras x 10 colunas)
    const PACO_PACO_ROWS = 4;
    const PACO_PACO_COLUMNS = 10;
    const PACO_PACO_CAVITY_SIZE = 60; // Tamanho em pixels de cada cavidade (para facilitar visualização)

    // allOriginalOtsByPostoFromMain agora contém Set de BASE OT IDs do main.js
    let allOriginalOtsByPostoFromMain = {}; // { 'postoId': Set<baseOtId> } - Dados da aba principal
    // NEW: `pacoPacoStates` agora é persistido no localStorage para esta aba
    let pacoPacoStates = {}; // { 'postoId': { 'cavityId': { otId: 'ot0190', paletteOtId: 'paco-palette-posto-p01-ot0190-1' } } } - Estado da organização do Paco-Paco NA NOVA ABA

    let draggedOt = null; // OT sendo arrastada nesta aba

    // Lista fixa de OTs de Solda da imagem anexada
    const solderOts = [
        'ot0344', 'ot0300', 'ot0301', 'ot0302', 'ot0311', 'ot0304', 'ot0342', 'ot0343',
        'ot0305', 'ot0312', 'ot0190', 'ot0229', 'ot0192', 'ot0332', 'ot0333', 'ot0334',
        'ot0193', 'ot0310', 'ot0309', 'ot0335', 'ot0336', 'ot0337'
    ];

    /**
     * Salva o estado da organização do Paco-Paco NA NOVA ABA no localStorage.
     */
    function savePacoPacoState() {
        try {
            localStorage.setItem('pacoPacoOrganizationStates', JSON.stringify(pacoPacoStates));
            console.log("Estado de organização do Paco-Paco salvo nesta aba!");
        } catch (e) {
            console.error("Erro ao salvar o estado de organização do Paco-Paco:", e);
        }
    }

    /**
     * Carrega o estado da organização do Paco-Paco NA NOVA ABA do localStorage.
     */
    function loadPacoPacoState() {
        try {
            const savedState = localStorage.getItem('pacoPacoOrganizationStates');
            if (savedState) {
                pacoPacoStates = JSON.parse(savedState);
                console.log("Estado de organização do Paco-Paco carregado nesta aba!");
            }
        } catch (e) {
            console.error("Erro ao carregar o estado de organização do Paco-Paco:", e);
            pacoPacoStates = {}; // Limpa se houver erro
        }
    }

    /**
     * Carrega os dados dos postos e OTs originais do sessionStorage (da página principal).
     * MODIFICADO: Converte os arrays de OTs de volta para Sets para consistência.
     */
    function loadInitialDataFromMain() {
        const otsByPostoString = sessionStorage.getItem('allOriginalOtsByPosto');
        if (otsByPostoString) {
            const loadedData = JSON.parse(otsByPostoString);
            // Converte os arrays carregados de volta para Sets
            for (const postoId in loadedData) {
                allOriginalOtsByPostoFromMain[postoId] = new Set(loadedData[postoId]);
            }
        } else {
            console.warn('Nenhum dado de OTs por posto encontrado no sessionStorage. Verifique a página principal.');
            allOriginalOtsByPostoFromMain = {};
        }

        // Carrega o estado salvo da organização do Paco-Paco desta aba
        loadPacoPacoState();

        // Garante que todos os postos (mesmo os sem OTs inicialmente) tenham um slot para estado de Paco-Paco
        for (const postoId in allOriginalOtsByPostoFromMain) {
            if (!pacoPacoStates[postoId]) {
                pacoPacoStates[postoId] = {};
            }
        }

        // Adiciona um "posto-solda-01" na lista de postos se não existir
        const postoSoldaId = 'posto-solda-01';
        if (!allOriginalOtsByPostoFromMain[postoSoldaId]) {
            allOriginalOtsByPostoFromMain[postoSoldaId] = new Set(); // Use Set aqui também
        }
        if (!pacoPacoStates[postoSoldaId]) {
            pacoPacoStates[postoSoldaId] = {};
        }
    }

    /**
     * Gera a interface do Paco-Paco para um posto específico.
     * @param {string} postoId - O ID do posto (e.g., 'posto-p01' ou 'posto-solda-01').
     * @param {Set<string>} initialOtsForThisPosto - Set de IDs das OTs base originais para este posto.
     * MODIFICADO: Lógica de geração da paleta para gerar duas instâncias de cada BASE OT.
     */
    function createPacoPacoForPosto(postoId, initialOtsForThisPosto) {
        const postoDiv = document.createElement('div');
        postoDiv.classList.add('paco-posto-section');
        postoDiv.id = `paco-posto-${postoId}`;

        const postoTitle = document.createElement('h2');
        if (postoId === 'posto-solda-01') {
            postoTitle.textContent = `Paco-Paco do Posto de Solda 01`;
        } else {
            postoTitle.textContent = `Paco-Paco do Posto ${parseInt(postoId.replace('posto-p', ''))}`;
        }
        postoDiv.appendChild(postoTitle);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('paco-posto-content-wrapper');
        postoDiv.appendChild(contentWrapper);

        // Paleta de OTs para este posto
        const pacoPalette = document.createElement('div');
        pacoPalette.classList.add('paco-paco-palette-local');
        pacoPalette.id = `palette-${postoId}`;
        const paletteTitle = document.createElement('h3');
        paletteTitle.textContent = 'OTs Disponíveis';
        pacoPalette.appendChild(paletteTitle);

        const availableOtsDiv = document.createElement('div');
        availableOtsDiv.classList.add('paco-palette-ots');
        pacoPalette.appendChild(availableOtsDiv);

        // otsInCavities agora armazena o paletteOtId (a instância específica)
        const otsInCavities = new Set();
        if (pacoPacoStates[postoId]) {
            for (const cavityId in pacoPacoStates[postoId]) {
                const savedOtData = pacoPacoStates[postoId][cavityId];
                if (typeof savedOtData === 'object' && savedOtData.paletteOtId) {
                    otsInCavities.add(savedOtData.paletteOtId);
                } else if (typeof savedOtData === 'string') {
                    // Compatibilidade com estados antigos que só salvavam o otId
                    // Tentamos inferir o paletteOtId, assumindo que foi a primeira instância
                    console.warn(`Estado antigo do Paco-Paco detectado para ${cavityId}. Tentando inferir paletteOtId. Por favor, limpe o localStorage se houver inconsistências.`);
                    // Tentativa de reconstruir o paletteOtId com base no otId salvo (base ou D)
                    // A nova lógica de palette sempre usa o baseOtId
                    const baseOtIdFromSaved = savedOtData.endsWith('D') ? savedOtData.slice(0, -1) : savedOtData;
                    // Tenta a instância -1 e -2
                    if (document.getElementById(`paco-palette-${postoId}-${baseOtIdFromSaved}-1`)) {
                        otsInCavities.add(`paco-palette-${postoId}-${baseOtIdFromSaved}-1`);
                    } else if (document.getElementById(`paco-palette-${postoId}-${baseOtIdFromSaved}-2`)) {
                        otsInCavities.add(`paco-palette-${postoId}-${baseOtIdFromSaved}-2`);
                    } else {
                         // Fallback se não encontrar, para evitar erro, mas a OT não será ocultada corretamente
                         otsInCavities.add(`paco-palette-${postoId}-${savedOtData}-1`);
                    }
                }
            }
        }

        // Combinar OTs dropadas com OTs de solda se for o posto de solda
        // Agora, `otsToDisplayInPalette` será um Set de *base* OT IDs
        let otsToDisplayInPalette = new Set(initialOtsForThisPosto); // Já é um Set de base OT IDs
        if (postoId === 'posto-solda-01') {
            solderOts.forEach(ot => {
                const baseOt = ot.endsWith('D') ? ot.slice(0, -1) : ot;
                otsToDisplayInPalette.add(baseOt);
            });
        }

        if (otsToDisplayInPalette.size === 0) {
            const noOtsMsg = document.createElement('p');
            noOtsMsg.textContent = 'Nenhuma OT inserida neste posto na simulação ou disponível para solda.';
            availableOtsDiv.appendChild(noOtsMsg);
        } else {
            // Itera sobre as BASE OTs para gerar as duas instâncias
            Array.from(otsToDisplayInPalette).sort().forEach(baseOtId => {
                // Gerar duas instâncias para cada base OT
                for (let i = 1; i <= 2; i++) {
                    const paletteOtId = `paco-palette-${postoId}-${baseOtId}-${i}`;
                    const otImg = document.createElement('img');
                    otImg.src = `images/${baseOtId.replace('ot', '')}.png`; // Usa a imagem da BASE OT
                    otImg.alt = baseOtId;
                    otImg.id = paletteOtId; // ID único para a instância na paleta
                    otImg.classList.add('ot-base', 'draggable', 'paco-ot-draggable');
                    otImg.draggable = true;

                    // Oculta a OT da paleta SE A INSTÂNCIA ESPECÍFICA já estiver em alguma cavidade
                    if (otsInCavities.has(otImg.id)) {
                        otImg.style.display = 'none';
                        otImg.draggable = false;
                    }

                    otImg.addEventListener('dragstart', (e) => {
                        draggedOt = e.target;
                        e.dataTransfer.setData('text/plain', draggedOt.id); // Transfere o ID da OT na paleta
                        e.dataTransfer.setData('application/json', JSON.stringify({
                            otId: baseOtId, // O ID ORIGINAL da OT (e.g., 'ot0190')
                            paletteOtId: draggedOt.id, // O ID da instância na paleta (e.g., 'paco-palette-posto-p01-ot0190-1')
                            sourcePostoId: postoId
                        }));
                        draggedOt.classList.add('dragging');
                    });
                    otImg.addEventListener('dragend', () => {
                        draggedOt.classList.remove('dragging');
                        draggedOt = null;
                    });
                    availableOtsDiv.appendChild(otImg);
                }
            });
        }
        contentWrapper.appendChild(pacoPalette);


        // Grade do Paco-Paco
        const pacoGridArea = document.createElement('div');
        pacoGridArea.classList.add('paco-paco-grid-area-local');
        pacoGridArea.id = `grid-${postoId}`;
        pacoGridArea.style.gridTemplateColumns = `repeat(${PACO_PACO_COLUMNS}, ${PACO_PACO_CAVITY_SIZE}px)`;
        pacoGridArea.style.gridTemplateRows = `repeat(${PACO_PACO_ROWS}, ${PACO_PACO_CAVITY_SIZE}px)`;

        // Definição das legendas dos slots
        const slotLabels = [];
        const rows = ['D', 'C', 'B', 'A']; // D (superior) -> A (inferior)
        for (let r = 0; r < PACO_PACO_ROWS; r++) {
            const rowLabel = rows[r];
            for (let c = 0; c < PACO_PACO_COLUMNS; c++) {
                slotLabels.push(`${rowLabel}${String(c + 1).padStart(2, '0')}`);
            }
        }
        let currentSlotLabelIndex = 0; // Para iterar sobre as legendas

        // Gera as cavidades
        for (let r = 0; r < PACO_PACO_ROWS; r++) {
            for (let c = 0; c < PACO_PACO_COLUMNS; c++) {
                const cavityId = `cavity-${postoId}-${r}-${c}`;
                const cavityDiv = document.createElement('div');
                cavityDiv.classList.add('paco-paco-cavity-local');
                cavityDiv.id = cavityId;
                cavityDiv.dataset.postoId = postoId;

                // Adiciona a legenda ao slot
                const labelSpan = document.createElement('span');
                labelSpan.classList.add('paco-cavity-label');
                labelSpan.textContent = slotLabels[currentSlotLabelIndex++];
                cavityDiv.appendChild(labelSpan);

                // Restaura OT se existir no estado salvo
                if (pacoPacoStates[postoId] && pacoPacoStates[postoId][cavityId]) {
                    const savedOtData = pacoPacoStates[postoId][cavityId];
                    let savedOtId; // O ID base da OT (e.g., ot0190)
                    let savedPaletteOtId; // O ID da instância na paleta (e.g., paco-palette-posto-p01-ot0190-1)

                    if (typeof savedOtData === 'object') {
                        savedOtId = savedOtData.otId;
                        savedPaletteOtId = savedOtData.paletteOtId;
                    } else { // Compatibilidade com estados antigos que só salvavam o otId
                        savedOtId = savedOtData;
                        // Tenta inferir o paletteOtId. Isso é um fallback para dados antigos.
                        const baseOtIdFromSaved = savedOtId.endsWith('D') ? savedOtId.slice(0, -1) : savedOtId;
                        savedPaletteOtId = `paco-palette-${postoId}-${baseOtIdFromSaved}-1`;
                        if (!document.getElementById(savedPaletteOtId)) {
                             savedPaletteOtId = `paco-palette-${postoId}-${baseOtIdFromSaved}-2`;
                             if (!document.getElementById(savedPaletteOtId)) {
                                 console.warn(`Could not find a matching palette ID for old saved state: ${savedOtId}`);
                                 // Se ainda não encontrou, talvez seja um otId sem o 'ot' prefixo ou outro formato antigo
                                 savedPaletteOtId = `paco-palette-${postoId}-${savedOtId}-1`; // Último esforço
                             }
                        }
                    }

                    const otCopy = document.createElement('img');
                    otCopy.src = `images/${savedOtId.replace('ot', '')}.png`; // Usa a imagem base
                    otCopy.alt = savedOtId;
                    otCopy.id = `paco-cavity-${postoId}-${savedOtId}-${Date.now()}`; // ID único na cavidade
                    otCopy.classList.add('paco-ot-in-cavity');
                    otCopy.draggable = false;
                    otCopy.dataset.originalPaletteOtId = savedPaletteOtId; // Guarda o ID da OT original da paleta
                    cavityDiv.appendChild(otCopy);
                    cavityDiv.classList.add('has-ot');

                    // Esconde a OT original da paleta novamente (se não estiver já escondida)
                    const originalPaletteOt = document.getElementById(savedPaletteOtId);
                    if (originalPaletteOt) {
                        originalPaletteOt.style.display = 'none';
                        originalPaletteOt.draggable = false;
                    }

                    // Re-anexar listener de clique para remover
                    otCopy.addEventListener('click', () => {
                        const otToReturnId = otCopy.dataset.originalPaletteOtId; // Usa o ID da OT da paleta que foi usada
                        cavityDiv.removeChild(otCopy);
                        cavityDiv.classList.remove('has-ot');
                        delete pacoPacoStates[postoId][cavityDiv.id];
                        savePacoPacoState(); // Salva estado após remoção

                        const originalPaletteOtElement = document.getElementById(otToReturnId);
                        if (originalPaletteOtElement) {
                            originalPaletteOtElement.style.display = 'block';
                            originalPaletteOtElement.draggable = true;
                        }
                    });
                }


                cavityDiv.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    // Apenas permite drop se a OT vier de uma paleta do Paco-Paco e a cavidade estiver vazia
                    if (draggedOt && draggedOt.classList.contains('paco-ot-draggable') && !cavityDiv.querySelector('.paco-ot-in-cavity')) {
                        cavityDiv.classList.add('drag-over');
                    }
                });
                cavityDiv.addEventListener('dragleave', () => {
                    cavityDiv.classList.remove('drag-over');
                });
                cavityDiv.addEventListener('drop', (e) => {
                    e.preventDefault();
                    cavityDiv.classList.remove('drag-over');

                    const otDataTransfer = JSON.parse(e.dataTransfer.getData('application/json'));
                    const droppedOtId = otDataTransfer.otId; // ID ORIGINAL da OT (e.g., 'ot0190')
                    const droppedPaletteOtId = otDataTransfer.paletteOtId; // ID da instância da OT na paleta (e.g., 'paco-palette-posto-p01-ot0190-1')
                    const sourcePostoIdFromDrag = otDataTransfer.sourcePostoId;

                    // Verifica se a OT está vindo da paleta do posto correto e se a cavidade está vazia
                    if (draggedOt && sourcePostoIdFromDrag === postoId && !cavityDiv.querySelector('.paco-ot-in-cavity')) {
                        // Encontra a OT original na paleta deste posto para escondê-la (usando o ID da instância da paleta)
                        const originalPaletteOt = document.getElementById(droppedPaletteOtId);
                        if (originalPaletteOt) {
                            originalPaletteOt.style.display = 'none';
                            originalPaletteOt.draggable = false;
                        }

                        const otCopy = document.createElement('img');
                        otCopy.src = `images/${droppedOtId.replace('ot', '')}.png`;
                        otCopy.alt = droppedOtId;
                        otCopy.id = `paco-cavity-${postoId}-${droppedOtId}-${Date.now()}`; // ID único na cavidade
                        otCopy.classList.add('paco-ot-in-cavity');
                        otCopy.draggable = false; // Não arrastável da cavidade (por clique para remover)
                        otCopy.dataset.originalPaletteOtId = droppedPaletteOtId; // Guarda o ID da OT original da paleta

                        cavityDiv.appendChild(otCopy);
                        cavityDiv.classList.add('has-ot');
                        // Armazena o ID original da OT e o ID da instância da paleta
                        pacoPacoStates[postoId][cavityDiv.id] = { otId: droppedOtId, paletteOtId: droppedPaletteOtId };
                        savePacoPacoState(); // Salva estado após drop

                        // Listener para remover a OT da cavidade
                        otCopy.addEventListener('click', () => {
                            const otToReturnId = otCopy.dataset.originalPaletteOtId; // Usa o ID da OT da paleta que foi usada
                            cavityDiv.removeChild(otCopy);
                            cavityDiv.classList.remove('has-ot');
                            delete pacoPacoStates[postoId][cavityDiv.id];
                            savePacoPacoState(); // Salva estado após remoção

                            // Retorna a OT para a paleta e a torna arrastável novamente
                            const originalPaletteOtElement = document.getElementById(otToReturnId);
                            if (originalPaletteOtElement) {
                                originalPaletteOtElement.style.display = 'block';
                                originalPaletteOtElement.draggable = true;
                            }
                        });
                    }
                });
                pacoGridArea.appendChild(cavityDiv);
            }
        }
        contentWrapper.appendChild(pacoGridArea);
        pacoPacoPostosContainer.appendChild(postoDiv);
    }

    /**
     * Gera todas as seções de Paco-Paco para cada posto.
     */
    function generateAllPacoPacoSections() {
        pacoPacoPostosContainer.innerHTML = ''; // Limpa a área

        // Modifica a função de ordenação para colocar 'posto-solda-01' primeiro
        const postoIds = Object.keys(allOriginalOtsByPostoFromMain).sort((a, b) => {
            if (a === 'posto-solda-01') return -1; // 'posto-solda-01' vem antes
            if (b === 'posto-solda-01') return 1;  // 'posto-solda-01' vem antes

            // Para os outros postos, mantém a ordenação numérica
            const numA = parseInt(a.replace('posto-p', ''));
            const numB = parseInt(b.replace('posto-p', ''));
            return numA - numB;
        });

        if (postoIds.length === 0) {
            pacoPacoPostosContainer.innerHTML = '<p style="text-align: center; color: #ccc;">Nenhum posto encontrado ou nenhuma OT original inserida nos postos da simulação.</p>';
            return;
        }

        postoIds.forEach(postoId => {
            // initialOtsForThisPosto agora é um Set de base OT IDs
            const otsForThisPosto = allOriginalOtsByPostoFromMain[postoId] || new Set();
            createPacoPacoForPosto(postoId, otsForThisPosto);
        });
    }

    // Listener para o botão "Voltar para Simulação"
    backToSimulationBtn.addEventListener('click', () => {
        // Ao voltar, a guia principal deve manter o estado.
        // Fechar esta aba (se foi aberta por window.open) é a ação mais limpa.
        window.close();
    });

    // Inicialização da página Paco-Paco ao carregar
    loadInitialDataFromMain(); // Carrega os dados da página principal e o estado de organização desta aba
    generateAllPacoPacoSections();
});