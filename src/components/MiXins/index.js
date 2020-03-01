const myMixin = {
  data() {
    return {

    }
  },
  mounted() {
    document.getElementById('scrollBox').addEventListener('scroll', this.handleScroll, true) // 监听（绑定）滚轮滚动事件
  },
  destroyed: function() {
    if (document.getElementById('scrollBox')) {
      document.getElementById('scrollBox').removeEventListener('scroll', this.handleScroll) //  离开页面清除（移除）滚轮滚动事件
    }
  },
  methods: {
    returnToView(tagName, event) {
      // console.log(tagName)
      // console.log(document.querySelectorAll(`.${tagName}`))
      // console.log(returnEle.offsetHeight)
      const returnEle = document.querySelectorAll(`.${tagName}`)[0]
      document.getElementById('scrollBox').scrollTo(0, returnEle.offsetTop - 80)
    },
    handleScroll() {
      const $scrolltop = document.getElementById('scrollBox').scrollTop
      const ele = document.querySelectorAll('.baseView')
      const tab_item = document.querySelectorAll('.tabItem')
      for (const index in ele) {
        const $top = ele[index].offsetTop + ele[index].offsetHeight / 2
        tab_item.forEach((objs, objIndex) => {
          tab_item[objIndex].classList.remove('tab_active')
        })
        if ($top > $scrolltop) {
          this.$nextTick(() => {
            tab_item[index].classList.add('tab_active')
          })
          return false
        }
      }
    }
  }
}
export default myMixin
