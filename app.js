let knowledgeBase;

// Load knowledge base from JSON file
fetch('knowledge_base.json')
  .then(response => response.json())
  .then(data => {
    knowledgeBase = data;
    console.log('Knowledge base loaded');
  })
  .catch(error => console.error('Error loading knowledge base:', error));

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

function searchKnowledgeBase(query) {
    return knowledgeBase.sources.filter(item => 
        item.tags.some(tag => query.toLowerCase().includes(tag)) ||
        item.summary.toLowerCase().includes(query.toLowerCase())
    );
}

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, true);
        const results = searchKnowledgeBase(userMessage);
        if (results.length > 0) {
            results.forEach(result => {
                addMessage(`[${result.type}] ${result.name}: ${result.summary}`);
            });
        } else {
            addMessage("I'm sorry, I don't have information about that topic yet.");
        }
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
