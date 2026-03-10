// 각 기능별 모듈에서 필요한 함수를 불러옵니다.
import { initStudyMode } from './study.js';
import { initVocabMode, checkAndLoadVocab } from './vocab.js';
import { initModal } from './modal.js';
import { initSecretMode } from './secret.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. 각 모듈 초기화 실행
    initStudyMode();
    initVocabMode();
    initModal();
    initSecretMode();

    // 2. 모드 전환(탭) 로직
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

        if (document.getElementById('script-text').innerHTML.trim() !== '') {
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

        // 단어장 데이터가 없으면 불러오는 함수 실행 (vocab.js 에서 가져옴)
        checkAndLoadVocab();
    });
});
