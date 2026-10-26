export function errorHandler(error, _req, res, _next) {
    console.error("Unhandled API error:", error);
    if (res.headersSent) {
        return;
    }
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}
//# sourceMappingURL=error.middleware.js.map