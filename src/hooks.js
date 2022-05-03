export async function getSession(event) {
  return {
    userAgent: event.request.headers.get('user-agent')
  }
}