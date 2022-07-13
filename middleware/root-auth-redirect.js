export default function ({ $auth, redirect, store, route }) {
  if (!$auth.loggedIn || $auth.user.role !== 'root') {
    redirect(`/login?to=${route.path}&s=root`)
  }
}
