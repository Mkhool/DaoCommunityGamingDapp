"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dao/page",{

/***/ "(app-pages-browser)/./app/user/Rank.jsx":
/*!***************************!*\
  !*** ./app/user/Rank.jsx ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/esm/hooks/useAccount.js\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/esm/hooks/useReadContract.js\");\n/* harmony import */ var _constants_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/constants/index.js */ \"(app-pages-browser)/./constants/index.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst Rank = ()=>{\n    _s();\n    const { address: userAddress } = (0,wagmi__WEBPACK_IMPORTED_MODULE_3__.useAccount)();\n    const [stakingQuest, setstakingQuest] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const { data, refetch } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useReadContract)({\n        abi: _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.ContractAbi,\n        address: _constants_index_js__WEBPACK_IMPORTED_MODULE_2__.ContractAddress,\n        functionName: \"DetermineRankByStake\",\n        args: [\n            userAddress\n        ]\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (data) {\n            setstakingQuest(data);\n        }\n    }, [\n        data\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        refetch();\n    }, [\n        userAddress,\n        refetch\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{}, [\n        stakingQuest\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Text, {\n                color: color,\n                as: \"b\",\n                fontSize: \"xs\",\n                children: [\n                    \" Rank : \",\n                    stakingQuest,\n                    \" \"\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/user/Rank.jsx\",\n                lineNumber: 37,\n                columnNumber: 12\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/home/mkhool/Projet/daogaming/frontend/app/user/Rank.jsx\",\n            lineNumber: 36,\n            columnNumber: 11\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/user/Rank.jsx\",\n        lineNumber: 35,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Rank, \"GUpDcpGqow9tXA+i9sgpdFZs1fk=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_3__.useAccount,\n        wagmi__WEBPACK_IMPORTED_MODULE_4__.useReadContract\n    ];\n});\n_c = Rank;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Rank);\nvar _c;\n$RefreshReg$(_c, \"Rank\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC91c2VyL1JhbmsuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUM0QztBQUNRO0FBQ2dCO0FBR3BFLE1BQU1NLE9BQU87O0lBQ1QsTUFBTSxFQUFFQyxTQUFTQyxXQUFXLEVBQUUsR0FBR04saURBQVVBO0lBQzNDLE1BQU0sQ0FBQ08sY0FBY0MsZ0JBQWdCLEdBQUdULCtDQUFRQSxDQUFDO0lBRWpELE1BQU0sRUFBRVUsSUFBSSxFQUFFQyxPQUFPLEVBQUUsR0FBR1Qsc0RBQWVBLENBQUM7UUFDdENVLEtBQUtULDREQUFXQTtRQUNoQkcsU0FBU0YsZ0VBQWVBO1FBQ3hCUyxjQUFjO1FBQ2RDLE1BQU07WUFBQ1A7U0FBWTtJQUN2QjtJQUVBUixnREFBU0EsQ0FBQztRQUNOLElBQUlXLE1BQU07WUFFTkQsZ0JBQWdCQztRQUNwQjtJQUNKLEdBQUc7UUFBQ0E7S0FBSztJQUVUWCxnREFBU0EsQ0FBQztRQUNOWTtJQUNKLEdBQUc7UUFBQ0o7UUFBYUk7S0FBUTtJQUV2QlosZ0RBQVNBLENBQUMsS0FDWixHQUFHO1FBQUNTO0tBQWE7SUFJakIscUJBQ0ksOERBQUNPO2tCQUNDLDRFQUFDQTtzQkFDQSw0RUFBQ0M7Z0JBQUtDLE9BQU9BO2dCQUFPQyxJQUFHO2dCQUFJQyxVQUFTOztvQkFBTTtvQkFBU1g7b0JBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSzNFO0dBbkNNSDs7UUFDK0JKLDZDQUFVQTtRQUdqQkMsa0RBQWVBOzs7S0FKdkNHO0FBcUNOLCtEQUFlQSxJQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC91c2VyL1JhbmsuanN4PzkzOWQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUFjY291bnQsIHVzZVJlYWRDb250cmFjdCB9IGZyb20gXCJ3YWdtaVwiO1xuaW1wb3J0IHsgQ29udHJhY3RBYmksIENvbnRyYWN0QWRkcmVzcyB9IGZyb20gXCJAL2NvbnN0YW50cy9pbmRleC5qc1wiO1xuXG5cbmNvbnN0IFJhbmsgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBhZGRyZXNzOiB1c2VyQWRkcmVzcyB9ID0gdXNlQWNjb3VudCgpO1xuICAgIGNvbnN0IFtzdGFraW5nUXVlc3QsIHNldHN0YWtpbmdRdWVzdF0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICAgIGNvbnN0IHsgZGF0YSwgcmVmZXRjaCB9ID0gdXNlUmVhZENvbnRyYWN0KHtcbiAgICAgICAgYWJpOiBDb250cmFjdEFiaSxcbiAgICAgICAgYWRkcmVzczogQ29udHJhY3RBZGRyZXNzLFxuICAgICAgICBmdW5jdGlvbk5hbWU6ICdEZXRlcm1pbmVSYW5rQnlTdGFrZScsXG4gICAgICAgIGFyZ3M6IFt1c2VyQWRkcmVzc10sXG4gICAgfSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIHNldHN0YWtpbmdRdWVzdChkYXRhKTtcbiAgICAgICAgfVxuICAgIH0sIFtkYXRhXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICByZWZldGNoKCk7XG4gICAgfSwgW3VzZXJBZGRyZXNzLCByZWZldGNoXSk7XG5cbiAgICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgfSwgW3N0YWtpbmdRdWVzdF0pO1xuXG5cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgPFRleHQgY29sb3I9e2NvbG9yfSBhcz0nYicgZm9udFNpemU9XCJ4c1wiID4gUmFuayA6IHtzdGFraW5nUXVlc3R9IDwvVGV4dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJhbms7XG5cbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZUFjY291bnQiLCJ1c2VSZWFkQ29udHJhY3QiLCJDb250cmFjdEFiaSIsIkNvbnRyYWN0QWRkcmVzcyIsIlJhbmsiLCJhZGRyZXNzIiwidXNlckFkZHJlc3MiLCJzdGFraW5nUXVlc3QiLCJzZXRzdGFraW5nUXVlc3QiLCJkYXRhIiwicmVmZXRjaCIsImFiaSIsImZ1bmN0aW9uTmFtZSIsImFyZ3MiLCJkaXYiLCJUZXh0IiwiY29sb3IiLCJhcyIsImZvbnRTaXplIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/user/Rank.jsx\n"));

/***/ })

});