/**
 * YTM Keep-Alive v1.2.0
 * Added: Gamification counter to track how many times the script blocked pauses.
 * Fixed: Background tab throttling issues by checking every single second.
 * Fixed: Ghost button bug (Script now only clicks when the button is actually visible).
 * Fixed: Page Visibility API bypass to allow background auto-play to resume immediately.
 */

(function () {
    // 1. Prevent multiple instances
    if (document.getElementById('ytm-keep-alive-ui')) return;

    // 2. The Illusion Tactic: Blind the Page Visibility API
    // This forces YouTube to think the tab is always active and visible in the foreground.
    try {
        Object.defineProperty(document, 'visibilityState', { get: () => 'visible' });
        Object.defineProperty(document, 'hidden', { get: () => false });
        document.addEventListener('visibilitychange', (e) => e.stopImmediatePropagation(), true);
    } catch (e) {
        console.warn("YTM Keep-Alive: Could not override visibility state.", e);
    }

    // 3. UI Creation (Floating Panel)
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

    // 4. Core Logic: Aggressive Monitoring
    let sec = 0;
    let blocks = 0; // Counter for prevented pauses
    
    const interval = setInterval(() => {
        sec++;
        // Calculate minutes and seconds without the modulo (%) operator to avoid bookmarklet URL encoding issues
        let m = Math.floor(sec / 60);
        let s = sec - (m * 60);
        timerDiv.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);

        // Look for the specific confirmation button
        const btn = document.querySelector('ytmusic-you-there-renderer [dialog-confirm] button');
        
        // Check if the button exists AND is actually visible on the screen (Prevents ghost clicking)
        if (btn && btn.offsetWidth > 0) {
            btn.click(); // Dismiss the popup
            blocks++; // Increment the counter
            statsDiv.textContent = 'Prevented: ' + blocks; // Update the UI
            
            statusDiv.textContent = 'Pause Prevented!';
            statusDiv.style.color = '#ff0000';

            // Force play the media if the browser paused it in the background
            setTimeout(() => {
                const player = document.getElementById('movie_player');
                // Primary: Use YouTube's internal API to bypass standard DOM restrictions
                if (player && typeof player.playVideo === 'function') {
                    player.playVideo(); 
                } else {
                    // Fallback: Use standard HTML5 video API
                    const v = document.querySelector('video');
                    if (v && v.paused) {
                        v.play().catch(e => console.log('YTM Keep-Alive: Force play blocked.', e));
                    }
                }
            }, 500); // Wait 500ms for the UI to settle

            // Reset status text color after 3 seconds
            setTimeout(() => {
                statusDiv.textContent = 'Active: Monitoring';
                statusDiv.style.color = 'rgb(15,157,88)';
            }, 3000);
        }

        // Activity Nudge: Scroll slightly to prevent browser's deep sleep mode every minute
        if (s === 0) {
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
        }
    }, 1000);

    // Close button logic
    closeBtn.onclick = () => { clearInterval(interval); ui.remove(); };

    // 5. Drag and drop UI logic
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
