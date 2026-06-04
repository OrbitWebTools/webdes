/**
 * WebDes Promotional Engine script.js
 * Powered by pure Vanilla JS, requestAnimationFrame and high-trust micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SAFE CONFIGURATION VALUE SYNCS
  const getConf = () => {
    // Return window.CONFIG if defined, with standard fallback values
    return window.CONFIG || {
      phone: "+91 6291192742",
      email: "contact.webdesai@gmail.com",
      upi_id: "6291192742@kotakbank",
      qr_image: "./qr-code.png",
      render_webhook_url: ""
    };
  };

  const syncConfigToDOM = () => {
    const config = getConf();
    
    // Header connection signal label
    const topBar = document.getElementById('top-connection-bar');
    if (topBar) {
      topBar.style.width = '100%';
    }

    // Embed to footer contact endpoints
    const phoneFooter = document.getElementById('contact-phone-footer');
    if (phoneFooter) {
      phoneFooter.textContent = config.phone;
      phoneFooter.href = `https://wa.me/${config.phone.replace(/[^0-9]/g, '')}`;
    }

    const emailFooter = document.getElementById('contact-email-footer');
    if (emailFooter) {
      emailFooter.textContent = config.email;
      emailFooter.href = `mailto:${config.email}`;
    }

    const upiFooter = document.getElementById('upi-val-footer');
    if (upiFooter) {
      upiFooter.textContent = config.upi_id;
    }

    // Embed config to checkout label
    const checkUpiId = document.getElementById('checkout-upi-id-label');
    if (checkUpiId) {
      checkUpiId.textContent = config.upi_id;
    }

    // Update webhook API validation status in debug panels
    const webStatus = document.getElementById('webhook-val-label');
    if (webStatus) {
      webStatus.textContent = config.render_webhook_url ? "LIVE WEBHOOK CHANNEL" : "STANDBY (LOCAL CAPTURE)";
      if (config.render_webhook_url) {
        webStatus.className = "text-[#25D366] font-bold";
      }
    }
  };

  syncConfigToDOM();


  // ==========================================
  // 2. ORGANIC WANDERING ANIMALS WITH MOUSE DODGING
  // ==========================================
  const container = document.getElementById('wandering-container');
  const ANIMAL_TEMPLATES = [
    // Beautiful WhatsApp Green Flying Butterfly SVG with wings
    {
      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="45" height="45">
          <g class="creature-wings">
            <path d="M50,50 C55,35 75,15 88,18 C100,21 100,42 90,52 C82,60 62,60 50,54 Z" fill="#25D366" opacity="0.9"/>
            <path d="M50,50 C38,35 18,15 5,18 C-7,21 -7,42 3,52 C11,60 31,60 50,54 Z" fill="#1ebd50" opacity="0.9"/>
            <path d="M50,50 C55,60 68,78 78,78 C88,78 95,68 88,60 C82,53 68,54 50,50 Z" fill="#128C7E" opacity="0.8"/>
            <path d="M50,50 C38,60 25,78 15,78 C5,78 -2,68 5,60 C11,53 25,54 50,50 Z" fill="#075E54" opacity="0.8"/>
          </g>
          <ellipse cx="50" cy="50" rx="2" ry="12" fill="#111"/>
          <line x1="50" y1="38" x2="43" y2="25" stroke="#111" stroke-width="1.2"/>
          <line x1="50" y1="38" x2="57" y2="25" stroke="#111" stroke-width="1.2"/>
        </svg>
      `,
      flapClass: 'flapping'
    },
    // Realistic Gold & Charcoal Honeybee SVG
    {
      svg: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="38" height="38">
          <ellipse cx="50" cy="50" rx="15" ry="11" fill="#FFD700"/>
          <!-- Black stripes -->
          <path d="M42,39.5 Q42,60.5 42,61 L46,61 Q46,39.5 46,39 Z" fill="#121B22"/>
          <path d="M52,39 Q52,61 52,61 L56,61 Q56,39 56,39 Z" fill="#121B22"/>
          <!-- Wings with flapping animation wrapper -->
          <g class="creature-wings-slow">
            <ellipse cx="38" cy="34" rx="7" ry="14" fill="#ADD8E6" opacity="0.75" transform="rotate(-30, 38, 34)"/>
            <ellipse cx="62" cy="34" rx="7" ry="14" fill="#ADD8E6" opacity="0.75" transform="rotate(30, 62, 34)"/>
          </g>
          <circle cx="50" cy="50" r="3" fill="#111"/>
        </svg>
      `
    }
  ];

  const creatures = [];
  const numCreatures = 6;
  let mouseX = -1000;
  let mouseY = -1000;

  // Track global mousemove
  window.addEventListener('mousemove', (e) => {
    // Keep coordinates relative to full document scroll
    mouseX = e.pageX;
    mouseY = e.pageY;
  });

  // Create animals
  if (container) {
    for (let i = 0; i < numCreatures; i++) {
      const template = ANIMAL_TEMPLATES[i % ANIMAL_TEMPLATES.length];
      const el = document.createElement('div');
      el.className = 'wandering-creature';
      el.innerHTML = template.svg;
      container.appendChild(el);

      // Start position distributed randomly inside view
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * (window.innerHeight - 300) + 100;

      creatures.push({
        element: el,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseSpeed: Math.random() * 0.8 + 0.6,
        radius: 35,
        dodgeTimer: 0,
        angle: 0
      });
    }
  }

  // Update loop for smooth RequestAnimationFrame continuous movement
  const updateWanderingEngine = () => {
    const docWidth = document.documentElement.scrollWidth || window.innerWidth;
    const docHeight = document.documentElement.scrollHeight || window.innerHeight;

    creatures.forEach((c) => {
      // Calculate cursor proximity
      const dx = c.x - mouseX;
      const dy = c.y - mouseY;
      const dist = Math.hypot(dx, dy);

      // DODGING SENSOR CRITICAL LOGIC
      if (dist < 130) {
        // High alert force vector directing directly away from mouse position
        const forceX = dx / dist;
        const forceY = dy / dist;
        
        // Acceleration spike boost
        c.vx += forceX * 1.5;
        c.vy += forceY * 1.5;
        c.dodgeTimer = 25; // Speed multiplier decays slowly over frames
      } else if (c.dodgeTimer > 0) {
        c.dodgeTimer--;
      } else {
        // Normal organic drifting adjustment: add slight random heading changes
        c.vx += (Math.random() - 0.5) * 0.15;
        c.vy += (Math.random() - 0.5) * 0.15;

        // Force gentle deceleration toward core baseSpeed parameter
        const currentSpeed = Math.hypot(c.vx, c.vy);
        if (currentSpeed > c.baseSpeed) {
          c.vx *= 0.95;
          c.vy *= 0.95;
        } else if (currentSpeed < 0.2) {
          c.vx = (Math.random() - 0.5) * c.baseSpeed;
          c.vy = (Math.random() - 0.5) * c.baseSpeed;
        }
      }

      // Bound velocity maximums
      const maxSpeed = c.dodgeTimer > 0 ? 12 : 3;
      const speed = Math.hypot(c.vx, c.vy);
      if (speed > maxSpeed) {
        c.vx = (c.vx / speed) * maxSpeed;
        c.vy = (c.vy / speed) * maxSpeed;
      }

      // Update actual logical coords
      c.x += c.vx;
      c.y += c.vy;

      // Wrap boundaries smoothly relative to fully loaded document constraints
      if (c.x < -c.radius) c.x = docWidth + c.radius;
      if (c.x > docWidth + c.radius) c.x = -c.radius;
      if (c.y < -c.radius) c.y = docHeight + c.radius;
      if (c.y > docHeight + c.radius) c.y = -c.radius;

      // Derive physical rotation angle based on heading vector
      const targetAngle = Math.atan2(c.vy, c.vx) * (180 / Math.PI) + 90;
      // Linear lerp for rotation smoothing
      c.angle += (targetAngle - c.angle) * 0.1;

      // Apply physical transforms
      const transformString = `translate3d(${c.x}px, ${c.y}px, 0) rotate(${c.angle}deg) ${c.dodgeTimer > 0 ? 'scale(1.25)' : 'scale(1)'}`;
      c.element.style.transform = transformString;
      c.element.style.opacity = c.dodgeTimer > 0 ? '1' : '0.85';
    });

    requestAnimationFrame(updateWanderingEngine);
  };

  if (creatures.length > 0) {
    updateWanderingEngine();
  }


  // ==========================================
  // 3. INTERACTIVE BOT SANDBOX WORKSPACE
  // ==========================================
  
  // Tabs Navigation
  const btnRules = document.getElementById('tab-rules');
  const btnBroadcast = document.getElementById('tab-broadcast');
  const btnIntegrations = document.getElementById('tab-integrations');

  const panelRules = document.getElementById('panel-rules');
  const panelBroadcast = document.getElementById('panel-broadcast');
  const panelIntegrations = document.getElementById('panel-integrations');

  const switchTab = (activeBtn, activePanel) => {
    // Reset buttons
    [btnRules, btnBroadcast, btnIntegrations].forEach(btn => {
      if (btn) {
        btn.className = "py-2.5 px-1 rounded-xl transition-all duration-300 cursor-pointer text-slate-500 hover:text-slate-800";
      }
    });
    // Set active button
    if (activeBtn) {
      activeBtn.className = "py-2.5 px-1 rounded-xl transition-all duration-300 cursor-pointer bg-white text-slate-950 shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-slate-200/30";
    }

    // Reset panels
    [panelRules, panelBroadcast, panelIntegrations].forEach(p => {
      if (p) {
        p.classList.add('hidden');
      }
    });
    // Show active panel
    if (activePanel) {
      activePanel.classList.remove('hidden');
    }
  };

  if (btnRules) btnRules.addEventListener('click', () => switchTab(btnRules, panelRules));
  if (btnBroadcast) btnBroadcast.addEventListener('click', () => switchTab(btnBroadcast, panelBroadcast));
  if (btnIntegrations) btnIntegrations.addEventListener('click', () => switchTab(btnIntegrations, panelIntegrations));

  // AutoBot Rules Predefined Data Set
  const AUTOBOT_RULES = [
    {
      id: 1,
      keyword: "pricing",
      desc: "Trigger when leads ask for standard prices",
      messages: [
        { sender: "user", text: "Hey! Can you send me the pricing for WebDes plans?" },
        { sender: "bot", text: "Welcome! Here are our operational pipelines:\n\n• Professional Growth: ₹4,100/mo (5 Active Rules)\n• Infinite Scale: ₹12,500/mo (Unlimited Scale)\n\nWhich subscription node matching your requirements?" }
      ]
    },
    {
      id: 2,
      keyword: "demo",
      desc: "Triggers on instant Sandbox validation hooks",
      messages: [
        { sender: "user", text: "I want a dynamic demo of the system!" },
        { sender: "bot", text: "Sandbox initial validation activated! Checking client nodes... ✓ All lines clear. Your workspace auto-responder is fully operational." }
      ]
    },
    {
      id: 3,
      keyword: "support",
      desc: "Emergency support or SLA query matcher",
      messages: [
        { sender: "user", text: "How fast is critical webhook support?" },
        { sender: "bot", text: "Infinite Scale subscribers get VIP technical priority, answering payload failures in less than 45 seconds! Professional Scale reply SLA is 12 hours." }
      ]
    }
  ];

  let selectedRuleId = 1;

  const terminalLogs = document.getElementById('system-terminal-logs');
  const chatBubbleContainer = document.getElementById('simulated-chat-bubbles');
  const chatPlaceholder = document.getElementById('chat-idle-placeholder');
  const typingBubble = document.getElementById('sim-typing-bubble');
  const liveTicker = document.getElementById('live-feed-ticker');

  // Generate Rules selectors on the left column
  const rulesListContainer = document.getElementById('rules-list-container');
  
  const appendConsoleLog = (text, status = 'info') => {
    if (!terminalLogs) return;
    const span = document.createElement('span');
    span.className = 'block';
    
    const time = new Date().toLocaleTimeString();
    if (status === 'success') {
      span.className += ' text-emerald-555 font-bold';
      span.textContent = `[${time}] ✓ ${text}`;
    } else if (status === 'error') {
      span.className += ' text-rose-500 font-bold';
      span.textContent = `[${time}] 🚨 Error: ${text}`;
    } else if (status === 'user') {
      span.className += ' text-indigo-400';
      span.textContent = `[${time}] → OUTBOUND: ${text}`;
    } else if (status === 'bot') {
      span.className += ' text-emerald-400 font-medium font-mono';
      span.textContent = `[${time}] ← INBOUND_AUTO_RESPONDER: ${text}`;
    } else {
      span.className += ' text-slate-500';
      span.textContent = `[${time}] ⚙️ ${text}`;
    }

    terminalLogs.appendChild(span);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  };

  const appendTickerActivity = (actionText, contactCode) => {
    if (!liveTicker) return;
    const div = document.createElement('div');
    div.className = 'flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800/40';
    div.innerHTML = `
      <span class="text-slate-500">${contactCode}</span>
      <span class="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">${actionText}</span>
    `;
    liveTicker.insertBefore(div, liveTicker.firstChild);
    
    // Cap lines inside feed for high cleanliness
    if (liveTicker.children.length > 5) {
      liveTicker.removeChild(liveTicker.lastChild);
    }
  };

  const drawRulesDOM = () => {
    if (!rulesListContainer) return;
    rulesListContainer.innerHTML = '';

    AUTOBOT_RULES.forEach((rule) => {
      const active = rule.id === selectedRuleId;
      const item = document.createElement('button');
      item.className = `w-full text-left p-3.5 rounded-xl border transition-all text-xs flex justify-between items-center cursor-pointer ${
        active 
          ? 'bg-amber-50/15 border-[#25D366] text-slate-900 shadow-sm shadow-[#25D366]/5 font-bold bg-[#dcf8c6]/10' 
          : 'bg-slate-50/50 border-slate-200/50 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`;

      item.innerHTML = `
        <div>
          <div class="flex items-center gap-1.5 font-bold font-mono">
            <span class="text-[#25D366]">#</span>
            <span>keyword: "${rule.keyword}"</span>
          </div>
          <p class="text-[10px] text-slate-400 font-normal mt-0.5 leading-tight">${rule.desc}</p>
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}"></div>
      `;

      item.addEventListener('click', () => {
        selectedRuleId = rule.id;
        drawRulesDOM();
        appendConsoleLog(`Swapped active matcher configuration node to keyword: "${rule.keyword}"`);
      });

      rulesListContainer.appendChild(item);
    });
  };

  drawRulesDOM();

  // Handle Dynamic Campaigns simulations
  const btnTriggerBroadcast = document.getElementById('btn-trigger-broadcast');
  const broadcastBar = document.getElementById('broadcast-bar');
  const broadcastPercentage = document.getElementById('broadcast-percentage');

  if (btnTriggerBroadcast) {
    btnTriggerBroadcast.addEventListener('click', () => {
      btnTriggerBroadcast.disabled = true;
      btnTriggerBroadcast.textContent = "Broadcasting data arrays...";
      btnTriggerBroadcast.className = "w-full py-3.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold tracking-wide uppercase cursor-not-allowed flex items-center justify-center gap-2";
      
      appendConsoleLog("Queue initialized for Omni-Broadcast target segment.");
      appendConsoleLog("Firing multi-thread serverless channel loops...");

      let percent = 0;
      const interval = setInterval(() => {
        percent += 5;
        if (broadcastBar) broadcastBar.style.width = `${percent}%`;
        if (broadcastPercentage) broadcastPercentage.textContent = `${percent}%`;

        if (percent % 20 === 0) {
          const fakeNo = `+91 98322-${Math.floor(Math.random() * 90000 + 10000)}`;
          appendConsoleLog(`Packet dispatch success to standard phone node ${fakeNo}`, 'success');
          appendTickerActivity("Campaign Delivered ✓", fakeNo);
        }

        if (percent >= 100) {
          clearInterval(interval);
          appendConsoleLog("Campaign dispatch successfully finalized. 100% SLA compliance achieved.", "success");
          
          btnTriggerBroadcast.disabled = false;
          btnTriggerBroadcast.className = "w-full py-3.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebd50] tracking-wide uppercase shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer";
          btnTriggerBroadcast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            <span>Deploy Broadcast Campaign</span>
          `;
        }
      }, 150);
    });
  }

  // Handle Smartphone playback simulation triggers
  const btnRunSim = document.getElementById('btn-run-simulation');
  const btnResetSim = document.getElementById('btn-reset-simulation');
  const customOverrideArea = document.getElementById('custom-bot-reply');

  const appendSimulatedBubble = (sender, msgText) => {
    if (!chatBubbleContainer) return;
    if (chatPlaceholder) chatPlaceholder.classList.add('hidden');

    const bubble = document.createElement('div');
    const isBot = sender === 'bot';
    
    bubble.className = isBot 
      ? "self-start bg-[#202c33] text-white rounded-2xl rounded-tl-none px-4 py-3 text-xs max-w-[85%] shadow-md border border-slate-800/50 text-left relative z-10 animate-fade-in" 
      : "self-end bg-[#005c4b] text-[#e9edef] rounded-2xl rounded-tr-none px-4 py-3 text-xs max-w-[85%] shadow-md text-left relative z-10 animate-fade-in";

    bubble.style.whiteSpace = 'pre-line';
    
    // Format timestamp inside phone simulator bubble
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    bubble.innerHTML = `
      <span>${msgText}</span>
      <span class="block text-[8px] text-right text-slate-400 mt-1 font-mono tracking-wide">${timeStr}</span>
    `;

    chatBubbleContainer.appendChild(bubble);
    // Auto scroll down simulated screen
    const parentContainer = chatBubbleContainer.parentElement;
    if (parentContainer) parentContainer.scrollTop = parentContainer.scrollHeight;
  };

  const executeSandboxBotSequence = () => {
    const selectedRule = AUTOBOT_RULES.find(r => r.id === selectedRuleId);
    if (!selectedRule) return;

    btnRunSim.disabled = true;
    btnRunSim.className = "p-2.5 bg-slate-800 text-slate-500 rounded-xl cursor-not-allowed";

    // Grab user trigger message
    const userMsg = selectedRule.messages.find(m => m.sender === 'user').text;
    appendSimulatedBubble('user', userMsg);
    appendConsoleLog(userMsg, 'user');
    appendTickerActivity("Trigger Keyword Matching", `Client ID: Match`);

    // Delay 1.2s to simulate real mobile typing
    setTimeout(() => {
      if (typingBubble) typingBubble.classList.remove('hidden');
      const statusSubtext = document.getElementById('bot-status-subtext');
      if (statusSubtext) statusSubtext.textContent = 'typing reply...';

      setTimeout(() => {
        if (typingBubble) typingBubble.classList.add('hidden');
        if (statusSubtext) statusSubtext.textContent = 'online';

        // Check if user set custom text override
        let botMsg = selectedRule.messages.find(m => m.sender === 'bot').text;
        if (customOverrideArea && customOverrideArea.value.trim() !== '') {
          botMsg = customOverrideArea.value.trim();
        }

        appendSimulatedBubble('bot', botMsg);
        appendConsoleLog(botMsg, "bot");
        appendTickerActivity("Bot Replied Automatically ✓", "WebDes Bot Node");

        // Unlock Sim
        btnRunSim.disabled = false;
        btnRunSim.className = "p-2.5 bg-[#25D366] text-black hover:bg-[#1ebd50] rounded-xl transition-all shadow-md cursor-pointer";
      }, 1500);

    }, 800);
  };

  if (btnRunSim) {
    btnRunSim.addEventListener('click', executeSandboxBotSequence);
  }

  if (btnResetSim) {
    btnResetSim.addEventListener('click', () => {
      if (chatBubbleContainer) chatBubbleContainer.innerHTML = '';
      if (chatPlaceholder) chatPlaceholder.classList.remove('hidden');
      if (customOverrideArea) customOverrideArea.value = '';
      appendConsoleLog("Simulation Sandbox memory buffers wiped.", 'info');
    });
  }


  // ==========================================
  // 4. SMART LEAD CAPTURE & CHECKOUT PAYFLOWS
  // ==========================================
  const leadModal = document.getElementById('lead-capture-modal');
  const checkoutModal = document.getElementById('checkout-modal');
  const leadForm = document.getElementById('lead-form');
  const leadSyncStatus = document.getElementById('lead-sync-status');
  const modalTierSubtext = document.getElementById('modal-tier-subtext');

  let activeTierName = "Professional Growth";
  let activeTierPrice = 4100;

  // Global functions to open modals easily from HTML inline commands
  window.triggerLeadModal = (tierName, tierPrice) => {
    activeTierName = tierName;
    activeTierPrice = tierPrice;

    if (modalTierSubtext) {
      modalTierSubtext.textContent = `Tier Selector: ${tierName} (₹${tierPrice.toLocaleString()}/mo)`;
    }

    if (leadModal) {
      leadModal.classList.remove('opacity-0', 'pointer-events-none');
      leadModal.firstElementChild.classList.remove('scale-95');
      leadModal.firstElementChild.classList.add('scale-100');
    }
    
    appendConsoleLog(`Client triggered checkouts flow for: ${tierName}`);
  };

  window.closeLeadModal = () => {
    if (leadModal) {
      leadModal.classList.add('opacity-0', 'pointer-events-none');
      leadModal.firstElementChild.classList.add('scale-95');
      leadModal.firstElementChild.classList.remove('scale-100');
    }
  };

  window.closeCheckoutModal = () => {
    if (checkoutModal) {
      checkoutModal.classList.add('opacity-0', 'pointer-events-none');
      checkoutModal.firstElementChild.classList.add('scale-95');
      checkoutModal.firstElementChild.classList.remove('scale-100');
    }
  };

  // Submit Lead Form
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const config = getConf();
      const nameVal = document.getElementById('lead-name').value;
      const phoneVal = document.getElementById('lead-phone').value;
      const emailVal = document.getElementById('lead-email').value;

      if (leadSyncStatus) leadSyncStatus.classList.remove('hidden');
      appendConsoleLog("Gating client payload parameters...");
      
      const payload = {
        name: nameVal,
        phone: phoneVal,
        email: emailVal,
        selected_tier: activeTierName,
        price: activeTierPrice,
        timestamp: new Date().toISOString()
      };

      // FAKE DISPATCH PROGRESS SYNC WITH WEBHOOK
      let requestPromise;
      if (config.render_webhook_url && config.render_webhook_url.trim() !== '') {
        // Run factual user webhook synchronization
        appendConsoleLog(`Dispatching JSON array securely to target: ${config.render_webhook_url}`);
        requestPromise = fetch(config.render_webhook_url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => {
          appendConsoleLog(`Secure Webhook dispatch failed. Standard Offline local capture activated. Protocol: ${err.message}`, 'error');
        });
      } else {
        // Local simulation log syncs
        appendConsoleLog("No target Render Webhook specified. Saved metadata to local console payloads.", "success");
        requestPromise = new Promise((resolve) => setTimeout(resolve, 1500));
      }

      requestPromise.then(() => {
        if (leadSyncStatus) leadSyncStatus.classList.add('hidden');
        closeLeadModal();

        // Trigger dynamic checkout flow logic
        appendConsoleLog(`Synchronized Client Credentials checkouts for: ${nameVal}. Routing pays parameters...`, "success");
        
        // EVALUATE PHONE VS DESKTOP DEVICE USER INTELLIGENCE
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobileDevice) {
          appendConsoleLog("Mobile platform detected. Opening UPI Intent link payload automatically...");
          
          // Build UPI Intent url parameters
          const upiRedirectUrl = `upi://pay?pa=${encodeURIComponent(config.upi_id)}&pn=WebDes%20SaaS&am=${activeTierPrice}&cu=INR&tn=${encodeURIComponent('WebDes ' + activeTierName)}`;
          window.location.href = upiRedirectUrl;
        } else {
          // Open Desktop high trust checkout modal displays
          appendConsoleLog("Desktop platform detected. Raising dynamic QR code scanning modal...");
          
          // Update details inside checkout modal
          const checkoutSyncedMsg = document.getElementById('checkout-synced-message');
          if (checkoutSyncedMsg) {
            checkoutSyncedMsg.textContent = `${nameVal}, your webhook registration was queued. Scan now to complete.`;
          }

          const checkoutAmtLabel = document.getElementById('amount-indicator-checkout');
          if (checkoutAmtLabel) {
            checkoutAmtLabel.textContent = `PAY ₹${activeTierPrice.toLocaleString()}`;
          }

          // Show Modal
          if (checkoutModal) {
            checkoutModal.classList.remove('opacity-0', 'pointer-events-none');
            checkoutModal.firstElementChild.classList.remove('scale-95');
            checkoutModal.firstElementChild.classList.add('scale-100');
          }
        }

        // Reset Lead inputs
        leadForm.reset();
      });

    });
  }


  // ==========================================
  // 5. ACCORDION GENERAL ACTION TOGGLES
  // ==========================================
  window.toggleFaq = (button) => {
    const parent = button.parentElement;
    const body = button.nextElementSibling;
    const svg = button.querySelector('svg');

    // Check if other FAQs are open and close them
    const allAccordions = document.querySelectorAll('#faq .max-h-0');
    
    if (body.style.maxHeight && body.style.maxHeight !== '0px') {
      body.style.maxHeight = '0px';
      svg.classList.remove('rotate-180');
    } else {
      // Close all first for neat bento accordion loops
      document.querySelectorAll('#faq > div').forEach((card) => {
        const itemBody = card.querySelector('.max-h-0');
        const itemSvg = card.querySelector('svg');
        if (itemBody) itemBody.style.maxHeight = '0px';
        if (itemSvg) itemSvg.classList.remove('rotate-180');
      });

      body.style.maxHeight = body.scrollHeight + 'px';
      svg.classList.add('rotate-180');
    }
  };

  // Add sample active feeds to ticker on startup
  appendTickerActivity("Bot Server Booted", "WebDes Host Layer");
  appendTickerActivity("Pipeline Validated ✓", "6291192742@UPI");

  // Keep adding subtle fake background events for high visual conversions interest
  setInterval(() => {
    const activityPatterns = [
      { action: "Visitor Matched Demo ✓", target: "+91 88390-xxxxx" },
      { action: "Automated Message Fired ⚡", target: "Rule Node: pricing" },
      { action: "Webhook Callback Active", target: "Serverless Event Sync" },
      { action: "Gateway Handshake Success", target: "6291192742@UPI" }
    ];

    const randomEvent = activityPatterns[Math.floor(Math.random() * activityPatterns.length)];
    appendTickerActivity(randomEvent.action, randomEvent.target);
  }, 12000);

});
