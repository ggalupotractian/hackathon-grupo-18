import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("company-info", "routes/company-info.tsx"),
  route("asset-info", "routes/asset-info.tsx"),
<<<<<<< HEAD
=======
  route('checkout', 'routes/checkout.tsx'),
>>>>>>> dc770ffee89b33100a5cf8b67cc4320b1509547c
] satisfies RouteConfig;
