export const validateSchema = schema => (req, res, next) => {
  try {
    schema.parse(req.body)

    next()
  } catch (error) {
    res.status(400).json({ errors: error.errors.map(e => e.message) })
  }
}
