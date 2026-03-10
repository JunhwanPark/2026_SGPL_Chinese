import { vocabFiles } from './data.js';

let allVocabData = [];
let vocabByFile = [];
let currentVocabPool = [];

export function initVocabMode() {
    document.getElementById('refresh-vocab-btn').addEventListener('click', drawRandomVocab);
}

export async function checkAndLoadVocab() {
    if (allVocabData.length === 0) {
        await loadAllVocabAndDraw();
    }
}

async function loadAllVocabAndDraw() {
    allVocabData = [];
    vocabByFile = [];

    const fetchPromises = vocabFiles.map((file) => fetch(file).catch(() => null));
    const responses = await Promise.all(fetchPromises);

    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        let fileVocab = [];

        if (response && response.ok) {
            try {
                const text = await response.text();
                const lines = text.split('\n');
                lines.forEach((line) => {
                    if (line.trim() !== '') {
                        const parts = line.split(/\s*\/\s*/);
                        if (parts.length >= 3) {
                            let pureWord = parts[0].trim().replace(/^\d+\.\s*/, '');
                            const vocabItem = {
                                word: pureWord,
                                pinyin: parts[1].trim(),
                                meaning: parts[2].trim(),
                            };
                            fileVocab.push(vocabItem);
                            allVocabData.push(vocabItem);
                        }
                    }
                });
            } catch (error) {
                console.error('파일 읽기 오류:', error);
            }
        }
        vocabByFile.push(fileVocab);
    }

    currentVocabPool = allVocabData;
    renderVocabMenu();
    drawRandomVocab();
}

function renderVocabMenu() {
    const vocabMenuContainer = document.getElementById('vocab-menu-container');
    if (!vocabMenuContainer) return;
    vocabMenuContainer.innerHTML = '';

    const filterDiv = document.createElement('div');
    filterDiv.className = 'vocab-filter-container';

    const allBtn = document.createElement('button');
    allBtn.className = 'vocab-filter-btn active';
    allBtn.textContent = '전체';
    allBtn.addEventListener('click', () => {
        setActiveVocabBtn(allBtn);
        currentVocabPool = allVocabData;
        drawRandomVocab();
        scrollToContent();
    });
    filterDiv.appendChild(allBtn);

    vocabFiles.forEach((_, index) => {
        if (vocabByFile[index].length === 0) return;

        const btn = document.createElement('button');
        btn.className = 'vocab-filter-btn';
        btn.textContent = `${index + 1}`;
        btn.addEventListener('click', () => {
            setActiveVocabBtn(btn);
            currentVocabPool = vocabByFile[index];
            drawRandomVocab();
            scrollToContent();
        });
        filterDiv.appendChild(btn);
    });

    vocabMenuContainer.appendChild(filterDiv);
}

function setActiveVocabBtn(clickedBtn) {
    document.querySelectorAll('.vocab-filter-btn').forEach((btn) => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
}

function scrollToContent() {
    if (window.innerWidth <= 768) {
        document.getElementById('content-area').scrollIntoView({ behavior: 'smooth' });
    }
}

function drawRandomVocab() {
    const grid = document.getElementById('flashcard-grid');
    grid.innerHTML = '';

    if (currentVocabPool.length === 0) {
        grid.innerHTML = '<p>단어장 데이터가 없습니다.</p>';
        return;
    }

    const uniqueVocabMap = new Map();
    currentVocabPool.forEach((item) => {
        uniqueVocabMap.set(item.word, item);
    });
    const uniqueVocabData = Array.from(uniqueVocabMap.values());

    const shuffled = [...uniqueVocabData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    selected.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'flashcard';

        let meaningClass = 'fc-meaning';
        if (item.meaning.length > 25) {
            meaningClass += ' super-long';
        } else if (item.meaning.length > 12) {
            meaningClass += ' long-text';
        }

        card.innerHTML = `
            <div class="fc-word">${item.word}</div>
            <div class="fc-pinyin">${item.pinyin}</div>
            <div class="${meaningClass}">${item.meaning}</div>
        `;

        let startY = 0;
        let flipTimer;

        card.addEventListener('pointerdown', (e) => {
            startY = e.clientY;
            flipTimer = setTimeout(() => {
                card.classList.add('flipped');
            }, 100);
        });

        card.addEventListener('pointermove', (e) => {
            if (Math.abs(e.clientY - startY) > 10) {
                clearTimeout(flipTimer);
                card.classList.remove('flipped');
            }
        });

        const hideCard = () => {
            clearTimeout(flipTimer);
            card.classList.remove('flipped');
        };

        card.addEventListener('pointerup', hideCard);
        card.addEventListener('pointerleave', hideCard);
        card.addEventListener('pointercancel', hideCard);
        card.addEventListener('contextmenu', (e) => e.preventDefault());

        grid.appendChild(card);
    });
}
