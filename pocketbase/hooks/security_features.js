// Security and Audit Hooks

// Encrypt/Decrypt 2FA Secret (AES-256)
// Using a fixed mock key for demonstration. In prod, use $os.getenv("AES_SECRET")
const AES_KEY = '12345678901234567890123456789012'

onRecordCreate((e) => {
  const record = e.record
  if (record && record.get('two_fa_secret') && !record.get('two_fa_secret').startsWith('ENC:')) {
    try {
      const encrypted = $security.encrypt(record.get('two_fa_secret'), AES_KEY)
      record.set('two_fa_secret', 'ENC:' + encrypted)
    } catch (err) {
      console.log('Encryption failed:', err)
    }
  }
  e.next()
}, 'users')

onRecordUpdate((e) => {
  const record = e.record
  if (record && record.get('two_fa_secret') && !record.get('two_fa_secret').startsWith('ENC:')) {
    try {
      const encrypted = $security.encrypt(record.get('two_fa_secret'), AES_KEY)
      record.set('two_fa_secret', 'ENC:' + encrypted)
    } catch (err) {
      console.log('Encryption failed:', err)
    }
  }
  e.next()
}, 'users')

onRecordEnrich((e) => {
  const record = e.record
  if (record && record.get('two_fa_secret') && record.get('two_fa_secret').startsWith('ENC:')) {
    try {
      const decrypted = $security.decrypt(record.get('two_fa_secret').substring(4), AES_KEY)
      record.set('two_fa_secret', decrypted)
    } catch (err) {
      // ignore
    }
  }
  e.next()
}, 'users')
