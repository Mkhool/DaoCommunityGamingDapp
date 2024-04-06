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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var wagmi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wagmi */ \"(app-pages-browser)/./node_modules/wagmi/dist/esm/hooks/useReadContract.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/constants */ \"(app-pages-browser)/./constants/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Quorum__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Quorum */ \"(app-pages-browser)/./app/DaoComponents/Quorum.jsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nfunction GameProposal(param) {\n    let { initialProposalId } = param;\n    _s();\n    const [proposalId, setProposalId] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(initialProposalId || \"\");\n    const { data, isError, isLoading } = (0,wagmi__WEBPACK_IMPORTED_MODULE_4__.useReadContract)({\n        address: _constants__WEBPACK_IMPORTED_MODULE_1__.ContractAddress,\n        abi: _constants__WEBPACK_IMPORTED_MODULE_1__.ContractAbi,\n        functionName: \"GetProposal\",\n        args: [\n            proposalId\n        ],\n        enabled: proposalId !== \"\"\n    });\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        if (initialProposalId) {\n            setProposalId(initialProposalId);\n        }\n    }, [\n        initialProposalId\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        console.log(data);\n    }, [\n        data\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            isLoading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                lineNumber: 29,\n                columnNumber: 21\n            }, this),\n            isError || !data ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"No game with this ID\"\n            }, void 0, false, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        children: \"Proposal Details\"\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 34,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"ID: \",\n                            initialProposalId || proposalId\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 35,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Name: \",\n                            data[1]\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 36,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Vote Count: \",\n                            Number(data[2] / BigInt(1e18)).toString()\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 37,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: [\n                            \"Is Accepted: \",\n                            data[3] ? \"Yes\" : \"No\"\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 38,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Quorum__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                            fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                            lineNumber: 39,\n                            columnNumber: 14\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                        lineNumber: 39,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n                lineNumber: 33,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/DaoComponents/GameProposal.jsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, this);\n}\n_s(GameProposal, \"I226dl8PpIu/pRa7ogKa3SW2LhQ=\", false, function() {\n    return [\n        wagmi__WEBPACK_IMPORTED_MODULE_4__.useReadContract\n    ];\n});\n_c = GameProposal;\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameProposal);\nvar _c;\n$RefreshReg$(_c, \"GameProposal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9EYW9Db21wb25lbnRzL0dhbWVQcm9wb3NhbC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdDO0FBQ21CO0FBQ2Q7QUFDZjtBQUU5QixTQUFTTSxhQUFhLEtBQXFCO1FBQXJCLEVBQUVDLGlCQUFpQixFQUFFLEdBQXJCOztJQUNwQixNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR04sK0NBQVFBLENBQUNJLHFCQUFxQjtJQUNsRSxNQUFNLEVBQUVHLElBQUksRUFBRUMsT0FBTyxFQUFFQyxTQUFTLEVBQUUsR0FBR1osc0RBQWVBLENBQUM7UUFDbkRhLFNBQVNaLHVEQUFlQTtRQUN4QmEsS0FBS1osbURBQVdBO1FBQ2hCYSxjQUFjO1FBQ2RDLE1BQU07WUFBQ1I7U0FBVztRQUNsQlMsU0FBU1QsZUFBZTtJQUMxQjtJQUVBSixnREFBU0EsQ0FBQztRQUNSLElBQUlHLG1CQUFtQjtZQUNyQkUsY0FBY0Y7UUFDaEI7SUFDRixHQUFHO1FBQUNBO0tBQWtCO0lBRXRCSCxnREFBU0EsQ0FBQztRQUNSYyxRQUFRQyxHQUFHLENBQUNUO0lBQ2QsR0FBRztRQUFDQTtLQUFLO0lBR1QscUJBQ0UsOERBQUNVOztZQUNFUiwyQkFBYSw4REFBQ1E7MEJBQUk7Ozs7OztZQUNsQlQsV0FBVyxDQUFDRCxxQkFDWCw4REFBQ1U7MEJBQUk7Ozs7O3FDQUVMLDhEQUFDQTs7a0NBQ0MsOERBQUNDO2tDQUFHOzs7Ozs7a0NBQ0osOERBQUNDOzs0QkFBRTs0QkFBS2YscUJBQXFCQzs7Ozs7OztrQ0FDN0IsOERBQUNjOzs0QkFBRTs0QkFBT1osSUFBSSxDQUFDLEVBQUU7Ozs7Ozs7a0NBQ2pCLDhEQUFDWTs7NEJBQUU7NEJBQWFDLE9BQU9iLElBQUksQ0FBQyxFQUFFLEdBQUdjLE9BQU8sT0FBT0MsUUFBUTs7Ozs7OztrQ0FDdkQsOERBQUNIOzs0QkFBRTs0QkFBY1osSUFBSSxDQUFDLEVBQUUsR0FBRyxRQUFROzs7Ozs7O2tDQUNuQyw4REFBQ1k7a0NBQUUsNEVBQUNqQiwrQ0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLcEI7R0F0Q1NDOztRQUU4Qk4sa0RBQWVBOzs7S0FGN0NNO0FBd0NULCtEQUFlQSxZQUFZQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9EYW9Db21wb25lbnRzL0dhbWVQcm9wb3NhbC5qc3g/OWI4NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VSZWFkQ29udHJhY3QgfSBmcm9tICd3YWdtaSc7XG5pbXBvcnQgeyBDb250cmFjdEFkZHJlc3MsIENvbnRyYWN0QWJpIH0gZnJvbSAnQC9jb25zdGFudHMnO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCAgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUXVvcnVtIGZyb20gJy4vUXVvcnVtJztcblxuZnVuY3Rpb24gR2FtZVByb3Bvc2FsKHsgaW5pdGlhbFByb3Bvc2FsSWQgfSkge1xuICBjb25zdCBbcHJvcG9zYWxJZCwgc2V0UHJvcG9zYWxJZF0gPSB1c2VTdGF0ZShpbml0aWFsUHJvcG9zYWxJZCB8fCAnJyk7XG4gIGNvbnN0IHsgZGF0YSwgaXNFcnJvciwgaXNMb2FkaW5nIH0gPSB1c2VSZWFkQ29udHJhY3Qoe1xuICAgIGFkZHJlc3M6IENvbnRyYWN0QWRkcmVzcywgXG4gICAgYWJpOiBDb250cmFjdEFiaSwgXG4gICAgZnVuY3Rpb25OYW1lOiAnR2V0UHJvcG9zYWwnLCBcbiAgICBhcmdzOiBbcHJvcG9zYWxJZF0sIFxuICAgIGVuYWJsZWQ6IHByb3Bvc2FsSWQgIT09ICcnLCBcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaW5pdGlhbFByb3Bvc2FsSWQpIHtcbiAgICAgIHNldFByb3Bvc2FsSWQoaW5pdGlhbFByb3Bvc2FsSWQpO1xuICAgIH1cbiAgfSwgW2luaXRpYWxQcm9wb3NhbElkXSk7XG4gIFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9LCBbZGF0YV0pO1xuXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAge2lzTG9hZGluZyAmJiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj59XG4gICAgICB7aXNFcnJvciB8fCAhZGF0YSA/IChcbiAgICAgICAgPGRpdj5ObyBnYW1lIHdpdGggdGhpcyBJRDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDI+UHJvcG9zYWwgRGV0YWlsczwvaDI+XG4gICAgICAgICAgPHA+SUQ6IHtpbml0aWFsUHJvcG9zYWxJZCB8fCBwcm9wb3NhbElkfTwvcD5cbiAgICAgICAgICA8cD5OYW1lOiB7ZGF0YVsxXX08L3A+XG4gICAgICAgICAgPHA+Vm90ZSBDb3VudDoge051bWJlcihkYXRhWzJdIC8gQmlnSW50KDFlMTgpKS50b1N0cmluZygpfTwvcD5cbiAgICAgICAgICA8cD5JcyBBY2NlcHRlZDoge2RhdGFbM10gPyAnWWVzJyA6ICdObyd9PC9wPlxuICAgICAgICAgIDxwPjxRdW9ydW0vPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVQcm9wb3NhbDtcbiJdLCJuYW1lcyI6WyJ1c2VSZWFkQ29udHJhY3QiLCJDb250cmFjdEFkZHJlc3MiLCJDb250cmFjdEFiaSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiUXVvcnVtIiwiR2FtZVByb3Bvc2FsIiwiaW5pdGlhbFByb3Bvc2FsSWQiLCJwcm9wb3NhbElkIiwic2V0UHJvcG9zYWxJZCIsImRhdGEiLCJpc0Vycm9yIiwiaXNMb2FkaW5nIiwiYWRkcmVzcyIsImFiaSIsImZ1bmN0aW9uTmFtZSIsImFyZ3MiLCJlbmFibGVkIiwiY29uc29sZSIsImxvZyIsImRpdiIsImgyIiwicCIsIk51bWJlciIsIkJpZ0ludCIsInRvU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/DaoComponents/GameProposal.jsx\n"));

/***/ })

});