const requireContext: any = require.context('../assets/svg', true, /\.svg$/);
const reqAll: any = (requireContext: any) => requireContext.keys().map(requireContext);
reqAll(requireContext);
