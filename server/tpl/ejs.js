module.exports = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, inital-scale=1">
            <title>Koa Server HTML</title>
            <link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.bootcss.com/jquery/1.12.2/jquery.min.js"></script>
            <script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <h1>Hi <%= user %></h1>
                        <p>this is <%= ower %></p>
                    </div>
                    <div class="col-md-4">
                        <p>koa html</p>
                    </div>
                </div>
            </div>
        </body>
    </html>
`