import { Role } from "../../_helpers/role";

export default [
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { authorize: [Role.Admin] },
    component: () => import("../../views/dashboard/index.vue"),
  },
];