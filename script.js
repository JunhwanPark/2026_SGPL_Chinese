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
    }
    // 동일한 방식으로 추가
};

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
                loadContent(chapter, studyData[subject][chapter]);
            });

            chapterList.appendChild(chapterItem);
        }

        subjectTitle.addEventListener('click', () => {
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
