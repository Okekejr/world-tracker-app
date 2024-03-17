export const truncateEmail = (username: any) => {
  // Find the index of '@' symbol
  const atIndex = username.indexOf("@");

  // If '@' symbol exists
  if (atIndex !== -1) {
    // Get the substring before '@'
    return username.substring(0, atIndex);
  }
};
