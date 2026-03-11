import { studyData, playbackSpeeds } from './data.js';

let currentSpeedIndex = 4;

export function initStudyMode() {
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
                allChapterItems.forEach((item) => item.classList.remove('active-chapter'));

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
            allChapterLists.forEach((list) => {
                if (list !== chapterList) list.classList.remove('active');
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
    const topBtn = document.getElementById('top-btn');
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
        audioPlayer.pause();
        audioSource.removeAttribute('src');
        audioPlayer.load();

        audioContainer.classList.add('hidden');
    }
}
