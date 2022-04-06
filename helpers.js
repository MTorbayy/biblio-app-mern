// Gestion des erreurs

export const catchErrors = fn => (req, res, next) =>
  fn(req, res, next).catch(next)