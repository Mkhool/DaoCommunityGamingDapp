/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/eth-query";
exports.ids = ["vendor-chunks/eth-query"];
exports.modules = {

/***/ "(ssr)/./node_modules/eth-query/index.js":
/*!*****************************************!*\
  !*** ./node_modules/eth-query/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const extend = __webpack_require__(/*! xtend */ \"(ssr)/./node_modules/xtend/immutable.js\")\nconst createRandomId = __webpack_require__(/*! json-rpc-random-id */ \"(ssr)/./node_modules/json-rpc-random-id/index.js\")()\n\nmodule.exports = EthQuery\n\n\nfunction EthQuery(provider){\n  const self = this\n  self.currentProvider = provider\n}\n\n//\n// base queries\n//\n\n// default block\nEthQuery.prototype.getBalance =                          generateFnWithDefaultBlockFor(2, 'eth_getBalance')\nEthQuery.prototype.getCode =                             generateFnWithDefaultBlockFor(2, 'eth_getCode')\nEthQuery.prototype.getTransactionCount =                 generateFnWithDefaultBlockFor(2, 'eth_getTransactionCount')\nEthQuery.prototype.getStorageAt =                        generateFnWithDefaultBlockFor(3, 'eth_getStorageAt')\nEthQuery.prototype.call =                                generateFnWithDefaultBlockFor(2, 'eth_call')\n// standard\nEthQuery.prototype.protocolVersion =                     generateFnFor('eth_protocolVersion')\nEthQuery.prototype.syncing =                             generateFnFor('eth_syncing')\nEthQuery.prototype.coinbase =                            generateFnFor('eth_coinbase')\nEthQuery.prototype.mining =                              generateFnFor('eth_mining')\nEthQuery.prototype.hashrate =                            generateFnFor('eth_hashrate')\nEthQuery.prototype.gasPrice =                            generateFnFor('eth_gasPrice')\nEthQuery.prototype.accounts =                            generateFnFor('eth_accounts')\nEthQuery.prototype.blockNumber =                         generateFnFor('eth_blockNumber')\nEthQuery.prototype.getBlockTransactionCountByHash =      generateFnFor('eth_getBlockTransactionCountByHash')\nEthQuery.prototype.getBlockTransactionCountByNumber =    generateFnFor('eth_getBlockTransactionCountByNumber')\nEthQuery.prototype.getUncleCountByBlockHash =            generateFnFor('eth_getUncleCountByBlockHash')\nEthQuery.prototype.getUncleCountByBlockNumber =          generateFnFor('eth_getUncleCountByBlockNumber')\nEthQuery.prototype.sign =                                generateFnFor('eth_sign')\nEthQuery.prototype.sendTransaction =                     generateFnFor('eth_sendTransaction')\nEthQuery.prototype.sendRawTransaction =                  generateFnFor('eth_sendRawTransaction')\nEthQuery.prototype.estimateGas =                         generateFnFor('eth_estimateGas')\nEthQuery.prototype.getBlockByHash =                      generateFnFor('eth_getBlockByHash')\nEthQuery.prototype.getBlockByNumber =                    generateFnFor('eth_getBlockByNumber')\nEthQuery.prototype.getTransactionByHash =                generateFnFor('eth_getTransactionByHash')\nEthQuery.prototype.getTransactionByBlockHashAndIndex =   generateFnFor('eth_getTransactionByBlockHashAndIndex')\nEthQuery.prototype.getTransactionByBlockNumberAndIndex = generateFnFor('eth_getTransactionByBlockNumberAndIndex')\nEthQuery.prototype.getTransactionReceipt =               generateFnFor('eth_getTransactionReceipt')\nEthQuery.prototype.getUncleByBlockHashAndIndex =         generateFnFor('eth_getUncleByBlockHashAndIndex')\nEthQuery.prototype.getUncleByBlockNumberAndIndex =       generateFnFor('eth_getUncleByBlockNumberAndIndex')\nEthQuery.prototype.getCompilers =                        generateFnFor('eth_getCompilers')\nEthQuery.prototype.compileLLL =                          generateFnFor('eth_compileLLL')\nEthQuery.prototype.compileSolidity =                     generateFnFor('eth_compileSolidity')\nEthQuery.prototype.compileSerpent =                      generateFnFor('eth_compileSerpent')\nEthQuery.prototype.newFilter =                           generateFnFor('eth_newFilter')\nEthQuery.prototype.newBlockFilter =                      generateFnFor('eth_newBlockFilter')\nEthQuery.prototype.newPendingTransactionFilter =         generateFnFor('eth_newPendingTransactionFilter')\nEthQuery.prototype.uninstallFilter =                     generateFnFor('eth_uninstallFilter')\nEthQuery.prototype.getFilterChanges =                    generateFnFor('eth_getFilterChanges')\nEthQuery.prototype.getFilterLogs =                       generateFnFor('eth_getFilterLogs')\nEthQuery.prototype.getLogs =                             generateFnFor('eth_getLogs')\nEthQuery.prototype.getWork =                             generateFnFor('eth_getWork')\nEthQuery.prototype.submitWork =                          generateFnFor('eth_submitWork')\nEthQuery.prototype.submitHashrate =                      generateFnFor('eth_submitHashrate')\n\n// network level\n\nEthQuery.prototype.sendAsync = function(opts, cb){\n  const self = this\n  self.currentProvider.sendAsync(createPayload(opts), function(err, response){\n    if (!err && response.error) err = new Error('EthQuery - RPC Error - '+response.error.message)\n    if (err) return cb(err)\n    cb(null, response.result)\n  })\n}\n\n// util\n\nfunction generateFnFor(methodName){\n  return function(){\n    const self = this\n    var args = [].slice.call(arguments)\n    var cb = args.pop()\n    self.sendAsync({\n      method: methodName,\n      params: args,\n    }, cb)\n  }\n}\n\nfunction generateFnWithDefaultBlockFor(argCount, methodName){\n  return function(){\n    const self = this\n    var args = [].slice.call(arguments)\n    var cb = args.pop()\n    // set optional default block param\n    if (args.length < argCount) args.push('latest')\n    self.sendAsync({\n      method: methodName,\n      params: args,\n    }, cb)\n  }\n}\n\nfunction createPayload(data){\n  return extend({\n    // defaults\n    id: createRandomId(),\n    jsonrpc: '2.0',\n    params: [],\n    // user-specified\n  }, data)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZXRoLXF1ZXJ5L2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBLGVBQWUsbUJBQU8sQ0FBQyxzREFBTztBQUM5Qix1QkFBdUIsbUJBQU8sQ0FBQyw0RUFBb0I7O0FBRW5EOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCIsInNvdXJjZXMiOlsid2VicGFjazovL3F1ZXN0Z2FtaW5nLy4vbm9kZV9tb2R1bGVzL2V0aC1xdWVyeS9pbmRleC5qcz80YzU1Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGV4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcbmNvbnN0IGNyZWF0ZVJhbmRvbUlkID0gcmVxdWlyZSgnanNvbi1ycGMtcmFuZG9tLWlkJykoKVxuXG5tb2R1bGUuZXhwb3J0cyA9IEV0aFF1ZXJ5XG5cblxuZnVuY3Rpb24gRXRoUXVlcnkocHJvdmlkZXIpe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBzZWxmLmN1cnJlbnRQcm92aWRlciA9IHByb3ZpZGVyXG59XG5cbi8vXG4vLyBiYXNlIHF1ZXJpZXNcbi8vXG5cbi8vIGRlZmF1bHQgYmxvY2tcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRCYWxhbmNlID0gICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5XaXRoRGVmYXVsdEJsb2NrRm9yKDIsICdldGhfZ2V0QmFsYW5jZScpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0Q29kZSA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuV2l0aERlZmF1bHRCbG9ja0ZvcigyLCAnZXRoX2dldENvZGUnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFRyYW5zYWN0aW9uQ291bnQgPSAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbldpdGhEZWZhdWx0QmxvY2tGb3IoMiwgJ2V0aF9nZXRUcmFuc2FjdGlvbkNvdW50JylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRTdG9yYWdlQXQgPSAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5XaXRoRGVmYXVsdEJsb2NrRm9yKDMsICdldGhfZ2V0U3RvcmFnZUF0JylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5jYWxsID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5XaXRoRGVmYXVsdEJsb2NrRm9yKDIsICdldGhfY2FsbCcpXG4vLyBzdGFuZGFyZFxuRXRoUXVlcnkucHJvdG90eXBlLnByb3RvY29sVmVyc2lvbiA9ICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX3Byb3RvY29sVmVyc2lvbicpXG5FdGhRdWVyeS5wcm90b3R5cGUuc3luY2luZyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfc3luY2luZycpXG5FdGhRdWVyeS5wcm90b3R5cGUuY29pbmJhc2UgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfY29pbmJhc2UnKVxuRXRoUXVlcnkucHJvdG90eXBlLm1pbmluZyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX21pbmluZycpXG5FdGhRdWVyeS5wcm90b3R5cGUuaGFzaHJhdGUgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfaGFzaHJhdGUnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdhc1ByaWNlID0gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dhc1ByaWNlJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5hY2NvdW50cyA9ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9hY2NvdW50cycpXG5FdGhRdWVyeS5wcm90b3R5cGUuYmxvY2tOdW1iZXIgPSAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfYmxvY2tOdW1iZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldEJsb2NrVHJhbnNhY3Rpb25Db3VudEJ5SGFzaCA9ICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldEJsb2NrVHJhbnNhY3Rpb25Db3VudEJ5SGFzaCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlOdW1iZXIgPSAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0QmxvY2tUcmFuc2FjdGlvbkNvdW50QnlOdW1iZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFVuY2xlQ291bnRCeUJsb2NrSGFzaCA9ICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldFVuY2xlQ291bnRCeUJsb2NrSGFzaCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VW5jbGVDb3VudEJ5QmxvY2tOdW1iZXIgPSAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0VW5jbGVDb3VudEJ5QmxvY2tOdW1iZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLnNpZ24gPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX3NpZ24nKVxuRXRoUXVlcnkucHJvdG90eXBlLnNlbmRUcmFuc2FjdGlvbiA9ICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX3NlbmRUcmFuc2FjdGlvbicpXG5FdGhRdWVyeS5wcm90b3R5cGUuc2VuZFJhd1RyYW5zYWN0aW9uID0gICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfc2VuZFJhd1RyYW5zYWN0aW9uJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5lc3RpbWF0ZUdhcyA9ICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9lc3RpbWF0ZUdhcycpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0QmxvY2tCeUhhc2ggPSAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0QmxvY2tCeUhhc2gnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldEJsb2NrQnlOdW1iZXIgPSAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldEJsb2NrQnlOdW1iZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFRyYW5zYWN0aW9uQnlIYXNoID0gICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldFRyYW5zYWN0aW9uQnlIYXNoJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRUcmFuc2FjdGlvbkJ5QmxvY2tIYXNoQW5kSW5kZXggPSAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tIYXNoQW5kSW5kZXgnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFRyYW5zYWN0aW9uQnlCbG9ja051bWJlckFuZEluZGV4ID0gZ2VuZXJhdGVGbkZvcignZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja051bWJlckFuZEluZGV4JylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5nZXRUcmFuc2FjdGlvblJlY2VpcHQgPSAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9nZXRUcmFuc2FjdGlvblJlY2VpcHQnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFVuY2xlQnlCbG9ja0hhc2hBbmRJbmRleCA9ICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldFVuY2xlQnlCbG9ja0hhc2hBbmRJbmRleCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuZ2V0VW5jbGVCeUJsb2NrTnVtYmVyQW5kSW5kZXggPSAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfZ2V0VW5jbGVCeUJsb2NrTnVtYmVyQW5kSW5kZXgnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldENvbXBpbGVycyA9ICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldENvbXBpbGVycycpXG5FdGhRdWVyeS5wcm90b3R5cGUuY29tcGlsZUxMTCA9ICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfY29tcGlsZUxMTCcpXG5FdGhRdWVyeS5wcm90b3R5cGUuY29tcGlsZVNvbGlkaXR5ID0gICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfY29tcGlsZVNvbGlkaXR5JylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5jb21waWxlU2VycGVudCA9ICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9jb21waWxlU2VycGVudCcpXG5FdGhRdWVyeS5wcm90b3R5cGUubmV3RmlsdGVyID0gICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfbmV3RmlsdGVyJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS5uZXdCbG9ja0ZpbHRlciA9ICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF9uZXdCbG9ja0ZpbHRlcicpXG5FdGhRdWVyeS5wcm90b3R5cGUubmV3UGVuZGluZ1RyYW5zYWN0aW9uRmlsdGVyID0gICAgICAgICBnZW5lcmF0ZUZuRm9yKCdldGhfbmV3UGVuZGluZ1RyYW5zYWN0aW9uRmlsdGVyJylcbkV0aFF1ZXJ5LnByb3RvdHlwZS51bmluc3RhbGxGaWx0ZXIgPSAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlRm5Gb3IoJ2V0aF91bmluc3RhbGxGaWx0ZXInKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldEZpbHRlckNoYW5nZXMgPSAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldEZpbHRlckNoYW5nZXMnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldEZpbHRlckxvZ3MgPSAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldEZpbHRlckxvZ3MnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldExvZ3MgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldExvZ3MnKVxuRXRoUXVlcnkucHJvdG90eXBlLmdldFdvcmsgPSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX2dldFdvcmsnKVxuRXRoUXVlcnkucHJvdG90eXBlLnN1Ym1pdFdvcmsgPSAgICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX3N1Ym1pdFdvcmsnKVxuRXRoUXVlcnkucHJvdG90eXBlLnN1Ym1pdEhhc2hyYXRlID0gICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVGbkZvcignZXRoX3N1Ym1pdEhhc2hyYXRlJylcblxuLy8gbmV0d29yayBsZXZlbFxuXG5FdGhRdWVyeS5wcm90b3R5cGUuc2VuZEFzeW5jID0gZnVuY3Rpb24ob3B0cywgY2Ipe1xuICBjb25zdCBzZWxmID0gdGhpc1xuICBzZWxmLmN1cnJlbnRQcm92aWRlci5zZW5kQXN5bmMoY3JlYXRlUGF5bG9hZChvcHRzKSwgZnVuY3Rpb24oZXJyLCByZXNwb25zZSl7XG4gICAgaWYgKCFlcnIgJiYgcmVzcG9uc2UuZXJyb3IpIGVyciA9IG5ldyBFcnJvcignRXRoUXVlcnkgLSBSUEMgRXJyb3IgLSAnK3Jlc3BvbnNlLmVycm9yLm1lc3NhZ2UpXG4gICAgaWYgKGVycikgcmV0dXJuIGNiKGVycilcbiAgICBjYihudWxsLCByZXNwb25zZS5yZXN1bHQpXG4gIH0pXG59XG5cbi8vIHV0aWxcblxuZnVuY3Rpb24gZ2VuZXJhdGVGbkZvcihtZXRob2ROYW1lKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgIHZhciBjYiA9IGFyZ3MucG9wKClcbiAgICBzZWxmLnNlbmRBc3luYyh7XG4gICAgICBtZXRob2Q6IG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbXM6IGFyZ3MsXG4gICAgfSwgY2IpXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVGbldpdGhEZWZhdWx0QmxvY2tGb3IoYXJnQ291bnQsIG1ldGhvZE5hbWUpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgdmFyIGNiID0gYXJncy5wb3AoKVxuICAgIC8vIHNldCBvcHRpb25hbCBkZWZhdWx0IGJsb2NrIHBhcmFtXG4gICAgaWYgKGFyZ3MubGVuZ3RoIDwgYXJnQ291bnQpIGFyZ3MucHVzaCgnbGF0ZXN0JylcbiAgICBzZWxmLnNlbmRBc3luYyh7XG4gICAgICBtZXRob2Q6IG1ldGhvZE5hbWUsXG4gICAgICBwYXJhbXM6IGFyZ3MsXG4gICAgfSwgY2IpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGF5bG9hZChkYXRhKXtcbiAgcmV0dXJuIGV4dGVuZCh7XG4gICAgLy8gZGVmYXVsdHNcbiAgICBpZDogY3JlYXRlUmFuZG9tSWQoKSxcbiAgICBqc29ucnBjOiAnMi4wJyxcbiAgICBwYXJhbXM6IFtdLFxuICAgIC8vIHVzZXItc3BlY2lmaWVkXG4gIH0sIGRhdGEpXG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/eth-query/index.js\n");

/***/ })

};
;