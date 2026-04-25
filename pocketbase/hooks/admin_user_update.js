// Hook to provide Administrative Override for updating users
onRecordUpdateRequest((e) => {
  const auth = e.auth
  if (!auth) return e.next()

  const role = auth.getString('role')
  const isSelf = auth.id === e.record.id

  // Check if the current user is an admin editing another user's record
  if ((role === 'admin' || role === 'c-level') && !isSelf) {
    const body = e.requestInfo().body

    // PocketBase by default restricts password changes of other users via the API
    // for regular auth users (even those with an 'admin' role, as they aren't system superusers).
    // If the admin intentionally passed a new password, we override this behavior.
    if (body.password && String(body.password).trim() !== '') {
      // Set the password directly on the model, which hashes it automatically
      e.record.setPassword(String(body.password))

      // Perform a direct database save to bypass the standard HTTP API form validation
      // which would incorrectly demand the target user's 'oldPassword'.
      $app.save(e.record)

      // We must return early to short-circuit the request so PocketBase doesn't try
      // to process the update again using its default restricted API logic.
      return e.json(200, e.record)
    }
  }

  return e.next()
}, 'users')
