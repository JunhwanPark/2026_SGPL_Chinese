// 학습 데이터 구조
const studyData = {
    "生活": {
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
    "会议": {
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
    "管理": {
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
    "交际": {
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
    // 나중에 파일이 늘어나면 여기에 파일 경로만 추가하시면 됩니다.
];

let allVocabData = []; // 여러 파일에서 읽어온 모든 단어를 담을 배열

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

            chapterItem.addEventListener('click', () => {
                const displayTitle = `【${subject}】${chapter}`;
                loadContent(displayTitle, studyData[subject][chapter]);
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
        audioContainer.classList.add('hidden');
    }
}

// ==========================================
// 단어장 모드 및 플래시카드 관련 로직
// ==========================================

const modeStudyBtn = document.getElementById('mode-study');
const modeVocabBtn = document.getElementById('mode-vocab');
const menuContainer = document.getElementById('menu-container');
const contentTitle = document.getElementById('content-title');
const audioContainer = document.getElementById('audio-container');
const scriptContainer = document.getElementById('script-container');
const vocabContainer = document.getElementById('vocab-container');
const sidebarTitle = document.getElementById('sidebar-title');

// '본문 학습' 버튼 클릭 시
modeStudyBtn.addEventListener('click', () => {
    modeStudyBtn.classList.add('active');
    modeVocabBtn.classList.remove('active');

    // 목차 표시 및 본문 영역 복구
    sidebarTitle.textContent = "목차";
    menuContainer.style.display = 'block';
    vocabContainer.classList.add('hidden');
    contentTitle.style.display = 'block';

    // 이전에 선택해둔 본문이 있다면 다시 보여줌
    if (document.getElementById('script-text').innerHTML !== "") {
        scriptContainer.classList.remove('hidden');
        if (document.getElementById('audio-source').src) {
            audioContainer.classList.remove('hidden');
        }
    }
});

// '단어장 연습' 버튼 클릭 시
modeVocabBtn.addEventListener('click', () => {
    modeVocabBtn.classList.add('active');
    modeStudyBtn.classList.remove('active');

    // 목차 숨기고 단어장 영역 표시
    sidebarTitle.textContent = "단어장 메뉴";
    menuContainer.style.display = 'none';
    contentTitle.style.display = 'none';
    audioContainer.classList.add('hidden');
    scriptContainer.classList.add('hidden');
    vocabContainer.classList.remove('hidden');

    // 단어 데이터가 비어있으면 파일에서 불러오기
    if (allVocabData.length === 0) {
        loadAllVocabAndDraw();
    }
});

// 여러 개의 텍스트 파일에서 단어를 불러와 하나로 합치는 함수
async function loadAllVocabAndDraw() {
    allVocabData = []; // 초기화

    for (const file of vocabFiles) {
        try {
            const response = await fetch(file);
            if (response.ok) {
                const text = await response.text();
                // 줄바꿈 기준으로 분리
                const lines = text.split('\n');

                lines.forEach(line => {
                    // 빈 줄 무시
                    if (line.trim() !== '') {
                        // ' / ' 를 기준으로 단어/병음/뜻 분리
                        const parts = line.split(' / ');
                        if (parts.length >= 3) {
                            // 정규식을 사용하여 맨 앞의 '숫자 + 마침표 + 공백'을 제거합니다. (예: "1. 参观" -> "参观")
                            let pureWord = parts[0].trim().replace(/^\d+\.\s*/, '');

                            allVocabData.push({
                                word: pureWord,
                                pinyin: parts[1].trim(),
                                meaning: parts[2].trim()
                            });
                        }
                    }
                });
            }
        } catch (error) {
            console.error(`단어장 파일 로드 실패 (${file}):`, error);
        }
    }

    // 데이터를 모두 불러온 후 10개 랜덤 뽑기 실행
    drawRandomVocab();
}

// 랜덤으로 10개를 뽑아 화면에 카드로 만드는 함수
function drawRandomVocab() {
    const grid = document.getElementById('flashcard-grid');
    grid.innerHTML = ''; // 기존 카드 지우기

    if (allVocabData.length === 0) {
        grid.innerHTML = '<p>단어장 데이터를 불러오지 못했습니다. txt 파일 경로와 형식을 확인해 주세요.</p>';
        return;
    }

    // 전체 단어 배열을 무작위로 섞기 (Fisher-Yates 알고리즘 응용)
    const shuffled = [...allVocabData].sort(() => 0.5 - Math.random());
    // 섞은 배열에서 10개만 추출 (단어가 10개 미만이면 있는 만큼만 추출)
    const selected = shuffled.slice(0, 10);

    selected.forEach(item => {
        const card = document.createElement('div');
        card.className = 'flashcard';

        // 카드 안의 HTML 구성
        card.innerHTML = `
            <div class="fc-word">${item.word}</div>
            <div class="fc-pinyin">${item.pinyin}</div>
            <div class="fc-meaning">${item.meaning}</div>
        `;

        // 마우스 누르거나 화면을 터치할 때 뜻 보여주기
        card.addEventListener('pointerdown', () => {
            card.classList.add('flipped');
        });

        // 마우스/터치를 떼거나 카드 밖으로 손(마우스)이 벗어나면 다시 숨기기
        card.addEventListener('pointerup', () => {
            card.classList.remove('flipped');
        });
        card.addEventListener('pointerleave', () => {
            card.classList.remove('flipped');
        });
        card.addEventListener('pointercancel', () => {
            card.classList.remove('flipped');
        });

        // 모바일에서 길게 눌렀을 때 복사 메뉴(컨텍스트 메뉴)가 뜨는 것 방지
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        grid.appendChild(card);
    });
}

// '새로운 단어 뽑기' 버튼 클릭 이벤트
document.getElementById('refresh-vocab-btn').addEventListener('click', drawRandomVocab);
