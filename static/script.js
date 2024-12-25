const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add message to chat
function addMessage(content, role) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", role);

  // Format AI response: Add bold formatting and wrap long content
  if (role === "bot") {
    content = content.replace(/\*(.*?)\*/g, "<strong>$1</strong>"); // Bold formatting
    content = content.replace(/(.{110})/g, "$1\n"); // Insert line breaks

    // Use <pre> to preserve formatting
    const formattedContent = document.createElement("pre");
    formattedContent.innerHTML = content;
    messageDiv.appendChild(formattedContent);
  } else {
    messageDiv.textContent = content;
  }

  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to bottom
}

function showTypingIndicator() {
  const typingIndicator = document.createElement("div");
  typingIndicator.id = "typing-indicator";
  typingIndicator.classList.add("message", "bot");
  typingIndicator.textContent = "Typing...";
  messagesDiv.appendChild(typingIndicator);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Handle send button click
async function sendMessage(userMessage) {
  if (!userMessage) return;

  // Display user's message
  addMessage(userMessage, "user");

  showTypingIndicator();

  // Send the user's message to the Flask backend
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) throw new Error("Failed to get response from chatbot.");

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    removeTypingIndicator();

    // Display the bot's response
    addMessage(data.response, "bot");
  } catch (error) {
    removeTypingIndicator();
    addMessage("Error: " + error.message, "bot");
  }
}

// Event listener for send button
sendBtn.addEventListener("click", () => {
  const userMessage = userInput.value.trim();
  userInput.value = ""; // Clear the input
  sendMessage(userMessage);
});

// Allow "Enter" key to send message
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendBtn.click();
  }
});

// Handle predefined question button clicks
const questionButtons = document.querySelectorAll(".question-btn");
questionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const question = button.textContent.trim();
    sendMessage(question);
  });
});
