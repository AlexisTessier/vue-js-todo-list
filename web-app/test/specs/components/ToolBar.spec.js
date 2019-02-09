import { mount } from '@vue/test-utils'
import ToolBar from '@/components/ToolBar.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(ToolBar, {
      stubs: ['v-toolbar', 'v-toolbar-title'],
      propsData: {
        title: 'hello title'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
