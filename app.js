
const sections = {
  docs: {
    title: "NEXORA Docs",
    description: "Your document creation workspace.",
    content: `
      <textarea id="doc-editor"
        placeholder="Start writing your document..."
        style="width:100%;height:280px;padding:20px;background:#111b30;color:white;border:1px solid #39496e;border-radius:12px;font:16px Inter;resize:vertical;"></textarea>
      <br><br>
      <button onclick="saveDoc()" class="back-button">Save Document</button>
      <button onclick="downloadDoc()" class="back-button">Download TXT</button>
      <p id="doc-status"></p>
    `
  },

  stocks: {
    title: "NEXORA Stocks",
    description: "Explore stocks and practice investing.",
    content: `
      <h3>Paper Trading</h3>
      <p>Practice with simulated money, not real investments.</p>
      <p>Starting balance: $10,000</p>
      <p>Your portfolio tools are coming next!</p>
    `
  },

  gaming: {
    title: "NEXORA Gaming",
    description: "Your gaming launcher.",
    content: `
      <h3>Mini Game</h3>
      <p>Click the button to test your reflexes!</p>
      <button class="back-button" onclick="playGame()">PLAY</button>
      <p id="game-result"></p>
    `
  },

  music: {
    title: "NEXORA Music",
    description: "Your music creation workspace.",
    content: `
      <h3>Music Studio</h3>
      <button class="back-button" onclick="playNote(440)">Play A Note</button>
      <button class="back-button" onclick="playNote(523)">Play C Note</button>
      <p>More music creation tools coming next!</p>
    `
  },

  animation: {
    title: "NEXORA 2D Animation",
    description: "Create your own animations.",
    content: `
      <h3>Animation Studio</h3>
      <p>Your frame-by-frame animation editor is coming next!</p>
    `
  },

  drawing: {
    title: "NEXORA Drawing",
    description: "Your digital art studio.",
    content: `
      <h3>Drawing Canvas</h3>
      <canvas id="draw-canvas" width="700" height="350"
        style="width:100%;background:white;border-radius:12px;touch-action:none;"></canvas>
      <br><br>
      <button class="back-button" onclick="clearCanvas()">Clear Canvas</button>
    `
  },

  studio: {
    title: "NEXORA 3D Studio",
    description: "Build your own 3D world.",
    content: `
      <h3>3D Creation Studio</h3>
      <p>3D modeling and animation tools are coming next!</p>
    `
  },

  ai: {
    title: "NEXORA AI",
    description: "Your creative assistant.",
    content: `
      <h3>AI Assistant</h3>
      <p>Connect your secure AI backend to activate chat.</p>
    `
  }
};

function openApp(name) {
  const app = sections[name];
  if (!app) return;

  document.querySelector(".welcome").style.display = "none";
  document.querySelector(".dashboard").style.display = "none";

  const workspace = document.getElementById("workspace");
  workspace.classList.add("active");

  document.getElementById("workspace-title").textContent = app.title;
  document.getElementById("workspace-content").innerHTML =
    `<p>${app.description}</p>${app.content}`;

  if (name === "drawing") setupDrawing();
}

function closeApp() {
  document.getElementById("workspace").classList.remove("active");
  document.querySelector(".welcome").style.display = "block";
  document.querySelector(".dashboard").style.display = "grid";
}

function saveDoc() {
  const content = document.getElementById("doc-editor").value;
  localStorage.setItem("nexora-document", content);
  document.getElementById("doc-status").textContent = "Document saved!";
}

function downloadDoc() {
  const content = document.getElementById("doc-editor").value;
  const blob = new Blob([content], {type:"text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "nexora-document.txt";
  link.click();
  URL.revokeObjectURL(link.href);
}

function playGame() {
  const result = document.getElementById("game-result");
  result.textContent = "Your score: " + Math.floor(Math.random()*100);
}

function playNote(frequency) {
  const audio = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  oscillator.connect(gain);
  gain.connect(audio.destination);

  gain.gain.setValueAtTime(0.15,audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001,audio.currentTime+0.8);

  oscillator.start();
  oscillator.stop(audio.currentTime+0.8);
  oscillator.onended = () => audio.close();
}

let drawing = false;

function setupDrawing() {
  const canvas = document.getElementById("draw-canvas");
  const ctx = canvas.getContext("2d");

  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#536dfe";

  function position(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x:(event.clientX-rect.left)*canvas.width/rect.width,
      y:(event.clientY-rect.top)*canvas.height/rect.height
    };
  }

  canvas.onpointerdown = event => {
    drawing = true;
    const p = position(event);
    ctx.beginPath();
    ctx.moveTo(p.x,p.y);
    canvas.setPointerCapture(event.pointerId);
  };

  canvas.onpointermove = event => {
    if (!drawing) return;
    const p = position(event);
    ctx.lineTo(p.x,p.y);
    ctx.stroke();
  };

  canvas.onpointerup = () => drawing = false;
  canvas.onpointercancel = () => drawing = false;
}

function clearCanvas() {
  const canvas = document.getElementById("draw-canvas");
  canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
}

// Opening animation
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").classList.add("hidden");
  }, 2400);
});
