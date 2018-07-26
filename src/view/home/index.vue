<template>
  <div id="home">
    <div class="home-contain" @click="$router.push('/login')">
      <div class="text-contain">
        <!-- <img src="../../assets/images/logo.png" alt=""> -->
        <div class="btn">登录</div>
        <h3>0727</h3>
        <p>相信自己，你是个天才</p>
        <p>更新时间：2017-07-26</p>
      </div>
      <WaterWave type="circle" />
    </div>

  </div>
</template>

<script>
import WaterWave from '../../components/WaterWave';
export default {
  name: 'Home',
  
  components: {
    WaterWave
  },

  data() {
    return {
      
    }
  },
}
</script>
<style lang="sass" scoped>
#home
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  background: #3f898f
  .home-contain
    position: relative
    cursor: pointer
    .text-contain
      width: 100%
      position: absolute
      left: 50%
      top: 48%
      transform: translate(-50%,-50%)
      color: #fff
      text-align: center
      img
        width: 100px
        margin-bottom: 30px
        transition: All 0.4s ease-in-out
      .btn
        height: 50px
        line-height: 50px
        display: none
      h3 
        font-size: 100px
        font-weight: 500
        margin-bottom: 20px
      p
        font-size: 24px 
        width: 100%
        &:last-child
          font-size: 22px
          color: #967126
          margin-top: 10px
    &:hover img
      transform: translate3d(0,-30px,0)
</style>