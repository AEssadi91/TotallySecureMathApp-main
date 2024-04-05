# 🛡️ Totally Secure Math App

Welcome to the **Totally Secure Math App**! In our latest update, we've taken substantial steps to shore up the app's defenses against common and emerging threats. Here's an overview of what we've accomplished security-wise.

---

## Security Vulnerabilities and Remediations

### 📦 1. **Insecure Data Storage**

- **Vulnerability**: Plaintext storage of sensitive data within the device's local storage.
- **Remediation**: We've implemented `react-native-encrypted-storage` to ensure that all notes are securely encrypted before they hit the device's storage.

  ```bash
  npm install react-native-encrypted-storage
  ```

### 🏦 2. **Improper Authentication**

**Vulnerability**: Hardcoded credentials presented a severe security risk.

**Remediation**: Switched to @react-native-keychain/react-native-keychain to securely store and manage user credentials.
npm install @react-native-keychain/react-native-keychain

### 💉 3. **Code Injection**

**Vulnerability**: eval() function used in the app posed a risk of code injection attacks.

**Remediation**: Replaced eval() with mathjs, ensuring the safe evaluation of mathematical expressions.
npm install mathjs

### 🪪 4. **Insufficient Input Validation**

**Vulnerability**: Input fields were susceptible to malicious inputs.
**Remediation**: Implemented regex-based validation to sanitize and validate input fields, safeguarding against harmful inputs.

### 👟 5. **Insecure Code Practices**

**Vulnerabilities**:

Use of non-encrypted local storage.
Embedded sensitive credentials within the codebase.
Insufficient exception handling.
**Remediations**:

Encrypted data prior to storage.
Moved to secure credential storage mechanisms.
Instituted robust error handling throughout the application.

### 🔧 \**Implementation Details*8

To give you a better understanding, here's a peek under the hood at some of the key changes:

### 🔐 Securing Mathematical Expression Evaluation

import { evaluate } from 'mathjs';

function safeEvaluate(expression) {
try {
return evaluate(expression);
} catch (error) {
console.error('Failed to evaluate expression:', expression);
throw new Error('Invalid expression');
}
}

### 🔑 Enhancing Authentication Security

// Use react-native-keychain for secure storage of credentials
import \* as Keychain from '@react-native-keychain/react-native-keychain';

async function login() {
const credentials = await Keychain.getGenericPassword();
if (credentials && credentials.username === username && credentials.password === password) {
props.onLogin({ username, password });
} else {
Alert.alert('Error', 'Username or password is invalid.');
}
}

#### 📂 Encrypted Notes Storage

// Use react-native-encrypted-storage for secure notes storage
import EncryptedStorage from 'react-native-encrypted-storage';

private async getStoredNotes() {
const value = await EncryptedStorage.getItem('notes');
if (value !== null) {
this.setState({ notes: JSON.parse(value) });
}
}

## Conclusion

The security enhancements implemented in the **Totally Secure Math App** significantly mitigate the risk of data breaches and unauthorized access. By addressing the core vulnerabilities and applying best practices, we've made the app **safer for users**, protecting their data and **improving overall trust** in the app's security measures.

## 📜Reference📜

[1] React Native, "Security," React Native, 2024. [Online]. Available: https://reactnative.dev/docs/security. [Accessed: Apr. 4, 2024].

[2] OWASP, "OWASP Top Ten," OWASP Foundation, 2024. [Online]. Available: https://owasp.org/www-project-top-ten/. [Accessed: Apr. 4, 2024].
