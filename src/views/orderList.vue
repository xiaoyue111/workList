<template>
  <div class="wrap">
    <van-tabs>
      <van-tab v-for="(item, index) in tabList" :key="item.value">
        <!-- tab列表 所有工单类型  -->
        <!-- template自定义标签中的内容 -->
        <template #title>
          <van-badge class="order-dot" :content="item.messageTotal"
            >{{ item.text }}
          </van-badge>
        </template>
        <!-- 输入框 -->
        <van-search
          v-model="searchKey"
          shape="round"
          background="rgba(0, 0, 0, 0)"
          placeholder="请输入工单名称或编码或企业名称搜索"
        />
        <!-- 工单类型 -->
        <div class="order-type-wrap">
          <div class="order-type-name">工单类型</div>
          <van-dropdown-menu :overlay="false">
            <van-dropdown-item
              v-model="dropdownOrderType"
              :options="ordrtStatusList"
            />
          </van-dropdown-menu>
          <img
            src="../assets/images/DropDown2x.png"
            alt=""
            class="order-type-img"
          />
        </div>

        <!-- 工单具体内容 -->
        <van-list
          v-model="orderDataLoad"
          :finished="orderDataFinished"
          @load="handleOrderDataInfors"
        >
          <div
            v-for="(item, index) in orderDataList"
            :key="index"
            class="order-content"
          >
            <van-swipe-cell>
              <div
                class="order-item cf"
                @click="handleOrderDataListDetails(index)"
              >
                <!--工单具体内容-- 左侧 -->
                <div class="order-item-left">
                  <div class="item-left-style item-left-name">
                    <!-- {{ item.taskName | ellipsis }} -->
                    {{ item.taskName }}
                  </div>
                  <div class="item-left-style">
                    派单时间 {{ item.createdTime }}
                  </div>
                  <div class="item-left-style">
                    <!-- 企业名称： {{ item.companyName | ellipsis }} -->
                    企业名称： {{ item.companyName }}
                  </div>
                </div>
                <!--工单具体内容-- 右侧 -->
                <div class="type-text-wrap">
                  <div
                    :class="[
                      'type-text-ordertype',
                      renderStyleByOrderTypeInfors()['case' + item.orderStatus]
                        .orderTypeChangeStyle,
                    ]"
                  >
                    {{
                      renderStyleByOrderTypeInfors()["case" + item.orderStatus]
                        .orderTypeChangeName
                    }}
                  </div>
                  <div class="type-text-delaytime">
                    <!-- 停留 {{ delayTime(index) }}h -->
                    停留8小时
                  </div>
                  <div class="type-text-ordername">
                    {{ orderTypeInfos()["case" + item.orderType].orderType }}
                  </div>
                </div>
              </div>

              <template #right>
                <van-button
                  square
                  text="接单"
                  type="danger"
                  class="receive-button button-style"
                />
                <van-button
                  square
                  text="取消"
                  type="danger"
                  class="delete-button button-style"
                />
              </template>
            </van-swipe-cell>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <!-- 返回顶部 -->
    <van-button class="back-top" @click="backTop">
      <img
        src="../assets/images/returnhead2x.png"
        alt=""
        class="back-top-img"
      />
    </van-button>
    <!-- 底部 -->
    <van-divider class="order-end"> 没有更多啦 </van-divider>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "orderList",
  data() {
    return {
      tabList: [
        {
          text: "全部",
          messageTotal: 999,
          value: "-1",
        },
        {
          text: "消缺工单",
          messageTotal: 200,
          value: "1",
        },
        {
          text: "检修工单",
          messageTotal: 99,
          value: "2",
        },
        {
          text: "抢修工单",
          messageTotal: 99,
          value: "3",
        },
        {
          text: "巡检工单",
          messageTotal: 9,
          value: "4",
        },
        {
          text: "保养工单",
          messageTotal: 9,
          value: "5",
        },
      ],
      ordrtStatusList: [
        {
          text: "全部",
          value: "-1",
        },
        {
          text: "待接单",
          value: "1",
        },
        {
          text: "已接单",
          value: "2",
        },
        {
          text: "已拒绝",
          value: "3",
        },
        {
          text: "待签到",
          value: "4",
        },
        {
          text: "作业中",
          value: "5",
        },
        {
          text: "待审核",
          value: "6",
        },
        {
          text: "审核通过",
          value: "7",
        },
        {
          text: "审核驳回",
          value: "8",
        },
        {
          text: "终止",
          value: "9",
        },
      ],
      searchKey: "",
      dropdownOrderType: "-1",
      orderDataLoad: false,
      orderDataFinished: true,
      // 0-待接单 1-待签到 2-待审核 3-审核驳回 4-已拒绝 5-已终止 6-审核通过 7-已接单 8-作业中
      orderDataList: [],
      indexOrderId: 0,
    };
  },
  methods: {
    handleOrderDataInfors() {},
    renderStyleByOrderTypeInfors() {
      //0-待接单 1-带签到 2-待审核 3-审核驳回 4-已拒绝 5-已终止 6-审核通过 7-已接单 8-作业中
      let orderStatusList = {
        case0: {
          orderTypeChangeName: "待接单",
          orderTypeChangeStyle: "order-status-waiting",
        },
        case1: {
          orderTypeChangeName: "待签到",
          orderTypeChangeStyle: "order-status-waiting",
        },
        case2: {
          orderTypeChangeName: "待审核",
          orderTypeChangeStyle: "order-status-waiting",
        },
        case3: {
          orderTypeChangeName: "审核驳回",
          orderTypeChangeStyle: "order-status-waiting",
        },
        case4: {
          orderTypeChangeName: "已拒绝",
          orderTypeChangeStyle: "order-status-waiting",
        },
        case5: {
          orderTypeChangeName: "已终止",
          orderTypeChangeStyle: "order-status-waiting",
        },
        case6: {
          orderTypeChangeName: "审核通过",
          orderTypeChangeStyle: "order-status-waited",
        },
        case7: {
          orderTypeChangeName: "已接单",
          orderTypeChangeStyle: "order-status-waited",
        },
        case8: {
          orderTypeChangeName: "作业中",
          orderTypeChangeStyle: "order-status-finish",
        },
      };
      return orderStatusList;
    },
    delayTime(index) {
      let dat = this.orderDataList[index].createdTime;
      //  split("/")
      let getYeardata = dat.split(" ")[0];
      let getTimedata = dat.split(" ")[1];
      //  年月日  时分秒
      const beforeYear = getYeardata.split("-")[0];
      const beforeMonth = getYeardata.split("-")[1];
      const beforeDate = getYeardata.split("-")[2];
      const beforeHours = getTimedata.split(":")[0];
      const beforeMinutes = getTimedata.split(":")[1];
      const beforeSeconds = getTimedata.split(":")[2];

      const myDate = new Date();

      myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      myDate.getMonth(); //获取当前月份(0-11,0代表1月)
      myDate.getDate(); //获取当前日(1-31)

      myDate.getHours(); //获取当前小时数(0-23)
      myDate.getMinutes(); //获取当前分钟数(0-59)
      myDate.getSeconds(); //获取当前秒数(0-59)

      // 计算差值
      const getDifference =
        (myDate.getFullYear() - beforeYear) * 365 * 24 * 60 * 60 +
        (myDate.getMonth() - beforeMonth + 1) * 30 * 24 * 60 * 60 +
        (myDate.getDate() - beforeDate) * 24 * 60 * 60 +
        (myDate.getHours() - beforeHours) * 60 * 60 +
        (myDate.getMinutes() - beforeMinutes) * 60 +
        (myDate.getSeconds() - beforeSeconds);
      return getDifference;
    },
    orderTypeInfos() {
      let orderTypeShift = {
        case0: {
          orderType: "消缺工单",
        },
        case1: {
          orderType: "检修工单",
        },
        case2: {
          orderType: "抢修工单",
        },
        case3: {
          orderType: "巡检工单",
        },
        case4: {
          orderType: "保养工单",
        },
      };
      return orderTypeShift;
    },
    backTop() {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 30);
      // document.documentElement.scrollTop = 0;
    },
    handleOrderDataListDetails(index) {
      this.indexOrderId = index;
      this.$router
        .push({
          // path: "/orderDetails",
          // query: {
          //   orderId: this.orderDataList[this.indexOrderId].orderId,
          // },
          name: "orderDetails",
          params: {
            orderId: this.orderDataList[this.indexOrderId].taskNo,
          },
        })
        .catch((err) => {
          console.log(err);
        });
    },

    renderPageInitInfors() {
      let params = {};
      this.getOrderList(params).then((res) => {
        if (res?.data?.data?.data) {
          this.orderDataList = res.data.data.data;
        }
      });
    },
    ...mapActions(["getOrderList"]),
  },
  created() {
    this.renderPageInitInfors();
  },
  // 判断是否为空
  isNull(v) {
    let n = [null, undefined, ""];
    return n.indexOf(v) > -1 || (v.constructor === String && v.trim() === "")
      ? true
      : false;
  },
  // 文字缩略
  // filters: {
  //   ellipsis(value) {
  //     if (!value) return "";
  //     if (value.length > 9) {
  //       return value.slice(0, 9) + "...";
  //     }
  //     return value;
  //   },
  // },
};
</script>

<style lang="less" scoped>
@import "../assets/css/base.less";
.wrap {
  width: 750px;
  min-height: 100vh;
  background-image: url("../assets/images/background2x.png");
  background-repeat: no-repeat;
  background-color: @base-background-color;
  background-size: 100%;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  overflow: hidden;

  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 68px;
    padding: 0;
    margin-left: 3px;
    margin-bottom: 30px;
  }
  /deep/ .van-tab {
    margin-left: 45px;
    padding: 0;
    font-size: 30px;
    font-family: AlibabaPuHuiTiM;
    display: flex;
    align-items: flex-end;
    color: rgba(255, 255, 255, 0.6);
  }
  /deep/ .van-tab--active {
    color: @base-color;
    font-weight: bold;
  }

  /deep/ .order-dot {
    .van-badge {
      top: -5px;
      right: -20px;
      background-color: rgba(0, 0, 0, 0);
      color: rgba(255, 255, 255, 0.6);
      font-size: 20px;
      font-family: SourceHanSansSC-Normal, SourceHanSansSC;
      line-height: 20px;
    }
  }
  /deep/ .van-badge {
    border: 0;
  }
  /deep/ .van-tabs__line {
    background-color: rgba(0, 0, 0, 0);
  }
  /deep/ .van-tabs__nav {
    background-color: rgba(0, 0, 0, 0);
  }
  .van-search {
    width: 690px;
    height: 56px;
    padding: 0;
    margin: 0 30px 0 30px;
    /deep/ .van-field__control {
      font-size: 24px;
    }
    /deep/ .van-icon-search {
      width: 22px;
      height: 22px;
      background-image: url("../assets/images/search2x.png");
      background-size: 100%;
      margin: 14px 0 0 0;
    }
    /deep/ .van-icon-search:before {
      content: "";
    }
  }

  .order-type-wrap {
    display: flex;
    margin-top: 22px;
    .order-type-name {
      // width: 96px;
      // height: 40px;
      // color: #fff;
      // font-size: 24px;
      // line-height: 40px;
      // margin-left: 30px;
      // margin-right: 6px;
      // font-family: AlibabaPuHuiTiR;
    }
    /deep/ .van-dropdown-menu__bar {
      width: 130px;
      height: 40px;
      background: #ffffff;
      border-radius: 20px;
      font-weight: 500;
      .van-dropdown-menu__title {
        color: #666666;
        font-size: 24px;
      }
      .van-dropdown-menu__title::after {
        border: 0;
      }
    }

    .order-type-img {
      width: 24px;
      height: 14px;
      margin: 13px 0 13px 12px;
    }
  }

  .order-content {
    width: 690px;
    height: 204px;
    background: #ffffff;
    box-shadow: 0px 12px 36px 0px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    margin: 30px;
    .order-item-left {
      width: 390px;
      height: 204px;
      float: left;
      .item-left-style {
        width: 380px;
        height: 30px;
        margin: 30px 0 0 30px;
        line-height: 30px;
        overflow: hidden; //超出一行文字自动隐藏
        text-overflow: ellipsis; //文字隐藏后添加省略号
        white-space: nowrap; //强制不换行
      }
      .item-left-name {
        font-weight: bold;
        font-size: 30px;
      }
    }
    .type-text-wrap {
      width: 150px;
      height: 204px;
      float: right;
      margin: 0 30px 0 0;
      .type-text-ordertype {
        // width: 90px;
        height: 40px;
        line-height: 40px;
        float: right;
        margin-top: 30px;
        border-radius: 20px;
        font-weight: bold;
        text-align: center;
        font-size: 20px;
        padding: 0 15px;
      }
      .type-text-delaytime {
        width: 120px;
        height: 30px;
        line-height: 30px;
        float: right;
        margin-top: 20px;
      }
      .type-text-ordername {
        width: 96px;
        height: 30px;
        line-height: 30px;
        float: right;
        margin-top: 24px;
      }
      .order-status-waiting {
        color: #ff9200;
        background: rgba(255, 146, 0, 0.1);
      }
      .order-status-waited {
        color: #0780ed;
        background: rgba(7, 128, 237, 0.1);
      }
      .order-status-finish {
        color: #44d428;
        background: rgba(68, 212, 40, 0.1);
      }
    }
    .button-style {
      width: 98px;
      height: 100%;
      border: 0;
      font-weight: 500;
      font-size: 24px;
      padding: 0;
      margin: 0;
    }
    .receive-button {
      background: #0780ed;
      box-shadow: 0px 12px 36px 0px rgba(0, 0, 0, 0.05);
    }
    .delete-button {
      background: #bbbbbb;
      box-shadow: 0px 12px 36px 0px rgba(0, 0, 0, 0.05);
    }
  }
  .back-top {
    position: fixed;
    right: 30px;
    bottom: 46px;
    background: rgba(0, 0, 0, 0);
    border: 0;
    .back-top-img {
      width: 70px;
      height: 70px;
    }
  }
  .order-end {
    height: 33px;
    padding: 0;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.6);
    line-height: 33px;
    border-color: #ffffff;
    margin: 30px 75px;
  }
}
</style>