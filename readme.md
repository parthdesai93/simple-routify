Automatically walk controller dir in basefolder and mount routes present in that folder

code for index route `'/'` goes into `'controller/index.js'`.

For example, 

if you want a route `'/users/post/'`, just create a file `'controller/users/post.js'`.

Finally, to mount the routes do something like this:

```
  const app = express();
  let baseDir = process.cwd();
  let controllerDir = baseDir + '/controller/'; 
  const routes = walkFiles(controllerDir);

  routes.forEach(route => {
    app.use(route.apiRoute, require(route.path))
  })
```