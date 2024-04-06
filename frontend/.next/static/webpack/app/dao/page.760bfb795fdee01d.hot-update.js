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

/***/ "(app-pages-browser)/./app/DaoComponents/GameProposal.jsx":
/*!********************************************!*\
  !*** ./app/DaoComponents/GameProposal.jsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/esm/hooks/useReadContract.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants */ \"(app-pages-browser)/./constants/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Quorum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Quorum */ \"(app-pages-browser)/./app/DaoComponents/Quorum.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction GameProposal(param) {\n    let { initialProposalId } = param;\n    _s();\n    const [proposalId, setProposalId] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialProposalId || \"\");\n    const { data, isError, isLoading } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useReadContract)({\n        address: _constants__WEBPACK_IMPORTED_MODULE_1__.ContractAddress,\n        abi: _constants__WEBPACK_IMPORTED_MODULE_1__.ContractAbi,\n        functionName: \"GetProposal\",\n        args: [\n            proposalId\n        ],\n        enabled: proposalId !== \"\"\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (initialProposalId) {\n            setProposalId(initialProposalId);\n        }\n    }, [\n        initialProposalId\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                lineNumber: 25,\n                columnNumber: 21\n            }, this),\n            isError || !data ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"No game with this ID\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                lineNumber: 27,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Proposal Details\"\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 30,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"ID: \",\n                            initialProposalId || proposalId\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 32,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Name: \",\n                            data[1]\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 33,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Vote Count: \",\n                            data[2]\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 34,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Is Accepted: \",\n                            data[3] ? \"Yes\" : \"No\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Quorum: \",\n                            data[4]\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 36,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                lineNumber: 29,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\n_s(GameProposal, \"aDg0rrQHmtva8fY+wqiJU4fTa84=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_4__.useReadContract\n    ];\n});\n_c = GameProposal;\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameProposal);\nvar _c;\n$RefreshReg$(_c, \"GameProposal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9EYW9Db21wb25lbnRzL0dhbWVQcm9wb3NhbC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdDO0FBQ21CO0FBQ2Q7QUFDZjtBQUU5QixTQUFTTSxhQUFhLEtBQXFCO1FBQXJCLEVBQUVDLGlCQUFpQixFQUFFLEdBQXJCOztJQUNwQixNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR04sK0NBQVFBLENBQUNJLHFCQUFxQjtJQUNsRSxNQUFNLEVBQUVHLElBQUksRUFBRUMsT0FBTyxFQUFFQyxTQUFTLEVBQUUsR0FBR1osc0RBQWVBLENBQUM7UUFDbkRhLFNBQVNaLHVEQUFlQTtRQUN4QmEsS0FBS1osbURBQVdBO1FBQ2hCYSxjQUFjO1FBQ2RDLE1BQU07WUFBQ1I7U0FBVztRQUNsQlMsU0FBU1QsZUFBZTtJQUMxQjtJQUVBSixnREFBU0EsQ0FBQztRQUNSLElBQUlHLG1CQUFtQjtZQUNyQkUsY0FBY0Y7UUFDaEI7SUFDRixHQUFHO1FBQUNBO0tBQWtCO0lBR3RCLHFCQUNFLDhEQUFDVzs7WUFDRU4sMkJBQWEsOERBQUNNOzBCQUFJOzs7Ozs7WUFDbEJQLFdBQVcsQ0FBQ0QscUJBQ1gsOERBQUNROzBCQUFJOzs7OztxQ0FFTCw4REFBQ0E7O2tDQUNDLDhEQUFDQztrQ0FBRzs7Ozs7O2tDQUVKLDhEQUFDQzs7NEJBQUU7NEJBQUtiLHFCQUFxQkM7Ozs7Ozs7a0NBQzdCLDhEQUFDWTs7NEJBQUU7NEJBQU9WLElBQUksQ0FBQyxFQUFFOzs7Ozs7O2tDQUNqQiw4REFBQ1U7OzRCQUFFOzRCQUFhVixJQUFJLENBQUMsRUFBRTs7Ozs7OztrQ0FDdkIsOERBQUNVOzs0QkFBRTs0QkFBY1YsSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFROzs7Ozs7O2tDQUNuQyw4REFBQ1U7OzRCQUFFOzRCQUFTVixJQUFJLENBQUMsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUs3QjtHQW5DU0o7O1FBRThCTixrREFBZUE7OztLQUY3Q007QUFxQ1QsK0RBQWVBLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL0Rhb0NvbXBvbmVudHMvR2FtZVByb3Bvc2FsLmpzeD85Yjg0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVJlYWRDb250cmFjdCB9IGZyb20gJ3dhZ21pJztcbmltcG9ydCB7IENvbnRyYWN0QWRkcmVzcywgQ29udHJhY3RBYmkgfSBmcm9tICdAL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0ICB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBRdW9ydW0gZnJvbSAnLi9RdW9ydW0nO1xuXG5mdW5jdGlvbiBHYW1lUHJvcG9zYWwoeyBpbml0aWFsUHJvcG9zYWxJZCB9KSB7XG4gIGNvbnN0IFtwcm9wb3NhbElkLCBzZXRQcm9wb3NhbElkXSA9IHVzZVN0YXRlKGluaXRpYWxQcm9wb3NhbElkIHx8ICcnKTtcbiAgY29uc3QgeyBkYXRhLCBpc0Vycm9yLCBpc0xvYWRpbmcgfSA9IHVzZVJlYWRDb250cmFjdCh7XG4gICAgYWRkcmVzczogQ29udHJhY3RBZGRyZXNzLCBcbiAgICBhYmk6IENvbnRyYWN0QWJpLCBcbiAgICBmdW5jdGlvbk5hbWU6ICdHZXRQcm9wb3NhbCcsIFxuICAgIGFyZ3M6IFtwcm9wb3NhbElkXSwgXG4gICAgZW5hYmxlZDogcHJvcG9zYWxJZCAhPT0gJycsIFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpbml0aWFsUHJvcG9zYWxJZCkge1xuICAgICAgc2V0UHJvcG9zYWxJZChpbml0aWFsUHJvcG9zYWxJZCk7XG4gICAgfVxuICB9LCBbaW5pdGlhbFByb3Bvc2FsSWRdKTtcbiAgXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAge2lzTG9hZGluZyAmJiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj59XG4gICAgICB7aXNFcnJvciB8fCAhZGF0YSA/IChcbiAgICAgICAgPGRpdj5ObyBnYW1lIHdpdGggdGhpcyBJRDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDI+UHJvcG9zYWwgRGV0YWlsczwvaDI+XG4gICAgICAgICAgey8qIEFmZmljaGVyIGwnSUQgZGlyZWN0ZW1lbnQgc2kgaW5pdGlhbFByb3Bvc2FsSWQgZXN0IGZvdXJuaSAqL31cbiAgICAgICAgICA8cD5JRDoge2luaXRpYWxQcm9wb3NhbElkIHx8IHByb3Bvc2FsSWR9PC9wPlxuICAgICAgICAgIDxwPk5hbWU6IHtkYXRhWzFdfTwvcD5cbiAgICAgICAgICA8cD5Wb3RlIENvdW50OiB7ZGF0YVsyXX08L3A+XG4gICAgICAgICAgPHA+SXMgQWNjZXB0ZWQ6IHtkYXRhWzNdID8gJ1llcycgOiAnTm8nfTwvcD5cbiAgICAgICAgICA8cD5RdW9ydW06IHtkYXRhWzRdfTwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVQcm9wb3NhbDtcbiJdLCJuYW1lcyI6WyJ1c2VSZWFkQ29udHJhY3QiLCJDb250cmFjdEFkZHJlc3MiLCJDb250cmFjdEFiaSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiUXVvcnVtIiwiR2FtZVByb3Bvc2FsIiwiaW5pdGlhbFByb3Bvc2FsSWQiLCJwcm9wb3NhbElkIiwic2V0UHJvcG9zYWxJZCIsImRhdGEiLCJpc0Vycm9yIiwiaXNMb2FkaW5nIiwiYWRkcmVzcyIsImFiaSIsImZ1bmN0aW9uTmFtZSIsImFyZ3MiLCJlbmFibGVkIiwiZGl2IiwiaDIiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/DaoComponents/GameProposal.jsx\n"));

/***/ })

});