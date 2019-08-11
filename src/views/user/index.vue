<template>
<div class="user-info">
  <div class="name-box">
    <div class="user-name">{{user.name}}</div>
    <div class="user-icon"><img :src="user.icon" class="width-100"  alt=""></div>
  </div>
  <div class="content">
    <div class="item">
      <div class="left">积分：{{user.score}}</div>
      <div class="right">
        <span class="vip">vip</span>
      </div>

    </div>
    <div class="item">
      <div class="left">我的推广码</div>
      <div class="right">
        <span class="qrcode"><img :src="user.qrImg" class="width-100" alt=""></span>
      </div>
    </div>
    <div class="item">
      <div class="left">设计师端口</div>
      <div class="right">
        <span class="apply">申请</span>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="upgrade-box">
       <button class="upgrade">立即升级VIP {{user.vipFee}}元/年</button>
    </div>
    <div class="buy-box">
      <button class="buy">单次购买{{user.singFee}}元</button>
    </div>

  </div>
</div>

</template>
<script>
export default {
  data () {
    return {
      user: {
        name: '毛瑞彬',
        icon: 'static/test/1.jpg',
        qrImg: 'static/test/2.jpg',
        score: 100,
        vipFee: 99,
        singFee: 9
      }
    }
  }

}
</script>

<style scoped>
.width-100 {
  width: 100%;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.name-box {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  position: relative;
  border-bottom: 1px solid #ccc;
}
.user-name {
  text-align: left;
}
.user-icon {
  float:right;
  position: absolute;
  right: 20px;
  width: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.content {
  padding: 20px 0 100px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
}

.item {
  display: flex;
  flex-direction: row;
  position: relative;
  padding: 30px 0;
}
.left {
  text-align: left;
}
.right {
  position: absolute;
  right: 20px;

}
.vip {
  padding: 5px 15px;
  border-radius: 5px;
  background-color: red;
  color: #fff;
  font-size: 14px;
}
.qrcode {
  width: 40px;
  display: inline-block;
}

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.upgrade-box, .buy-box {
  padding: 20px 0;
}

.upgrade {
  padding: 10px 40px;
  background-color: red;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  border: none;
  outline: none;
}

.buy {
   padding: 6px 20px;
  background-color: red;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  border: none;
  outline: none;
}

</style>
