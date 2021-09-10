module.exports = ({ env }) => {
  const domain = env('DOMAIN', null);
  const domain_path = env('DOMAIN_PATH', '')
  const url = !!domain ? domain+domain_path : null;

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('BACKEND_PORT', 1337),
    url: url,
    cron: {
      enabled: true
    },
    admin: {
      url: "admin",
      auth: {
        secret: env('ADMIN_JWT_SECRET', 'a1bb00852b0bd4979fd6a946dd8af29b'),
      },
    },
  };
};
