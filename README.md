# Auth Nexus 🔐

A plug-and-play authentication & authorization library for Node.js apps.

## Installation

```sh
npm install auth-nexus
```

## Usage

```js
const AuthNexus = require('auth-nexus');

const auth = new AuthNexus({ secret: 'supersecretkey' });

// Generate JWT
const token = auth.generateToken({ username: 'testuser' });
console.log('Generated JWT:', token);

// Verify JWT
try {
  const decoded = auth.verifyToken(token);
  console.log('Decoded JWT:', decoded);
} catch (err) {
  console.error('JWT verification failed:', err.message);
}

// Generate OAuth Token
const oauthToken = auth.generateOAuthToken('clientId', 'clientSecret');
console.log('Generated OAuth Token:', oauthToken);

// Verify OAuth Token
const isOAuthValid = auth.verifyOAuthToken(oauthToken);
console.log('Is OAuth Token valid?', isOAuthValid);

// Generate API Key
const apiKey = auth.generateApiKey();
console.log('Generated API Key:', apiKey);

// Verify API Key
const isApiKeyValid = auth.verifyApiKey(apiKey);
console.log('Is API Key valid?', isApiKeyValid);

// Add Role and User
auth.addRole('admin', ['read', 'write', 'delete']);
auth.addUser('adminUser', 'admin');

// Check Permission
const hasPermission = auth.checkPermission('adminUser', 'write');
console.log('Does adminUser have write permission?', hasPermission);

// Generate MFA Code
const mfaCode = auth.generateMfaCode();
console.log('Generated MFA Code:', mfaCode);

// Verify MFA Code
const isMfaValid = auth.verifyMfaCode(mfaCode, mfaCode);
console.log('Is MFA Code valid?', isMfaValid);
```

## Features

✅ JWT generation and verification  
✅ OAuth token generation and verification  
✅ API key generation and verification  
✅ Role-based access control (RBAC)  
✅ Multi-factor authentication (MFA)  

## API

### `new AuthNexus(options)`

Creates a new instance of AuthNexus.

| Option       | Type   | Default | Description                       |
|--------------|--------|---------|-----------------------------------|
| secret       | string |         | Secret key for signing JWTs       |
| tokenExpiry  | string | '1h'    | JWT token expiry time             |

### `generateToken(payload)`

Generates a JWT.

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| payload   | object | The payload to sign  |

### `verifyToken(token)`

Verifies a JWT.

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| token     | string | The JWT to verify    |

### `generateOAuthToken(clientId, clientSecret)`

Generates an OAuth token.

| Parameter    | Type   | Description                  |
|--------------|--------|------------------------------|
| clientId     | string | The client ID                |
| clientSecret | string | The client secret            |

### `verifyOAuthToken(token)`

Verifies an OAuth token.

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| token     | string | The OAuth token to verify |

### `generateApiKey()`

Generates an API key.

### `verifyApiKey(apiKey)`

Verifies an API key.

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| apiKey    | string | The API key to verify |

### `addUser(username, role)`

Adds a user with a role.

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| username  | string | The username         |
| role      | string | The role             |

### `addRole(role, permissions)`

Adds a role with permissions.

| Parameter   | Type     | Description                  |
|-------------|----------|------------------------------|
| role        | string   | The role                     |
| permissions | string[] | The permissions for the role |

### `checkPermission(username, permission)`

Checks if a user has a specific permission.

| Parameter  | Type   | Description                  |
|------------|--------|------------------------------|
| username   | string | The username                 |
| permission | string | The permission to check      |

### `generateMfaCode()`

Generates a multi-factor authentication (MFA) code.

### `verifyMfaCode(code, userCode)`

Verifies an MFA code.

| Parameter | Type   | Description                  |
|-----------|--------|------------------------------|
| code      | string | The generated MFA code       |
| userCode  | string | The user-provided MFA code   |

## Running Tests

This package includes test cases to ensure functionality. Run tests with:

```sh
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

This version includes:  
✅ Detailed API documentation  
✅ Installation & usage examples  
✅ Testing instructions  
✅ Contributing section  
