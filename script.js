// 학습 데이터 구조
const studyData = {
    "生活": {
        "第一课 用餐": {
            mdFile: "data/shenghua_yongchan.md",
            audioFile: "audio/shenghua_yongchan.mp3"
        },
        "단원 1: 인사하기 - 소단원 2": {
            mdFile: "data/s1-c1-sub2.md",
            audioFile: "audio/s1-c1-sub2.mp3"
        }
    }
    // 동일한 방식으로 추가
};

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

    if (fileData.audioFile) {
        audioSource.src = fileData.audioFile;
        audioPlayer.load();
        audioContainer.classList.remove('hidden');
    } else {
        audioContainer.classList.add('hidden');
    }
}
