
// =====================================
// NEXORA AI CHAT INTERFACE
// Version 1.1
// =====================================

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

function addMessage(sender, message) {
    const bubble = document.createElement("div");

    bubble.className = "message " + sender;

    const name = document.createElement("strong");
    name.textContent = sender === "user" ? "YOU" : "NEXORA AI";

    const text = document.createElement("p");
    text.textContent = message;

    bubble.appendChild(name);
    bubble.appendChild(text);

    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const message = userInput.value.trim();

    if (!message) return;

    addMessage("user", message);
    userInput.value = "";

    // Ask the NEXORA language engine for a response.
    const answer = NexoraAI.respond(message);

    // Display the response.
    setTimeout(() => {
        addMessage("ai", answer);
    }, 350);
}

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

console.log("NEXORA AI Chat Interface Ready!");
