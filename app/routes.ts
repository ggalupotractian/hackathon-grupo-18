import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product", "routes/product.tsx"),
  route("company-info", "routes/company-info.tsx"),
] satisfies RouteConfig;
