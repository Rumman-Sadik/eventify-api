export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Server error";
  if (process.env.NODE_ENV !== "test") {
    console.error(`[${status}]`, message);
  }
  res.status(status).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
}
