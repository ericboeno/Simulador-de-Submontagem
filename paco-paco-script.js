document.addEventListener('DOMContentLoaded', () => {
    const pacoPacoPostosContainer = document.getElementById('paco-paco-postos-container');
    const pacoGlobalOtPalette = document.getElementById('paco-global-ot-palette');

    let draggedPacoOt = null;
    let otElementsMap = new Map(); // Mapa para armazenar referências aos elementos OT com seu HTML completo
    let pacoPacoCavityContents = {}; // Armazena o estado das cavidades da página Paco-Paco: { postoId: { cavityId: otId } }
    let pacoPacoAvailableOts = new Set(); // OTs atualmente visíveis na paleta global
    let pacoPacoGridDimensions = {}; // Armazena as dimensões do grid para cada posto: { postoId: { cols: X, rows: Y } }

    const SOLDER_OTS = [ // Lista de OTs de Solda, se necessário para lógica específica
        'ot0344', 'ot0300', 'ot0301', 'ot0302', 'ot0311', 'ot0304', 'ot0342', 'ot0343',
        'ot0305', 'ot0312', 'ot0190', 'ot0229', 'ot0192', 'ot0332', 'ot0333', 'ot0334',
        'ot0193', 'ot0310', 'ot0309', 'ot0335', 'ot0336', 'ot0337'
    ];
    const SOLDER_OTS_SET = new Set(SOLDER_OTS);

    function loadInitialData() {
        // Carregar otElementsMap do sessionStorage (em HTML string)
        const storedOtElementsMapHTML = sessionStorage.getItem('otElementsMapHTML');
        if (storedOtElementsMapHTML) {
            const parsedMap = JSON.parse(storedOtElementsMapHTML);
            for (const otId in parsedMap) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = parsedMap[otId];
                otElementsMap.set(otId, tempDiv.firstChild);
            }
        }

        // Carregar o estado salvo das cavidades
        const savedCavityContents = sessionStorage.getItem('pacoPacoCavityContents');
        if (savedCavityContents) {
            pacoPacoCavityContents = JSON.parse(savedCavityContents);
        } else {
            pacoPacoCavityContents = {};
        }

        // Carregar OTs disponíveis na paleta global
        const savedAvailableOts = sessionStorage.getItem('pacoPacoAvailableOts');
        if (savedAvailableOts) {
            pacoPacoAvailableOts = new Set(JSON.parse(savedAvailableOts));
        } else {
            // Se não houver estado salvo, todas as OTs são inicialmente disponíveis
            const allOtIdsFromMain = JSON.parse(sessionStorage.getItem('allOtIds') || '[]');
            pacoPacoAvailableOts = new Set(allOtIdsFromMain);
        }

        // Carregar as dimensões do grid
        const savedGridDimensions = sessionStorage.getItem('pacoPacoGridDimensions');
        if (savedGridDimensions) {
            pacoPacoGridDimensions = JSON.parse(savedGridDimensions);
        } else {
            pacoPacoGridDimensions = {}; // Default vazio
        }
    }

    function savePacoPacoState() {
        sessionStorage.setItem('pacoPacoCavityContents', JSON.stringify(pacoPacoCavityContents));
        sessionStorage.setItem('pacoPacoAvailableOts', JSON.stringify(Array.from(pacoPacoAvailableOts)));
        sessionStorage.setItem('pacoPacoGridDimensions', JSON.stringify(pacoPacoGridDimensions));
    }

    function populateGlobalPacoPalette() {
        pacoGlobalOtPalette.innerHTML = '<h2>Todas as OTs</h2>'; // Limpa e adiciona o título
        
        // Criar um container flex para as OTs na paleta
        const otContainer = document.createElement('div');
        otContainer.classList.add('paco-palette-ots-global-container');
        pacoGlobalOtPalette.appendChild(otContainer);

        // Adicionar as OTs disponíveis à paleta global
        otElementsMap.forEach((otElement, otId) => {
            // Verifica se a OT está marcada como disponível para esta paleta
            if (pacoPacoAvailableOts.has(otId)) {
                const draggableOt = otElement.cloneNode(true);
                draggableOt.classList.add('paco-ot-draggable');
                draggableOt.id = `paco-palette-global-${otId}`; // ID único na paleta global
                draggableOt.dataset.originalOtId = otId; // Referência ao ID original

                draggableOt.addEventListener('dragstart', (e) => {
                    draggedPacoOt = e.target;
                    e.dataTransfer.setData('text/plain', draggableOt.dataset.originalOtId);
                    draggableOt.classList.add('dragging');
                });
                draggableOt.addEventListener('dragend', () => {
                    draggableOt.classList.remove('dragging');
                    draggedPacoOt = null;
                });
                otContainer.appendChild(draggableOt);
            }
        });
    }

    function createPacoPacoPostoSection(postoId) {
        const postoSection = document.createElement('div');
        postoSection.classList.add('paco-posto-section');
        postoSection.id = `paco-${postoId}`;

        const postoTitle = document.createElement('h2');
        postoTitle.textContent = `Paco-Paco - ${postoId.replace('posto-', '').replace('p', 'Posto ').replace('solda-01', 'Posto de Solda 01')}`;
        postoSection.appendChild(postoTitle);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('paco-posto-content-wrapper');
        postoSection.appendChild(contentWrapper);

        // Controles de dimensão do grid
        const gridControls = document.createElement('div');
        gridControls.classList.add('paco-grid-controls');

        const labelCols = document.createElement('label');
        labelCols.textContent = 'Colunas:';
        const inputCols = document.createElement('input');
        inputCols.type = 'number';
        inputCols.min = '1';
        inputCols.value = pacoPacoGridDimensions[postoId]?.cols || 20; // Valor padrão
        inputCols.id = `input-cols-${postoId}`;

        const labelRows = document.createElement('label');
        labelRows.textContent = 'Linhas:';
        const inputRows = document.createElement('input');
        inputRows.type = 'number';
        inputRows.min = '1';
        inputRows.value = pacoPacoGridDimensions[postoId]?.rows || 4; // Valor padrão (para 40 slots)
        inputRows.id = `input-rows-${postoId}`;

        const generateGridBtn = document.createElement('button');
        generateGridBtn.textContent = 'Gerar Slots';
        generateGridBtn.addEventListener('click', () => {
            const newCols = parseInt(inputCols.value);
            // CORREÇÃO: Usar inputRows.value para newRows
            const newRows = parseInt(inputRows.value); 
            if (newCols > 0 && newRows > 0) {
                pacoPacoGridDimensions[postoId] = { cols: newCols, rows: newRows };
                savePacoPacoState();
                populatePacoGrid(postoId, gridArea);
            } else {
                alert('Colunas e Linhas devem ser maiores que zero.');
            }
        });

        gridControls.appendChild(labelCols);
        gridControls.appendChild(inputCols);
        gridControls.appendChild(labelRows);
        gridControls.appendChild(inputRows);
        gridControls.appendChild(generateGridBtn);
        contentWrapper.appendChild(gridControls);

        // Grid/Área das cavidades
        const gridArea = document.createElement('div');
        gridArea.classList.add('paco-paco-grid-area-local');
        contentWrapper.appendChild(gridArea);

        // Popula o grid com base nas dimensões salvas ou padrão
        populatePacoGrid(postoId, gridArea);

        return postoSection;
    }

    function populatePacoGrid(postoId, gridAreaElement) {
        // Limpa o grid para recriação
        gridAreaElement.innerHTML = '';

        const cols = pacoPacoGridDimensions[postoId]?.cols || 20;
        const rows = pacoPacoGridDimensions[postoId]?.rows || 4;
        const numCavities = cols * rows;

        gridAreaElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridAreaElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`; 
        
        // Garante que o objeto para o posto exista no pacoPacoCavityContents
        // MANTEMOS A INICIALIZAÇÃO AQUI, pois populatePacoGrid é chamado para preencher o grid
        if (!pacoPacoCavityContents[postoId]) {
            pacoPacoCavityContents[postoId] = {};
        } else {
            // Ao repopular o grid, também limpamos o conteúdo salvo para este posto
            // e o reconstruímos com base nas OTs que ainda estão dentro dos novos limites do grid.
            // Isso evita que referências a cavidades antigas (fora dos novos limites) permaneçam no estado.
            pacoPacoCavityContents[postoId] = {};
        }


        let currentCavityIndex = 0;
        const newCavityContentsForPosto = {}; // Este será o novo estado para o posto atual

        for (let i = 0; i < numCavities; i++) {
            const cavityId = `paco-cavity-${postoId}-${i}`; // Garante ID baseado no índice

            const cavity = document.createElement('div');
            cavity.classList.add('paco-paco-cavity-local');
            cavity.id = cavityId;

            const cavityLabel = document.createElement('span');
            cavityLabel.classList.add('paco-cavity-label');
            
            // Lógica para o novo formato de nome da slot (A01, B02, etc.)
            const row_index_from_top = Math.floor(i / cols); // Índice da linha (0-indexed, de cima para baixo)
            const col_number = (i % cols) + 1; // Número da coluna (1-indexed)

            // Calcula o índice da linha de baixo para cima
            const row_index_from_bottom = (rows - 1) - row_index_from_top;
            // Converte o índice da linha (0=A, 1=B, ...) para a letra correspondente
            const row_letter = String.fromCharCode('A'.charCodeAt(0) + row_index_from_bottom);

            // Formata o número da coluna com dois dígitos (ex: 1 -> 01)
            const formatted_col_number = String(col_number).padStart(2, '0');

            cavityLabel.textContent = `${row_letter}${formatted_col_number}`;
            // Fim da lógica para o nome da slot

            cavity.appendChild(cavityLabel);

            // Tenta popular a cavidade se houver dados salvos OU se uma OT foi "desalocada"
            // Pega do estado salvo antes da reconstrução do grid
            const otIdInSavedCavity = JSON.parse(sessionStorage.getItem('pacoPacoCavityContents') || '{}')[postoId]?.[cavityId];

            if (otIdInSavedCavity) {
                const otElement = otElementsMap.get(otIdInSavedCavity);
                if (otElement) {
                    const otCopy = otElement.cloneNode(true);
                    otCopy.classList.add('paco-ot-in-cavity');
                    otCopy.draggable = true; // Permite arrastar para fora
                    otCopy.id = `paco-in-cavity-${otIdInSavedCavity}`; // ID único para a OT na cavidade
                    otCopy.dataset.originalOtId = otIdInSavedCavity;
                    
                    cavity.appendChild(otCopy);
                    cavity.classList.add('has-ot');

                    newCavityContentsForPosto[cavityId] = otIdInSavedCavity; // Adiciona ao novo estado do posto
                    
                    // Adiciona listener para remover OT da cavidade (clique)
                    otCopy.addEventListener('click', (e) => {
                        e.stopPropagation(); // Evita que o clique se propague para a cavidade
                        removeOtFromCavity(postoId, cavity.id, otIdInSavedCavity, cavity, otCopy);
                    });

                    // Permite arrastar para fora da cavidade
                    otCopy.addEventListener('dragstart', (e) => {
                        draggedPacoOt = e.target;
                        e.dataTransfer.setData('text/plain', otCopy.dataset.originalOtId);
                        otCopy.classList.add('dragging');
                    });
                    otCopy.addEventListener('dragend', () => {
                        otCopy.classList.remove('dragging');
                        draggedPacoOt = null;
                    });
                } else {
                    // OT não encontrada no mapa (WTF?), move de volta para a paleta
                    pacoPacoAvailableOts.add(otIdInSavedCavity);
                }
            }

            cavity.addEventListener('dragover', (e) => {
                e.preventDefault();
                // Permite drop se houver uma OT sendo arrastada E a cavidade estiver vazia
                if (draggedPacoOt && !cavity.querySelector('.paco-ot-in-cavity')) {
                    cavity.classList.add('drag-over');
                } else {
                    cavity.classList.remove('drag-over');
                }
            });

            cavity.addEventListener('dragleave', () => {
                cavity.classList.remove('drag-over');
            });

            cavity.addEventListener('drop', (e) => {
                e.preventDefault();
                cavity.classList.remove('drag-over');

                if (draggedPacoOt && !cavity.querySelector('.paco-ot-in-cavity')) {
                    const originalOtId = e.dataTransfer.getData('text/plain');
                    const sourceOtElement = document.getElementById(`paco-palette-global-${originalOtId}`) || document.getElementById(`paco-in-cavity-${originalOtId}`);

                    if (sourceOtElement) {
                        // Se a OT veio de outra cavidade, remove-a de lá primeiro
                        const previousCavity = sourceOtElement.closest('.paco-paco-cavity-local');
                        if (previousCavity) {
                            const prevPostoId = previousCavity.closest('.paco-posto-section').id.replace('paco-', '');
                            const prevOtId = sourceOtElement.dataset.originalOtId;
                            removeOtFromCavity(prevPostoId, previousCavity.id, prevOtId, previousCavity, sourceOtElement);
                        } else {
                            // Se veio da paleta global, esconde da paleta
                            sourceOtElement.style.display = 'none';
                            pacoPacoAvailableOts.delete(originalOtId);
                        }
                        
                        const otCopy = otElementsMap.get(originalOtId).cloneNode(true);
                        otCopy.classList.add('paco-ot-in-cavity');
                        otCopy.draggable = true; // Permite arrastar para fora
                        otCopy.id = `paco-in-cavity-${originalOtId}`;
                        otCopy.dataset.originalOtId = originalOtId;

                        cavity.appendChild(otCopy);
                        cavity.classList.add('has-ot');

                        // CORREÇÃO: Garante que o objeto do posto exista antes de tentar adicionar a cavidade
                        if (!pacoPacoCavityContents[postoId]) { 
                            pacoPacoCavityContents[postoId] = {};
                        }
                        pacoPacoCavityContents[postoId][cavity.id] = originalOtId; 

                        savePacoPacoState();
                        populateGlobalPacoPalette(); // Atualiza a paleta global para refletir a OT ausente

                        // Adiciona listener para remover OT da cavidade (clique)
                        otCopy.addEventListener('click', (e) => {
                            e.stopPropagation();
                            removeOtFromCavity(postoId, cavity.id, originalOtId, cavity, otCopy);
                        });

                        // Permite arrastar para fora da cavidade
                        otCopy.addEventListener('dragstart', (e) => {
                            draggedPacoOt = e.target;
                            e.dataTransfer.setData('text/plain', otCopy.dataset.originalOtId);
                            otCopy.classList.add('dragging');
                        });
                        otCopy.addEventListener('dragend', () => {
                            otCopy.classList.remove('dragging');
                            draggedPacoOt = null;
                        });
                    }
                }
            });

            gridAreaElement.appendChild(cavity);
        }
        // Ao final de popularPacoGrid, salvamos o novo estado reconstruído
        // Isso resolve o problema de limpar corretamente os elementos que ficam fora do grid
        pacoPacoCavityContents[postoId] = newCavityContentsForPosto;
        savePacoPacoState();
        populateGlobalPacoPalette(); // Garante que a paleta global reflita as OTs desalocadas
    }

    function removeOtFromCavity(postoId, cavityId, otId, cavityElement, otElement) {
        cavityElement.removeChild(otElement);
        cavityElement.classList.remove('has-ot');

        // Remover do estado
        if (pacoPacoCavityContents[postoId]) {
            delete pacoPacoCavityContents[postoId][cavityId];
            // CORREÇÃO: Não deletar o objeto do posto se ele ficar vazio, apenas se não houver mais chaves
            // Isso garante que pacoPacoCavityContents[postoId] nunca seja 'undefined'
            if (Object.keys(pacoPacoCavityContents[postoId]).length === 0) {
                 // Pode deixar vazio ou deletar, desde que a lógica de drop lide com 'undefined' corretamente
                 // Optamos por deixar vazio e garantir inicialização no drop.
            }
        }
        pacoPacoAvailableOts.add(otId); // Torna a OT disponível novamente na paleta global
        savePacoPacoState();

        // Faz a OT reaparecer na paleta global
        populateGlobalPacoPalette(); 
    }


    function initializePacoPacoPage() {
        loadInitialData();
        pacoPacoPostosContainer.innerHTML = ''; // Limpa o container antes de popular

        populateGlobalPacoPalette(); // Popula a paleta global primeiro

        // Determina quantos postos Paco-Paco mostrar com base na aba principal
        const numPostosPrincipal = parseInt(localStorage.getItem('numPostos') || '4');
        let postoIds = [];
        // Adiciona o posto de solda
        postoIds.push('posto-solda-01');
        // Adiciona os postos numerados
        for (let i = 1; i <= numPostosPrincipal; i++) {
            postoIds.push(`posto-p${String(i).padStart(2, '0')}`);
        }

        const sortedPostoIds = postoIds.sort((a, b) => {
            const isA_Solda = a === 'posto-solda-01';
            const isB_Solda = b === 'posto-solda-01';

            if (isA_Solda && !isB_Solda) return -1;
            if (!isA_Solda && isB_Solda) return 1;
            if (isA_Solda && isB_Solda) return 0;

            const numA = parseInt(a.replace('posto-p', ''));
            const numB = parseInt(b.replace('posto-p', ''));
            return numA - numB;
        });

        if (sortedPostoIds.length === 0) {
            pacoPacoPostosContainer.innerHTML = '<p>Nenhum posto configurado para Paco-Paco.</p>';
        } else {
            sortedPostoIds.forEach(postoId => {
                const postoSection = createPacoPacoPostoSection(postoId);
                pacoPacoPostosContainer.appendChild(postoSection);
            });
        }
    }

    initializePacoPacoPage();
});