<template>
  <ion-page>
    <ion-content :fullscreen="true" class="hacker-theme">
      <div class="container">
        <h2>Encryptor</h2>
        
        <label>Enter Message (Plaintext/Ciphertext):</label>
        <textarea v-model="message" rows="3" placeholder="Type your message here..."></textarea>

        <label>Secret Key (Shift Number 1-25):</label>
        <input type="number" v-model.number="shiftKey" min="1" max="25">

        <div class="buttons">
          <button class="action-btn" @click="processMessage('encrypt')">Encrypt</button>
          <button class="action-btn" @click="processMessage('decrypt')">Decrypt</button>
        </div>
        
        <!-- Clear Button -->
        <div class="clear-container">
          <button class="clear-btn" @click="clearAll">Clear All</button>
        </div>

        <label>Result:</label>
        <div class="result-box">{{ result }}</div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';

// Variables (State)
const message = ref('');
const shiftKey = ref(3);
const result = ref('🔐:');

// Logic: Caesar Cipher
const caesarCipher = (text, shift) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    let base = char <= 'Z' ? 65 : 97;
    let newChar = (char.charCodeAt(0) - base + shift) % 26;
    if (newChar < 0) newChar += 26;
    return String.fromCharCode(newChar + base);
  });
};

// Logic: Process Button Click
const processMessage = (mode) => {
  if (message.value === "") {
    result.value = "⚠️ Please enter a message first!";
    return;
  }
  
  let shift = Number(shiftKey.value);
  if (isNaN(shift) || shift < 1 || shift > 25) {
    result.value = "⚠️ Key must be between 1 and 25!";
    return;
  }

  if (mode === 'encrypt') {
    result.value = "🔐 : " + caesarCipher(message.value, shift);
  } else {
    result.value = "🔐 : " + caesarCipher(message.value, -shift);
  }
};

// Logic: Clear All Fields
const clearAll = () => {
  message.value = '';
  shiftKey.value = 3;
  result.value = '🔐:';
};
</script>

<style scoped>
/* Design / CSS */
.hacker-theme {
  --background: #1a1a1a;
  --color: #00ff41;
}

.container {
  background-color: #000;
  border: 2px solid #00ff41;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  margin: 40px auto;
  box-shadow: 0 0 15px #00ff41;
  font-family: 'Courier New', Courier, monospace;
}

h2 { 
  text-align: center; 
  margin-top: 0; 
  color: #00ff41;
}

label { 
  display: block; 
  margin-top: 15px; 
  font-weight: bold; 
  color: #00ff41;
}

input, textarea {
  width: 95%;
  padding: 10px;
  margin-top: 5px;
  background-color: #222;
  color: #00ff41;
  border: 1px solid #00ff41;
  font-family: 'Courier New', Courier, monospace;
  border-radius: 4px;
  outline: none;
}

input:focus, textarea:focus {
  box-shadow: 0 0 5px #00ff41;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.action-btn {
  padding: 10px 5px;
  background-color: #00ff41;
  color: #000;
  border: none;
  font-weight: bold;
  cursor: pointer;
  width: 48%;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  transition: background-color 0.3s;
}

.action-btn:hover { 
  background-color: #00cc33; 
}

/* Clear Button Styling */
.clear-container {
  margin-top: 15px;
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background-color: #330000; /* Dark red background */
  color: #ff3333; /* Red text */
  border: 1px solid #ff3333;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  transition: all 0.3s;
}

.clear-btn:hover { 
  background-color: #ff3333;
  color: #000;
}

.result-box {
  margin-top: 20px;
  padding: 10px;
  border: 1px dashed #00ff41;
  min-height: 40px;
  word-wrap: break-word;
  color: #00ff41;
  font-family: 'Courier New', Courier, monospace;
}
</style>