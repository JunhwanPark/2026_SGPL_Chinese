import { secretFiles } from './data.js';

let clickCount = 0;
let clickTimer;

export function initSecretMode() {
    const secretTrigger = document.getElementById('secret-trigger');

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

    const secretSidebarMenu = document.getElementById('secret-sidebar-menu');
    const secretContainer = document.getElementById('secret-container');

    secretSidebarMenu.classList.remove('hidden');
    secretContainer.classList.remove('hidden');
    renderSecretMenu();
}

function renderSecretMenu() {
    const secretSidebarMenu = document.getElementById('secret-sidebar-menu');
    const secretContentArea = document.getElementById('secret-content-area');

    secretSidebarMenu.innerHTML = `
        <div id="secret-btn-group" style="display: flex; flex-direction: column; gap: 8px;"></div>
    `;

    const btnGroup = document.getElementById('secret-btn-group');

    secretFiles.forEach((file) => {
        const btn = document.createElement('button');
        btn.className = 'vocab-filter-btn';
        btn.style.width = '100%';
        btn.textContent = file.title;

        btn.addEventListener('click', async () => {
            document.querySelectorAll('#secret-btn-group button').forEach((b) => {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            try {
                const response = await fetch(file.path);
                if (!response.ok) throw new Error('문서를 찾을 수 없습니다.');

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
