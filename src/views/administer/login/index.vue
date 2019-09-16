<template>
    <div class="wrapper">
        <div class="login">
            <div class="item">
                <h3 class="title">登陆</h3>
            </div>
            <div class="item">
                <div class="left">手机号：</div>
                <div class="right">
                    <input v-model="model.phone" type="text" placeholder="请输入手机号">
                    <i class="iconfont icon-zhanghu" />
                </div>
            </div>

            <div class="item">
                <div class="left">密码：</div>
                <div>
                    <input v-model="model.password" type="password" placeholder="请输入你的密码" @keydown.enter="confirm(model)">
                    <i class="iconfont icon-yuechi" />
                </div>
            </div>

            <button class="btn btn-success" @click="confirm(model)">
                <span>登录</span>
              </button>
        </div>
    </div>
</template>

<script>

import store from '@/store/user'
export default {
  data () {
    return {
      model: {
        phone: '',
        password: ''
      }

    }
  },
  beforeCreate () {
    store.commit('setFlag', '')
    store.commit('setToken', '')
  },
  methods: {
    confirm (model) {
      const { phone, password } = model
      store.dispatch('login', { phone, password }).then((res) => {
        console.log(34444)
        this.$router.push({
          path: '/admin',
          query: {
            flag: res.id
          }
        })
      }).catch((err) => {
        console.log(err)
        this.info = '登录失败， 请重新登录'
      })
    }
  },
  watch: {
    name () {
      this.info = ''
    },
    password () {
      this.info = ''
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    .login {
        width: 18rem;
        height: 20rem;
        margin: 7rem auto 0;
        text-align: center;
        position: relative;
        .icon-icon69 {
            font-size: 3.75rem;
            color: darkturquoise;
        }
        .item {
            width: 100%;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 5rem;
            .left {
                flex: 0 0 80px;
                text-align: right;
                // justify-content: center;
                // align-items: center;
            }
            i {
                color: darkturquoise;
                font-size: 1.875rem;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                transition: 0.5s;
            }
            .add {
                color: rgb(10, 122, 160);
                cursor: pointer;
            }
        }
        input {
            width: 12.5rem;
            height: 1.875rem;
            display: block; // margin-top: 2.5rem;
            // margin-bottom: 1.25rem;
            // margin-left: 3rem;
            outline: none;
            border: none;
            border-bottom: 0.1875rem solid darkturquoise;
            background: transparent;
            color: #080808;
            font-size: 1rem;
            padding-left: 0.625rem;
            &:focus+i {
                color: #ffc520;
            }
        }
        button {
            width: 12.5rem;
            padding-left: 0;
            margin-top: 1.25rem;
            position: relative;
            left: 1.25rem;
            text-align: center;
            background: darkturquoise;
        }
    }
}

p {
    color: #ffffff;
    width: 100%;
    height: 1.25rem;
}

@media screen and (max-width: 440px) {
    .login {
        margin-top: 2rem !important;
    }
}
</style>
