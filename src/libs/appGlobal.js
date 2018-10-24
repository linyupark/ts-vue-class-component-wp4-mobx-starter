import { routerObserver, routerPageMap } from '@config/router';

export default {
  router: { 
    // 路由响应
    observer: routerObserver, 
    // 路由 name -> path
    path: (name) => routerPageMap[name].path 
  }
};