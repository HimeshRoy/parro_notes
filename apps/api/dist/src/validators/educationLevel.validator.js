export function validateCreateEducationLevel(req, res, next) {
    const { name, slug, description } = req.body;
    if (typeof name !== "string" || name.trim().length === 0) {
        res.status(400).json({
            success: false,
            message: "Name is required",
        });
        return;
    }
    if (typeof slug !== "string" || slug.trim().length === 0) {
        res.status(400).json({
            success: false,
            message: "Slug is required",
        });
        return;
    }
    if (description !== undefined && description !== null) {
        if (typeof description !== "string") {
            res.status(400).json({
                success: false,
                message: "Description must be a string",
            });
            return;
        }
    }
    next();
}
//# sourceMappingURL=educationLevel.validator.js.map