export async function handle({ event, resolve }) {
  event.locals.ua = event.request.headers.get('user-agent');
 
  const response = await resolve(event);

 
  return response;
}