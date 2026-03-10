// ==========================================
// 학습 데이터 및 전역 변수 설정
// ==========================================
const studyData = {
    "生活篇(中级)": {
        "第一课 用餐": {
            mdFile: "data/01-01.md",
            audioFile: "audio/01-01.mp3"
        },
        "第二课 美食": {
            mdFile: "data/01-02.md",
            audioFile: "audio/01-02.mp3"
        },
        "第三课 出行": {
            mdFile: "data/01-03.md",
            audioFile: "audio/01-03.mp3"
        },
        "第四课 游玩": {
            mdFile: "data/01-04.md",
            audioFile: "audio/01-04.mp3"
        },
        "第五课 聊开车": {
            mdFile: "data/01-05.md",
            audioFile: "audio/01-05.mp3"
        },
        "第六课 爱好": {
            mdFile: "data/01-06.md",
            audioFile: "audio/01-06.mp3"
        },
        "第七课 聊购物": {
            mdFile: "data/01-07.md",
            audioFile: "audio/01-07.mp3"
        },
        "第八课 聊教育": {
            mdFile: "data/01-08.md",
            audioFile: "audio/01-08.mp3"
        },
    },
    "会议篇(中级)": {
        "第一课 主持会议": {
            mdFile: "data/02-01.md",
            audioFile: "audio/02-01.mp3"
        },
        "第二课 表达意见": {
            mdFile: "data/02-02.md",
            audioFile: "audio/02-02.mp3"
        },
        "第三课 意外处理": {
            mdFile: "data/02-03.md",
            audioFile: "audio/02-03.mp3"
        },
        "第四课 会议总结": {
            mdFile: "data/02-04.md",
            audioFile: "audio/02-04.mp3"
        },
        "第五课 安排工作": {
            mdFile: "data/02-05.md",
            audioFile: "audio/02-05.mp3"
        },
        "第六课 解决问题": {
            mdFile: "data/02-06.md",
            audioFile: "audio/02-06.mp3"
        },
        "第七课 信息共享": {
            mdFile: "data/02-07.md",
            audioFile: "audio/02-07.mp3"
        },
        "第八课 工作督促": {
            mdFile: "data/02-08.md",
            audioFile: "audio/02-08.mp3"
        },
    },
    "管理篇(中级)": {
        "第一课 招聘": {
            mdFile: "data/03-01.md",
            audioFile: "audio/03-01.mp3"
        },
        "第二课 入职": {
            mdFile: "data/03-02.md",
            audioFile: "audio/03-02.mp3"
        },
        "第三课 离职": {
            mdFile: "data/03-03.md",
            audioFile: "audio/03-03.mp3"
        },
        "第四课 业务进展": {
            mdFile: "data/03-04.md",
            audioFile: "audio/03-04.mp3"
        },
        "第五课 考核": {
            mdFile: "data/03-05.md",
            audioFile: "audio/03-05.mp3"
        },
        "第六课 指导": {
            mdFile: "data/03-06.md",
            audioFile: "audio/03-06.mp3"
        },
        "第七课 激励": {
            mdFile: "data/03-07.md",
            audioFile: "audio/03-07.mp3"
        },
        "第八课 情绪管理": {
            mdFile: "data/03-08.md",
            audioFile: "audio/03-08.mp3"
        },
    },
    "交际篇(中级)": {
        "第一课 介绍": {
            mdFile: "data/04-01.md",
            audioFile: "audio/04-01.mp3"
        },
        "第二课 宴请": {
            mdFile: "data/04-02.md",
            audioFile: "audio/04-02.mp3"
        },
        "第三课 酒文化": {
            mdFile: "data/04-03.md",
            audioFile: "audio/04-03.mp3"
        },
        "第四课 节日文化": {
            mdFile: "data/04-04.md",
            audioFile: "audio/04-04.mp3"
        },
        "第五课 微信": {
            mdFile: "data/04-05.md",
            audioFile: "audio/04-05.mp3"
        },
        "第六课 电话电邮": {
            mdFile: "data/04-06.md",
            audioFile: "audio/04-06.mp3"
        },
        "第七课 发言": {
            mdFile: "data/04-07.md",
            audioFile: "audio/04-07.mp3"
        },
        "第八课 演示": {
            mdFile: "data/04-08.md",
            audioFile: "audio/04-08.mp3"
        },
    },
};

const vocabFiles = [
    "vocab/v02-12.txt",
    "vocab/v02-13.txt",
    "vocab/v02-19.txt",
    "vocab/v02-20.txt",
    "vocab/v02-23.txt",
    "vocab/v02-24.txt",
    "vocab/v02-25.txt",
    "vocab/v02-26.txt",
    "vocab/v02-27.txt",
    "vocab/v03-03.txt",
    "vocab/v03-04.txt",
    "vocab/v03-05.txt",
    "vocab/v03-06.txt",
    "vocab/v03-09.txt",
    "vocab/v03-10.txt",
];

let allVocabData = [];
let vocabByFile = [];
let currentVocabPool = [];

const playbackSpeeds = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5];
let currentSpeedIndex = 4;


// ==========================================
// 초기화 및 이벤트 리스너 설정
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-container');

    for (const subject in studyData) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-group';

        const subjectTitle = document.createElement('div');
        subjectTitle.className = 'subject-title';
        subjectTitle.textContent = subject;

        const chapterList = document.createElement('ul');
        chapterList.className = 'chapter-list';

        for (const chapter in studyData[subject]) {
            const chapterItem = document.createElement('li');
            chapterItem.className = 'chapter-item';
            chapterItem.textContent = chapter;

            chapterItem.addEventListener('click', async () => {
                const allChapterItems = document.querySelectorAll('.chapter-list li');
                allChapterItems.forEach(item => {
                    item.classList.remove('active-chapter');
                });

                chapterItem.classList.add('active-chapter');

                const displayTitle = `【${subject}】${chapter}`;
                await loadContent(displayTitle, studyData[subject][chapter]);

                if (window.innerWidth <= 768) {
                    document.getElementById('content-area').scrollIntoView({ behavior: 'smooth' });
                }
            });

            chapterList.appendChild(chapterItem);
        }

        subjectTitle.addEventListener('click', () => {
            const allChapterLists = document.querySelectorAll('.chapter-list');
            allChapterLists.forEach(list => {
                if (list !== chapterList) {
                    list.classList.remove('active');
                }
            });
            chapterList.classList.toggle('active');
        });

        subjectDiv.appendChild(subjectTitle);
        subjectDiv.appendChild(chapterList);
        menuContainer.appendChild(subjectDiv);
    }

    // 오디오 속도 제어
    const audioPlayer = document.getElementById('audio-player');
    const speedDisplay = document.getElementById('speed-display');
    const btnSpeedDown = document.getElementById('speed-down');
    const btnSpeedUp = document.getElementById('speed-up');

    function updateSpeed() {
        const speed = playbackSpeeds[currentSpeedIndex];
        audioPlayer.playbackRate = speed;
        speedDisplay.textContent = speed.toFixed(1) + 'x';
    }

    btnSpeedDown.addEventListener('click', () => {
        if (currentSpeedIndex > 0) {
            currentSpeedIndex--;
            updateSpeed();
        }
    });

    btnSpeedUp.addEventListener('click', () => {
        if (currentSpeedIndex < playbackSpeeds.length - 1) {
            currentSpeedIndex++;
            updateSpeed();
        }
    });

    // Top 버튼 기능
    const topBtn = document.getElementById("top-btn");

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


// ==========================================
// 본문 학습 모드 콘텐츠 로드
// ==========================================
async function loadContent(title, fileData) {
    document.getElementById('content-title').textContent = title;
    const scriptContainer = document.getElementById('script-container');
    const scriptElement = document.getElementById('script-text');

    try {
        const response = await fetch(fileData.mdFile);
        if (!response.ok) throw new Error('파일을 찾을 수 없습니다.');

        const markdownText = await response.text();
        scriptElement.innerHTML = marked.parse(markdownText);
        scriptContainer.classList.remove('hidden');

    } catch (error) {
        console.error('텍스트 로드 실패:', error);
        scriptElement.innerHTML = `<p style="color:red;">파일을 불러오는데 실패했습니다.<br>경로: ${fileData.mdFile}</p>`;
        scriptContainer.classList.remove('hidden');
    }

    const audioContainer = document.getElementById('audio-container');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const speedDisplay = document.getElementById('speed-display');

    if (fileData.audioFile) {
        audioSource.src = fileData.audioFile;
        audioPlayer.load();

        currentSpeedIndex = 4;
        audioPlayer.playbackRate = 1.0;
        speedDisplay.textContent = '1.0x';

        audioContainer.classList.remove('hidden');
    } else {
        audioSource.removeAttribute('src');
        audioContainer.classList.add('hidden');
    }
}


// ==========================================
// 모드 전환 및 단어장 로직
// ==========================================
const modeStudyBtn = document.getElementById('mode-study');
const modeVocabBtn = document.getElementById('mode-vocab');
const menuContainer = document.getElementById('menu-container');
const vocabMenuContainer = document.getElementById('vocab-menu-container');
const contentTitle = document.getElementById('content-title');
const audioContainer = document.getElementById('audio-container');
const scriptContainer = document.getElementById('script-container');
const vocabContainer = document.getElementById('vocab-container');

modeStudyBtn.addEventListener('click', () => {
    modeStudyBtn.classList.add('active');
    modeVocabBtn.classList.remove('active');

    menuContainer.style.display = 'block';
    vocabMenuContainer.classList.add('hidden');

    vocabContainer.classList.add('hidden');
    contentTitle.style.display = 'block';

    if (document.getElementById('script-text').innerHTML.trim() !== "") {
        scriptContainer.classList.remove('hidden');
        const audioSource = document.getElementById('audio-source');
        if (audioSource.getAttribute('src')) {
            audioContainer.classList.remove('hidden');
        }
    }

    const secretSidebar = document.getElementById('secret-sidebar-menu');
    const secretContent = document.getElementById('secret-container');
    if (secretSidebar) secretSidebar.classList.add('hidden');
    if (secretContent) secretContent.classList.add('hidden');
});

modeVocabBtn.addEventListener('click', () => {
    modeVocabBtn.classList.add('active');
    modeStudyBtn.classList.remove('active');

    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) audioPlayer.pause();

    menuContainer.style.display = 'none';
    vocabMenuContainer.classList.remove('hidden');

    contentTitle.style.display = 'none';
    audioContainer.classList.add('hidden');
    scriptContainer.classList.add('hidden');
    vocabContainer.classList.remove('hidden');

    const secretSidebar = document.getElementById('secret-sidebar-menu');
    const secretContent = document.getElementById('secret-container');
    if (secretSidebar) secretSidebar.classList.add('hidden');
    if (secretContent) secretContent.classList.add('hidden');

    if (allVocabData.length === 0) {
        loadAllVocabAndDraw();
    }
});

async function loadAllVocabAndDraw() {
    allVocabData = [];
    vocabByFile = [];

    const fetchPromises = vocabFiles.map(file => fetch(file).catch(() => null));
    const responses = await Promise.all(fetchPromises);

    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        let fileVocab = [];

        if (response && response.ok) {
            try {
                const text = await response.text();
                const lines = text.split('\n');
                lines.forEach(line => {
                    if (line.trim() !== '') {
                        const parts = line.split(/\s*\/\s*/);
                        if (parts.length >= 3) {
                            let pureWord = parts[0].trim().replace(/^\d+\.\s*/, '');
                            const vocabItem = { word: pureWord, pinyin: parts[1].trim(), meaning: parts[2].trim() };
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
    document.querySelectorAll('.vocab-filter-btn').forEach(btn => btn.classList.remove('active'));
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
    currentVocabPool.forEach(item => {
        uniqueVocabMap.set(item.word, item);
    });
    const uniqueVocabData = Array.from(uniqueVocabMap.values());

    const shuffled = [...uniqueVocabData].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    selected.forEach(item => {
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

document.getElementById('refresh-vocab-btn').addEventListener('click', drawRandomVocab);


// ==========================================
// 위챗 연락처 모달 로직
// ==========================================
const wechatLink = document.getElementById('wechat-link');
const wechatModal = document.getElementById('wechat-modal');
const closeModal = document.getElementById('close-modal');

wechatLink.addEventListener('click', (e) => {
    e.preventDefault();
    wechatModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    wechatModal.classList.add('hidden');
});

wechatModal.addEventListener('click', (e) => {
    if (e.target === wechatModal) {
        wechatModal.classList.add('hidden');
    }
});

const copyIdBtn = document.getElementById('copy-id-btn');
const wechatIdText = document.getElementById('wechat-id');

copyIdBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(wechatIdText.innerText);

        const originalText = copyIdBtn.innerText;
        copyIdBtn.innerText = '✅ 복사 완료!';
        copyIdBtn.classList.add('copied');

        setTimeout(() => {
            copyIdBtn.innerText = originalText;
            copyIdBtn.classList.remove('copied');
        }, 2000);

    } catch (err) {
        console.error('복사 실패:', err);
        alert('복사를 지원하지 않는 환경입니다. 위챗 ID를 직접 드래그해서 복사해 주세요.');
    }
});


// ==========================================
// 🔒 이스터에그: 나만의 비밀 노트 로직
// ==========================================
const secretTrigger = document.getElementById('secret-trigger');
const secretContainer = document.getElementById('secret-container');
const secretSidebarMenu = document.getElementById('secret-sidebar-menu');
const secretContentArea = document.getElementById('secret-content-area');

const secretFiles = [
    { title: "2026-02-12 복습", path: "secret/2026-02-12.md" },
    { title: "2026-03-04 복습", path: "secret/2026-03-04.md" },
    { title: "2026-03-05 복습", path: "secret/2026-03-05.md" },
    { title: "2026-03-06 복습", path: "secret/2026-03-06.md" },
    { title: "2026-03-09 복습", path: "secret/2026-03-09.md" },
    { title: "2026-03-10 복습", path: "secret/2026-03-10.md" },
];

let clickCount = 0;
let clickTimer;

if (secretTrigger) {
    secretTrigger.addEventListener('click', () => {
        clickCount++;

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);

        if (clickCount === 5) {
            clickCount = 0;
            openSecretMode();
        }
    });
}

function openSecretMode() {
    document.getElementById('menu-container').style.display = 'none';

    const vocabMenu = document.getElementById('vocab-menu-container');
    if (vocabMenu) {
        vocabMenu.classList.add('hidden');
    }

    document.getElementById('content-title').style.display = 'none';
    document.getElementById('audio-container').classList.add('hidden');
    document.getElementById('script-container').classList.add('hidden');
    document.getElementById('vocab-container').classList.add('hidden');

    secretSidebarMenu.classList.remove('hidden');
    secretContainer.classList.remove('hidden');
    renderSecretMenu();
}

function renderSecretMenu() {
    secretSidebarMenu.innerHTML = `
        <div id="secret-btn-group" style="display: flex; flex-direction: column; gap: 8px;"></div>
    `;

    const btnGroup = document.getElementById('secret-btn-group');

    secretFiles.forEach(file => {
        const btn = document.createElement('button');
        btn.className = 'vocab-filter-btn';
        btn.style.width = '100%';
        btn.textContent = file.title;

        btn.addEventListener('click', async () => {
            document.querySelectorAll('#secret-btn-group button').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            try {
                const response = await fetch(file.path);
                if (!response.ok) throw new Error("문서를 찾을 수 없습니다.");

                const text = await response.text();
                secretContentArea.innerHTML = marked.parse(text);
            } catch (error) {
                secretContentArea.innerHTML = `<p style="color:red;">오류: ${file.path} 파일을 불러오지 못했습니다.</p>`;
            }

            if (window.innerWidth <= 768) {
                document.getElementById('content-area').scrollIntoView({ behavior: 'smooth' });
            }
        });

        btnGroup.appendChild(btn);
    });
}
