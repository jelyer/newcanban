import Vue from 'vue';
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    let dialogHeaderEl = el.querySelector('.el-dialog__header');
    let dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';
    var sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = (e) => {
      let disX = e.clientX - dialogHeaderEl.offsetLeft;
      let disY = e.clientY - dialogHeaderEl.offsetTop;

      let styL, styT;

      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      }

      document.onmousemove = function(e) {
        let l = e.clientX - disX;
        let t = e.clientY - disY;

        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;
        // binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});

Vue.directive('dialogDragWidth', {
  bind(el, binding, vnode, oldVnode) {
    let dragDom = binding.value.$el.querySelector('.el-dialog');

    el.onmousedown = (e) => {
      let disX = e.clientX - el.offsetLeft;

      document.onmousemove = function(e) {
        e.preventDefault();
        let l = e.clientX - disX;
        dragDom.style.width = `${l}px`;
      };

      document.onmouseup = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
