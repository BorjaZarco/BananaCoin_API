module.exports = function (req, page) {
  const links = {
    self: [
      req.protocol,
      '://',
      req.get('host'),
      req.originUrl,
      '/banana-coin?page='+page
    ].join(''),
    first: [
      req.protocol,
      '://',
      req.get('host'),
      req.originUrl,
      '/banana-coin?page=1'
    ].join(''),
    last: [
      req.protocol,
      '://',
      req.get('host'),
      req.originUrl,
      '/banana-coin?page=0'
    ].join('')
  };

  if (page) links.next =
    [
      req.protocol,
      '://',
      req.get('host'),
      req.originUrl,
      '/banana-coin?page='+(page+1)
    ].join('')

    if (page > 1) links.prev = 
    [
      req.protocol,
      '://',
      req.get('host'),
      req.originUrl,
      '/banana-coin?page='+(page-1)
    ].join('')
    
  return links;
}