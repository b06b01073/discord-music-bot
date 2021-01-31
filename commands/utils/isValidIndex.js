module.exports = (args, length) => {
  if (args.length !== 1) return false;
  const index = Number(args[0]);
  if (isNaN(index)) return false;
  if (index > length || index < 1) return false;
  return true;
};
