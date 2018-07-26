import Vue from 'vue';
import {pageScroll} from '../../../../utils';
import toast from './toast.vue'

const ToastConstructor = Vue.extend(toast);

const instance = new ToastConstructor({
  el: document.createElement('div')
});

ToastConstructor.prototype.closeToast = function () {
  instance.show = false;
  const el = instance.$el;
  el.parentNode && el.parentNode.removeChild(el);

  pageScroll.unlock();

  typeof this.callback == 'function' && this.callback();
};

const Toast = (options = {}) => {
  instance.mes = options.mes;
  instance.icon = options.icon;
  instance.timeout = ~~options.timeout || 2000;
  instance.callback = options.callback;
  instance.show = true;

  document.body.appendChild(instance.$el);

  pageScroll.lock();

  const timer = setTimeout(() => {
    clearTimeout(timer);
    instance.closeToast();
  }, instance.timeout + 100);
};

export default Toast;