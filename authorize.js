export function authorizeModification(req, res, next) {
    const { role, id } = req.user;
    if (role !== 'parent' && (role !== 'child' || req.params.userId !== String(id))) {
        return res.status(403).json({ "error": "Access denied" });
    }
    next();
}
