/**
 * Creates middleware function for permissions based on user roles
 * 
 * @param {any} allowed 
 * @returns middleware function
 */
function permit(...allowed) {
  const isAllowed = role => allowed === role;

  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role))
      next();
    else {
      response.status(403).json({ message: "Forbidden for this user role" });
    }
  }
}

module.exports = permit;