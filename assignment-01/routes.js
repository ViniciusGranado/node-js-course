const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Assignment 1</title></head>');
    res.write('<body>');
    res.write('<form action="/create-user" method="POST">');
    res.write('<input type="text" name="username"><button type="submit">Send</button>')
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  };
  
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split('=')[1];
      console.log(userName);
    });

    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }

  if (url === '/users') {
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>John</li>');
    res.write('<li>Mike</li>');
    res.write('<li>Jack</li>');
    res.write('<li>Eva</li>');
    res.write('<li>Zero</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  }
};

module.exports = requestHandler;

