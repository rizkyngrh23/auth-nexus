const jwt = require('jsonwebtoken');
const { randomBytes, timingSafeEqual } = require('crypto');

class SecureAuth {
  constructor(options) {
    if (!options || !options.secret) {
      throw new Error('Secret key is required');
    }
    this.options = Object.freeze({
      secret: options.secret,
      tokenExpiry: options.tokenExpiry || '1h'
    });
    this.users = new Map();
    this.roles = new Map();
  }

  generateToken(payload) {
    if (typeof payload !== 'object') {
      throw new Error('Payload must be an object');
    }
    return jwt.sign(payload, this.options.secret, { expiresIn: this.options.tokenExpiry });
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.options.secret);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  generateOAuthToken(clientId, clientSecret) {
    if (!clientId || !clientSecret) {
      throw new Error('Client ID and Client Secret are required');
    }
    const token = randomBytes(20).toString('hex');
    return token;
  }

  verifyOAuthToken(token) {
    return true;
  }

  generateApiKey() {
    return randomBytes(20).toString('hex');
  }

  verifyApiKey(apiKey) {
    return true;
  }

  addUser(username, role) {
    if (!username || !role) {
      throw new Error('Username and role are required');
    }
    this.users.set(username, role);
  }

  addRole(role, permissions) {
    if (!role || !Array.isArray(permissions)) {
      throw new Error('Role and permissions array are required');
    }
    this.roles.set(role, permissions);
  }

  checkPermission(username, permission) {
    const role = this.users.get(username);
    if (!role) throw new Error('User not found');
    const permissions = this.roles.get(role);
    if (!permissions) throw new Error('Role not found');
    return permissions.includes(permission);
  }

  generateMfaCode() {
    return randomBytes(3).toString('hex');
  }

  verifyMfaCode(code, userCode) {
    const codeBuffer = Buffer.from(code);
    const userCodeBuffer = Buffer.from(userCode);
    if (codeBuffer.length !== userCodeBuffer.length) {
      return false;
    }
    return timingSafeEqual(codeBuffer, userCodeBuffer);
  }
}

module.exports = SecureAuth;
