export function initModal() {
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
}
