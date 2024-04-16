const getLimitOffset = (pageConfig: { page: number; size: number }) => {
  const { page, size } = pageConfig;

  // Input validation (optional)
  if (page < 1 || size < 1) {
    throw new Error(
      "Invalid page or size. Page and size must be positive integers."
    );
  }

  const offset = (page - 1) * size;
  const limit = size;

  return { limit, offset };
};
export default getLimitOffset;
