function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null;
}

function createAIButton() {
    const button = document.createElement("button"); // ✅ use button instead of div
    button.type = "button";
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply';
    button.innerHTML = 'AI Reply';
    button.style.marginRight = '8px';
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }
    return '';
}

function insertButton() {
    const existBtn = document.querySelector(".ai-reply");
    if (existBtn) return; // don't keep adding

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found in Gmail");
    const button = createAIButton();
    toolbar.insertBefore(button, toolbar.firstChild);

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            console.log(emailContent);

            const response = await fetch('http://localhost:8080/api/email/v1/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: emailContent, tone: "professional" })
            });

            if (!response.ok) throw new Error('API Request Failed');

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box was not found');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });
}

console.log("js activated");

// MutationObserver
const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
        const addedNodes = Array.from(m.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [data-tooltip="Pop-out reply"]') ||
             node.querySelector('.aDh, .btC, [data-tooltip="Pop-out reply"]'))
        );
        if (hasComposeElements) {
            console.log("compose detected");
            setTimeout(insertButton, 500); // ✅ only once per detection
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
