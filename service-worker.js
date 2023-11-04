try {
  self["workbox:core:6.6.0"] && _();
} catch {
}
const Q = (s, ...e) => {
  let t = s;
  return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t;
}, J = Q;
class h extends Error {
  /**
   *
   * @param {string} errorCode The error code that
   * identifies this particular error.
   * @param {Object=} details Any relevant arguments
   * that will help developers identify issues should
   * be added as a key on the context object.
   */
  constructor(e, t) {
    const n = J(e, t);
    super(n), this.name = e, this.details = t;
  }
}
const d = {
  googleAnalytics: "googleAnalytics",
  precache: "precache-v2",
  prefix: "workbox",
  runtime: "runtime",
  suffix: typeof registration < "u" ? registration.scope : ""
}, v = (s) => [d.prefix, s, d.suffix].filter((e) => e && e.length > 0).join("-"), Y = (s) => {
  for (const e of Object.keys(d))
    s(e);
}, R = {
  updateDetails: (s) => {
    Y((e) => {
      typeof s[e] == "string" && (d[e] = s[e]);
    });
  },
  getGoogleAnalyticsName: (s) => s || v(d.googleAnalytics),
  getPrecacheName: (s) => s || v(d.precache),
  getPrefix: () => d.prefix,
  getRuntimeName: (s) => s || v(d.runtime),
  getSuffix: () => d.suffix
};
function A(s, e) {
  const t = e();
  return s.waitUntil(t), t;
}
try {
  self["workbox:precaching:6.6.0"] && _();
} catch {
}
const Z = "__WB_REVISION__";
function X(s) {
  if (!s)
    throw new h("add-to-cache-list-unexpected-type", { entry: s });
  if (typeof s == "string") {
    const a = new URL(s, location.href);
    return {
      cacheKey: a.href,
      url: a.href
    };
  }
  const { revision: e, url: t } = s;
  if (!t)
    throw new h("add-to-cache-list-unexpected-type", { entry: s });
  if (!e) {
    const a = new URL(t, location.href);
    return {
      cacheKey: a.href,
      url: a.href
    };
  }
  const n = new URL(t, location.href), r = new URL(t, location.href);
  return n.searchParams.set(Z, e), {
    cacheKey: n.href,
    url: r.href
  };
}
class ee {
  constructor() {
    this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({ request: e, state: t }) => {
      t && (t.originalRequest = e);
    }, this.cachedResponseWillBeUsed = async ({ event: e, state: t, cachedResponse: n }) => {
      if (e.type === "install" && t && t.originalRequest && t.originalRequest instanceof Request) {
        const r = t.originalRequest.url;
        n ? this.notUpdatedURLs.push(r) : this.updatedURLs.push(r);
      }
      return n;
    };
  }
}
class te {
  constructor({ precacheController: e }) {
    this.cacheKeyWillBeUsed = async ({ request: t, params: n }) => {
      const r = (n == null ? void 0 : n.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
      return r ? new Request(r, { headers: t.headers }) : t;
    }, this._precacheController = e;
  }
}
let w;
function se() {
  if (w === void 0) {
    const s = new Response("");
    if ("body" in s)
      try {
        new Response(s.body), w = !0;
      } catch {
        w = !1;
      }
    w = !1;
  }
  return w;
}
async function ne(s, e) {
  let t = null;
  if (s.url && (t = new URL(s.url).origin), t !== self.location.origin)
    throw new h("cross-origin-copy-response", { origin: t });
  const n = s.clone(), r = {
    headers: new Headers(n.headers),
    status: n.status,
    statusText: n.statusText
  }, a = e ? e(r) : r, i = se() ? n.body : await n.blob();
  return new Response(i, a);
}
const re = (s) => new URL(String(s), location.href).href.replace(new RegExp(`^${location.origin}`), "");
function K(s, e) {
  const t = new URL(s);
  for (const n of e)
    t.searchParams.delete(n);
  return t.href;
}
async function ae(s, e, t, n) {
  const r = K(e.url, t);
  if (e.url === r)
    return s.match(e, n);
  const a = Object.assign(Object.assign({}, n), { ignoreSearch: !0 }), i = await s.keys(e, a);
  for (const c of i) {
    const o = K(c.url, t);
    if (r === o)
      return s.match(c, n);
  }
}
class ie {
  /**
   * Creates a promise and exposes its resolve and reject functions as methods.
   */
  constructor() {
    this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
const F = /* @__PURE__ */ new Set();
async function ce() {
  for (const s of F)
    await s();
}
function oe(s) {
  return new Promise((e) => setTimeout(e, s));
}
try {
  self["workbox:strategies:6.6.0"] && _();
} catch {
}
function x(s) {
  return typeof s == "string" ? new Request(s) : s;
}
class le {
  /**
   * Creates a new instance associated with the passed strategy and event
   * that's handling the request.
   *
   * The constructor also initializes the state that will be passed to each of
   * the plugins handling this request.
   *
   * @param {workbox-strategies.Strategy} strategy
   * @param {Object} options
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params] The return value from the
   *     {@link workbox-routing~matchCallback} (if applicable).
   */
  constructor(e, t) {
    this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new ie(), this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = /* @__PURE__ */ new Map();
    for (const n of this._plugins)
      this._pluginStateMap.set(n, {});
    this.event.waitUntil(this._handlerDeferred.promise);
  }
  /**
   * Fetches a given request (and invokes any applicable plugin callback
   * methods) using the `fetchOptions` (for non-navigation requests) and
   * `plugins` defined on the `Strategy` object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - `requestWillFetch()`
   * - `fetchDidSucceed()`
   * - `fetchDidFail()`
   *
   * @param {Request|string} input The URL or request to fetch.
   * @return {Promise<Response>}
   */
  async fetch(e) {
    const { event: t } = this;
    let n = x(e);
    if (n.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
      const i = await t.preloadResponse;
      if (i)
        return i;
    }
    const r = this.hasCallback("fetchDidFail") ? n.clone() : null;
    try {
      for (const i of this.iterateCallbacks("requestWillFetch"))
        n = await i({ request: n.clone(), event: t });
    } catch (i) {
      if (i instanceof Error)
        throw new h("plugin-error-request-will-fetch", {
          thrownErrorMessage: i.message
        });
    }
    const a = n.clone();
    try {
      let i;
      i = await fetch(n, n.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
      for (const c of this.iterateCallbacks("fetchDidSucceed"))
        i = await c({
          event: t,
          request: a,
          response: i
        });
      return i;
    } catch (i) {
      throw r && await this.runCallbacks("fetchDidFail", {
        error: i,
        event: t,
        originalRequest: r.clone(),
        request: a.clone()
      }), i;
    }
  }
  /**
   * Calls `this.fetch()` and (in the background) runs `this.cachePut()` on
   * the response generated by `this.fetch()`.
   *
   * The call to `this.cachePut()` automatically invokes `this.waitUntil()`,
   * so you do not have to manually call `waitUntil()` on the event.
   *
   * @param {Request|string} input The request or URL to fetch and cache.
   * @return {Promise<Response>}
   */
  async fetchAndCachePut(e) {
    const t = await this.fetch(e), n = t.clone();
    return this.waitUntil(this.cachePut(e, n)), t;
  }
  /**
   * Matches a request from the cache (and invokes any applicable plugin
   * callback methods) using the `cacheName`, `matchOptions`, and `plugins`
   * defined on the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cachedResponseWillByUsed()
   *
   * @param {Request|string} key The Request or URL to use as the cache key.
   * @return {Promise<Response|undefined>} A matching response, if found.
   */
  async cacheMatch(e) {
    const t = x(e);
    let n;
    const { cacheName: r, matchOptions: a } = this._strategy, i = await this.getCacheKey(t, "read"), c = Object.assign(Object.assign({}, a), { cacheName: r });
    n = await caches.match(i, c);
    for (const o of this.iterateCallbacks("cachedResponseWillBeUsed"))
      n = await o({
        cacheName: r,
        matchOptions: a,
        cachedResponse: n,
        request: i,
        event: this.event
      }) || void 0;
    return n;
  }
  /**
   * Puts a request/response pair in the cache (and invokes any applicable
   * plugin callback methods) using the `cacheName` and `plugins` defined on
   * the strategy object.
   *
   * The following plugin lifecycle methods are invoked when using this method:
   * - cacheKeyWillByUsed()
   * - cacheWillUpdate()
   * - cacheDidUpdate()
   *
   * @param {Request|string} key The request or URL to use as the cache key.
   * @param {Response} response The response to cache.
   * @return {Promise<boolean>} `false` if a cacheWillUpdate caused the response
   * not be cached, and `true` otherwise.
   */
  async cachePut(e, t) {
    const n = x(e);
    await oe(0);
    const r = await this.getCacheKey(n, "write");
    if (!t)
      throw new h("cache-put-with-no-response", {
        url: re(r.url)
      });
    const a = await this._ensureResponseSafeToCache(t);
    if (!a)
      return !1;
    const { cacheName: i, matchOptions: c } = this._strategy, o = await self.caches.open(i), l = this.hasCallback("cacheDidUpdate"), m = l ? await ae(
      // TODO(philipwalton): the `__WB_REVISION__` param is a precaching
      // feature. Consider into ways to only add this behavior if using
      // precaching.
      o,
      r.clone(),
      ["__WB_REVISION__"],
      c
    ) : null;
    try {
      await o.put(r, l ? a.clone() : a);
    } catch (u) {
      if (u instanceof Error)
        throw u.name === "QuotaExceededError" && await ce(), u;
    }
    for (const u of this.iterateCallbacks("cacheDidUpdate"))
      await u({
        cacheName: i,
        oldResponse: m,
        newResponse: a.clone(),
        request: r,
        event: this.event
      });
    return !0;
  }
  /**
   * Checks the list of plugins for the `cacheKeyWillBeUsed` callback, and
   * executes any of those callbacks found in sequence. The final `Request`
   * object returned by the last plugin is treated as the cache key for cache
   * reads and/or writes. If no `cacheKeyWillBeUsed` plugin callbacks have
   * been registered, the passed request is returned unmodified
   *
   * @param {Request} request
   * @param {string} mode
   * @return {Promise<Request>}
   */
  async getCacheKey(e, t) {
    const n = `${e.url} | ${t}`;
    if (!this._cacheKeys[n]) {
      let r = e;
      for (const a of this.iterateCallbacks("cacheKeyWillBeUsed"))
        r = x(await a({
          mode: t,
          request: r,
          event: this.event,
          // params has a type any can't change right now.
          params: this.params
          // eslint-disable-line
        }));
      this._cacheKeys[n] = r;
    }
    return this._cacheKeys[n];
  }
  /**
   * Returns true if the strategy has at least one plugin with the given
   * callback.
   *
   * @param {string} name The name of the callback to check for.
   * @return {boolean}
   */
  hasCallback(e) {
    for (const t of this._strategy.plugins)
      if (e in t)
        return !0;
    return !1;
  }
  /**
   * Runs all plugin callbacks matching the given name, in order, passing the
   * given param object (merged ith the current plugin state) as the only
   * argument.
   *
   * Note: since this method runs all plugins, it's not suitable for cases
   * where the return value of a callback needs to be applied prior to calling
   * the next callback. See
   * {@link workbox-strategies.StrategyHandler#iterateCallbacks}
   * below for how to handle that case.
   *
   * @param {string} name The name of the callback to run within each plugin.
   * @param {Object} param The object to pass as the first (and only) param
   *     when executing each callback. This object will be merged with the
   *     current plugin state prior to callback execution.
   */
  async runCallbacks(e, t) {
    for (const n of this.iterateCallbacks(e))
      await n(t);
  }
  /**
   * Accepts a callback and returns an iterable of matching plugin callbacks,
   * where each callback is wrapped with the current handler state (i.e. when
   * you call each callback, whatever object parameter you pass it will
   * be merged with the plugin's current state).
   *
   * @param {string} name The name fo the callback to run
   * @return {Array<Function>}
   */
  *iterateCallbacks(e) {
    for (const t of this._strategy.plugins)
      if (typeof t[e] == "function") {
        const n = this._pluginStateMap.get(t);
        yield (a) => {
          const i = Object.assign(Object.assign({}, a), { state: n });
          return t[e](i);
        };
      }
  }
  /**
   * Adds a promise to the
   * [extend lifetime promises]{@link https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises}
   * of the event event associated with the request being handled (usually a
   * `FetchEvent`).
   *
   * Note: you can await
   * {@link workbox-strategies.StrategyHandler~doneWaiting}
   * to know when all added promises have settled.
   *
   * @param {Promise} promise A promise to add to the extend lifetime promises
   *     of the event that triggered the request.
   */
  waitUntil(e) {
    return this._extendLifetimePromises.push(e), e;
  }
  /**
   * Returns a promise that resolves once all promises passed to
   * {@link workbox-strategies.StrategyHandler~waitUntil}
   * have settled.
   *
   * Note: any work done after `doneWaiting()` settles should be manually
   * passed to an event's `waitUntil()` method (not this handler's
   * `waitUntil()` method), otherwise the service worker thread my be killed
   * prior to your work completing.
   */
  async doneWaiting() {
    let e;
    for (; e = this._extendLifetimePromises.shift(); )
      await e;
  }
  /**
   * Stops running the strategy and immediately resolves any pending
   * `waitUntil()` promises.
   */
  destroy() {
    this._handlerDeferred.resolve(null);
  }
  /**
   * This method will call cacheWillUpdate on the available plugins (or use
   * status === 200) to determine if the Response is safe and valid to cache.
   *
   * @param {Request} options.request
   * @param {Response} options.response
   * @return {Promise<Response|undefined>}
   *
   * @private
   */
  async _ensureResponseSafeToCache(e) {
    let t = e, n = !1;
    for (const r of this.iterateCallbacks("cacheWillUpdate"))
      if (t = await r({
        request: this.request,
        response: t,
        event: this.event
      }) || void 0, n = !0, !t)
        break;
    return n || t && t.status !== 200 && (t = void 0), t;
  }
}
class H {
  /**
   * Creates a new instance of the strategy and sets all documented option
   * properties as public instance properties.
   *
   * Note: if a custom strategy class extends the base Strategy class and does
   * not need more than these properties, it does not need to define its own
   * constructor.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] [Plugins]{@link https://developers.google.com/web/tools/workbox/guides/using-plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * [`init`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters)
   * of [non-navigation](https://github.com/GoogleChrome/workbox/issues/1796)
   * `fetch()` requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * [`CacheQueryOptions`]{@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   */
  constructor(e = {}) {
    this.cacheName = R.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions;
  }
  /**
   * Perform a request strategy and returns a `Promise` that will resolve with
   * a `Response`, invoking all relevant plugin callbacks.
   *
   * When a strategy instance is registered with a Workbox
   * {@link workbox-routing.Route}, this method is automatically
   * called when the route matches.
   *
   * Alternatively, this method can be used in a standalone `FetchEvent`
   * listener by passing it to `event.respondWith()`.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   */
  handle(e) {
    const [t] = this.handleAll(e);
    return t;
  }
  /**
   * Similar to {@link workbox-strategies.Strategy~handle}, but
   * instead of just returning a `Promise` that resolves to a `Response` it
   * it will return an tuple of `[response, done]` promises, where the former
   * (`response`) is equivalent to what `handle()` returns, and the latter is a
   * Promise that will resolve once any promises that were added to
   * `event.waitUntil()` as part of performing the strategy have completed.
   *
   * You can await the `done` promise to ensure any extra work performed by
   * the strategy (usually caching responses) completes successfully.
   *
   * @param {FetchEvent|Object} options A `FetchEvent` or an object with the
   *     properties listed below.
   * @param {Request|string} options.request A request to run this strategy for.
   * @param {ExtendableEvent} options.event The event associated with the
   *     request.
   * @param {URL} [options.url]
   * @param {*} [options.params]
   * @return {Array<Promise>} A tuple of [response, done]
   *     promises that can be used to determine when the response resolves as
   *     well as when the handler has completed all its work.
   */
  handleAll(e) {
    e instanceof FetchEvent && (e = {
      event: e,
      request: e.request
    });
    const t = e.event, n = typeof e.request == "string" ? new Request(e.request) : e.request, r = "params" in e ? e.params : void 0, a = new le(this, { event: t, request: n, params: r }), i = this._getResponse(a, n, t), c = this._awaitComplete(i, a, n, t);
    return [i, c];
  }
  async _getResponse(e, t, n) {
    await e.runCallbacks("handlerWillStart", { event: n, request: t });
    let r;
    try {
      if (r = await this._handle(t, e), !r || r.type === "error")
        throw new h("no-response", { url: t.url });
    } catch (a) {
      if (a instanceof Error) {
        for (const i of e.iterateCallbacks("handlerDidError"))
          if (r = await i({ error: a, event: n, request: t }), r)
            break;
      }
      if (!r)
        throw a;
    }
    for (const a of e.iterateCallbacks("handlerWillRespond"))
      r = await a({ event: n, request: t, response: r });
    return r;
  }
  async _awaitComplete(e, t, n, r) {
    let a, i;
    try {
      a = await e;
    } catch {
    }
    try {
      await t.runCallbacks("handlerDidRespond", {
        event: r,
        request: n,
        response: a
      }), await t.doneWaiting();
    } catch (c) {
      c instanceof Error && (i = c);
    }
    if (await t.runCallbacks("handlerDidComplete", {
      event: r,
      request: n,
      response: a,
      error: i
    }), t.destroy(), i)
      throw i;
  }
}
class p extends H {
  /**
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] Cache name to store and retrieve
   * requests. Defaults to the cache names provided by
   * {@link workbox-core.cacheNames}.
   * @param {Array<Object>} [options.plugins] {@link https://developers.google.com/web/tools/workbox/guides/using-plugins|Plugins}
   * to use in conjunction with this caching strategy.
   * @param {Object} [options.fetchOptions] Values passed along to the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters|init}
   * of all fetch() requests made by this strategy.
   * @param {Object} [options.matchOptions] The
   * {@link https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions|CacheQueryOptions}
   * for any `cache.match()` or `cache.put()` calls made by this strategy.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor(e = {}) {
    e.cacheName = R.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(p.copyRedirectedCacheableResponsesPlugin);
  }
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    const n = await t.cacheMatch(e);
    return n || (t.event && t.event.type === "install" ? await this._handleInstall(e, t) : await this._handleFetch(e, t));
  }
  async _handleFetch(e, t) {
    let n;
    const r = t.params || {};
    if (this._fallbackToNetwork) {
      const a = r.integrity, i = e.integrity, c = !i || i === a;
      n = await t.fetch(new Request(e, {
        integrity: e.mode !== "no-cors" ? i || a : void 0
      })), a && c && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await t.cachePut(e, n.clone()));
    } else
      throw new h("missing-precache-entry", {
        cacheName: this.cacheName,
        url: e.url
      });
    return n;
  }
  async _handleInstall(e, t) {
    this._useDefaultCacheabilityPluginIfNeeded();
    const n = await t.fetch(e);
    if (!await t.cachePut(e, n.clone()))
      throw new h("bad-precaching-response", {
        url: e.url,
        status: n.status
      });
    return n;
  }
  /**
   * This method is complex, as there a number of things to account for:
   *
   * The `plugins` array can be set at construction, and/or it might be added to
   * to at any time before the strategy is used.
   *
   * At the time the strategy is used (i.e. during an `install` event), there
   * needs to be at least one plugin that implements `cacheWillUpdate` in the
   * array, other than `copyRedirectedCacheableResponsesPlugin`.
   *
   * - If this method is called and there are no suitable `cacheWillUpdate`
   * plugins, we need to add `defaultPrecacheCacheabilityPlugin`.
   *
   * - If this method is called and there is exactly one `cacheWillUpdate`, then
   * we don't have to do anything (this might be a previously added
   * `defaultPrecacheCacheabilityPlugin`, or it might be a custom plugin).
   *
   * - If this method is called and there is more than one `cacheWillUpdate`,
   * then we need to check if one is `defaultPrecacheCacheabilityPlugin`. If so,
   * we need to remove it. (This situation is unlikely, but it could happen if
   * the strategy is used multiple times, the first without a `cacheWillUpdate`,
   * and then later on after manually adding a custom `cacheWillUpdate`.)
   *
   * See https://github.com/GoogleChrome/workbox/issues/2737 for more context.
   *
   * @private
   */
  _useDefaultCacheabilityPluginIfNeeded() {
    let e = null, t = 0;
    for (const [n, r] of this.plugins.entries())
      r !== p.copyRedirectedCacheableResponsesPlugin && (r === p.defaultPrecacheCacheabilityPlugin && (e = n), r.cacheWillUpdate && t++);
    t === 0 ? this.plugins.push(p.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1);
  }
}
p.defaultPrecacheCacheabilityPlugin = {
  async cacheWillUpdate({ response: s }) {
    return !s || s.status >= 400 ? null : s;
  }
};
p.copyRedirectedCacheableResponsesPlugin = {
  async cacheWillUpdate({ response: s }) {
    return s.redirected ? await ne(s) : s;
  }
};
class he {
  /**
   * Create a new PrecacheController.
   *
   * @param {Object} [options]
   * @param {string} [options.cacheName] The cache to use for precaching.
   * @param {string} [options.plugins] Plugins to use when precaching as well
   * as responding to fetch events for precached assets.
   * @param {boolean} [options.fallbackToNetwork=true] Whether to attempt to
   * get the response from the network if there's a precache miss.
   */
  constructor({ cacheName: e, plugins: t = [], fallbackToNetwork: n = !0 } = {}) {
    this._urlsToCacheKeys = /* @__PURE__ */ new Map(), this._urlsToCacheModes = /* @__PURE__ */ new Map(), this._cacheKeysToIntegrities = /* @__PURE__ */ new Map(), this._strategy = new p({
      cacheName: R.getPrecacheName(e),
      plugins: [
        ...t,
        new te({ precacheController: this })
      ],
      fallbackToNetwork: n
    }), this.install = this.install.bind(this), this.activate = this.activate.bind(this);
  }
  /**
   * @type {workbox-precaching.PrecacheStrategy} The strategy created by this controller and
   * used to cache assets and respond to fetch events.
   */
  get strategy() {
    return this._strategy;
  }
  /**
   * Adds items to the precache list, removing any duplicates and
   * stores the files in the
   * {@link workbox-core.cacheNames|"precache cache"} when the service
   * worker installs.
   *
   * This method can be called multiple times.
   *
   * @param {Array<Object|string>} [entries=[]] Array of entries to precache.
   */
  precache(e) {
    this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0);
  }
  /**
   * This method will add items to the precache list, removing duplicates
   * and ensuring the information is valid.
   *
   * @param {Array<workbox-precaching.PrecacheController.PrecacheEntry|string>} entries
   *     Array of entries to precache.
   */
  addToCacheList(e) {
    const t = [];
    for (const n of e) {
      typeof n == "string" ? t.push(n) : n && n.revision === void 0 && t.push(n.url);
      const { cacheKey: r, url: a } = X(n), i = typeof n != "string" && n.revision ? "reload" : "default";
      if (this._urlsToCacheKeys.has(a) && this._urlsToCacheKeys.get(a) !== r)
        throw new h("add-to-cache-list-conflicting-entries", {
          firstEntry: this._urlsToCacheKeys.get(a),
          secondEntry: r
        });
      if (typeof n != "string" && n.integrity) {
        if (this._cacheKeysToIntegrities.has(r) && this._cacheKeysToIntegrities.get(r) !== n.integrity)
          throw new h("add-to-cache-list-conflicting-integrities", {
            url: a
          });
        this._cacheKeysToIntegrities.set(r, n.integrity);
      }
      if (this._urlsToCacheKeys.set(a, r), this._urlsToCacheModes.set(a, i), t.length > 0) {
        const c = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
        console.warn(c);
      }
    }
  }
  /**
   * Precaches new and updated assets. Call this method from the service worker
   * install event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.InstallResult>}
   */
  install(e) {
    return A(e, async () => {
      const t = new ee();
      this.strategy.plugins.push(t);
      for (const [a, i] of this._urlsToCacheKeys) {
        const c = this._cacheKeysToIntegrities.get(i), o = this._urlsToCacheModes.get(a), l = new Request(a, {
          integrity: c,
          cache: o,
          credentials: "same-origin"
        });
        await Promise.all(this.strategy.handleAll({
          params: { cacheKey: i },
          request: l,
          event: e
        }));
      }
      const { updatedURLs: n, notUpdatedURLs: r } = t;
      return { updatedURLs: n, notUpdatedURLs: r };
    });
  }
  /**
   * Deletes assets that are no longer present in the current precache manifest.
   * Call this method from the service worker activate event.
   *
   * Note: this method calls `event.waitUntil()` for you, so you do not need
   * to call it yourself in your event handlers.
   *
   * @param {ExtendableEvent} event
   * @return {Promise<workbox-precaching.CleanupResult>}
   */
  activate(e) {
    return A(e, async () => {
      const t = await self.caches.open(this.strategy.cacheName), n = await t.keys(), r = new Set(this._urlsToCacheKeys.values()), a = [];
      for (const i of n)
        r.has(i.url) || (await t.delete(i), a.push(i.url));
      return { deletedURLs: a };
    });
  }
  /**
   * Returns a mapping of a precached URL to the corresponding cache key, taking
   * into account the revision information for the URL.
   *
   * @return {Map<string, string>} A URL to cache key mapping.
   */
  getURLsToCacheKeys() {
    return this._urlsToCacheKeys;
  }
  /**
   * Returns a list of all the URLs that have been precached by the current
   * service worker.
   *
   * @return {Array<string>} The precached URLs.
   */
  getCachedURLs() {
    return [...this._urlsToCacheKeys.keys()];
  }
  /**
   * Returns the cache key used for storing a given URL. If that URL is
   * unversioned, like `/index.html', then the cache key will be the original
   * URL with a search parameter appended to it.
   *
   * @param {string} url A URL whose cache key you want to look up.
   * @return {string} The versioned URL that corresponds to a cache key
   * for the original URL, or undefined if that URL isn't precached.
   */
  getCacheKeyForURL(e) {
    const t = new URL(e, location.href);
    return this._urlsToCacheKeys.get(t.href);
  }
  /**
   * @param {string} url A cache key whose SRI you want to look up.
   * @return {string} The subresource integrity associated with the cache key,
   * or undefined if it's not set.
   */
  getIntegrityForCacheKey(e) {
    return this._cacheKeysToIntegrities.get(e);
  }
  /**
   * This acts as a drop-in replacement for
   * [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
   * with the following differences:
   *
   * - It knows what the name of the precache is, and only checks in that cache.
   * - It allows you to pass in an "original" URL without versioning parameters,
   * and it will automatically look up the correct cache key for the currently
   * active revision of that URL.
   *
   * E.g., `matchPrecache('index.html')` will find the correct precached
   * response for the currently active service worker, even if the actual cache
   * key is `'/index.html?__WB_REVISION__=1234abcd'`.
   *
   * @param {string|Request} request The key (without revisioning parameters)
   * to look up in the precache.
   * @return {Promise<Response|undefined>}
   */
  async matchPrecache(e) {
    const t = e instanceof Request ? e.url : e, n = this.getCacheKeyForURL(t);
    if (n)
      return (await self.caches.open(this.strategy.cacheName)).match(n);
  }
  /**
   * Returns a function that looks up `url` in the precache (taking into
   * account revision information), and returns the corresponding `Response`.
   *
   * @param {string} url The precached URL which will be used to lookup the
   * `Response`.
   * @return {workbox-routing~handlerCallback}
   */
  createHandlerBoundToURL(e) {
    const t = this.getCacheKeyForURL(e);
    if (!t)
      throw new h("non-precached-url", { url: e });
    return (n) => (n.request = new Request(e), n.params = Object.assign({ cacheKey: t }, n.params), this.strategy.handle(n));
  }
}
let D;
const E = () => (D || (D = new he()), D);
try {
  self["workbox:routing:6.6.0"] && _();
} catch {
}
const z = "GET", C = (s) => s && typeof s == "object" ? s : { handle: s };
class g {
  /**
   * Constructor for Route class.
   *
   * @param {workbox-routing~matchCallback} match
   * A callback function that determines whether the route matches a given
   * `fetch` event by returning a non-falsy value.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, t, n = z) {
    this.handler = C(t), this.match = e, this.method = n;
  }
  /**
   *
   * @param {workbox-routing-handlerCallback} handler A callback
   * function that returns a Promise resolving to a Response
   */
  setCatchHandler(e) {
    this.catchHandler = C(e);
  }
}
class ue extends g {
  /**
   * If the regular expression contains
   * [capture groups]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#grouping-back-references},
   * the captured values will be passed to the
   * {@link workbox-routing~handlerCallback} `params`
   * argument.
   *
   * @param {RegExp} regExp The regular expression to match against URLs.
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to match the Route
   * against.
   */
  constructor(e, t, n) {
    const r = ({ url: a }) => {
      const i = e.exec(a.href);
      if (i && !(a.origin !== location.origin && i.index !== 0))
        return i.slice(1);
    };
    super(r, t, n);
  }
}
class de {
  /**
   * Initializes a new Router.
   */
  constructor() {
    this._routes = /* @__PURE__ */ new Map(), this._defaultHandlerMap = /* @__PURE__ */ new Map();
  }
  /**
   * @return {Map<string, Array<workbox-routing.Route>>} routes A `Map` of HTTP
   * method name ('GET', etc.) to an array of all the corresponding `Route`
   * instances that are registered.
   */
  get routes() {
    return this._routes;
  }
  /**
   * Adds a fetch event listener to respond to events when a route matches
   * the event's request.
   */
  addFetchListener() {
    self.addEventListener("fetch", (e) => {
      const { request: t } = e, n = this.handleRequest({ request: t, event: e });
      n && e.respondWith(n);
    });
  }
  /**
   * Adds a message event listener for URLs to cache from the window.
   * This is useful to cache resources loaded on the page prior to when the
   * service worker started controlling it.
   *
   * The format of the message data sent from the window should be as follows.
   * Where the `urlsToCache` array may consist of URL strings or an array of
   * URL string + `requestInit` object (the same as you'd pass to `fetch()`).
   *
   * ```
   * {
   *   type: 'CACHE_URLS',
   *   payload: {
   *     urlsToCache: [
   *       './script1.js',
   *       './script2.js',
   *       ['./script3.js', {mode: 'no-cors'}],
   *     ],
   *   },
   * }
   * ```
   */
  addCacheListener() {
    self.addEventListener("message", (e) => {
      if (e.data && e.data.type === "CACHE_URLS") {
        const { payload: t } = e.data, n = Promise.all(t.urlsToCache.map((r) => {
          typeof r == "string" && (r = [r]);
          const a = new Request(...r);
          return this.handleRequest({ request: a, event: e });
        }));
        e.waitUntil(n), e.ports && e.ports[0] && n.then(() => e.ports[0].postMessage(!0));
      }
    });
  }
  /**
   * Apply the routing rules to a FetchEvent object to get a Response from an
   * appropriate Route's handler.
   *
   * @param {Object} options
   * @param {Request} options.request The request to handle.
   * @param {ExtendableEvent} options.event The event that triggered the
   *     request.
   * @return {Promise<Response>|undefined} A promise is returned if a
   *     registered route can handle the request. If there is no matching
   *     route and there's no `defaultHandler`, `undefined` is returned.
   */
  handleRequest({ request: e, event: t }) {
    const n = new URL(e.url, location.href);
    if (!n.protocol.startsWith("http"))
      return;
    const r = n.origin === location.origin, { params: a, route: i } = this.findMatchingRoute({
      event: t,
      request: e,
      sameOrigin: r,
      url: n
    });
    let c = i && i.handler;
    const o = e.method;
    if (!c && this._defaultHandlerMap.has(o) && (c = this._defaultHandlerMap.get(o)), !c)
      return;
    let l;
    try {
      l = c.handle({ url: n, request: e, event: t, params: a });
    } catch (u) {
      l = Promise.reject(u);
    }
    const m = i && i.catchHandler;
    return l instanceof Promise && (this._catchHandler || m) && (l = l.catch(async (u) => {
      if (m)
        try {
          return await m.handle({ url: n, request: e, event: t, params: a });
        } catch (O) {
          O instanceof Error && (u = O);
        }
      if (this._catchHandler)
        return this._catchHandler.handle({ url: n, request: e, event: t });
      throw u;
    })), l;
  }
  /**
   * Checks a request and URL (and optionally an event) against the list of
   * registered routes, and if there's a match, returns the corresponding
   * route along with any params generated by the match.
   *
   * @param {Object} options
   * @param {URL} options.url
   * @param {boolean} options.sameOrigin The result of comparing `url.origin`
   *     against the current origin.
   * @param {Request} options.request The request to match.
   * @param {Event} options.event The corresponding event.
   * @return {Object} An object with `route` and `params` properties.
   *     They are populated if a matching route was found or `undefined`
   *     otherwise.
   */
  findMatchingRoute({ url: e, sameOrigin: t, request: n, event: r }) {
    const a = this._routes.get(n.method) || [];
    for (const i of a) {
      let c;
      const o = i.match({ url: e, sameOrigin: t, request: n, event: r });
      if (o)
        return c = o, (Array.isArray(c) && c.length === 0 || o.constructor === Object && // eslint-disable-line
        Object.keys(o).length === 0 || typeof o == "boolean") && (c = void 0), { route: i, params: c };
    }
    return {};
  }
  /**
   * Define a default `handler` that's called when no routes explicitly
   * match the incoming request.
   *
   * Each HTTP method ('GET', 'POST', etc.) gets its own default handler.
   *
   * Without a default handler, unmatched requests will go against the
   * network as if there were no service worker present.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   * @param {string} [method='GET'] The HTTP method to associate with this
   * default handler. Each method has its own default.
   */
  setDefaultHandler(e, t = z) {
    this._defaultHandlerMap.set(t, C(e));
  }
  /**
   * If a Route throws an error while handling a request, this `handler`
   * will be called and given a chance to provide a response.
   *
   * @param {workbox-routing~handlerCallback} handler A callback
   * function that returns a Promise resulting in a Response.
   */
  setCatchHandler(e) {
    this._catchHandler = C(e);
  }
  /**
   * Registers a route with the router.
   *
   * @param {workbox-routing.Route} route The route to register.
   */
  registerRoute(e) {
    this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e);
  }
  /**
   * Unregisters a route with the router.
   *
   * @param {workbox-routing.Route} route The route to unregister.
   */
  unregisterRoute(e) {
    if (!this._routes.has(e.method))
      throw new h("unregister-route-but-not-found-with-method", {
        method: e.method
      });
    const t = this._routes.get(e.method).indexOf(e);
    if (t > -1)
      this._routes.get(e.method).splice(t, 1);
    else
      throw new h("unregister-route-route-not-registered");
  }
}
let y;
const fe = () => (y || (y = new de(), y.addFetchListener(), y.addCacheListener()), y);
function j(s, e, t) {
  let n;
  if (typeof s == "string") {
    const a = new URL(s, location.href), i = ({ url: c }) => c.href === a.href;
    n = new g(i, e, t);
  } else if (s instanceof RegExp)
    n = new ue(s, e, t);
  else if (typeof s == "function")
    n = new g(s, e, t);
  else if (s instanceof g)
    n = s;
  else
    throw new h("unsupported-route-type", {
      moduleName: "workbox-routing",
      funcName: "registerRoute",
      paramName: "capture"
    });
  return fe().registerRoute(n), n;
}
function pe(s, e = []) {
  for (const t of [...s.searchParams.keys()])
    e.some((n) => n.test(t)) && s.searchParams.delete(t);
  return s;
}
function* ge(s, { ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/], directoryIndex: t = "index.html", cleanURLs: n = !0, urlManipulation: r } = {}) {
  const a = new URL(s, location.href);
  a.hash = "", yield a.href;
  const i = pe(a, e);
  if (yield i.href, t && i.pathname.endsWith("/")) {
    const c = new URL(i.href);
    c.pathname += t, yield c.href;
  }
  if (n) {
    const c = new URL(i.href);
    c.pathname += ".html", yield c.href;
  }
  if (r) {
    const c = r({ url: a });
    for (const o of c)
      yield o.href;
  }
}
class me extends g {
  /**
   * @param {PrecacheController} precacheController A `PrecacheController`
   * instance used to both match requests and respond to fetch events.
   * @param {Object} [options] Options to control how requests are matched
   * against the list of precached URLs.
   * @param {string} [options.directoryIndex=index.html] The `directoryIndex` will
   * check cache entries for a URLs ending with '/' to see if there is a hit when
   * appending the `directoryIndex` value.
   * @param {Array<RegExp>} [options.ignoreURLParametersMatching=[/^utm_/, /^fbclid$/]] An
   * array of regex's to remove search params when looking for a cache match.
   * @param {boolean} [options.cleanURLs=true] The `cleanURLs` option will
   * check the cache for the URL with a `.html` added to the end of the end.
   * @param {workbox-precaching~urlManipulation} [options.urlManipulation]
   * This is a function that should take a URL and return an array of
   * alternative URLs that should be checked for precache matches.
   */
  constructor(e, t) {
    const n = ({ request: r }) => {
      const a = e.getURLsToCacheKeys();
      for (const i of ge(r.url, t)) {
        const c = a.get(i);
        if (c) {
          const o = e.getIntegrityForCacheKey(c);
          return { cacheKey: c, integrity: o };
        }
      }
    };
    super(n, e.strategy);
  }
}
function we(s) {
  const e = E(), t = new me(e, s);
  j(t);
}
function ye(s) {
  return E().getCacheKeyForURL(s);
}
function be(s) {
  return E().matchPrecache(s);
}
function _e(s) {
  E().precache(s);
}
function Re(s, e) {
  _e(s), we(e);
}
function xe(s) {
  F.add(s);
}
function V(s) {
  s.then(() => {
  });
}
function Ce() {
  self.addEventListener("activate", () => self.clients.claim());
}
function ke(s) {
  R.updateDetails(s);
}
const Ee = (s, e) => e.some((t) => s instanceof t);
let S, B;
function ve() {
  return S || (S = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function De() {
  return B || (B = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const $ = /* @__PURE__ */ new WeakMap(), N = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap();
function Le(s) {
  const e = new Promise((t, n) => {
    const r = () => {
      s.removeEventListener("success", a), s.removeEventListener("error", i);
    }, a = () => {
      t(f(s.result)), r();
    }, i = () => {
      n(s.error), r();
    };
    s.addEventListener("success", a), s.addEventListener("error", i);
  });
  return e.then((t) => {
    t instanceof IDBCursor && $.set(t, s);
  }).catch(() => {
  }), M.set(e, s), e;
}
function Ue(s) {
  if (N.has(s))
    return;
  const e = new Promise((t, n) => {
    const r = () => {
      s.removeEventListener("complete", a), s.removeEventListener("error", i), s.removeEventListener("abort", i);
    }, a = () => {
      t(), r();
    }, i = () => {
      n(s.error || new DOMException("AbortError", "AbortError")), r();
    };
    s.addEventListener("complete", a), s.addEventListener("error", i), s.addEventListener("abort", i);
  });
  N.set(s, e);
}
let I = {
  get(s, e, t) {
    if (s instanceof IDBTransaction) {
      if (e === "done")
        return N.get(s);
      if (e === "objectStoreNames")
        return s.objectStoreNames || G.get(s);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return f(s[e]);
  },
  set(s, e, t) {
    return s[e] = t, !0;
  },
  has(s, e) {
    return s instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in s;
  }
};
function Te(s) {
  I = s(I);
}
function Pe(s) {
  return s === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const n = s.call(U(this), e, ...t);
    return G.set(n, e.sort ? e.sort() : [e]), f(n);
  } : De().includes(s) ? function(...e) {
    return s.apply(U(this), e), f($.get(this));
  } : function(...e) {
    return f(s.apply(U(this), e));
  };
}
function Ne(s) {
  return typeof s == "function" ? Pe(s) : (s instanceof IDBTransaction && Ue(s), Ee(s, ve()) ? new Proxy(s, I) : s);
}
function f(s) {
  if (s instanceof IDBRequest)
    return Le(s);
  if (L.has(s))
    return L.get(s);
  const e = Ne(s);
  return e !== s && (L.set(s, e), M.set(e, s)), e;
}
const U = (s) => M.get(s);
function Ie(s, e, { blocked: t, upgrade: n, blocking: r, terminated: a } = {}) {
  const i = indexedDB.open(s, e), c = f(i);
  return n && i.addEventListener("upgradeneeded", (o) => {
    n(f(i.result), o.oldVersion, o.newVersion, f(i.transaction), o);
  }), t && i.addEventListener("blocked", (o) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    o.oldVersion,
    o.newVersion,
    o
  )), c.then((o) => {
    a && o.addEventListener("close", () => a()), r && o.addEventListener("versionchange", (l) => r(l.oldVersion, l.newVersion, l));
  }).catch(() => {
  }), c;
}
function je(s, { blocked: e } = {}) {
  const t = indexedDB.deleteDatabase(s);
  return e && t.addEventListener("blocked", (n) => e(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    n.oldVersion,
    n
  )), f(t).then(() => {
  });
}
const Me = ["get", "getKey", "getAll", "getAllKeys", "count"], Oe = ["put", "add", "delete", "clear"], T = /* @__PURE__ */ new Map();
function W(s, e) {
  if (!(s instanceof IDBDatabase && !(e in s) && typeof e == "string"))
    return;
  if (T.get(e))
    return T.get(e);
  const t = e.replace(/FromIndex$/, ""), n = e !== t, r = Oe.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (n ? IDBIndex : IDBObjectStore).prototype) || !(r || Me.includes(t))
  )
    return;
  const a = async function(i, ...c) {
    const o = this.transaction(i, r ? "readwrite" : "readonly");
    let l = o.store;
    return n && (l = l.index(c.shift())), (await Promise.all([
      l[t](...c),
      r && o.done
    ]))[0];
  };
  return T.set(e, a), a;
}
Te((s) => ({
  ...s,
  get: (e, t, n) => W(e, t) || s.get(e, t, n),
  has: (e, t) => !!W(e, t) || s.has(e, t)
}));
try {
  self["workbox:expiration:6.6.0"] && _();
} catch {
}
const Ae = "workbox-expiration", b = "cache-entries", q = (s) => {
  const e = new URL(s, location.href);
  return e.hash = "", e.href;
};
class Ke {
  /**
   *
   * @param {string} cacheName
   *
   * @private
   */
  constructor(e) {
    this._db = null, this._cacheName = e;
  }
  /**
   * Performs an upgrade of indexedDB.
   *
   * @param {IDBPDatabase<CacheDbSchema>} db
   *
   * @private
   */
  _upgradeDb(e) {
    const t = e.createObjectStore(b, { keyPath: "id" });
    t.createIndex("cacheName", "cacheName", { unique: !1 }), t.createIndex("timestamp", "timestamp", { unique: !1 });
  }
  /**
   * Performs an upgrade of indexedDB and deletes deprecated DBs.
   *
   * @param {IDBPDatabase<CacheDbSchema>} db
   *
   * @private
   */
  _upgradeDbAndDeleteOldDbs(e) {
    this._upgradeDb(e), this._cacheName && je(this._cacheName);
  }
  /**
   * @param {string} url
   * @param {number} timestamp
   *
   * @private
   */
  async setTimestamp(e, t) {
    e = q(e);
    const n = {
      url: e,
      timestamp: t,
      cacheName: this._cacheName,
      // Creating an ID from the URL and cache name won't be necessary once
      // Edge switches to Chromium and all browsers we support work with
      // array keyPaths.
      id: this._getId(e)
    }, a = (await this.getDb()).transaction(b, "readwrite", {
      durability: "relaxed"
    });
    await a.store.put(n), await a.done;
  }
  /**
   * Returns the timestamp stored for a given URL.
   *
   * @param {string} url
   * @return {number | undefined}
   *
   * @private
   */
  async getTimestamp(e) {
    const n = await (await this.getDb()).get(b, this._getId(e));
    return n == null ? void 0 : n.timestamp;
  }
  /**
   * Iterates through all the entries in the object store (from newest to
   * oldest) and removes entries once either `maxCount` is reached or the
   * entry's timestamp is less than `minTimestamp`.
   *
   * @param {number} minTimestamp
   * @param {number} maxCount
   * @return {Array<string>}
   *
   * @private
   */
  async expireEntries(e, t) {
    const n = await this.getDb();
    let r = await n.transaction(b).store.index("timestamp").openCursor(null, "prev");
    const a = [];
    let i = 0;
    for (; r; ) {
      const o = r.value;
      o.cacheName === this._cacheName && (e && o.timestamp < e || t && i >= t ? a.push(r.value) : i++), r = await r.continue();
    }
    const c = [];
    for (const o of a)
      await n.delete(b, o.id), c.push(o.url);
    return c;
  }
  /**
   * Takes a URL and returns an ID that will be unique in the object store.
   *
   * @param {string} url
   * @return {string}
   *
   * @private
   */
  _getId(e) {
    return this._cacheName + "|" + q(e);
  }
  /**
   * Returns an open connection to the database.
   *
   * @private
   */
  async getDb() {
    return this._db || (this._db = await Ie(Ae, 1, {
      upgrade: this._upgradeDbAndDeleteOldDbs.bind(this)
    })), this._db;
  }
}
class Se {
  /**
   * To construct a new CacheExpiration instance you must provide at least
   * one of the `config` properties.
   *
   * @param {string} cacheName Name of the cache to apply restrictions to.
   * @param {Object} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
   * that will be used when calling `delete()` on the cache.
   */
  constructor(e, t = {}) {
    this._isRunning = !1, this._rerunRequested = !1, this._maxEntries = t.maxEntries, this._maxAgeSeconds = t.maxAgeSeconds, this._matchOptions = t.matchOptions, this._cacheName = e, this._timestampModel = new Ke(e);
  }
  /**
   * Expires entries for the given cache and given criteria.
   */
  async expireEntries() {
    if (this._isRunning) {
      this._rerunRequested = !0;
      return;
    }
    this._isRunning = !0;
    const e = this._maxAgeSeconds ? Date.now() - this._maxAgeSeconds * 1e3 : 0, t = await this._timestampModel.expireEntries(e, this._maxEntries), n = await self.caches.open(this._cacheName);
    for (const r of t)
      await n.delete(r, this._matchOptions);
    this._isRunning = !1, this._rerunRequested && (this._rerunRequested = !1, V(this.expireEntries()));
  }
  /**
   * Update the timestamp for the given URL. This ensures the when
   * removing entries based on maximum entries, most recently used
   * is accurate or when expiring, the timestamp is up-to-date.
   *
   * @param {string} url
   */
  async updateTimestamp(e) {
    await this._timestampModel.setTimestamp(e, Date.now());
  }
  /**
   * Can be used to check if a URL has expired or not before it's used.
   *
   * This requires a look up from IndexedDB, so can be slow.
   *
   * Note: This method will not remove the cached entry, call
   * `expireEntries()` to remove indexedDB and Cache entries.
   *
   * @param {string} url
   * @return {boolean}
   */
  async isURLExpired(e) {
    if (this._maxAgeSeconds) {
      const t = await this._timestampModel.getTimestamp(e), n = Date.now() - this._maxAgeSeconds * 1e3;
      return t !== void 0 ? t < n : !0;
    } else
      return !1;
  }
  /**
   * Removes the IndexedDB object store used to keep track of cache expiration
   * metadata.
   */
  async delete() {
    this._rerunRequested = !1, await this._timestampModel.expireEntries(1 / 0);
  }
}
class Be {
  /**
   * @param {ExpirationPluginOptions} config
   * @param {number} [config.maxEntries] The maximum number of entries to cache.
   * Entries used the least will be removed as the maximum is reached.
   * @param {number} [config.maxAgeSeconds] The maximum age of an entry before
   * it's treated as stale and removed.
   * @param {Object} [config.matchOptions] The [`CacheQueryOptions`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/delete#Parameters)
   * that will be used when calling `delete()` on the cache.
   * @param {boolean} [config.purgeOnQuotaError] Whether to opt this cache in to
   * automatic deletion if the available storage quota has been exceeded.
   */
  constructor(e = {}) {
    this.cachedResponseWillBeUsed = async ({ event: t, request: n, cacheName: r, cachedResponse: a }) => {
      if (!a)
        return null;
      const i = this._isResponseDateFresh(a), c = this._getCacheExpiration(r);
      V(c.expireEntries());
      const o = c.updateTimestamp(n.url);
      if (t)
        try {
          t.waitUntil(o);
        } catch {
        }
      return i ? a : null;
    }, this.cacheDidUpdate = async ({ cacheName: t, request: n }) => {
      const r = this._getCacheExpiration(t);
      await r.updateTimestamp(n.url), await r.expireEntries();
    }, this._config = e, this._maxAgeSeconds = e.maxAgeSeconds, this._cacheExpirations = /* @__PURE__ */ new Map(), e.purgeOnQuotaError && xe(() => this.deleteCacheAndMetadata());
  }
  /**
   * A simple helper method to return a CacheExpiration instance for a given
   * cache name.
   *
   * @param {string} cacheName
   * @return {CacheExpiration}
   *
   * @private
   */
  _getCacheExpiration(e) {
    if (e === R.getRuntimeName())
      throw new h("expire-custom-caches-only");
    let t = this._cacheExpirations.get(e);
    return t || (t = new Se(e, this._config), this._cacheExpirations.set(e, t)), t;
  }
  /**
   * @param {Response} cachedResponse
   * @return {boolean}
   *
   * @private
   */
  _isResponseDateFresh(e) {
    if (!this._maxAgeSeconds)
      return !0;
    const t = this._getDateHeaderTimestamp(e);
    if (t === null)
      return !0;
    const n = Date.now();
    return t >= n - this._maxAgeSeconds * 1e3;
  }
  /**
   * This method will extract the data header and parse it into a useful
   * value.
   *
   * @param {Response} cachedResponse
   * @return {number|null}
   *
   * @private
   */
  _getDateHeaderTimestamp(e) {
    if (!e.headers.has("date"))
      return null;
    const t = e.headers.get("date"), r = new Date(t).getTime();
    return isNaN(r) ? null : r;
  }
  /**
   * This is a helper method that performs two operations:
   *
   * - Deletes *all* the underlying Cache instances associated with this plugin
   * instance, by calling caches.delete() on your behalf.
   * - Deletes the metadata from IndexedDB used to keep track of expiration
   * details for each Cache instance.
   *
   * When using cache expiration, calling this method is preferable to calling
   * `caches.delete()` directly, since this will ensure that the IndexedDB
   * metadata is also cleanly removed and open IndexedDB instances are deleted.
   *
   * Note that if you're *not* using cache expiration for a given cache, calling
   * `caches.delete()` and passing in the cache's name should be sufficient.
   * There is no Workbox-specific method needed for cleanup in that case.
   */
  async deleteCacheAndMetadata() {
    for (const [e, t] of this._cacheExpirations)
      await self.caches.delete(e), await t.delete();
    this._cacheExpirations = /* @__PURE__ */ new Map();
  }
}
class We extends H {
  /**
   * @private
   * @param {Request|string} request A request to run this strategy for.
   * @param {workbox-strategies.StrategyHandler} handler The event that
   *     triggered the request.
   * @return {Promise<Response>}
   */
  async _handle(e, t) {
    let n = await t.cacheMatch(e), r;
    if (!n)
      try {
        n = await t.fetchAndCachePut(e);
      } catch (a) {
        a instanceof Error && (r = a);
      }
    if (!n)
      throw new h("no-response", { url: e.url, error: r });
    return n;
  }
}
const qe = new RegExp("/[^/?]+\\.[^/]+$"), P = self.location.origin + "/index.html";
function Fe({ request: s, url: e }) {
  return !(s.mode !== "navigate" || e.pathname.match(qe));
}
async function He({ event: s, request: e }) {
  var o;
  if ("onLine" in navigator && !navigator.onLine)
    return ((o = this == null ? void 0 : this.offlineDocument) == null ? void 0 : o.clone()) || fetch(e);
  const t = ye(P), n = await be(P), r = new AbortController();
  let a;
  try {
    if (a = await fetch(t || P, { cache: "reload", signal: r.signal }), !n)
      return new Response(a.body, a);
  } catch (l) {
    if (!n)
      throw l;
    return k.from(n);
  }
  const i = a == null ? void 0 : a.headers.get("etag"), c = n == null ? void 0 : n.headers.get("etag");
  return i && i === c ? (r.abort(), k.from(n)) : new Response(a.body, a);
}
class ze extends g {
  constructor(e) {
    super(Fe, He.bind({ offlineDocument: e }), "GET");
  }
}
class k extends Response {
  static async from(e) {
    const t = await e.text(), n = new Headers(e.headers);
    n.set("Content-Type", "text/html; charset=utf-8");
    const r = { ...e, headers: n };
    return new k(t.replace("<body>", "<body><script>window.__isDocumentCached=true<\/script>"), r);
  }
  constructor(e, t) {
    super(e, t);
  }
}
function Ve(s) {
  return typeof s == "string" ? s : s.url;
}
const $e = "cowswap", Ge = "1.48.13", Qe = "CoW Swap", Je = "index.js", Ye = "", Ze = "ISC", Xe = {
  enabledApps: "cowswap-frontend cowswap-frontend-e2e abis ui ui-utils widget-lib widget-react"
}, et = {
  start: "nx run cowswap-frontend:serve",
  build: "cross-env NODE_OPTIONS=--max-old-space-size=32768 nx build cowswap-frontend",
  "ipfs:build": 'PUBLIC_URL="." yarn build',
  "ipfs:publish": "npx ipfs-deploy build -p pinata -O",
  preview: "cross-env NODE_OPTIONS=--max-old-space-size=32768 nx run cowswap-frontend:preview",
  "cosmos:export": "cross-env NODE_OPTIONS=--max-old-space-size=32768 nx run cowswap-frontend:cosmos:export",
  cosmos: "nx run cowswap-frontend:cosmos:run",
  test: "nx run-many -t test --output-style=stream",
  e2e: "nx run-many -t e2e",
  lint: "nx run-many -t lint",
  prebuild: "nx run cowswap-frontend:i18n",
  prepare: "husky install",
  postinstall: "yarn run patch-package",
  "analyze-build": "cross-env ANALYZE_BUNDLE=true ANALYZE_BUNDLE_TEMPLATE=sunburst yarn build"
}, tt = {
  crypto: !1
}, st = {
  production: [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  development: [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}, nt = {
  transformIgnorePatterns: [
    "node_modules/(?!@ledgerhq/connect-kit-loader)"
  ]
}, rt = {
  "@1inch/permit-signed-approvals-utils": "^1.4.8",
  "@amplitude/analytics-browser": "^1.1.4",
  "@babel/runtime": "^7.17.0",
  "@coinbase/wallet-sdk": "^3.3.0",
  "@cowprotocol/app-data": "^1.1.0-RC.0",
  "@cowprotocol/contracts": "^1.3.1",
  "@cowprotocol/cow-runner-game": "^0.2.9",
  "@cowprotocol/cow-sdk": "^3.0.0-rc.0",
  "@cowprotocol/ethflowcontract": "cowprotocol/ethflowcontract.git#v1.0.0-artifacts",
  "@davatar/react": "1.8.1",
  "@ethersproject/bignumber": "^5.7.0",
  "@ethersproject/experimental": "^5.7.0",
  "@ethvault/iframe-provider": "^0.1.10",
  "@fontsource/ibm-plex-mono": "^4.5.1",
  "@fontsource/inter": "^4.5.1",
  "@ledgerhq/connect-kit-loader": "^1.0.2",
  "@lingui/cli": "^4.3.0",
  "@lingui/core": "^4.3.0",
  "@lingui/macro": "^4.3.0",
  "@lingui/react": "^4.3.0",
  "@metamask/eth-sig-util": "^5.0.2",
  "@metamask/jazzicon": "^2.0.0",
  "@popperjs/core": "^2.4.4",
  "@reach/dialog": "^0.18.0",
  "@reach/menu-button": "^0.18.0",
  "@reach/portal": "^0.18.0",
  "@react-hook/window-scroll": "^1.3.0",
  "@react-spring/web": "^9.6.1",
  "@reduxjs/toolkit": "^1.8.0",
  "@safe-global/api-kit": "^1.3.0",
  "@safe-global/protocol-kit": "^1.2.0",
  "@safe-global/safe-core-sdk-types": "^2.2.0",
  "@safe-global/safe-ethers-lib": "^1.9.4",
  "@sentry/react": "^7.64.0",
  "@sentry/tracing": "^7.3.0",
  "@sentry/webpack-plugin": "^1.17.1",
  "@swc/helpers": "~0.5.0",
  "@trezor/connect-plugin-ethereum": "^9.0.1",
  "@trezor/connect-web": "^9.0.11",
  "@types/hdkey": "^2.0.1",
  "@uniswap/default-token-list": "^11.5.0",
  "@uniswap/redux-multicall": "^1.1.5",
  "@uniswap/sdk-core": "^3.0.1",
  "@uniswap/token-lists": "^1.0.0-beta.30",
  "@use-gesture/react": "^10.2.23",
  "@walletconnect/ethereum-provider": "^2.10.2",
  "@web3-react/coinbase-wallet": "^8.2.3",
  "@web3-react/core": "^8.2.3",
  "@web3-react/eip1193": "^8.2.3",
  "@web3-react/empty": "^8.2.3",
  "@web3-react/gnosis-safe": "^8.2.4",
  "@web3-react/metamask": "^8.2.4",
  "@web3-react/network": "^8.2.3",
  "@web3-react/url": "^8.2.3",
  "@web3-react/walletconnect-v2": "^8.5.1",
  "bnc-sdk": "^4.6.0",
  buffer: "^6.0.3",
  cids: "^1.0.0",
  "clone-deep": "^4.0.1",
  "copy-to-clipboard": "^3.2.0",
  "cross-env": "^7.0.3",
  d3: "^7.8.1",
  "date-fns": "^2.29.3",
  ethers: "^5.1.4",
  "exponential-backoff": "^3.1.1",
  "fast-deep-equal": "^3.1.3",
  "fast-safe-stringify": "^2.0.8",
  fortmatic: "^2.2.1",
  "fraction.js": "^4.2.0",
  graphql: "^16.8.0",
  "graphql-request": "4.3.0",
  hdkey: "^2.1.0",
  immer: "^10.0.2",
  "inter-ui": "^3.19.3",
  "ipfs-deploy": "^8.0.1",
  "ipfs-http-client": "^52.0.3",
  jotai: "2.2.0",
  jsbi: "^3.1.4",
  "launchdarkly-react-client-sdk": "^3.0.4",
  "lightweight-charts": "^3.3.0",
  limiter: "^2.1.0",
  "make-plural": "^7.0.0",
  ms: "^2.1.3",
  "ms.macro": "^2.0.0",
  multicodec: "^3.0.1",
  multihashes: "^4.0.2",
  "node-vibrant": "^3.2.1-alpha.1",
  polished: "^3.3.2",
  "polyfill-object.fromentries": "^1.0.1",
  "popper-max-size-modifier": "^0.2.0",
  react: "18.2.0",
  "react-appzi": "^1.0.4",
  "react-confetti": "^6.1.0",
  "react-device-detect": "^1.6.2",
  "react-dom": "18.2.0",
  "react-feather": "^2.0.8",
  "react-ga4": "^1.4.1",
  "react-helmet": "^6.1.0",
  "react-inlinesvg": "^3.0.1",
  "react-is": "18.2.0",
  "react-markdown": "^5.0.3",
  "react-popper": "^2.2.3",
  "react-redux": "^8.0.2",
  "react-router-dom": "^6.6.2",
  "react-router-hash-link": "^2.4.3",
  "react-scripts": "5.0.1",
  "react-virtualized-auto-sizer": "^1.0.2",
  "react-window": "^1.8.5",
  rebass: "^4.0.7",
  redux: "^4.1.2",
  "redux-localstorage-simple": "^2.3.1",
  setimmediate: "^1.0.5",
  "simple-sitemap-renderer": "^1.1.0",
  "styled-components": "5.3.6",
  "styled-jsx": "5.1.2",
  swr: "^2.2.0",
  "text-encoding-polyfill": "^0.6.7",
  "timeago.js": "^4.0.2",
  "tiny-invariant": "^1.2.0",
  tslib: "^2.3.0",
  "ua-parser-js": "^1.0.32",
  "use-async-memo": "^1.2.4",
  "use-count-up": "^2.2.5",
  "use-resize-observer": "^8.0.0",
  "wcag-contrast": "^3.0.0",
  "web-vitals": "^2.1.4"
}, at = {
  "@babel/preset-react": "^7.14.5",
  "@commitlint/cli": "^17.6.7",
  "@commitlint/config-conventional": "^17.6.7",
  "@lingui/swc-plugin": "^4.0.4",
  "@lingui/vite-plugin": "^4.3.0",
  "@nx/cypress": "16.4.0",
  "@nx/eslint-plugin": "16.4.0",
  "@nx/jest": "16.5.5",
  "@nx/js": "16.5.5",
  "@nx/linter": "16.4.0",
  "@nx/react": "16.4.0",
  "@nx/vite": "16.4.0",
  "@nx/workspace": "16.4.0",
  "@sentry/vite-plugin": "^2.7.0",
  "@swc/cli": "~0.1.62",
  "@swc/core": "~1.3.51",
  "@testing-library/react": "14.0.0",
  "@testing-library/react-hooks": "^8.0.1",
  "@typechain/ethers-v5": "^10.2.0",
  "@types/clone-deep": "^4.0.1",
  "@types/d3": "^7.4.0",
  "@types/jest": "^29.4.0",
  "@types/ms": "^0.7.31",
  "@types/ms.macro": "^2.0.0",
  "@types/node": "18.14.2",
  "@types/react": "18.2.14",
  "@types/react-dom": "18.2.6",
  "@types/react-helmet": "^6.1.6",
  "@types/react-is": "18.2.1",
  "@types/react-router-hash-link": "^2.4.5",
  "@types/react-virtualized-auto-sizer": "^1.0.1",
  "@types/react-window": "^1.8.5",
  "@types/rebass": "^4.0.10",
  "@types/styled-components": "5.1.26",
  "@types/ua-parser-js": "^0.7.36",
  "@types/wcag-contrast": "^3.0.0",
  "@typescript-eslint/eslint-plugin": "^6.2.0",
  "@typescript-eslint/parser": "^6.2.0",
  "@vitejs/plugin-react": "~4.0.0",
  "@vitejs/plugin-react-swc": "^3.3.2",
  "@vitest/coverage-c8": "~0.32.0",
  "@vitest/ui": "~0.32.0",
  "@web3-react/types": "^8.2.3",
  "babel-jest": "^29.6.2",
  "babel-plugin-styled-components": "2.1.4",
  "babel-plugin-transform-import-meta": "^2.2.0",
  cypress: "^12.16.0",
  eslint: "~8.15.0",
  "eslint-config-prettier": "8.1.0",
  "eslint-config-react-app": "^7.0.1",
  "eslint-plugin-cypress": "^2.10.3",
  "eslint-plugin-import": "2.27.5",
  "eslint-plugin-jest": "^27.2.3",
  "eslint-plugin-jsx-a11y": "6.7.1",
  "eslint-plugin-react": "7.32.2",
  "eslint-plugin-react-hooks": "4.6.0",
  "eslint-plugin-unused-imports": "^3.0.0",
  husky: "^8.0.3",
  "isomorphic-fetch": "^3.0.0",
  jest: "^29.4.1",
  "jest-environment-jsdom": "^29.4.1",
  "jest-fetch-mock": "^3.0.3",
  "jest-styled-components": "^7.1.1",
  jsdom: "~22.1.0",
  "node-stdlib-browser": "^1.2.0",
  nx: "16.4.0",
  "nx-cloud": "latest",
  "patch-package": "^8.0.0",
  prettier: "^2.6.2",
  "react-cosmos": "^6.0.0-beta.6",
  "react-cosmos-plugin-vite": "^6.0.0-beta.6",
  "rollup-plugin-visualizer": "^5.9.2",
  "ts-jest": "^29.1.1",
  "ts-mockito": "^2.6.1",
  "ts-node": "^10.9.1",
  typescript: "~5.1.3",
  vite: "~4.3.9",
  "vite-plugin-babel-macros": "^1.0.6",
  "vite-plugin-dts": "~2.3.0",
  "vite-plugin-node-polyfills": "^0.12.0",
  "vite-plugin-pwa": "^0.16.4",
  "vite-plugin-svgr": "^3.2.0",
  "vite-tsconfig-paths": "~4.2.0",
  vitest: "~0.32.0"
}, it = {
  name: $e,
  version: Ge,
  description: Qe,
  main: Je,
  author: Ye,
  license: Ze,
  config: Xe,
  scripts: et,
  browser: tt,
  browserslist: st,
  jest: nt,
  dependencies: rt,
  devDependencies: at
}, ct = it.version;
ke({
  prefix: "CowSwap",
  suffix: ct
});
Ce();
self.skipWaiting();
const ot = ["emergency.js"];
j(new ze());
const { assets: lt, entries: ht } = [{"revision":"7f71da412f2bc47932cc9e426f619a47","url":"451.html"},{"revision":null,"url":"assets/@1inch-7b4035dc.js"},{"revision":null,"url":"assets/@safe-global-633a0012.js"},{"revision":null,"url":"assets/@sentry-1c3322c9.js"},{"revision":null,"url":"assets/@uniswap-f6fab09c.js"},{"revision":null,"url":"assets/200-offline-sprite-3f17a229.png"},{"revision":null,"url":"assets/ajv-038bb3f7.js"},{"revision":null,"url":"assets/ajv-c071a6b8.js"},{"revision":null,"url":"assets/alert-circle-f7d0536d.svg"},{"revision":null,"url":"assets/alert-fb3adbca.svg"},{"revision":null,"url":"assets/alpha-8603e69e.svg"},{"revision":null,"url":"assets/ambire-8b36ecf6.svg"},{"revision":null,"url":"assets/amms-graph-e3ec73c3.svg"},{"revision":null,"url":"assets/amms-graph-gc-b53501ba.svg"},{"revision":null,"url":"assets/arrow-33042343.svg"},{"revision":null,"url":"assets/arrow-4f2d03b3.svg"},{"revision":null,"url":"assets/arrow-right-1aa5145e.svg"},{"revision":null,"url":"assets/arrowDownRight-7fef5032.svg"},{"revision":null,"url":"assets/Balances-e2b2f8bf.js"},{"revision":null,"url":"assets/browser-bec4ef1e.js"},{"revision":null,"url":"assets/carret-down-4406628d.svg"},{"revision":null,"url":"assets/check-23fdef2f.svg"},{"revision":null,"url":"assets/check-886fc2bc.svg"},{"revision":null,"url":"assets/check-singular-2ac9776b.svg"},{"revision":null,"url":"assets/checkmark-f875ef86.svg"},{"revision":null,"url":"assets/code-61e471f9.svg"},{"revision":null,"url":"assets/coinbase-85fd12d6.svg"},{"revision":null,"url":"assets/cookie-policy-bb820033.svg"},{"revision":null,"url":"assets/CookiePolicy-c4eab283.md"},{"revision":null,"url":"assets/cow_v2-6594a338.svg"},{"revision":null,"url":"assets/cow-404-8034d219.png"},{"revision":null,"url":"assets/cow-4fec6252.svg"},{"revision":null,"url":"assets/cow-graph-46ac7f10.svg"},{"revision":null,"url":"assets/cow-meditating-eae6fb8a.svg"},{"revision":null,"url":"assets/cow-meditating-smoooth-2eb03f85.svg"},{"revision":null,"url":"assets/cow-no-connection-09c37a21.png"},{"revision":null,"url":"assets/CowError-514bd84e.png"},{"revision":null,"url":"assets/cowprotocol-d73ac937.svg"},{"revision":null,"url":"assets/cowswap-diagram-2f83860c.png"},{"revision":null,"url":"assets/crypto-es-e3b77152.js"},{"revision":null,"url":"assets/discord-80c83ddd.svg"},{"revision":null,"url":"assets/doc-9665c555.svg"},{"revision":null,"url":"assets/dropdown-7f4c7bf6.svg"},{"revision":null,"url":"assets/en-US-c822c361.js"},{"revision":null,"url":"assets/etherscan-icon-7359199d.svg"},{"revision":null,"url":"assets/EthFlowFaq-6a8e2259.js"},{"revision":null,"url":"assets/exclamation-67915e7d.svg"},{"revision":null,"url":"assets/feedback-2c15842f.svg"},{"revision":null,"url":"assets/finish-5080545e.svg"},{"revision":null,"url":"assets/fortune-cookie-8267d490.png"},{"revision":null,"url":"assets/fortuneCookieHalloween-c245e881.svg"},{"revision":null,"url":"assets/gas-free-b6054be7.svg"},{"revision":null,"url":"assets/gasless-5382501b.png"},{"revision":null,"url":"assets/getAccountsList-bd87dfba.js"},{"revision":null,"url":"assets/Governance-1898ba6a.js"},{"revision":null,"url":"assets/halloween-spider-8ef09bba.svg"},{"revision":null,"url":"assets/index-07668258.js"},{"revision":null,"url":"assets/index-2fa6c025.js"},{"revision":null,"url":"assets/index-332c03e7.js"},{"revision":null,"url":"assets/index-3a7f8c20.js"},{"revision":null,"url":"assets/index-43c0f393.css"},{"revision":null,"url":"assets/index-4e69c1f5.css"},{"revision":null,"url":"assets/index-52acac39.js"},{"revision":null,"url":"assets/index-63017057.js"},{"revision":null,"url":"assets/index-639e4755.js"},{"revision":null,"url":"assets/index-70819ebb.js"},{"revision":null,"url":"assets/index-714e7428.js"},{"revision":null,"url":"assets/index-840d7245.js"},{"revision":null,"url":"assets/index-89c829bd.js"},{"revision":null,"url":"assets/index-90e7b1ec.js"},{"revision":null,"url":"assets/index-a8326b27.js"},{"revision":null,"url":"assets/index-b99409e3.js"},{"revision":null,"url":"assets/index-cc264156.js"},{"revision":null,"url":"assets/index-d8732d67.js"},{"revision":null,"url":"assets/index-e118e759.js"},{"revision":null,"url":"assets/index-eb171b0d.js"},{"revision":null,"url":"assets/index-fddbf0d5.js"},{"revision":null,"url":"assets/index-fe3c23b2.js"},{"revision":null,"url":"assets/index-ffeca1c9.js"},{"revision":null,"url":"assets/info-3c370aa6.svg"},{"revision":null,"url":"assets/Inter-Black-8b21d5be.woff"},{"revision":null,"url":"assets/Inter-Black-fc10113c.woff2"},{"revision":null,"url":"assets/Inter-BlackItalic-87235581.woff"},{"revision":null,"url":"assets/Inter-BlackItalic-bc80081d.woff2"},{"revision":null,"url":"assets/Inter-Bold-3e242080.woff"},{"revision":null,"url":"assets/Inter-Bold-c63158ba.woff2"},{"revision":null,"url":"assets/Inter-BoldItalic-3f211964.woff2"},{"revision":null,"url":"assets/Inter-BoldItalic-ace8e094.woff"},{"revision":null,"url":"assets/Inter-ExtraBold-307d9809.woff2"},{"revision":null,"url":"assets/Inter-ExtraBold-f053602c.woff"},{"revision":null,"url":"assets/Inter-ExtraBoldItalic-6deefddf.woff"},{"revision":null,"url":"assets/Inter-ExtraBoldItalic-cf6b1d6c.woff2"},{"revision":null,"url":"assets/Inter-ExtraLight-015dad27.woff"},{"revision":null,"url":"assets/Inter-ExtraLight-b6cd094a.woff2"},{"revision":null,"url":"assets/Inter-ExtraLightItalic-32e53d8a.woff"},{"revision":null,"url":"assets/Inter-ExtraLightItalic-db229bf3.woff2"},{"revision":null,"url":"assets/Inter-Italic-900058df.woff2"},{"revision":null,"url":"assets/Inter-Italic-cd1eda97.woff"},{"revision":null,"url":"assets/Inter-italic.var-d1401419.woff2"},{"revision":null,"url":"assets/Inter-Light-36b86832.woff2"},{"revision":null,"url":"assets/Inter-Light-4871aed0.woff"},{"revision":null,"url":"assets/Inter-LightItalic-737ac201.woff2"},{"revision":null,"url":"assets/Inter-LightItalic-7d291e85.woff"},{"revision":null,"url":"assets/Inter-Medium-1b498b95.woff2"},{"revision":null,"url":"assets/Inter-Medium-53deda46.woff"},{"revision":null,"url":"assets/Inter-MediumItalic-205c8989.woff"},{"revision":null,"url":"assets/Inter-MediumItalic-81600858.woff2"},{"revision":null,"url":"assets/Inter-Regular-d612f121.woff2"},{"revision":null,"url":"assets/Inter-Regular-ef1f23c0.woff"},{"revision":null,"url":"assets/Inter-roman.var-17fe38ab.woff2"},{"revision":null,"url":"assets/Inter-SemiBold-15226129.woff2"},{"revision":null,"url":"assets/Inter-SemiBold-653fed7a.woff"},{"revision":null,"url":"assets/Inter-SemiBoldItalic-3b6df7d0.woff2"},{"revision":null,"url":"assets/Inter-SemiBoldItalic-95e68b6b.woff"},{"revision":null,"url":"assets/Inter-Thin-77d96c1c.woff2"},{"revision":null,"url":"assets/Inter-Thin-e6bced8e.woff"},{"revision":null,"url":"assets/Inter-ThinItalic-70648e9b.woff"},{"revision":null,"url":"assets/Inter-ThinItalic-d82beee8.woff2"},{"revision":null,"url":"assets/Inter.var-85f08b5f.woff2"},{"revision":null,"url":"assets/keystone-a4b8705f.svg"},{"revision":null,"url":"assets/ledger-b6fbbd33.svg"},{"revision":null,"url":"assets/LedgerConnector-a7419212.js"},{"revision":null,"url":"assets/LimitOrdersFaq-35dc56e8.js"},{"revision":null,"url":"assets/meditating-cow-v2-8bd39475.svg"},{"revision":null,"url":"assets/metamask-62367d96.png"},{"revision":null,"url":"assets/mev-cd2370fa.png"},{"revision":null,"url":"assets/moon-80748a04.svg"},{"revision":null,"url":"assets/network-gnosis-chain-logo-88a56a07.svg"},{"revision":null,"url":"assets/network-goerli-logo-2b81b421.svg"},{"revision":null,"url":"assets/network-mainnet-logo-ac64fb79.svg"},{"revision":null,"url":"assets/ninja-cow-1671b6bf.png"},{"revision":null,"url":"assets/order-cancelled-30b7b21f.svg"},{"revision":null,"url":"assets/order-check-c479eb19.svg"},{"revision":null,"url":"assets/order-expired-6d98c3a9.svg"},{"revision":null,"url":"assets/order-open-1d1a4a27.svg"},{"revision":null,"url":"assets/order-presignature-pending-3a93c51e.svg"},{"revision":null,"url":"assets/orderExecution-a9a2bda8.svg"},{"revision":null,"url":"assets/pie-2b2204f7.svg"},{"revision":null,"url":"assets/plus-f37adae3.svg"},{"revision":null,"url":"assets/priceLegacy-0b076979.js"},{"revision":null,"url":"assets/privacy-policy-40295a4e.svg"},{"revision":null,"url":"assets/PrivacyPolicy-383d8d4c.md"},{"revision":null,"url":"assets/protection-fedb3903.svg"},{"revision":null,"url":"assets/ProtocolFaq-23025b37.js"},{"revision":null,"url":"assets/pseudo-00e04d24.js"},{"revision":null,"url":"assets/question-417f2a1b.svg"},{"revision":null,"url":"assets/refund-fb2e75b0.svg"},{"revision":null,"url":"assets/safe-logo-913894d2.svg"},{"revision":null,"url":"assets/savings-2cc00aa6.svg"},{"revision":null,"url":"assets/send-46c81161.svg"},{"revision":null,"url":"assets/sun-8764fc46.svg"},{"revision":null,"url":"assets/surplus-cow-436cf52b.svg"},{"revision":null,"url":"assets/tally-bbe8bd56.svg"},{"revision":null,"url":"assets/terms-and-conditions-7d8624f0.svg"},{"revision":null,"url":"assets/TermsAndConditions-492afb8a.md"},{"revision":null,"url":"assets/TokenFaq-54d13008.js"},{"revision":null,"url":"assets/tokenlist-c4ca8613.svg"},{"revision":null,"url":"assets/TradingFaq-530af702.js"},{"revision":null,"url":"assets/trezor-6b8eebc8.svg"},{"revision":null,"url":"assets/trust-b344aa17.svg"},{"revision":null,"url":"assets/twitter-58675fb2.svg"},{"revision":null,"url":"assets/uri.all-df61ea75.js"},{"revision":null,"url":"assets/useTransactionConfirmationModal-34a373fd.js"},{"revision":null,"url":"assets/vCOW-e2f5f5aa.png"},{"revision":null,"url":"assets/wallet-plus-6b9e9301.svg"},{"revision":null,"url":"assets/walletConnectIcon-a3334c32.svg"},{"revision":null,"url":"assets/web3-85f74eb2.js"},{"revision":null,"url":"assets/x-431a09e7.svg"},{"revision":null,"url":"assets/x-ab5cb994.svg"},{"revision":"69be34d95298bc9a253d8a645fbb02e4","url":"emergency.js"},{"revision":"aa40cc219d2a1254a2b00a0cfe181013","url":"favicon.png"},{"revision":"6718c2681ffa562474407218ac0b08ae","url":"fonts/Inter-roman.var.woff2"},{"revision":"22ac5c0445f4ef3a2c9a71cd563e7506","url":"images/og-meta-cowswap.png"},{"revision":"ceca962366dd38803c361c9efa945439","url":"images/og-meta-halloween.png"},{"revision":"2507be3bcf190f4f699fb45e722a52b3","url":"index.html"},{"revision":"5e4a3788c72e63e0061de31667f7a4c8","url":"manifest.json"},{"revision":"9e19f4d78439a33a3d58072c822b3362","url":"manifest.webmanifest"}].reduce(
  (s, e) => {
    const { assets: t, entries: n } = s;
    return typeof e == "string" ? t[e] = !0 : e.revision ? ot.includes(e.url) || n.push(e) : t[Ve(e)] = !0, s;
  },
  { assets: {}, entries: [] }
);
j(
  new g(
    ({ url: s }) => lt[s.pathname.slice(1)],
    new We({
      cacheName: "assets",
      plugins: [new Be({ maxEntries: 16 })]
    })
  )
);
Re(ht);
