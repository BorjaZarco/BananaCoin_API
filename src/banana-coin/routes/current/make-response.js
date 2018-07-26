const getLinks = require('./get-links');

module.exports = function (responseData, req, page) {  
  if (page) {
    return {
      links: getLinks(req, page),
      data: responseData[page-1],
      included: {
        type: "object"
      }
    }
  }
  return {
    links: getLinks(req, page),
    data: responseData,
    included: {
      type: "object"
    }
  }

}