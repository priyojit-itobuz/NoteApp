// validate function using yup

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false }); // Validate the request body
    next(); // Proceed to the next middleware or route
  } catch (error) {
    res.status(400).json({ errors: error.errors }); // Return validation errors
  }
};
