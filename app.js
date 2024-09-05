// Simulated knowledge base
const knowledgeBase = {
    "podcast": "Podcasts are audio programs available for streaming or download.",
    "blog": "Blogs are regularly updated websites or web pages, typically run by an individual or small group.",
    "youtube": "YouTube is a video-sharing platform where users can upload, view, and interact with videos.",
    "farming": "Farming is the practice of cultivating plants and livestock for food, fiber, and other products.",
    "app development": "App development is the process of creating software applications for mobile devices or computers."
    "agriculture": "Agriculture is the science and art of cultivating plants and livestock.",
    "technology": "Technology is the application of scientific knowledge for practical purposes."
};

const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.marginBottom = '10px';
    messageElement.style.textAlign = isUser ? 'right' : 'left';
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getResponse(input) {
    const lowercaseInput = input.toLowerCase();
    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (lowercaseInput.includes(key)) {
            return value;
        }
    }
    return "I'm sorry, I don't have information about that topic yet.";
}

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        const response = getResponse(userMessage);
        addMessage(response);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
