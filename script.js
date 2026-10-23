
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const card = document.getElementById("card");

// Philippine date, day, and live time
function updateDateTime() {
  const now = new Date();
  const options = { timeZone: "Asia/Manila" };

  document.getElementById("date").textContent =
    "📅 Date: " + now.toLocaleDateString("en-US", {
      ...options,
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  document.getElementById("day").textContent =
    "🗓️ Day: " + now.toLocaleDateString("en-US", {
      ...options,
      weekday: "long"
    });

  document.getElementById("time").textContent =
    "🕒 Time: " + now.toLocaleTimeString("en-US", {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
}

updateDateTime();
setInterval(updateDateTime, 1000);

// Position NO button beside YES
function positionNo() {
  if (noBtn.style.display === "none") return;

  const rect = yesBtn.getBoundingClientRect();

  noBtn.style.left = Math.min(
    rect.right + 12,
    window.innerWidth - noBtn.offsetWidth - 8
  ) + "px";

  noBtn.style.top = rect.top + "px";
}

positionNo();
window.addEventListener("resize", positionNo);

// Make NO run away
function runAway() {
  const padding = 10;
  const maxX = Math.max(
    padding,
    window.innerWidth - noBtn.offsetWidth - padding
  );
  const maxY = Math.max(
    padding,
    window.innerHeight - noBtn.offsetHeight - padding
  );

  noBtn.style.left =
    padding + Math.random() * (maxX - padding) + "px";

  noBtn.style.top =
    padding + Math.random() * (maxY - padding) + "px";
}

noBtn.addEventListener("pointerenter", runAway);
noBtn.addEventListener("click", runAway);
noBtn.addEventListener("touchstart", function(event) {
  event.preventDefault();
  runAway();
}, { passive: false });

// Floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["💗", "💕", "💖", "❤️", "💘"][
    Math.floor(Math.random() * 5)
  ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 20 + Math.random() * 25 + "px";
  heart.style.animationDuration = 3 + Math.random() * 3 + "s";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

function celebrate() {
  for (let i = 0; i < 35; i++) {
    setTimeout(createHeart, i * 100);
  }
}

// YES opens Claire's special message screen
yesBtn.addEventListener("click", function() {
  noBtn.style.display = "none";

  const clickedAt = new Date();
  const options = { timeZone: "Asia/Manila" };

  card.innerHTML = `
    <div class="heart">💖🥰💖</div>

    <h1>YAYYYY, CLAIRE!! ❤️</h1>

    <p>
      Thank you for saying YES! 🥹💕<br>
      You just made this moment so special.
    </p>

    <h2>My Dear Claire 🌹</h2>

    <p>
      You are someone special to me.
      I hope this little surprise makes you smile.
      I'll treasure this moment in my heart. 💗
    </p>

    <div class="datetime">
      <p id="yesDate"></p>
      <p id="yesDay"></p>
      <p id="yesTime"></p>
    </div>

    <hr style="border:1px solid #ffe4e1; margin:22px 0;">

    <h2>A Message for Me 💌</h2>

    <p>
      Claire, now it's your turn! 🥹<br>
      What do you want to tell me?
    </p>

    <textarea
      id="loveMessage"
      rows="5"
      placeholder="Write your honest feelings here, Claire... 💕"
    ></textarea>

    <button id="sendBtn">Send Your Message 💌</button>

    <p id="result"></p>
  `;

  document.getElementById("yesDate").textContent =
    "📅 Date: " + clickedAt.toLocaleDateString("en-US", {
      ...options,
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  document.getElementById("yesDay").textContent =
    "🗓️ Day: " + clickedAt.toLocaleDateString("en-US", {
      ...options,
      weekday: "long"
    });

  document.getElementById("yesTime").textContent =
    "🕒 Time: " + clickedAt.toLocaleTimeString("en-US", {
      ...options,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

  celebrate();

  document.getElementById("sendBtn").addEventListener("click", function() {
    const input = document.getElementById("loveMessage");
    const result = document.getElementById("result");
    const msg = input.value.trim();

    if (!msg) {
      result.textContent =
        "Claire, please write me a little message first. 🥹💗";
      return;
    }

    const old = document.getElementById("herReply");
    if (old) old.remove();

    const reply = document.createElement("p");
    reply.id = "herReply";
    reply.textContent = "💌 Claire's message:\n" + msg;
    reply.style.whiteSpace = "pre-wrap";
    reply.style.overflowWrap = "anywhere";

    result.textContent =
      "Thank you, Claire! Your message is special to me. ❤️";

    result.after(reply);
    celebrate();
  });
});
