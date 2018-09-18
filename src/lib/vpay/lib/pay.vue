<template>
  <div> 
    <div class="zfb-pay" v-if="show"> 
      <div class="content">
          <!-- 标题栏 -->
         <header class="pay-title">
             <div class="icon-back" @click="cancel"></div>
             <h3>{{title}}</h3>
         </header>
         <!-- 密码框 -->
         <div class="pass-box">
             <ul class="pass-area">
                 <li class="pass-item"
                 :class="{on: password.length > index}" 
                 v-for="(item,index) in digit" 
                 :key="index"></li>
                 
             </ul>
         </div>
         <!-- 忘记密码 -->
         <div class="forget-pass">
             <div class="forget-pass-btn" @click="forget">忘记密码</div>
         </div>
         <!-- 键盘区 -->
         <ul class="keyborard">
             <li @click="onkeyborard(1)">
                 <p class="num"><strong>1</strong></p>
                 <p class="chanacter"></p>
             </li>
             <li @click="onkeyborard(2)">
                 <p class="num"><strong>3</strong></p>
                 <p class="chanacter">ABC</p>
             </li>
             <li @click="onkeyborard(3)">
                 <p class="num"><strong>3</strong></p>
                 <p class="chanacter">DEF</p>
             </li>
             <li @click="onkeyborard(4)">
                 <p class="num"><strong>4</strong></p>
                 <p class="chanacter">GHI</p>
             </li>
              <li @click="onkeyborard(5)">
                 <p class="num"><strong>5</strong></p>
                 <p class="chanacter">JKL</p>
             </li>
             <li @click="onkeyborard(6)"> 
                 <p class="num"><strong>6</strong></p>
                 <p class="chanacter">MNO</p>
             </li>
             <li @click="onkeyborard(7)">
                 <p class="num"><strong>7</strong></p>
                 <p class="chanacter">PQRS</p>
             </li>
             <li @click="onkeyborard(8)">
                 <p class="num"><strong>8</strong></p>
                 <p class="chanacter">TUV</p>
             </li>
              <li @click="onkeyborard(9)">
                 <p class="num"><strong>9</strong></p>
                 <p class="chanacter">WXYZ</p>
             </li>
             <li class="none"></li>
             <li class="zero" @click="onkeyborard(0)"><strong>0</strong></li>
             <li class="delete" @click="deleteKey"></li> 
         </ul>
         <!-- 加载状态 -->
         <div class="loading-wrap" v-if="payStatus !== 0">
            <div class="loading">
                <img src="./images/loading.png" class="loading-icon" 
                 alt="" v-if="payStatus === 1" />
                 <img src="./images/success.png" class="success-icon" 
                 alt="" v-if="payStatus === 2" />
                 <p v-if="payStatus === 1">{{loadingText}}</p>
                 <p v-if="payStatus === 2">{{finishedText}}</p>  
            </div>
         </div>
         <!-- 支付失败提升 -->
         <div class="pay-fail" v-if="isShowFail">
             <div class="pay-fail-lay">
                 <h3 class="title">{{failTip}}</h3>
                 <div class="btns">
                     <div @click="reInput">重新输入</div>
                     <div @click="forget">忘记密码</div>
                 </div>
             </div>
         </div>
      </div>
          
    </div>
   </div> 
</template>

<script>
    export default {
      model: {
        prop: 'show',
        event: 'change'
      },  
      props: {
         show: {
           type: Boolean,
           required: true,
           default: true
         }, 
         digit: {
             type: Number,
             default: 6,
         },
         title: {
             type: String,
             default:'请输入支付密码'
         },
         loadingText: {
             type: String,
             default:'正在支付',
         },
         finishedText: {
             type: String,
             default:'支付成功',
         },
         duration: {
             type: Number,
             default: 500
         }
         
      },  
      data () {
         return {
           isShowFail:false,
           password: '',
           payStatus: 0,
           failTip:'支付密码错误',
         } 
      },
      methods: {
        onclick() {
          this.show=true;
        },  
        cancel() {  //返回
           if(this.payStatus===1) return;
           this.password = '';
           this.payStatus = 0;
           this.$emit('change', false);
           this.$emit('close');
        },
        forget() {  //忘记密码
          this.$emit('froget');
        },
        onkeyborard(num) {
           this.password=(this.password + num).slice(0,6);
        },
        deleteKey() {
           if(this.password.length===0) {
               return;
           }
           this.password = this.password.slice(0, this.password.length - 1 );
        },
        reInput() {
           this.password = '';
           this.isShowFail = false;
        },
        $success() {
            return new Promise((resolve, reject) => {
                this.payStatus = 2;
                setTimeout(()=>{
                    this.cancel();
                    resolve();
                },this.duration);
            })
        },

        $fail(tip) {
           tip && typeof tip === 'string' && (this.failTip = tip);
           this.payStatus = 0;
           this.isShowFail = true;
        }
      },
      watch: {
         password (n, o) {
             if(n.length === this.digit) {
                 this.payStatus = 1;
                 this.$emit("input-end",this.password); 
             }
         }
      } 
  
    }
</script>

<style scoped>
  *{ margin:0;padding:0;font-size:14px;}
  .click-btn{padding:5px 20px;background:#0083e3;color:#fff;
  border:1px solid #0083e3;border-radius:2px;}
  ul,li{list-style: none;}
  .zfb-pay{position:fixed;top:0;left:0;bottom:0;right:0;max-width:750px;
  background:rgba(0,0,0,.5);display:flex;flex-direction:column-reverse;}
  .content{position: relative;background:#fafafa;}
  .pay-title{position:relative;height:40px;line-height:40px;
  border-bottom:1px solid #e5e5e5;}
  .pay-title h3{font-size:18px;text-align:center;font-weight: normal;}
  .icon-back{position:absolute;left:0;top:0;width:40px;height:40px;
  background: url(./images/back.png) no-repeat center;}
  /* 密码框 */
  .pass-box{padding:0 20px}
  .pass-area{display: flex;height:40px;margin-top:20px;border:1px solid #e7e7e7;
  border-radius: 4px;background:#fff;}
  .pass-area .pass-item{position:relative;flex:1;border-right:1px solid #e7e7e7;}
  .pass-area .pass-item:last-child{border-right:0;}
  .pass-area .pass-item.on:after{content:'';position:absolute;left:50%;top:50%;
  width:8px;height:8px;background:#000;border-radius:50%;
  transform: translate(-50%,-50%) }
  /* 忘记密码 */
  .forget-pass{padding:10px 20px 20px 0;text-align:right;}
  .forget-pass-btn{color:#0083e3}
  /* 键盘 */
  .keyborard{display:flex;flex-wrap: wrap;margin-top:64px;background:#fff;}
  .keyborard li{width:33.333%;height:45px;padding-top:4px;text-align:center;
  border-right:1px solid #b2b2b2;border-bottom:1px solid #b2b2b2;
  box-sizing: border-box;user-select:none;}
  .keyborard li.active{background-color:#d1d5db;}
  .keyborand li.none{background: #d1d5db;}
  .keyborard li .num{font-size:18px;line-height:1.2;}
  .keyborard li .chanacter{font-size:12px;line-height:1.2}
  .keyborard li:nth-child(3n){border-right:0;}
  .keyborard li.zero{line-height:45px;font-size:18px;}
  .keyborard li.delete{height:45px;
   background: url(./images/delete.png) no-repeat center;}
   /* 加载中 */
   .loading-wrap{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;
    justify-content: center;align-items:center;background:#fff;z-index:99;}
   .loading-wrap .loading{text-align:center;}
   .loading-wrap .loading p{margin-top:6px;}
   .loading-wrap .loading .loading-icon {animation:rotate .6s linear infinite}
   @-webkit-keyframes rotate{
       0% {transform:rotate(0)}
       50% {transform:rotate(180deg)}
       100% {transform:rotate(360deg)}
   }
   @keyframes rotate{
       0% {transform:rotate(0)}
       50% {transform:rotate(180deg)}
       100% {transform:rotate(360deg)}
   }
   /* 支付失败弹窗 */
   .pay-fail{position:fixed;top:0;bottom:0;width:100%;max-width:750px;
   background:rgba(0,0,0,.6);z-index:9999;}
   .pay-fail-lay{width:60%;position:absolute;left:50%;top:50%;border-radius:10px;
   transform:translate(-50%,-50%);background:#fff;overflow: hidden;}
   .pay-fail-lay .title{line-height:30px;text-align:center;font-size:16px;padding:10px;}
   .pay-fail-lay .btns{display:flex;border-top:1px solid #f1f1f1;}
   .pay-fail-lay .btns div{flex:1;height:40px;line-height:40px;text-align:center;}
   .pay-fail-lay .btns div:active{background:#f3f3f3;} 
   .pay-fail-lay .btns div:last-child{border-left:1px solid #f1f1f1;}

</style>