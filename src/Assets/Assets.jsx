// Dynamically import all images from the assets folder
const importAll = (requireContext) => {
  return requireContext.keys().map((key) => requireContext(key));
};

// Import all images from the assets folder
const images = importAll(require.context("../Assets", false, /\.(png|jpe?g|svg)$/));

export default images;
