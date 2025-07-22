/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/provider/animepahe/episodes/route";
exports.ids = ["app/api/provider/animepahe/episodes/route"];
exports.modules = {

/***/ "(rsc)/./app/api/provider/animepahe/episodes/route.js":
/*!******************************************************!*\
  !*** ./app/api/provider/animepahe/episodes/route.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n// app/api/animepahe/episodes/route.js\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const id = searchParams.get('id');\n    if (!id) {\n        return new Response(JSON.stringify({\n            error: 'Missing id parameter'\n        }), {\n            status: 400\n        });\n    }\n    const externalApiUrl = `https://no-drab.vercel.app/anime/animepahe/info/${id}`;\n    try {\n        const response = await fetch(externalApiUrl);\n        if (!response.ok) {\n            return new Response(JSON.stringify({\n                error: 'Failed to fetch data'\n            }), {\n                status: 500\n            });\n        }\n        const data = await response.json();\n        const episodes = data.episodes || [];\n        return Response.json(episodes);\n    } catch (error) {\n        return new Response(JSON.stringify({\n            error: 'Something went wrong'\n        }), {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb3ZpZGVyL2FuaW1lcGFoZS9lcGlzb2Rlcy9yb3V0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0NBQXNDO0FBRS9CLGVBQWVBLElBQUlDLE9BQU87SUFDN0IsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixRQUFRRyxHQUFHO0lBQzVDLE1BQU1DLEtBQUtILGFBQWFJLEdBQUcsQ0FBQztJQUU1QixJQUFJLENBQUNELElBQUk7UUFDUCxPQUFPLElBQUlFLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQztZQUFFQyxPQUFPO1FBQXVCLElBQUk7WUFDckVDLFFBQVE7UUFDVjtJQUNGO0lBRUEsTUFBTUMsaUJBQWlCLENBQUMsZ0RBQWdELEVBQUVQLElBQUk7SUFFOUUsSUFBSTtRQUNGLE1BQU1RLFdBQVcsTUFBTUMsTUFBTUY7UUFFN0IsSUFBSSxDQUFDQyxTQUFTRSxFQUFFLEVBQUU7WUFDaEIsT0FBTyxJQUFJUixTQUFTQyxLQUFLQyxTQUFTLENBQUM7Z0JBQUVDLE9BQU87WUFBdUIsSUFBSTtnQkFDckVDLFFBQVE7WUFDVjtRQUNGO1FBRUEsTUFBTUssT0FBTyxNQUFNSCxTQUFTSSxJQUFJO1FBQ2hDLE1BQU1DLFdBQVdGLEtBQUtFLFFBQVEsSUFBSSxFQUFFO1FBRXBDLE9BQU9YLFNBQVNVLElBQUksQ0FBQ0M7SUFDdkIsRUFBRSxPQUFPUixPQUFPO1FBQ2QsT0FBTyxJQUFJSCxTQUFTQyxLQUFLQyxTQUFTLENBQUM7WUFBRUMsT0FBTztRQUF1QixJQUFJO1lBQ3JFQyxRQUFRO1FBQ1Y7SUFDRjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGxvcmRyXFxEb3dubG9hZHNcXEFuaVRlYW1zLW1haW5cXGFwcFxcYXBpXFxwcm92aWRlclxcYW5pbWVwYWhlXFxlcGlzb2Rlc1xccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwL2FwaS9hbmltZXBhaGUvZXBpc29kZXMvcm91dGUuanNcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdCkge1xyXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xyXG4gICAgY29uc3QgaWQgPSBzZWFyY2hQYXJhbXMuZ2V0KCdpZCcpO1xyXG4gIFxyXG4gICAgaWYgKCFpZCkge1xyXG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdNaXNzaW5nIGlkIHBhcmFtZXRlcicgfSksIHtcclxuICAgICAgICBzdGF0dXM6IDQwMCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBjb25zdCBleHRlcm5hbEFwaVVybCA9IGBodHRwczovL25vLWRyYWIudmVyY2VsLmFwcC9hbmltZS9hbmltZXBhaGUvaW5mby8ke2lkfWA7XHJcbiAgXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGV4dGVybmFsQXBpVXJsKTtcclxuICBcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBkYXRhJyB9KSwge1xyXG4gICAgICAgICAgc3RhdHVzOiA1MDAsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgY29uc3QgZXBpc29kZXMgPSBkYXRhLmVwaXNvZGVzIHx8IFtdO1xyXG4gIFxyXG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbihlcGlzb2Rlcyk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZycgfSksIHtcclxuICAgICAgICBzdGF0dXM6IDUwMCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gICJdLCJuYW1lcyI6WyJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiaWQiLCJnZXQiLCJSZXNwb25zZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsInN0YXR1cyIsImV4dGVybmFsQXBpVXJsIiwicmVzcG9uc2UiLCJmZXRjaCIsIm9rIiwiZGF0YSIsImpzb24iLCJlcGlzb2RlcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/provider/animepahe/episodes/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_lordr_Downloads_AniTeams_main_app_api_provider_animepahe_episodes_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/provider/animepahe/episodes/route.js */ \"(rsc)/./app/api/provider/animepahe/episodes/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/provider/animepahe/episodes/route\",\n        pathname: \"/api/provider/animepahe/episodes\",\n        filename: \"route\",\n        bundlePath: \"app/api/provider/animepahe/episodes/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\lordr\\\\Downloads\\\\AniTeams-main\\\\app\\\\api\\\\provider\\\\animepahe\\\\episodes\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_lordr_Downloads_AniTeams_main_app_api_provider_animepahe_episodes_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm92aWRlciUyRmFuaW1lcGFoZSUyRmVwaXNvZGVzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm92aWRlciUyRmFuaW1lcGFoZSUyRmVwaXNvZGVzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvdmlkZXIlMkZhbmltZXBhaGUlMkZlcGlzb2RlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNsb3JkciU1Q0Rvd25sb2FkcyU1Q0FuaVRlYW1zLW1haW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2xvcmRyJTVDRG93bmxvYWRzJTVDQW5pVGVhbXMtbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNkM7QUFDMUg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGxvcmRyXFxcXERvd25sb2Fkc1xcXFxBbmlUZWFtcy1tYWluXFxcXGFwcFxcXFxhcGlcXFxccHJvdmlkZXJcXFxcYW5pbWVwYWhlXFxcXGVwaXNvZGVzXFxcXHJvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9wcm92aWRlci9hbmltZXBhaGUvZXBpc29kZXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm92aWRlci9hbmltZXBhaGUvZXBpc29kZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Byb3ZpZGVyL2FuaW1lcGFoZS9lcGlzb2Rlcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGxvcmRyXFxcXERvd25sb2Fkc1xcXFxBbmlUZWFtcy1tYWluXFxcXGFwcFxcXFxhcGlcXFxccHJvdmlkZXJcXFxcYW5pbWVwYWhlXFxcXGVwaXNvZGVzXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Fanimepahe%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();