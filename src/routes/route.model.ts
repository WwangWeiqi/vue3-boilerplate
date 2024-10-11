import { RouteRecordRaw } from "vue-router";
export type RouteMeta = {
  showHeader: boolean;
  showSider: boolean;
};

type RouteAddition = {
  hidden: boolean;
  meta?: RouteMeta;
  //   getMeta: () => any;
};

export type RouteRowProp = RouteRecordRaw & RouteAddition;

// export type RouteRowProp = RouteRowType & { getMeta: () => RouteMeta };

// export const createRoute = (route: RouteRowType): RouteRowProp => ({
//   ...route,
//   getMeta: () => {
//     return { ...DEFAULT_META, ...route.meta };
//   },
// });

// export const createRoute = (
//   route: Omit<RouteRowProp, "getMeta">
// ): RouteRowProp => ({
//   ...route,
//   getMeta: () => {
//     return { ...DEFAULT_META, ...route.meta };
//   },
// });
