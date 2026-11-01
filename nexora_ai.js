
/* =====================================
   NEXORA AI v1.0
   Personalized Language Engine
===================================== */

const NexoraAI = {

    // USER MEMORY
    memory: JSON.parse(
        localStorage.getItem("nexora_ai_memory") || "{}"
    ),

    // PREWRITTEN ANSWERS
    responses: {
        greetings: [
            "Hello! How can I help you today?",
            "Hey there! What are we working on?",
            "Welcome back! What would you like to do?"
        ],

        excitement: [
            "LETS GOOOOO!! 🚀",
            "That's awesome!",
            "I'm ready! What are we building?",
            "Now THAT is exciting!"
        ],

        thanks: [
            "You're welcome!",
            "Happy to help!",
            "Anytime!"
        ],

        help: [
            "Of course! Tell me what you need help with.",
            "Let's figure it out together!",
            "I'm ready to help. What's the problem?"
        ],

        unknown: [
            "Interesting! Tell me a little more.",
            "I'm still learning about that. Can you explain?",
            "Let's explore that together!"
        ]
    },

    // RANDOM RESPONSE
    random(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // LEARN USER PREFERENCES
    learn(message) {
        const text = message.toLowerCase();

        if (!this.memory.expressions) {
            this.memory.expressions = [];
        }

        if (
            /l{2,}e{2,}s{2,}t{2,}/i.test(message) ||
            /g{2,}o{2,}/i.test(message)
        ) {
            if (!this.memory.expressions.includes("Lets go excitement")) {
                this.memory.expressions.push("Lets go excitement");
            }
        }

        if (message.length > 100) {
            this.memory.communicationStyle = "detailed";
        }

        if (message.length < 25) {
            this.memory.communicationStyle =
                this.memory.communicationStyle || "short";
        }

        if (text.includes("please")) {
            this.memory.politenessPreference = true;
        }

        this.saveMemory();
    },

    // SAVE MEMORY
    saveMemory() {
        localStorage.setItem(
            "nexora_ai_memory",
            JSON.stringify(this.memory)
        );
    },

    // GENERATE RESPONSE
    respond(message) {
        this.learn(message);

        const text = message.toLowerCase();

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {
            return this.random(this.responses.greetings);
        }

        if (
            text.includes("thank")
        ) {
            return this.random(this.responses.thanks);
        }

        if (
            text.includes("help") ||
            text.includes("how do")
        ) {
            return this.random(this.responses.help);
        }

        if (
            text.includes("lets go") ||
            text.includes("let's go") ||
            /l{2,}e{2,}s{2,}/i.test(message)
        ) {
            return this.random(this.responses.excitement);
        }

        return this.random(this.responses.unknown);
    },

    // VIEW WHAT AI HAS LEARNED
    getMemory() {
        return this.memory;
    },

    // RESET MEMORY
    resetMemory() {
        this.memory = {};
        localStorage.removeItem("nexora_ai_memory");
    }
};

console.log("NEXORA AI v1.0 loaded!");
