export function notFoundHandler(req, res, _next) {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`,
    });
}
//# sourceMappingURL=notFound.middleware.js.map