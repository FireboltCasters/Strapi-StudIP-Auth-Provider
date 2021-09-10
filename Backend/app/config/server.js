module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: 1337,
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a1bb00852b0bd4979fd6a946dd8af29b'),
    },
  },
});
