import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("company-info", "routes/company-info.tsx"),
  route('checkout', 'routes/checkout.tsx'),
] satisfies RouteConfig;
