const catchAsync = (theFunc) => {
  return (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};
module.exports =  catchAsync;