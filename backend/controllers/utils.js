const VALIDATION_CODE = 400;
const NOTFOUND_CODE = 404;
const INTERNAL_CODE = 500;

module.exports.checkError = function (err, res) {
  if (err.name === 'ValidationError') return res.status(VALIDATION_CODE).send({ message: 'Validation Error' });
  if (err.name === 'CastError') return res.status(NOTFOUND_CODE).send({ message: 'Not Found' });
  if (err.name === 'DocumentNotFoundError') return res.status(NOTFOUND_CODE).send({ message: 'User not found' });
  return res.status(INTERNAL_CODE).send({ message: 'Error' });
};
