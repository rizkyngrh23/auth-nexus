const SecureAuth = require('./index');

const auth = new SecureAuth({ secret: 'supersecretkey' });

const token = auth.generateToken({ username: 'testuser' });
console.log('✅ Generated JWT:', token);

try {
  const decoded = auth.verifyToken(token);
  console.log('✅ Decoded JWT:', decoded);
} catch (err) {
  console.error('❌ JWT verification failed:', err.message);
}

const oauthToken = auth.generateOAuthToken('clientId', 'clientSecret');
console.log('✅ Generated OAuth Token:', oauthToken);

const isOAuthValid = auth.verifyOAuthToken(oauthToken);
console.log('✅ Is OAuth Token valid?', isOAuthValid);

const apiKey = auth.generateApiKey();
console.log('✅ Generated API Key:', apiKey);

const isApiKeyValid = auth.verifyApiKey(apiKey);
console.log('✅ Is API Key valid?', isApiKeyValid);

auth.addRole('admin', ['read', 'write', 'delete']);
auth.addUser('adminUser', 'admin');

const hasPermission = auth.checkPermission('adminUser', 'write');
console.log('✅ Does adminUser have write permission?', hasPermission);

const mfaCode = auth.generateMfaCode();
console.log('✅ Generated MFA Code:', mfaCode);

const isMfaValid = auth.verifyMfaCode(mfaCode, mfaCode);
console.log('✅ Is MFA Code valid?', isMfaValid);

try {
  auth.generateToken('invalid payload');
} catch (err) {
  console.error('✅ Expected error for invalid payload:', err.message);
}

try {
  auth.addUser('userWithoutRole');
} catch (err) {
  console.error('✅ Expected error for user without role:', err.message);
}

try {
  auth.addRole('roleWithoutPermissions');
} catch (err) {
  console.error('✅ Expected error for role without permissions:', err.message);
}
