const getLinks = require('./get-links');

module.exports = function (responseData, req, page) {  
  return {
    links: getLinks(req, page),
    data: responseData[page-1],
    included: {
      type: "object"
    }
  }
}