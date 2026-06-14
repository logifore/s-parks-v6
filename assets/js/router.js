"use strict";

window.SparksRouter = ((content, renderers) => {
  const routes = new Set([...content.nav, ...content.secondaryNav].map((item) => item.route));
  const dynamicKeys = {
    detail: "asset",
    creator: "creator",
    project: "project",
    licensing: "asset"
  };

  function parseHash() {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw) return { route: "home", params: {} };
    const [routePart, queryString = ""] = raw.split("?");
    const route = routes.has(routePart) ? routePart : "home";
    const params = {};
    const search = new URLSearchParams(queryString);
    search.forEach((value, key) => {
      params[key] = value;
    });
    return { route, params };
  }

  function routeFromHash() {
    return parseHash().route;
  }

  function paramsFromHash() {
    return parseHash().params;
  }

  function hrefFor(route, value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const search = new URLSearchParams();
      Object.entries(value).forEach(([key, rawValue]) => {
        if (rawValue === undefined || rawValue === null || rawValue === "") return;
        search.set(key, rawValue);
      });
      const query = search.toString();
      return query ? `#${route}?${query}` : `#${route}`;
    }

    const key = dynamicKeys[route];
    if (!key || !value) return `#${route}`;
    return `#${route}?${key}=${encodeURIComponent(value)}`;
  }

  function renderRoute(route, state) {
    const renderer = renderers[route] || renderers.home;
    return renderer(content, state);
  }

  function navLabel(route) {
    const item = [...content.nav, ...content.secondaryNav].find((entry) => entry.route === route);
    return item ? item.label : "发现";
  }

  return { routeFromHash, paramsFromHash, hrefFor, renderRoute, navLabel };
})(window.SPARKS_CONTENT, window.SparksRenderers.renderers);
