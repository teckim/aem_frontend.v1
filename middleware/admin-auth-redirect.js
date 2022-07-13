export default function ({ $auth, redirect, route }) {
  if (
    !$auth.loggedIn ||
    !['ROOT', 'ADMIN', 'ORGANIZER'].some(role => $auth.user.flat_roles.includes(role))
  ) {
    redirect(`/login?to=${route.path}&s=denied`)
  }
}
