/**
 * 纪录路由变化，来判断是向前还是向后
 * @author linyupark@gmail.com
 */

interface routerObject {
  path: string;
  name?: string;
}

interface routerSlideToParams {
  to: routerObject;
  from: routerObject;
}

// 路由 path 纪录缓存
let pathList: string[] = [];

const routerSlideTo = (routerParams: routerSlideToParams) => {

  // 方向
  let direction = 'forward';

  // 取值
  const { from, to } = routerParams;

  // 上一页地址
  const lastPath = pathList.slice(pathList.length - 2, -1)[0];

  // 初始页只纪录不做判断
  if (!from.name) {
    pathList.push(to.path);
    return '';
  }

  // 只针对 path做判断
  if (!lastPath || to.path !== lastPath) {
    pathList.push(to.path);
    console.log(lastPath || '初始页', '-->', to.path);
  }
  else {
    pathList.pop();
    direction = 'back';
    console.log(lastPath, '<--', from.path);
  }
  
  return direction;
};

export default routerSlideTo;