import Cookies from 'universal-cookie';

export default function universalCookieMiddleware() {
  return async function(ctx, next) {
    ctx.request.universalCookies = new Cookies(
      ctx.request.headers.cookie || '',
      {
        onSet(name, value, options) {
          ctx.cookies.set(name, value, options);
        },
        onRemove(name, options) {
          ctx.cookies.set(name, null);
        },
      }
    );
    await next();
  };
}
