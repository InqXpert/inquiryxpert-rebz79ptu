// Security and Audit Hooks

const loginAttemptsStore = {} // In-memory store for rate limiting

// 1. Rate Limiting for Logins (5 attempts / 15 mins)
onRecordAuthRequest((e) => {
  const ip =
    e.requestInfo().headers['x_forwarded_for'] ||
    e.requestInfo().headers['remote_addr'] ||
    'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  const maxAttempts = 5

  if (!loginAttemptsStore[ip]) {
    loginAttemptsStore[ip] = []
  }

  // Clean old attempts
  loginAttemptsStore[ip] = loginAttemptsStore[ip].filter((timestamp) => now - timestamp < windowMs)

  if (loginAttemptsStore[ip].length >= maxAttempts) {
    throw new TooManyRequestsError(
      'Muitas tentativas de login bloqueadas por segurança. Tente novamente em 15 minutos.',
    )
  }

  loginAttemptsStore[ip].push(now)
  e.next()
}, 'users')

// Reset counter on successful auth
onRecordAuthRequest((e) => {
  e.next() // Wait for success
  const ip =
    e.requestInfo().headers['x_forwarded_for'] ||
    e.requestInfo().headers['remote_addr'] ||
    'unknown'
  if (loginAttemptsStore[ip]) {
    delete loginAttemptsStore[ip]
  }
}, 'users')

// 2. Encrypt/Decrypt 2FA Secret (AES-256)
// Using a fixed mock key for demonstration. In prod, use $os.getenv("AES_SECRET")
const AES_KEY = '12345678901234567890123456789012'

onRecordBeforeSaveRequest((e) => {
  const record = e.record
  if (record.get('two_fa_secret') && !record.get('two_fa_secret').startsWith('ENC:')) {
    try {
      const encrypted = $security.encrypt(record.get('two_fa_secret'), AES_KEY)
      record.set('two_fa_secret', 'ENC:' + encrypted)
    } catch (err) {
      console.log('Encryption failed:', err)
    }
  }
  e.next()
}, 'users')

onRecordViewRequest((e) => {
  e.next()
  const record = e.record
  if (record && record.get('two_fa_secret') && record.get('two_fa_secret').startsWith('ENC:')) {
    try {
      const decrypted = $security.decrypt(record.get('two_fa_secret').substring(4), AES_KEY)
      record.set('two_fa_secret', decrypted)
    } catch (err) {
      // ignore
    }
  }
}, 'users')
