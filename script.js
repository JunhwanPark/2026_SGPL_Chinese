// 학습 데이터 구조
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
];

let allVocabData = [];
let vocabByFile = [];
let currentVocabPool = [];

// 지원할 속도 목록
const playbackSpeeds = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5];
let currentSpeedIndex = 4; // 기본값 1.0

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
                // 기존에 강조된 모든 단원의 강조 효과(.active-chapter) 제거
                const allChapterItems = document.querySelectorAll('.chapter-list li');
                allChapterItems.forEach(item => {
                    item.classList.remove('active-chapter');
                });

                // 지금 클릭한 단원에만 강조 효과를 추가
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
            // 1. 화면에 있는 모든 단원 리스트(.chapter-list)를 찾습니다.
            const allChapterLists = document.querySelectorAll('.chapter-list');

            // 2. 모든 리스트를 순회하면서, 현재 클릭한 과목의 리스트가 아닌 것은 모두 닫습니다.
            allChapterLists.forEach(list => {
                if (list !== chapterList) {
                    list.classList.remove('active');
                }
            });

            // 3. 마지막으로 현재 클릭한 과목의 리스트만 열기/닫기를 토글합니다.
            chapterList.classList.toggle('active');
        });

        subjectDiv.appendChild(subjectTitle);
        subjectDiv.appendChild(chapterList);
        menuContainer.appendChild(subjectDiv);
    }

    // 속도 조절 버튼 이벤트 설정
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

    // --- Top 버튼 스크롤 이벤트 및 클릭 동작 추가 ---
    const topBtn = document.getElementById("top-btn");

    // 화면을 스크롤할 때마다 실행
    window.addEventListener('scroll', () => {
        // 화면이 위에서부터 150px 이상 내려오면 버튼 표시, 아니면 숨김
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    // Top 버튼 클릭 시 맨 위로 부드럽게 이동
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 스크롤이 뚝 끊기지 않고 부드럽게 올라가도록 설정
        });
    });
});

async function loadContent(title, fileData) {
    document.getElementById('content-title').textContent = title;
    const scriptContainer = document.getElementById('script-container');
    const scriptElement = document.getElementById('script-text');

    // 1. 마크다운 파일 불러오기 및 변환
    try {
        const response = await fetch(fileData.mdFile);
        if (!response.ok) throw new Error('파일을 찾을 수 없습니다.');

        const markdownText = await response.text();

        // marked.js를 사용하여 마크다운을 HTML로 변환 (.innerHTML 사용)
        scriptElement.innerHTML = marked.parse(markdownText);
        scriptContainer.classList.remove('hidden');

    } catch (error) {
        console.error('텍스트 로드 실패:', error);
        scriptElement.innerHTML = `<p style="color:red;">파일을 불러오는데 실패했습니다.<br>경로: ${fileData.mdFile}</p>`;
        scriptContainer.classList.remove('hidden');
    }

    // 2. 오디오 업데이트
    const audioContainer = document.getElementById('audio-container');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const speedDisplay = document.getElementById('speed-display');

    if (fileData.audioFile) {
        audioSource.src = fileData.audioFile;
        audioPlayer.load();

        // 단원을 이동할 때마다 재생 속도를 1.0x로 초기화
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
// 단어장 모드 및 플래시카드 관련 로직
// ==========================================

const modeStudyBtn = document.getElementById('mode-study');
const modeVocabBtn = document.getElementById('mode-vocab');
const menuContainer = document.getElementById('menu-container');
const vocabMenuContainer = document.getElementById('vocab-menu-container');
const contentTitle = document.getElementById('content-title');
const audioContainer = document.getElementById('audio-container');
const scriptContainer = document.getElementById('script-container');
const vocabContainer = document.getElementById('vocab-container');

// '본문 학습' 버튼 클릭 시
modeStudyBtn.addEventListener('click', () => {
    modeStudyBtn.classList.add('active');
    modeVocabBtn.classList.remove('active');

    // 본문 목차 켜고, 단어장 목차 숨기기
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

    // 👇 [추가됨] 비밀 모드 흔적 완벽히 지우기
    const secretSidebar = document.getElementById('secret-sidebar-menu');
    const secretContent = document.getElementById('secret-container');
    if (secretSidebar) secretSidebar.classList.add('hidden');
    if (secretContent) secretContent.classList.add('hidden');
});

// '단어장 연습' 버튼 클릭 시
modeVocabBtn.addEventListener('click', () => {
    modeVocabBtn.classList.add('active');
    modeStudyBtn.classList.remove('active');

    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer) audioPlayer.pause();

    // 본문 목차 숨기고, 단어장 목차 켜기
    menuContainer.style.display = 'none';
    vocabMenuContainer.classList.remove('hidden');

    contentTitle.style.display = 'none';
    audioContainer.classList.add('hidden');
    scriptContainer.classList.add('hidden');
    vocabContainer.classList.remove('hidden');

    // 👇 [추가됨] 비밀 모드 흔적 완벽히 지우기
    const secretSidebar = document.getElementById('secret-sidebar-menu');
    const secretContent = document.getElementById('secret-container');
    if (secretSidebar) secretSidebar.classList.add('hidden');
    if (secretContent) secretContent.classList.add('hidden');

    if (allVocabData.length === 0) {
        loadAllVocabAndDraw();
    }
});

// 데이터를 불러오고 파일별로 분류하는 함수
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
            } catch (error) { console.error('파일 읽기 오류:', error); }
        }
        vocabByFile.push(fileVocab);
    }

    currentVocabPool = allVocabData;
    renderVocabMenu(); // 👈 목차 생성 함수 호출
    drawRandomVocab();
}

// 1, 2, 3... 번호 버튼을 화면에 그리는 함수
function renderVocabMenu() {
    if (!vocabMenuContainer) return;
    vocabMenuContainer.innerHTML = '';

    // 버튼들을 담을 가로 정렬 박스
    const filterDiv = document.createElement('div');
    filterDiv.className = 'vocab-filter-container';

    // 1. '전체' 버튼 생성
    const allBtn = document.createElement('button');
    allBtn.className = 'vocab-filter-btn active';
    allBtn.textContent = '전체';
    allBtn.addEventListener('click', () => {
        setActiveVocabBtn(allBtn);
        currentVocabPool = allVocabData;
        drawRandomVocab();
        scrollToContent(); // 모바일 자동 스크롤
    });
    filterDiv.appendChild(allBtn);

    // 2. 텍스트 파일 개수만큼 '1, 2, 3...' 숫자 버튼 생성
    vocabFiles.forEach((_, index) => {
        if (vocabByFile[index].length === 0) return;

        const btn = document.createElement('button');
        btn.className = 'vocab-filter-btn';
        btn.textContent = `${index + 1}`; // 글씨 대신 깔끔하게 숫자만 넣습니다
        btn.addEventListener('click', () => {
            setActiveVocabBtn(btn);
            currentVocabPool = vocabByFile[index];
            drawRandomVocab();
            scrollToContent(); // 모바일 자동 스크롤
        });
        filterDiv.appendChild(btn);
    });

    vocabMenuContainer.appendChild(filterDiv);
}

function setActiveVocabBtn(clickedBtn) {
    document.querySelectorAll('.vocab-filter-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
}

// 모바일 환경에서 클릭 시 콘텐츠 영역으로 부드럽게 스크롤하는 함수
function scrollToContent() {
    if (window.innerWidth <= 768) {
        document.getElementById('content-area').scrollIntoView({ behavior: 'smooth' });
    }
}

// 랜덤으로 10개를 뽑아 화면에 카드로 만드는 함수
function drawRandomVocab() {
    const grid = document.getElementById('flashcard-grid');
    grid.innerHTML = '';

    // 기존의 allVocabData 대신 currentVocabPool을 검사하고 사용합니다
    if (currentVocabPool.length === 0) {
        grid.innerHTML = '<p>단어장 데이터가 없습니다.</p>';
        return;
    }

    // 중복 제거 작업
    const uniqueVocabMap = new Map();
    currentVocabPool.forEach(item => {
        uniqueVocabMap.set(item.word, item);
    });
    const uniqueVocabData = Array.from(uniqueVocabMap.values());

    // 섞어서 10개 추출
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

        // 모바일 터치 처리 로직
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

// '새로운 단어 뽑기' 버튼 클릭 이벤트
document.getElementById('refresh-vocab-btn').addEventListener('click', drawRandomVocab);

// ==========================================
// 위챗 연락처 팝업(모달) 로직
// ==========================================
const wechatLink = document.getElementById('wechat-link');
const wechatModal = document.getElementById('wechat-modal');
const closeModal = document.getElementById('close-modal');

// 이름 클릭 시 모달 열기
wechatLink.addEventListener('click', (e) => {
    e.preventDefault(); // 링크 클릭 시 페이지 맨 위로 튕기는 기본 현상 방지
    wechatModal.classList.remove('hidden');
});

// X 버튼 클릭 시 모달 닫기
closeModal.addEventListener('click', () => {
    wechatModal.classList.add('hidden');
});

// 팝업 창 바깥의 어두운 배경을 클릭해도 닫히게 만들기
wechatModal.addEventListener('click', (e) => {
    if (e.target === wechatModal) {
        wechatModal.classList.add('hidden');
    }
});

// ID 복사하기 기능
const copyIdBtn = document.getElementById('copy-id-btn');
const wechatIdText = document.getElementById('wechat-id');

copyIdBtn.addEventListener('click', async () => {
    try {
        // 클립보드에 텍스트 복사
        await navigator.clipboard.writeText(wechatIdText.innerText);

        // 버튼 글씨와 색상을 '복사 완료' 상태로 변경
        const originalText = copyIdBtn.innerText;
        copyIdBtn.innerText = '✅ 복사 완료!';
        copyIdBtn.classList.add('copied');

        // 2초(2000ms) 뒤에 원래 버튼 상태로 복구
        setTimeout(() => {
            copyIdBtn.innerText = originalText;
            copyIdBtn.classList.remove('copied');
        }, 2000);

    } catch (err) {
        // 구형 브라우저나 보안 설정으로 인해 복사가 실패할 경우
        console.error('복사 실패:', err);
        alert('복사를 지원하지 않는 환경입니다. 위챗 ID를 직접 드래그해서 복사해 주세요.');
    }
});

// ==========================================
// 🔒 이스터에그: 나만의 비밀 노트 로직
// ==========================================
const secretTrigger = document.getElementById('secret-trigger');
const secretContainer = document.getElementById('secret-container');
const secretSidebarMenu = document.getElementById('secret-sidebar-menu'); // 👈 사이드바 ID로 변경
const secretContentArea = document.getElementById('secret-content-area');

// 비밀 노트 파일 목록 (원하시는 마크다운 파일 경로를 적어주세요)
const secretFiles = [
    { title: "2026-03-04 복습", path: "secret/2026-03-04.md" },
    { title: "2026-03-05 복습", path: "secret/2026-03-05.md" },
    { title: "2026-03-06 복습", path: "secret/2026-03-06.md" },
];

let clickCount = 0;
let clickTimer;

if (secretTrigger) {
    secretTrigger.addEventListener('click', () => {
        clickCount++;

        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 500);

        // 👇 5번 연속 클릭 시 암호 묻지 않고 바로 진입!
        if (clickCount === 5) {
            clickCount = 0;
            openSecretMode();
        }
    });
}

// 비밀 모드 열기
function openSecretMode() {
    // 기존 학습 목차들 숨기기
    document.getElementById('menu-container').style.display = 'none';
    const vocabMenu = document.getElementById('vocab-menu-container');
    if (vocabMenu) vocabMenu.classList.add('hidden');

    // 기존 본문 콘텐츠 숨기기
    document.getElementById('content-title').style.display = 'none';
    document.getElementById('audio-container').classList.add('hidden');
    document.getElementById('script-container').classList.add('hidden');
    document.getElementById('vocab-container').classList.add('hidden');

    // 👇 비밀 목차(사이드바)와 비밀 영역 켜기
    secretSidebarMenu.classList.remove('hidden');
    secretContainer.classList.remove('hidden');
    renderSecretMenu();
}

// 비밀 노트 버튼 생성 (사이드바에 세로로 배치)
function renderSecretMenu() {
    // 사이드바 전용 제목과 버튼 그룹 추가
    secretSidebarMenu.innerHTML = `
        <div id="secret-btn-group" style="display: flex; flex-direction: column; gap: 8px;"></div>
    `;

    const btnGroup = document.getElementById('secret-btn-group');

    secretFiles.forEach(file => {
        const btn = document.createElement('button');
        btn.className = 'vocab-filter-btn';
        btn.style.width = '100%'; // 사이드바 너비에 맞게 꽉 채움
        btn.textContent = file.title;

        btn.addEventListener('click', async () => {
            // 버튼 하이라이트 효과
            document.querySelectorAll('#secret-btn-group button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 마크다운 파일 불러오기
            try {
                const response = await fetch(file.path);
                if (!response.ok) throw new Error("문서를 찾을 수 없습니다.");
                const text = await response.text();
                secretContentArea.innerHTML = marked.parse(text);
            } catch (error) {
                secretContentArea.innerHTML = `<p style="color:red;">오류: ${file.path} 파일을 불러오지 못했습니다.</p>`;
            }

            // 👇 모바일 환경에서 목록 클릭 시 본문으로 자동 스크롤
            if (window.innerWidth <= 768) {
                document.getElementById('content-area').scrollIntoView({ behavior: 'smooth' });
            }
        });

        btnGroup.appendChild(btn);
    });
}
