"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./app/DesignPage/Profil.jsx":
/*!***********************************!*\
  !*** ./app/DesignPage/Profil.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-NTCQBYKE.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/avatar/dist/chunk-V7PAE35Z.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-3ASUQ6PA.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/progress/dist/chunk-BZDCPGYF.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/image/dist/chunk-QINAG4RG.mjs\");\n/* harmony import */ var _user_Exp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user/Exp */ \"(app-pages-browser)/./app/user/Exp.jsx\");\n/* harmony import */ var _user_Rank__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user/Rank */ \"(app-pages-browser)/./app/user/Rank.jsx\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/esm/hooks/useAccount.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst Profil = ()=>{\n    _s();\n    const { address: userAddress } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useAccount)();\n    const [exp, setExp] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.VStack, {\n        spacing: 2,\n        align: \"stretch\",\n        p: 1,\n        borderRadius: \"md\",\n        boxShadow: \"base\",\n        bg: \"rgba(15, 15, 15)\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Avatar, {\n                align: \"stretch\",\n                size: \"l\",\n                src: \"/image/ppBadge.png\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.HStack, {\n                justifyContent: \"space-between\",\n                width: \"100%\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Text, {\n                        fontSize: \"sm\",\n                        color: \"#BFA181\",\n                        as: \"b\",\n                        children: \"O'Clock\"\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                        lineNumber: 26,\n                        columnNumber: 3\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_user_Exp__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        color: \"#BFA181\",\n                        exp: exp\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 3\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 25,\n                columnNumber: 1\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Progress, {\n                value: exp / 1000 * 100,\n                size: \"sm\",\n                colorScheme: \"purple\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_user_Rank__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                color: \"#178582\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Image, {\n                src: \"/image/Diamond.png\",\n                alt: \"Banner\",\n                mx: \"auto\",\n                maxWidth: \"100px\",\n                maxHeight: \"10vh\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Profil, \"Wlc+HSEA2L4RqjNvdF/BNb3TufA=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_4__.useAccount\n    ];\n});\n_c = Profil;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profil);\nvar _c;\n$RefreshReg$(_c, \"Profil\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9EZXNpZ25QYWdlL1Byb2ZpbC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQzBCO0FBUUE7QUFDSTtBQUNFO0FBQ0M7QUFDRTtBQUduQyxNQUFNVyxTQUFTOztJQUNiLE1BQU0sRUFBRUMsU0FBU0MsV0FBVyxFQUFFLEdBQUdILGlEQUFVQTtJQUMzQyxNQUFNLENBQUNJLEtBQUtDLE9BQU8sR0FBR04sK0NBQVFBO0lBRTlCLHFCQUNFLDhEQUFDTixvREFBTUE7UUFBQ2EsU0FBUztRQUFHQyxPQUFNO1FBQVVDLEdBQUc7UUFBR0MsY0FBYTtRQUFLQyxXQUFVO1FBQU9DLElBQUc7OzBCQUM5RSw4REFBQ2pCLG9EQUFNQTtnQkFBQ2EsT0FBTTtnQkFBVUssTUFBSztnQkFBSUMsS0FBSTs7Ozs7OzBCQUUzQyw4REFBQ2pCLG9EQUFNQTtnQkFBQ2tCLGdCQUFlO2dCQUFnQkMsT0FBTTs7a0NBQzNDLDhEQUFDdkIsa0RBQUlBO3dCQUFDd0IsVUFBUzt3QkFBS0MsT0FBTTt3QkFBVUMsSUFBRztrQ0FBSTs7Ozs7O2tDQUMzQyw4REFBQ3JCLGlEQUFHQTt3QkFBQ29CLE9BQU07d0JBQVViLEtBQUtBOzs7Ozs7Ozs7Ozs7MEJBR3RCLDhEQUFDYixzREFBUUE7Z0JBQUM0QixPQUFPLE1BQU8sT0FBUTtnQkFBS1AsTUFBSztnQkFBS1EsYUFBWTs7Ozs7OzBCQUUzRCw4REFBQ3RCLGtEQUFJQTtnQkFBQ21CLE9BQU07Ozs7OzswQkFDWiw4REFBQ3RCLG9EQUFLQTtnQkFBQ2tCLEtBQUk7Z0JBQXFCUSxLQUFJO2dCQUFTQyxJQUFHO2dCQUFPQyxVQUFTO2dCQUFRQyxXQUFVOzs7Ozs7Ozs7Ozs7QUFLeEY7R0FyQk12Qjs7UUFDNkJELDZDQUFVQTs7O0tBRHZDQztBQXVCTiwrREFBZUEsTUFBTUEsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvRGVzaWduUGFnZS9Qcm9maWwuanN4P2ZhNDAiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgICBQcm9ncmVzcyxcbiAgICBUZXh0LFxuICAgIFZTdGFjayxcbiAgICBBdmF0YXIsXG4gICAgSW1hZ2UsXG4gICAgSFN0YWNrXG59IGZyb20gJ0BjaGFrcmEtdWkvcmVhY3QnO1xuaW1wb3J0IEV4cCBmcm9tICcuLi91c2VyL0V4cCc7XG5pbXBvcnQgUmFuayBmcm9tICcuLi91c2VyL1JhbmsnO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUFjY291bnQgfSBmcm9tIFwid2FnbWlcIjtcblxuXG5jb25zdCBQcm9maWwgPSAoKSA9PiB7XG4gIGNvbnN0IHsgYWRkcmVzczogdXNlckFkZHJlc3MgfSA9IHVzZUFjY291bnQoKTtcbiAgY29uc3QgW2V4cCwgc2V0RXhwXSA9IHVzZVN0YXRlKCk7IFxuXG4gIHJldHVybiAoXG4gICAgPFZTdGFjayBzcGFjaW5nPXsyfSBhbGlnbj1cInN0cmV0Y2hcIiBwPXsxfSBib3JkZXJSYWRpdXM9XCJtZFwiIGJveFNoYWRvdz0nYmFzZScgYmc9XCJyZ2JhKDE1LCAxNSwgMTUpXCI+XG4gICAgICA8QXZhdGFyIGFsaWduPVwic3RyZXRjaFwiIHNpemU9XCJsXCIgc3JjPVwiL2ltYWdlL3BwQmFkZ2UucG5nXCIvPlxuXG48SFN0YWNrIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiIHdpZHRoPVwiMTAwJVwiPlxuICA8VGV4dCBmb250U2l6ZT1cInNtXCIgY29sb3I9XCIjQkZBMTgxXCIgYXM9XCJiXCI+TydDbG9jazwvVGV4dD5cbiAgPEV4cCBjb2xvcj1cIiNCRkExODFcIiBleHA9e2V4cH0vPlxuPC9IU3RhY2s+XG5cbiAgICAgIDxQcm9ncmVzcyB2YWx1ZT17KGV4cCAvIDEwMDApICogMTAwfSBzaXplPVwic21cIiBjb2xvclNjaGVtZT1cInB1cnBsZVwiIC8+XG5cbiAgICAgIDxSYW5rIGNvbG9yPVwiIzE3ODU4MlwiLz5cbiAgICAgIDxJbWFnZSBzcmM9XCIvaW1hZ2UvRGlhbW9uZC5wbmdcIiBhbHQ9XCJCYW5uZXJcIiBteD1cImF1dG9cIiBtYXhXaWR0aD1cIjEwMHB4XCIgbWF4SGVpZ2h0PVwiMTB2aFwiICAvPlxuICAgICAgXG4gICAgPC9WU3RhY2s+XG5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWwiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9ncmVzcyIsIlRleHQiLCJWU3RhY2siLCJBdmF0YXIiLCJJbWFnZSIsIkhTdGFjayIsIkV4cCIsIlJhbmsiLCJ1c2VTdGF0ZSIsInVzZUFjY291bnQiLCJQcm9maWwiLCJhZGRyZXNzIiwidXNlckFkZHJlc3MiLCJleHAiLCJzZXRFeHAiLCJzcGFjaW5nIiwiYWxpZ24iLCJwIiwiYm9yZGVyUmFkaXVzIiwiYm94U2hhZG93IiwiYmciLCJzaXplIiwic3JjIiwianVzdGlmeUNvbnRlbnQiLCJ3aWR0aCIsImZvbnRTaXplIiwiY29sb3IiLCJhcyIsInZhbHVlIiwiY29sb3JTY2hlbWUiLCJhbHQiLCJteCIsIm1heFdpZHRoIiwibWF4SGVpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/DesignPage/Profil.jsx\n"));

/***/ })

});