migrate(
  (app) => {
    try {
      const email = 'valmor.junior@inquiry.com.br'
      let user
      try {
        user = app.findAuthRecordByEmail('users', email)
      } catch (e) {
        const usersCol = app.findCollectionByNameOrId('users')
        user = new Record(usersCol)
        user.setEmail(email)
        user.setPassword('securepassword123')
        user.setVerified(true)
        user.set('name', 'Valmor Junior')
      }
      user.set('role', 'c-level')
      user.set('status_conta', 'ativo')
      app.save(user)
    } catch (e) {
      console.log('Erro ao semear usuário C-Level:', e)
    }
  },
  (app) => {},
)
