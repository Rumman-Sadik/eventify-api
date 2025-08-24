import jwt from "jsonwebtoken";

export const signToken = (payload, options = {}) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn, ...options });
};

export const setAuthCookie = (res, token) => {
  const isProd = process.env.NODE_ENV === "production";
  const secure = (process.env.COOKIE_SECURE || "false") === "true" || isProd;
  res.cookie("token", token, {
    httpOnly: true,
    secure,
    sameSite: secure ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};
