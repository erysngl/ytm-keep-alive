/**
 * YTM Keep-Alive v1.2.0
 * Added: Gamification counter to track how many times the script blocked pauses.
 * Fixed: Background tab throttling issues by checking every second.
 */

(function () {
    if (document.getElementById('ytm-keep-alive-ui')) return;

    const ui = document.createElement('div');
    ui.id = 'ytm-keep-alive-ui';
    Object.assign(ui.style, {
        position: 'fixed', top: '100px', right: '20px', width: '180px',
        backgroundColor: 'rgb(29,29,29)', color: 'white', borderRadius: '8px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: '99999',
        fontFamily: 'Roboto, Arial, sans-serif', border: '1px solid rgb(51,51,51)'
    });

    const header = document.createElement('div');
    header.id = 'ytm-header';
    Object.assign(header.style, {
        cursor: 'move', background: 'rgb(33,33,33)', padding: '8px 12px',
        borderBottom: '1px solid rgb(51,51,51)', fontWeight: 'bold',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px 8px 0 0'
    });

    const titleSpan = document.createElement('span');
    const redDot = document.createElement('span');
    redDot.style.color = 'red';
    redDot.textContent = '● ';
    titleSpan.appendChild(redDot);
    titleSpan.appendChild(document.createTextNode('YTM Keep-Alive'));

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    Object.assign(closeBtn.style, { background: 'none', border: 'none', color: 'lightgray', cursor: 'pointer', fontSize: '16px' });
    header.appendChild(titleSpan);
    header.appendChild(closeBtn);

    const bodyDiv = document.createElement('div');
    Object.assign(bodyDiv.style, { padding: '15px', textAlign: 'center' });

    const statusDiv = document.createElement('div');
    statusDiv.id = 'ytm-status';
    Object.assign(statusDiv.style, { fontSize: '11px', marginBottom: '10px', color: 'rgb(15,157,88)' });
    statusDiv.textContent = 'Active: Monitoring';

    const timerDiv = document.createElement('div');
    Object.assign(timerDiv.style, { fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '5px' });
    timerDiv.textContent = '00:00';

    // Statistics / Gamification Counter Section
    const statsDiv = document.createElement('div');
    Object.assign(statsDiv.style, { fontSize: '12px', color: 'rgb(170,170,170)', marginTop: '8px', borderTop: '1px solid #333', paddingTop: '8px' });
    statsDiv.textContent = 'Prevented: 0';

    bodyDiv.appendChild(statusDiv);
    bodyDiv.appendChild(timerDiv);
    bodyDiv.appendChild(statsDiv);
    ui.appendChild(header);
    ui.appendChild(bodyDiv);
    document.body.appendChild(ui);

    let sec = 0;
    let blocks = 0; // Counter for prevented pauses
    const interval = setInterval(() => {
        sec++;
        let m = Math.floor(sec / 60);
        let s = sec - (m * 60);
        timerDiv.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);

        const btn = document.querySelector('ytmusic-you-there-renderer [dialog-confirm] button');
        if (btn) {
            btn.click();
            blocks++; // Increment the counter
            statsDiv.textContent = 'Prevented: ' + blocks; // Update the UI
            statusDiv.textContent = 'Pause Prevented!';
            setTimeout(() => statusDiv.textContent = 'Active: Monitoring', 3000);
        }

        // Nudge the scroll slightly to keep the browser active every minute
        if (s === 0) {
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        }
    }, 1000);

    closeBtn.onclick = () => { clearInterval(interval); ui.remove(); };

    // Drag and drop logic
    let p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    header.onmousedown = (e) => {
        p3 = e.clientX; p4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            p1 = p3 - e.clientX; p2 = p4 - e.clientY; p3 = e.clientX; p4 = e.clientY;
            ui.style.top = (ui.offsetTop - p2) + 'px'; ui.style.left = (ui.offsetLeft - p1) + 'px';
        };
    };
})();
