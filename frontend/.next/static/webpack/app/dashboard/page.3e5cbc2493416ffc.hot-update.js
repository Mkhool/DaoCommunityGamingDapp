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

/***/ "(app-pages-browser)/./app/components/NavBar.jsx":
/*!***********************************!*\
  !*** ./app/components/NavBar.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/layout/dist/chunk-NTCQBYKE.mjs\");\n/* harmony import */ var _barrel_optimize_names_FaCog_FaGamepad_FaHome_FaUsers_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=FaCog,FaGamepad,FaHome,FaUsers!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.mjs\");\n/* harmony import */ var _DesignPage_Profil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DesignPage/Profil */ \"(app-pages-browser)/./app/DesignPage/Profil.jsx\");\n\nvar _s = $RefreshSig$();\n\"use Client\";\n\n\n\n\nconst SidebarLink = (param)=>{\n    let { href, label, icon } = param;\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Button, {\n        leftIcon: icon,\n        justifyContent: \"flex-start\",\n        // variant=\"ghost\"\n        colorScheme: \"purple\",\n        width: \"full\",\n        _hover: {\n            bg: \"purple.500\",\n            color: \"#BFA181\"\n        },\n        iconSpacing: 2,\n        fontSize: \"sm\",\n        onClick: ()=>router.push(href),\n        style: {\n            textDecoration: \"none\"\n        },\n        children: label\n    }, void 0, false, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SidebarLink, \"fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter\n    ];\n});\n_c = SidebarLink;\nfunction NavBar() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Box, {\n        pos: \"fixed\",\n        top: 0,\n        left: 0,\n        h: \"100vh\",\n        w: \"150px\",\n        display: \"flex\",\n        bg: \"rgba(15, 15, 15)\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.VStack, {\n            spacing: 4,\n            align: \"stretch\",\n            m: 2,\n            width: \"100%\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Box, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DesignPage_Profil__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                        lineNumber: 33,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                    lineNumber: 32,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SidebarLink, {\n                    href: \"/dashboard\",\n                    label: \"Dashboard\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCog_FaGamepad_FaHome_FaUsers_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__.FaHome, {}, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                        lineNumber: 35,\n                        columnNumber: 64\n                    }, void 0)\n                }, void 0, false, {\n                    fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                    lineNumber: 35,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SidebarLink, {\n                    href: \"/game\",\n                    label: \"Game\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCog_FaGamepad_FaHome_FaUsers_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__.FaGamepad, {}, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                        lineNumber: 36,\n                        columnNumber: 54\n                    }, void 0)\n                }, void 0, false, {\n                    fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                    lineNumber: 36,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SidebarLink, {\n                    href: \"/dao\",\n                    label: \"Dao\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCog_FaGamepad_FaHome_FaUsers_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__.FaUsers, {}, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                        lineNumber: 37,\n                        columnNumber: 52\n                    }, void 0)\n                }, void 0, false, {\n                    fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                    lineNumber: 37,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SidebarLink, {\n                    href: \"/Admin\",\n                    label: \"Admin\",\n                    icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaCog_FaGamepad_FaHome_FaUsers_react_icons_fa__WEBPACK_IMPORTED_MODULE_6__.FaCog, {}, void 0, false, {\n                        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                        lineNumber: 38,\n                        columnNumber: 56\n                    }, void 0)\n                }, void 0, false, {\n                    fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n            lineNumber: 31,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/home/mkhool/Projet/daogaming/frontend/app/components/NavBar.jsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, this);\n}\n_c1 = NavBar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (NavBar);\nvar _c, _c1;\n$RefreshReg$(_c, \"SidebarLink\");\n$RefreshReg$(_c1, \"NavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL05hdkJhci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQzRDO0FBQ1c7QUFDWTtBQUN6QjtBQUUxQyxNQUFNUyxjQUFjO1FBQUMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLElBQUksRUFBRTs7SUFDeEMsTUFBTUMsU0FBU2IsMERBQVNBO0lBRXhCLHFCQUNFLDhEQUFDRyxvREFBTUE7UUFDTFcsVUFBVUY7UUFDVkcsZ0JBQWU7UUFDZixrQkFBa0I7UUFDbEJDLGFBQVk7UUFDWkMsT0FBTTtRQUNOQyxRQUFRO1lBQUVDLElBQUk7WUFBY0MsT0FBTztRQUFVO1FBQzdDQyxhQUFhO1FBQ2JDLFVBQVM7UUFDVEMsU0FBUyxJQUFNVixPQUFPVyxJQUFJLENBQUNkO1FBQzNCZSxPQUFPO1lBQUVDLGdCQUFnQjtRQUFPO2tCQUUvQmY7Ozs7OztBQUdQO0dBbkJNRjs7UUFDV1Qsc0RBQVNBOzs7S0FEcEJTO0FBcUJOLFNBQVNrQjtJQUNQLHFCQUNFLDhEQUFDMUIsaURBQUdBO1FBQUMyQixLQUFJO1FBQVFDLEtBQUs7UUFBR0MsTUFBTTtRQUFHQyxHQUFFO1FBQVFDLEdBQUU7UUFBUUMsU0FBUTtRQUFPZCxJQUFHO2tCQUN0RSw0RUFBQ2pCLG9EQUFNQTtZQUFDZ0MsU0FBUztZQUFHQyxPQUFNO1lBQVVDLEdBQUc7WUFBR25CLE9BQU07OzhCQUM5Qyw4REFBQ2hCLGlEQUFHQTs4QkFDRiw0RUFBQ08sMERBQU1BOzs7Ozs7Ozs7OzhCQUVULDhEQUFDQztvQkFBWUMsTUFBSztvQkFBYUMsT0FBTTtvQkFBWUMsb0JBQU0sOERBQUNSLHdHQUFNQTs7Ozs7Ozs7Ozs4QkFDOUQsOERBQUNLO29CQUFZQyxNQUFLO29CQUFRQyxPQUFNO29CQUFPQyxvQkFBTSw4REFBQ1AsMkdBQVNBOzs7Ozs7Ozs7OzhCQUN2RCw4REFBQ0k7b0JBQVlDLE1BQUs7b0JBQU9DLE9BQU07b0JBQU1DLG9CQUFNLDhEQUFDTix5R0FBT0E7Ozs7Ozs7Ozs7OEJBQ25ELDhEQUFDRztvQkFBWUMsTUFBSztvQkFBU0MsT0FBTTtvQkFBUUMsb0JBQU0sOERBQUNMLHVHQUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSTdEO01BZFNvQjtBQWdCVCwrREFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9OYXZCYXIuanN4Pzc2MDciXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBDbGllbnQnXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nOyBcbmltcG9ydCB7IEJveCwgVlN0YWNrLCBCdXR0b24gfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0JztcbmltcG9ydCB7IEZhSG9tZSwgRmFHYW1lcGFkLCBGYVVzZXJzLCBGYUNvZyB9IGZyb20gJ3JlYWN0LWljb25zL2ZhJztcbmltcG9ydCBQcm9maWwgZnJvbSAnLi4vRGVzaWduUGFnZS9Qcm9maWwnO1xuXG5jb25zdCBTaWRlYmFyTGluayA9ICh7IGhyZWYsIGxhYmVsLCBpY29uIH0pID0+IHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7IFxuXG4gIHJldHVybiAoXG4gICAgPEJ1dHRvblxuICAgICAgbGVmdEljb249e2ljb259XG4gICAgICBqdXN0aWZ5Q29udGVudD1cImZsZXgtc3RhcnRcIlxuICAgICAgLy8gdmFyaWFudD1cImdob3N0XCJcbiAgICAgIGNvbG9yU2NoZW1lPVwicHVycGxlXCJcbiAgICAgIHdpZHRoPVwiZnVsbFwiXG4gICAgICBfaG92ZXI9e3sgYmc6ICdwdXJwbGUuNTAwJywgY29sb3I6ICcjQkZBMTgxJyB9fSBcbiAgICAgIGljb25TcGFjaW5nPXsyfVxuICAgICAgZm9udFNpemU9XCJzbVwiXG4gICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChocmVmKX1cbiAgICAgIHN0eWxlPXt7IHRleHREZWNvcmF0aW9uOiAnbm9uZScgfX1cbiAgICA+XG4gICAgICB7bGFiZWx9XG4gICAgPC9CdXR0b24+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBOYXZCYXIoKSB7XG4gIHJldHVybiAoXG4gICAgPEJveCBwb3M9XCJmaXhlZFwiIHRvcD17MH0gbGVmdD17MH0gaD1cIjEwMHZoXCIgdz1cIjE1MHB4XCIgZGlzcGxheT1cImZsZXhcIiBiZz1cInJnYmEoMTUsIDE1LCAxNSlcIj5cbiAgICAgIDxWU3RhY2sgc3BhY2luZz17NH0gYWxpZ249XCJzdHJldGNoXCIgbT17Mn0gd2lkdGg9XCIxMDAlXCI+XG4gICAgICAgIDxCb3g+XG4gICAgICAgICAgPFByb2ZpbCAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICAgPFNpZGViYXJMaW5rIGhyZWY9XCIvZGFzaGJvYXJkXCIgbGFiZWw9XCJEYXNoYm9hcmRcIiBpY29uPXs8RmFIb21lIC8+fSAvPlxuICAgICAgICA8U2lkZWJhckxpbmsgaHJlZj1cIi9nYW1lXCIgbGFiZWw9XCJHYW1lXCIgaWNvbj17PEZhR2FtZXBhZCAvPn0gLz5cbiAgICAgICAgPFNpZGViYXJMaW5rIGhyZWY9XCIvZGFvXCIgbGFiZWw9XCJEYW9cIiBpY29uPXs8RmFVc2VycyAvPn0gLz5cbiAgICAgICAgPFNpZGViYXJMaW5rIGhyZWY9XCIvQWRtaW5cIiBsYWJlbD1cIkFkbWluXCIgaWNvbj17PEZhQ29nIC8+fSAvPlxuICAgICAgPC9WU3RhY2s+XG4gICAgPC9Cb3g+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkJhcjtcbiJdLCJuYW1lcyI6WyJ1c2VSb3V0ZXIiLCJCb3giLCJWU3RhY2siLCJCdXR0b24iLCJGYUhvbWUiLCJGYUdhbWVwYWQiLCJGYVVzZXJzIiwiRmFDb2ciLCJQcm9maWwiLCJTaWRlYmFyTGluayIsImhyZWYiLCJsYWJlbCIsImljb24iLCJyb3V0ZXIiLCJsZWZ0SWNvbiIsImp1c3RpZnlDb250ZW50IiwiY29sb3JTY2hlbWUiLCJ3aWR0aCIsIl9ob3ZlciIsImJnIiwiY29sb3IiLCJpY29uU3BhY2luZyIsImZvbnRTaXplIiwib25DbGljayIsInB1c2giLCJzdHlsZSIsInRleHREZWNvcmF0aW9uIiwiTmF2QmFyIiwicG9zIiwidG9wIiwibGVmdCIsImgiLCJ3IiwiZGlzcGxheSIsInNwYWNpbmciLCJhbGlnbiIsIm0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/NavBar.jsx\n"));

/***/ })

});