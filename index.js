const fs = require('fs');

const isDir = (path = '') => {
  try {
    return path && fs.lstatSync(path).isDirectory();
  } catch (error) {
    return false;
  }
};

const getFileList = (path = '') => {
  let fileList = [];
  try {
    fileList = fs.readdirSync(path);
  } catch (error) {}

  return fileList;
};

const regex = /[a-zA-Z\/?]{1,}/;

const getRouteFromPath = (path = '') => {
  let controllerIndex = path.indexOf('/controller/');
  let routeDir = path.substring(controllerIndex + '/controller'.length);
  const found = routeDir.match(regex);
  return found[0];
};

const checkDirFormat = (path = '') => {
  if (path[path.length - 1] !== '/' && path.indexOf('.') < 0) {
    path += '/';
  }

  return path;
};

const walkFiles = (dir, fileList = [], routes = []) => {
  if (fileList.length === 0 && !isDir(dir)) return;

  if (fileList.length === 0) {
    fileList = getFileList(dir);
  }

  fileList.forEach(file => {
    let fileDir = dir + file;

    fileDir = checkDirFormat(fileDir);

    if (isDir(fileDir)) {
      walkFiles(fileDir, getFileList(file), routes);
    } else {
      let routeObj = addRoute(fileDir, file, {});
      routes.push(routeObj);
    }
  });

  return routes;
};

const addRoute = (path, file, controller) => {
  let apiRoute = getRouteFromPath(path);
  //edge case for index route;
  if (file === 'index.js') {
    apiRoute = '/';
  }
  // console.log({ apiRoute, path });
  return { apiRoute, path };
};

module.exports = {
  walkFiles
};
