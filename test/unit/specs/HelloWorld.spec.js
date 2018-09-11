import Vue from 'vue'
import Menu from '@/components/Menu'

describe('Menu', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Menu)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
