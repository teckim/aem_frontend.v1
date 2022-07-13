export default function ({ $auth, redirect, store, route }) {
  if (!$auth.loggedIn) {
    redirect(`/login?to=${route.path}&s=unauth`)
  }
}
