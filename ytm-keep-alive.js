/**
 * YTM Keep-Alive
 * A pure DOM bookmarklet to bypass YouTube Music's "Video paused" prompts.
 * Bypasses strict CSP and TrustedHTML by natively rendering elements.
 */

(function () {
    // Prevent multiple instances from loading
    if (document.getElementById('ytm-keep-alive-ui')) return;

    // 1. Create the Main UI Container
    const ui = document.createElement('div');
    ui.id = 'ytm-keep-alive-ui';
    Object.assign(ui.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        width: '180px',
        backgroundColor: 'rgb(29,29,29)',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        zIndex: '99999',
        fontFamily: 'Roboto, Arial, sans-serif',
        border: '1px solid rgb(51,51,51)'
    });

    // 2. Create the Header (Draggable Area)
    const header = document.createElement('div');
    header.id = 'ytm-header';
    Object.assign(header.style, {
        cursor: 'move',
        background: 'rgb(33,33,33)',
        padding: '8px 12px',
        borderBottom: '1px solid rgb(51,51,51)',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px 8px 0 0'
    });

    const titleSpan = document.createElement('span');
    Object.assign(titleSpan.style, { color: 'red', fontSize: '12px' });
    titleSpan.textContent = '● ';

    const titleText = document.createElement('span');
    Object.assign(titleText.style, { color: 'white' });
    titleText.textContent = 'YTM Keep-Alive';
    titleSpan.appendChild(titleText);

    const closeBtn = document.createElement('button');
    closeBtn.id = 'ytm-close';
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'lightgray',
        cursor: 'pointer',
        fontSize: '16px'
    });
    closeBtn.textContent = '×';

    header.appendChild(titleSpan);
    header.appendChild(closeBtn);

    // 3. Create the Body (Status and Timer)
    const bodyDiv = document.createElement('div');
    Object.assign(bodyDiv.style, { padding: '15px', textAlign: 'center' });

    const statusDiv = document.createElement('div');
    statusDiv.id = 'ytm-status';
    Object.assign(statusDiv.style, { fontSize: '11px', marginBottom: '10px', color: 'rgb(15,157,88)' });
    statusDiv.textContent = 'Active: Monitoring';

    const timerDiv = document.createElement('div');
    timerDiv.id = 'ytm-timer';
    Object.assign(timerDiv.style, { fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '5px' });
    timerDiv.textContent = '00:00';

    const infoDiv = document.createElement('div');
    Object.assign(infoDiv.style, { fontSize: '10px', color: 'gray' });
    infoDiv.textContent = 'Next trigger in 60s';

    bodyDiv.appendChild(statusDiv);
    bodyDiv.appendChild(timerDiv);
    bodyDiv.appendChild(infoDiv);

    ui.appendChild(header);
    ui.appendChild(bodyDiv);
    document.body.appendChild(ui);

    // 4. Timer & Popup Detection Logic
    let seconds = 0;
    const interval = setInterval(() => {
        seconds++;
        let m = Math.floor(seconds / 60);
        let s = seconds - (m * 60);
        timerDiv.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);

        // Every 60 seconds, check for the globally unified pause prompt
        if (s === 0) {
            const btn = document.querySelector('ytmusic-you-there-renderer [dialog-confirm] button');
            if (btn) {
                btn.click();
                statusDiv.textContent = 'Pause Prevented!';
                setTimeout(() => statusDiv.textContent = 'Active: Monitoring', 3000);
            }
            // Minor scroll to simulate user presence
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        }
    }, 1000);

    // 5. Close Button Event
    closeBtn.onclick = () => {
        clearInterval(interval);
        ui.remove();
    };

    // 6. Dragging Mechanism
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = (e) => {
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = (e) => {
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            ui.style.top = (ui.offsetTop - pos2) + "px";
            ui.style.left = (ui.offsetLeft - pos1) + "px";
        };
    };
})();
