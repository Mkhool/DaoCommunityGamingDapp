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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-NTCQBYKE.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/avatar/dist/chunk-V7PAE35Z.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-3ASUQ6PA.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/progress/dist/chunk-BZDCPGYF.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/image/dist/chunk-QINAG4RG.mjs\");\n/* harmony import */ var _user_Exp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user/Exp */ \"(app-pages-browser)/./app/user/Exp.jsx\");\n/* harmony import */ var _user_Rank__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user/Rank */ \"(app-pages-browser)/./app/user/Rank.jsx\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/esm/hooks/useAccount.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nconst Profil = ()=>{\n    _s();\n    const { address: userAddress } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useAccount)();\n    const [exp, setExp] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.VStack, {\n        spacing: 2,\n        align: \"stretch\",\n        p: 1,\n        borderRadius: \"md\",\n        boxShadow: \"base\",\n        bg: \"rgba(15, 15, 15)\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Avatar, {\n                align: \"stretch\",\n                size: \"l\",\n                src: \"/image/ppBadge.png\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 23,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.HStack, {\n                justifyContent: \"space-between\",\n                width: \"100%\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Text, {\n                        fontSize: \"sm\",\n                        color: \"#BFA181\",\n                        as: \"b\",\n                        children: \"O'Clock\"\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                        lineNumber: 26,\n                        columnNumber: 3\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_user_Exp__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        color: \"#BFA181\",\n                        exp: exp\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                        lineNumber: 27,\n                        columnNumber: 3\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 25,\n                columnNumber: 1\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Progress, {\n                value: 45,\n                size: \"sm\",\n                colorScheme: \"purple\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_user_Rank__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                color: \"#178582\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_10__.Image, {\n                src: \"/image/Diamond.png\",\n                alt: \"Banner\",\n                mx: \"auto\",\n                maxWidth: \"100px\",\n                maxHeight: \"10vh\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n                lineNumber: 33,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DesignPage/Profil.jsx\",\n        lineNumber: 22,\n        columnNumber: 5\n    }, undefined);\n};\n_s(Profil, \"Wlc+HSEA2L4RqjNvdF/BNb3TufA=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_4__.useAccount\n    ];\n});\n_c = Profil;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profil);\nvar _c;\n$RefreshReg$(_c, \"Profil\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9EZXNpZ25QYWdlL1Byb2ZpbC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQzBCO0FBUUE7QUFDSTtBQUNFO0FBQ0M7QUFDRTtBQUduQyxNQUFNVyxTQUFTOztJQUNiLE1BQU0sRUFBRUMsU0FBU0MsV0FBVyxFQUFFLEdBQUdILGlEQUFVQTtJQUMzQyxNQUFNLENBQUNJLEtBQUtDLE9BQU8sR0FBR04sK0NBQVFBO0lBRTlCLHFCQUNFLDhEQUFDTixvREFBTUE7UUFBQ2EsU0FBUztRQUFHQyxPQUFNO1FBQVVDLEdBQUc7UUFBR0MsY0FBYTtRQUFLQyxXQUFVO1FBQU9DLElBQUc7OzBCQUM5RSw4REFBQ2pCLG9EQUFNQTtnQkFBQ2EsT0FBTTtnQkFBVUssTUFBSztnQkFBSUMsS0FBSTs7Ozs7OzBCQUUzQyw4REFBQ2pCLG9EQUFNQTtnQkFBQ2tCLGdCQUFlO2dCQUFnQkMsT0FBTTs7a0NBQzNDLDhEQUFDdkIsa0RBQUlBO3dCQUFDd0IsVUFBUzt3QkFBS0MsT0FBTTt3QkFBVUMsSUFBRztrQ0FBSTs7Ozs7O2tDQUMzQyw4REFBQ3JCLGlEQUFHQTt3QkFBQ29CLE9BQU07d0JBQVViLEtBQUtBOzs7Ozs7Ozs7Ozs7MEJBR3RCLDhEQUFDYixzREFBUUE7Z0JBQUM0QixPQUFPO2dCQUFJUCxNQUFLO2dCQUFLUSxhQUFZOzs7Ozs7MEJBRTNDLDhEQUFDdEIsa0RBQUlBO2dCQUFDbUIsT0FBTTs7Ozs7OzBCQUNaLDhEQUFDdEIsb0RBQUtBO2dCQUFDa0IsS0FBSTtnQkFBcUJRLEtBQUk7Z0JBQVNDLElBQUc7Z0JBQU9DLFVBQVM7Z0JBQVFDLFdBQVU7Ozs7Ozs7Ozs7OztBQUt4RjtHQXJCTXZCOztRQUM2QkQsNkNBQVVBOzs7S0FEdkNDO0FBdUJOLCtEQUFlQSxNQUFNQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9EZXNpZ25QYWdlL1Byb2ZpbC5qc3g/ZmE0MCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIFByb2dyZXNzLFxuICAgIFRleHQsXG4gICAgVlN0YWNrLFxuICAgIEF2YXRhcixcbiAgICBJbWFnZSxcbiAgICBIU3RhY2tcbn0gZnJvbSAnQGNoYWtyYS11aS9yZWFjdCc7XG5pbXBvcnQgRXhwIGZyb20gJy4uL3VzZXIvRXhwJztcbmltcG9ydCBSYW5rIGZyb20gJy4uL3VzZXIvUmFuayc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQWNjb3VudCB9IGZyb20gXCJ3YWdtaVwiO1xuXG5cbmNvbnN0IFByb2ZpbCA9ICgpID0+IHtcbiAgY29uc3QgeyBhZGRyZXNzOiB1c2VyQWRkcmVzcyB9ID0gdXNlQWNjb3VudCgpO1xuICBjb25zdCBbZXhwLCBzZXRFeHBdID0gdXNlU3RhdGUoKTsgXG5cbiAgcmV0dXJuIChcbiAgICA8VlN0YWNrIHNwYWNpbmc9ezJ9IGFsaWduPVwic3RyZXRjaFwiIHA9ezF9IGJvcmRlclJhZGl1cz1cIm1kXCIgYm94U2hhZG93PSdiYXNlJyBiZz1cInJnYmEoMTUsIDE1LCAxNSlcIj5cbiAgICAgIDxBdmF0YXIgYWxpZ249XCJzdHJldGNoXCIgc2l6ZT1cImxcIiBzcmM9XCIvaW1hZ2UvcHBCYWRnZS5wbmdcIi8+XG5cbjxIU3RhY2sganVzdGlmeUNvbnRlbnQ9XCJzcGFjZS1iZXR3ZWVuXCIgd2lkdGg9XCIxMDAlXCI+XG4gIDxUZXh0IGZvbnRTaXplPVwic21cIiBjb2xvcj1cIiNCRkExODFcIiBhcz1cImJcIj5PJ0Nsb2NrPC9UZXh0PlxuICA8RXhwIGNvbG9yPVwiI0JGQTE4MVwiIGV4cD17ZXhwfS8+XG48L0hTdGFjaz5cblxuICAgICAgPFByb2dyZXNzIHZhbHVlPXs0NX0gc2l6ZT1cInNtXCIgY29sb3JTY2hlbWU9XCJwdXJwbGVcIiAvPlxuXG4gICAgICA8UmFuayBjb2xvcj1cIiMxNzg1ODJcIi8+XG4gICAgICA8SW1hZ2Ugc3JjPVwiL2ltYWdlL0RpYW1vbmQucG5nXCIgYWx0PVwiQmFubmVyXCIgbXg9XCJhdXRvXCIgbWF4V2lkdGg9XCIxMDBweFwiIG1heEhlaWdodD1cIjEwdmhcIiAgLz5cbiAgICAgIFxuICAgIDwvVlN0YWNrPlxuXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZmlsIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvZ3Jlc3MiLCJUZXh0IiwiVlN0YWNrIiwiQXZhdGFyIiwiSW1hZ2UiLCJIU3RhY2siLCJFeHAiLCJSYW5rIiwidXNlU3RhdGUiLCJ1c2VBY2NvdW50IiwiUHJvZmlsIiwiYWRkcmVzcyIsInVzZXJBZGRyZXNzIiwiZXhwIiwic2V0RXhwIiwic3BhY2luZyIsImFsaWduIiwicCIsImJvcmRlclJhZGl1cyIsImJveFNoYWRvdyIsImJnIiwic2l6ZSIsInNyYyIsImp1c3RpZnlDb250ZW50Iiwid2lkdGgiLCJmb250U2l6ZSIsImNvbG9yIiwiYXMiLCJ2YWx1ZSIsImNvbG9yU2NoZW1lIiwiYWx0IiwibXgiLCJtYXhXaWR0aCIsIm1heEhlaWdodCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/DesignPage/Profil.jsx\n"));

/***/ })

});