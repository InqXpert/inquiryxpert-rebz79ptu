migrate(
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'valmor.junior@inquiry.com.br')
      user.setPassword('H@uptli.jr8791*')
      app.save(user)
    } catch (err) {
      console.log('Failed to update user password:', err)
    }
  },
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'valmor.junior@inquiry.com.br')
      user.setPassword('securepassword123')
      app.save(user)
    } catch (err) {
      console.log('Failed to revert user password:', err)
    }
  },
)
