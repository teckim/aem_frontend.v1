export default function({ $auth, redirect, store, route }) {
  if (
    !$auth.loggedIn ||
    !['root', 'officeAdmin', 'officeMember'].includes($auth.user.role)
  ) {
    redirect(`/login?to=${route.path}&s=denied`)
  }
}
