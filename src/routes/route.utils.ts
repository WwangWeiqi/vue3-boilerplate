import { RouteMeta } from "./route.model";

const DEFAULT_META = { showHeader: true, showSider: true };

export const routeUtils = {
  getMeta: (meta = {}): RouteMeta => {
    return { ...DEFAULT_META, ...meta };
  },
};
