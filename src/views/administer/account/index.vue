<template>
    <div class="wrapper">
        <div class="back" @click="toLogin()">
            <a>前往登陆</a>
        </div>
        <div class="login">
            <div class="title">
                <h3>添加账号</h3>
            </div>
            <div class="item">
                <div class="left">用户名：</div>
                <div class="right">
                    <input v-model="model.name" type="text" placeholder="请输入账号">
                    <i class="iconfont icon-zhanghu" />
                </div>
            </div>
            <div class="item">
                <div class="left">电话：</div>
                <div class="right">
                    <input v-model="model.phone" type="text" placeholder="请输入电话">
                    <i class="iconfont icon-zhanghu" />
                </div>
            </div>

            <div class="item">
                <div class="left">密码：</div>
                <div>
                    <input v-model="model.password" type="password" placeholder="请输入你的密码">
                    <i class="iconfont icon-yuechi" />
                </div>
            </div>

            <div class="item">
                <div class="left">确认密码：</div>
                <div>
                    <input v-model="model.repassword" type="password" placeholder="请输入你的密码" @keydown.enter="confirm(model)">
                    <i class="iconfont icon-yuechi" />
                </div>
            </div>
            <div class="item">
                <div class="left">是否为管理员：</div>
                <div class="right keeper">
                    是：<input v-model="model.isKeeper" value="1" type="radio" name="keeper">
                    否：<input v-model="model.isKeeper" value="0" type="radio" name="keeper">
                </div>
            </div>

            <button class="btn btn-success" @click="confirm(model)">
                    <span>提交</span>
                  </button>
        </div>
    </div>
</template>

<script>
// import { mapActions, mapMutations } from 'vuex'
import store from '@/store/user'
import { checkParams, toast } from '@/utils'
export default {
  data () {
    return {
      model: {
        name: '',
        account: '',
        password: '',
        repassword: '',
        isKeeper: 0
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push('/login')
    },
    confirm (model) {
      const checkList = [
        {
          key: 'name',
          value: '用户名不能为空'
        },
        {
          key: 'phone',
          value: '电话不能为空'
        },
        {
          key: 'password',
          type: 'string',
          value: '密码不能为空'
        }
      ]
      const inValidStr = checkParams(model, checkList)
      if (inValidStr) {
        return toast(inValidStr)
      }
      if (this.model.password !== this.model.repassword) {
        return toast('前后密码不一致')
      }
      const { name, phone, password } = this.model
      store.dispatch('addUser', { name, phone, password }).then((res) => {
        // this.info = '正在登录中...'
        // this.set_user(res.data)
        // this.$router.push({ name: 'posts' })

      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    .back {
        position: absolute;
        left: 10px;
        top: 20px;
        cursor: pointer;
        &:hover {
            color: #6e47ca;
        }
    }
    .login {
        width: 24rem;
        height: 20rem;
        margin: 7rem auto 0;
        text-align: center;
        position: relative;
        .icon-icon69 {
            font-size: 3.75rem;
            color: darkturquoise;
        }
        .title {
           justify-content: center;
            align-items: center;
        }
        .item {
            width: 100%;
            margin: 0 auto;
            position: relative;
            display: flex;
            // justify-content: center;
            align-items: center;
            height: 5rem;
            .left {
                flex: 0 0 120px;
                justify-content: center;
                align-items: center;
                text-align: right
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

            .keeper {
                display: flex;
                align-items: center;
              input {
                width: 1rem;
                // display: inline;
              }
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
