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
exports.id = "app/api/provider/aniwatch/episodes/route";
exports.ids = ["app/api/provider/aniwatch/episodes/route"];
exports.modules = {

/***/ "(rsc)/./app/api/provider/aniwatch/episodes/route.js":
/*!*****************************************************!*\
  !*** ./app/api/provider/aniwatch/episodes/route.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _consumet_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @consumet/extensions */ \"(rsc)/./node_modules/@consumet/extensions/dist/index.js\");\n\n\nconst anilist = new _consumet_extensions__WEBPACK_IMPORTED_MODULE_1__.META.Anilist(new _consumet_extensions__WEBPACK_IMPORTED_MODULE_1__.ANIME.Zoro());\nconst runtime = 'nodejs';\nasync function GET(req) {\n    const { searchParams } = new URL(req.url);\n    const animeId = searchParams.get(\"animeId\");\n    if (!animeId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Missing animeId\"\n        }, {\n            status: 400\n        });\n    }\n    try {\n        // Fetch the mappings from Ani.zip\n        const api2Res = await fetch(`https://api.ani.zip/mappings?anilist_id=${animeId}`);\n        const api2Data = await api2Res.json();\n        if (!api2Data?.episodes) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid response from API 2\"\n            }, {\n                status: 500\n            });\n        }\n        // Instead of fetching from external URL, get anime info via consumet/extensions\n        let newApiData = null;\n        try {\n            newApiData = await anilist.fetchAnimeInfo(animeId);\n        } catch (err) {\n            // If consumet fetch fails, just proceed with null to trigger fallback\n            newApiData = null;\n        }\n        if (newApiData && Array.isArray(newApiData.episodes)) {\n            const mergedData = newApiData.episodes.map((ep)=>{\n                let episodeId = ep.id;\n                if (episodeId?.includes(\"$episode$\")) {\n                    const [slug, episodePart] = episodeId.split(\"$episode$\");\n                    episodeId = `${slug}?ep=${episodePart}`;\n                }\n                const detailsFromApi2 = api2Data.episodes[ep.number] || {};\n                return {\n                    episodeId,\n                    title: ep.title || detailsFromApi2.title?.en || `Episode ${ep.number}`,\n                    synopsis: detailsFromApi2.summary || \"No synopsis available.\",\n                    image: detailsFromApi2.image || \"/placeholder.jpg\",\n                    airDate: ep.createdAt || detailsFromApi2.airDate || \"Unknown Air Date\",\n                    number: ep.number\n                };\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                episodes: mergedData\n            });\n        }\n        // Fallback fetch for legacy API if consumet fetch failed or no episodes\n        const res1 = await fetch(`${\"https://anime-mapper-seven.vercel.app\"}/anime/info/${animeId}`);\n        const api1Data = await res1.json();\n        if (!Array.isArray(api1Data?.data?.episodesList)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Invalid response from API 1\"\n            }, {\n                status: 500\n            });\n        }\n        const mergedData = api1Data.data.episodesList.map((episode)=>{\n            const detailsFromApi2 = api2Data.episodes[episode.number] || {};\n            return {\n                episodeId: episode.id,\n                title: detailsFromApi2.title?.en || `Episode ${episode.number}`,\n                synopsis: detailsFromApi2.summary || \"No synopsis available.\",\n                image: detailsFromApi2.image || \"/placeholder.jpg\",\n                airDate: detailsFromApi2.airDate || \"Unknown Air Date\",\n                number: episode.number\n            };\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            episodes: mergedData\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch episode data\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb3ZpZGVyL2FuaXdhdGNoL2VwaXNvZGVzL3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDUTtBQUVuRCxNQUFNRyxVQUFVLElBQUlGLHNEQUFJQSxDQUFDRyxPQUFPLENBQUMsSUFBSUYsdURBQUtBLENBQUNHLElBQUk7QUFFeEMsTUFBTUMsVUFBVSxTQUFTO0FBRXpCLGVBQWVDLElBQUlDLEdBQUc7SUFDM0IsTUFBTSxFQUFFQyxZQUFZLEVBQUUsR0FBRyxJQUFJQyxJQUFJRixJQUFJRyxHQUFHO0lBQ3hDLE1BQU1DLFVBQVVILGFBQWFJLEdBQUcsQ0FBQztJQUVqQyxJQUFJLENBQUNELFNBQVM7UUFDWixPQUFPWixxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBa0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDdkU7SUFFQSxJQUFJO1FBQ0Ysa0NBQWtDO1FBQ2xDLE1BQU1DLFVBQVUsTUFBTUMsTUFBTSxDQUFDLHdDQUF3QyxFQUFFTixTQUFTO1FBQ2hGLE1BQU1PLFdBQVcsTUFBTUYsUUFBUUgsSUFBSTtRQUVuQyxJQUFJLENBQUNLLFVBQVVDLFVBQVU7WUFDdkIsT0FBT3BCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBOEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ25GO1FBRUEsZ0ZBQWdGO1FBQ2hGLElBQUlLLGFBQWE7UUFDakIsSUFBSTtZQUNGQSxhQUFhLE1BQU1sQixRQUFRbUIsY0FBYyxDQUFDVjtRQUM1QyxFQUFFLE9BQU9XLEtBQUs7WUFDWixzRUFBc0U7WUFDdEVGLGFBQWE7UUFDZjtRQUVBLElBQUlBLGNBQWNHLE1BQU1DLE9BQU8sQ0FBQ0osV0FBV0QsUUFBUSxHQUFHO1lBQ3BELE1BQU1NLGFBQWFMLFdBQVdELFFBQVEsQ0FBQ08sR0FBRyxDQUFDLENBQUNDO2dCQUMxQyxJQUFJQyxZQUFZRCxHQUFHRSxFQUFFO2dCQUNyQixJQUFJRCxXQUFXRSxTQUFTLGNBQWM7b0JBQ3BDLE1BQU0sQ0FBQ0MsTUFBTUMsWUFBWSxHQUFHSixVQUFVSyxLQUFLLENBQUM7b0JBQzVDTCxZQUFZLEdBQUdHLEtBQUssSUFBSSxFQUFFQyxhQUFhO2dCQUN6QztnQkFFQSxNQUFNRSxrQkFBa0JoQixTQUFTQyxRQUFRLENBQUNRLEdBQUdRLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRXpELE9BQU87b0JBQ0xQO29CQUNBUSxPQUFPVCxHQUFHUyxLQUFLLElBQUlGLGdCQUFnQkUsS0FBSyxFQUFFQyxNQUFNLENBQUMsUUFBUSxFQUFFVixHQUFHUSxNQUFNLEVBQUU7b0JBQ3RFRyxVQUFVSixnQkFBZ0JLLE9BQU8sSUFBSTtvQkFDckNDLE9BQU9OLGdCQUFnQk0sS0FBSyxJQUFJO29CQUNoQ0MsU0FBU2QsR0FBR2UsU0FBUyxJQUFJUixnQkFBZ0JPLE9BQU8sSUFBSTtvQkFDcEROLFFBQVFSLEdBQUdRLE1BQU07Z0JBQ25CO1lBQ0Y7WUFFQSxPQUFPcEMscURBQVlBLENBQUNjLElBQUksQ0FBQztnQkFBRU0sVUFBVU07WUFBVztRQUNsRDtRQUVBLHdFQUF3RTtRQUN4RSxNQUFNa0IsT0FBTyxNQUFNMUIsTUFBTSxHQUFHMkIsdUNBQTBDLENBQUMsWUFBWSxFQUFFakMsU0FBUztRQUM5RixNQUFNb0MsV0FBVyxNQUFNSixLQUFLOUIsSUFBSTtRQUVoQyxJQUFJLENBQUNVLE1BQU1DLE9BQU8sQ0FBQ3VCLFVBQVVDLE1BQU1DLGVBQWU7WUFDaEQsT0FBT2xELHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBOEIsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ25GO1FBRUEsTUFBTVUsYUFBYXNCLFNBQVNDLElBQUksQ0FBQ0MsWUFBWSxDQUFDdkIsR0FBRyxDQUFDLENBQUN3QjtZQUNqRCxNQUFNaEIsa0JBQWtCaEIsU0FBU0MsUUFBUSxDQUFDK0IsUUFBUWYsTUFBTSxDQUFDLElBQUksQ0FBQztZQUU5RCxPQUFPO2dCQUNMUCxXQUFXc0IsUUFBUXJCLEVBQUU7Z0JBQ3JCTyxPQUFPRixnQkFBZ0JFLEtBQUssRUFBRUMsTUFBTSxDQUFDLFFBQVEsRUFBRWEsUUFBUWYsTUFBTSxFQUFFO2dCQUMvREcsVUFBVUosZ0JBQWdCSyxPQUFPLElBQUk7Z0JBQ3JDQyxPQUFPTixnQkFBZ0JNLEtBQUssSUFBSTtnQkFDaENDLFNBQVNQLGdCQUFnQk8sT0FBTyxJQUFJO2dCQUNwQ04sUUFBUWUsUUFBUWYsTUFBTTtZQUN4QjtRQUNGO1FBRUEsT0FBT3BDLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRU0sVUFBVU07UUFBVztJQUNsRCxFQUFFLE9BQU9YLE9BQU87UUFDZCxPQUFPZixxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBK0IsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDcEY7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxsb3JkclxcRG93bmxvYWRzXFxBbmlUZWFtcy1tYWluXFxhcHBcXGFwaVxccHJvdmlkZXJcXGFuaXdhdGNoXFxlcGlzb2Rlc1xccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IE1FVEEsIEFOSU1FIH0gZnJvbSBcIkBjb25zdW1ldC9leHRlbnNpb25zXCI7XHJcblxyXG5jb25zdCBhbmlsaXN0ID0gbmV3IE1FVEEuQW5pbGlzdChuZXcgQU5JTUUuWm9ybygpKTtcclxuXHJcbmV4cG9ydCBjb25zdCBydW50aW1lID0gJ25vZGVqcyc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcSkge1xyXG4gIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcS51cmwpO1xyXG4gIGNvbnN0IGFuaW1lSWQgPSBzZWFyY2hQYXJhbXMuZ2V0KFwiYW5pbWVJZFwiKTtcclxuXHJcbiAgaWYgKCFhbmltZUlkKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJNaXNzaW5nIGFuaW1lSWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIC8vIEZldGNoIHRoZSBtYXBwaW5ncyBmcm9tIEFuaS56aXBcclxuICAgIGNvbnN0IGFwaTJSZXMgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuYW5pLnppcC9tYXBwaW5ncz9hbmlsaXN0X2lkPSR7YW5pbWVJZH1gKTtcclxuICAgIGNvbnN0IGFwaTJEYXRhID0gYXdhaXQgYXBpMlJlcy5qc29uKCk7XHJcblxyXG4gICAgaWYgKCFhcGkyRGF0YT8uZXBpc29kZXMpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiSW52YWxpZCByZXNwb25zZSBmcm9tIEFQSSAyXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbnN0ZWFkIG9mIGZldGNoaW5nIGZyb20gZXh0ZXJuYWwgVVJMLCBnZXQgYW5pbWUgaW5mbyB2aWEgY29uc3VtZXQvZXh0ZW5zaW9uc1xyXG4gICAgbGV0IG5ld0FwaURhdGEgPSBudWxsO1xyXG4gICAgdHJ5IHtcclxuICAgICAgbmV3QXBpRGF0YSA9IGF3YWl0IGFuaWxpc3QuZmV0Y2hBbmltZUluZm8oYW5pbWVJZCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gSWYgY29uc3VtZXQgZmV0Y2ggZmFpbHMsIGp1c3QgcHJvY2VlZCB3aXRoIG51bGwgdG8gdHJpZ2dlciBmYWxsYmFja1xyXG4gICAgICBuZXdBcGlEYXRhID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmV3QXBpRGF0YSAmJiBBcnJheS5pc0FycmF5KG5ld0FwaURhdGEuZXBpc29kZXMpKSB7XHJcbiAgICAgIGNvbnN0IG1lcmdlZERhdGEgPSBuZXdBcGlEYXRhLmVwaXNvZGVzLm1hcCgoZXApID0+IHtcclxuICAgICAgICBsZXQgZXBpc29kZUlkID0gZXAuaWQ7XHJcbiAgICAgICAgaWYgKGVwaXNvZGVJZD8uaW5jbHVkZXMoXCIkZXBpc29kZSRcIikpIHtcclxuICAgICAgICAgIGNvbnN0IFtzbHVnLCBlcGlzb2RlUGFydF0gPSBlcGlzb2RlSWQuc3BsaXQoXCIkZXBpc29kZSRcIik7XHJcbiAgICAgICAgICBlcGlzb2RlSWQgPSBgJHtzbHVnfT9lcD0ke2VwaXNvZGVQYXJ0fWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkZXRhaWxzRnJvbUFwaTIgPSBhcGkyRGF0YS5lcGlzb2Rlc1tlcC5udW1iZXJdIHx8IHt9O1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZXBpc29kZUlkLFxyXG4gICAgICAgICAgdGl0bGU6IGVwLnRpdGxlIHx8IGRldGFpbHNGcm9tQXBpMi50aXRsZT8uZW4gfHwgYEVwaXNvZGUgJHtlcC5udW1iZXJ9YCxcclxuICAgICAgICAgIHN5bm9wc2lzOiBkZXRhaWxzRnJvbUFwaTIuc3VtbWFyeSB8fCBcIk5vIHN5bm9wc2lzIGF2YWlsYWJsZS5cIixcclxuICAgICAgICAgIGltYWdlOiBkZXRhaWxzRnJvbUFwaTIuaW1hZ2UgfHwgXCIvcGxhY2Vob2xkZXIuanBnXCIsXHJcbiAgICAgICAgICBhaXJEYXRlOiBlcC5jcmVhdGVkQXQgfHwgZGV0YWlsc0Zyb21BcGkyLmFpckRhdGUgfHwgXCJVbmtub3duIEFpciBEYXRlXCIsXHJcbiAgICAgICAgICBudW1iZXI6IGVwLm51bWJlcixcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVwaXNvZGVzOiBtZXJnZWREYXRhIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZhbGxiYWNrIGZldGNoIGZvciBsZWdhY3kgQVBJIGlmIGNvbnN1bWV0IGZldGNoIGZhaWxlZCBvciBubyBlcGlzb2Rlc1xyXG4gICAgY29uc3QgcmVzMSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0hJQU5JTUVfTUFQUEVSX1VSTH0vYW5pbWUvaW5mby8ke2FuaW1lSWR9YCk7XHJcbiAgICBjb25zdCBhcGkxRGF0YSA9IGF3YWl0IHJlczEuanNvbigpO1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShhcGkxRGF0YT8uZGF0YT8uZXBpc29kZXNMaXN0KSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJJbnZhbGlkIHJlc3BvbnNlIGZyb20gQVBJIDFcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lcmdlZERhdGEgPSBhcGkxRGF0YS5kYXRhLmVwaXNvZGVzTGlzdC5tYXAoKGVwaXNvZGUpID0+IHtcclxuICAgICAgY29uc3QgZGV0YWlsc0Zyb21BcGkyID0gYXBpMkRhdGEuZXBpc29kZXNbZXBpc29kZS5udW1iZXJdIHx8IHt9O1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBlcGlzb2RlSWQ6IGVwaXNvZGUuaWQsXHJcbiAgICAgICAgdGl0bGU6IGRldGFpbHNGcm9tQXBpMi50aXRsZT8uZW4gfHwgYEVwaXNvZGUgJHtlcGlzb2RlLm51bWJlcn1gLFxyXG4gICAgICAgIHN5bm9wc2lzOiBkZXRhaWxzRnJvbUFwaTIuc3VtbWFyeSB8fCBcIk5vIHN5bm9wc2lzIGF2YWlsYWJsZS5cIixcclxuICAgICAgICBpbWFnZTogZGV0YWlsc0Zyb21BcGkyLmltYWdlIHx8IFwiL3BsYWNlaG9sZGVyLmpwZ1wiLFxyXG4gICAgICAgIGFpckRhdGU6IGRldGFpbHNGcm9tQXBpMi5haXJEYXRlIHx8IFwiVW5rbm93biBBaXIgRGF0ZVwiLFxyXG4gICAgICAgIG51bWJlcjogZXBpc29kZS5udW1iZXIsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcGlzb2RlczogbWVyZ2VkRGF0YSB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGZldGNoIGVwaXNvZGUgZGF0YVwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJNRVRBIiwiQU5JTUUiLCJhbmlsaXN0IiwiQW5pbGlzdCIsIlpvcm8iLCJydW50aW1lIiwiR0VUIiwicmVxIiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwiYW5pbWVJZCIsImdldCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImFwaTJSZXMiLCJmZXRjaCIsImFwaTJEYXRhIiwiZXBpc29kZXMiLCJuZXdBcGlEYXRhIiwiZmV0Y2hBbmltZUluZm8iLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJtZXJnZWREYXRhIiwibWFwIiwiZXAiLCJlcGlzb2RlSWQiLCJpZCIsImluY2x1ZGVzIiwic2x1ZyIsImVwaXNvZGVQYXJ0Iiwic3BsaXQiLCJkZXRhaWxzRnJvbUFwaTIiLCJudW1iZXIiLCJ0aXRsZSIsImVuIiwic3lub3BzaXMiLCJzdW1tYXJ5IiwiaW1hZ2UiLCJhaXJEYXRlIiwiY3JlYXRlZEF0IiwicmVzMSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19ISUFOSU1FX01BUFBFUl9VUkwiLCJhcGkxRGF0YSIsImRhdGEiLCJlcGlzb2Rlc0xpc3QiLCJlcGlzb2RlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/provider/aniwatch/episodes/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_lordr_Downloads_AniTeams_main_app_api_provider_aniwatch_episodes_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/provider/aniwatch/episodes/route.js */ \"(rsc)/./app/api/provider/aniwatch/episodes/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/provider/aniwatch/episodes/route\",\n        pathname: \"/api/provider/aniwatch/episodes\",\n        filename: \"route\",\n        bundlePath: \"app/api/provider/aniwatch/episodes/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\lordr\\\\Downloads\\\\AniTeams-main\\\\app\\\\api\\\\provider\\\\aniwatch\\\\episodes\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_lordr_Downloads_AniTeams_main_app_api_provider_aniwatch_episodes_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm92aWRlciUyRmFuaXdhdGNoJTJGZXBpc29kZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnByb3ZpZGVyJTJGYW5pd2F0Y2glMkZlcGlzb2RlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnByb3ZpZGVyJTJGYW5pd2F0Y2glMkZlcGlzb2RlcyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNsb3JkciU1Q0Rvd25sb2FkcyU1Q0FuaVRlYW1zLW1haW4lNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2xvcmRyJTVDRG93bmxvYWRzJTVDQW5pVGVhbXMtbWFpbiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDNEM7QUFDekg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGxvcmRyXFxcXERvd25sb2Fkc1xcXFxBbmlUZWFtcy1tYWluXFxcXGFwcFxcXFxhcGlcXFxccHJvdmlkZXJcXFxcYW5pd2F0Y2hcXFxcZXBpc29kZXNcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Byb3ZpZGVyL2FuaXdhdGNoL2VwaXNvZGVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcHJvdmlkZXIvYW5pd2F0Y2gvZXBpc29kZXNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3Byb3ZpZGVyL2FuaXdhdGNoL2VwaXNvZGVzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcbG9yZHJcXFxcRG93bmxvYWRzXFxcXEFuaVRlYW1zLW1haW5cXFxcYXBwXFxcXGFwaVxcXFxwcm92aWRlclxcXFxhbml3YXRjaFxcXFxlcGlzb2Rlc1xcXFxyb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

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

/***/ }),

/***/ "node:assert":
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:console":
/*!*******************************!*\
  !*** external "node:console" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:console");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:diagnostics_channel":
/*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ "node:dns":
/*!***************************!*\
  !*** external "node:dns" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:dns");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:http2":
/*!*****************************!*\
  !*** external "node:http2" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http2");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:perf_hooks":
/*!**********************************!*\
  !*** external "node:perf_hooks" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:perf_hooks");

/***/ }),

/***/ "node:querystring":
/*!***********************************!*\
  !*** external "node:querystring" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:querystring");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:tls":
/*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:tls");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:util/types":
/*!**********************************!*\
  !*** external "node:util/types" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util/types");

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@consumet","vendor-chunks/undici","vendor-chunks/crypto-js","vendor-chunks/iconv-lite","vendor-chunks/parse5","vendor-chunks/cheerio","vendor-chunks/css-select","vendor-chunks/asynckit","vendor-chunks/math-intrinsics","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/es-errors","vendor-chunks/whatwg-mimetype","vendor-chunks/form-data","vendor-chunks/call-bind-apply-helpers","vendor-chunks/debug","vendor-chunks/css-what","vendor-chunks/whatwg-encoding","vendor-chunks/nth-check","vendor-chunks/htmlparser2","vendor-chunks/get-proto","vendor-chunks/cheerio-select","vendor-chunks/ascii-url-encoder","vendor-chunks/encoding-sniffer","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/follow-redirects","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/parse5-parser-stream","vendor-chunks/parse5-htmlparser2-tree-adapter","vendor-chunks/axios","vendor-chunks/supports-color","vendor-chunks/safer-buffer","vendor-chunks/proxy-from-env","vendor-chunks/ms","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/has-flag","vendor-chunks/get-intrinsic","vendor-chunks/es-set-tostringtag","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/domelementtype","vendor-chunks/delayed-stream","vendor-chunks/combined-stream","vendor-chunks/boolbase"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&page=%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprovider%2Faniwatch%2Fepisodes%2Froute.js&appDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Clordr%5CDownloads%5CAniTeams-main&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();