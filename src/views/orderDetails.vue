<template>
  <div class="order-details">
    <div class="order-details-wrap">
      <div class="order-infos">
        <!-- 第一行--工单编号 -->
        <div class="order-id">
          <span class="order-id-text">工单编号</span>
          <span class="order-id-num">0000001</span>
        </div>
        <!-- 第二行--停留时间 -->
        <div class="stay-time">停留 8h</div>
        <!-- 第三行--接收状态 -->
        <div class="revices-status">未接单</div>
        <!-- 第四行--工单信息 -->
        <div class="order-information infos-background-style">
          <div class="infos-title title-style">工单信息</div>
          <van-row
            type="flex"
            v-for="(item, index) in orderInfosData"
            :key="index"
          >
            <van-col class="infos-name">{{ item.infosName }}</van-col>
            <van-col class="infos-content">{{ item.infosContent }}</van-col>
          </van-row>
        </div>
        <!-- 第五行--消缺信息 -->
        <div class="defect-information infos-background-style">
          <div class="title-style">消缺信息</div>
          <van-row
            type="flex"
            v-for="(item, index) in defectInfosData"
            :key="index"
          >
            <van-col class="infos-name">{{ item.defectName }}</van-col>
            <van-col class="infos-content">{{ item.defectContent }}</van-col>
          </van-row>
        </div>
        <!-- 第六行--客户信息 -->
        <div class="client-information infos-background-style">
          <div class="title-style">客户信息</div>
          <van-row
            type="flex"
            v-for="(item, index) in clientInfosData"
            :key="index"
          >
            <van-col class="infos-name">{{ item.clientName }}</van-col>
            <van-col class="infos-content">{{ item.clientContent }}</van-col>
          </van-row>
        </div>
        <!-- 第七行-- 接单--拒单-->
        <div class="receive-status">
          <van-button round type="info" class="reject-status status-style"
            >拒单</van-button
          >
          <van-button round type="info" class="recieve-status status-style"
            >接收</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderDetails",
  data() {
    return {
      orderInfosData: [
        {
          infosName: "工单类型",
          infosContent: "消缺工单",
        },
        {
          infosName: "生产时间",
          infosContent: "2021-12-12 12:00",
        },
        {
          infosName: "现场负责人",
          infosContent: "张春天",
        },
        {
          infosName: "现场负责人电话",
          infosContent: "123 1234 5678",
        },
        {
          infosName: "派单人",
          infosContent: "张金斗",
        },
        {
          infosName: "派单时间",
          infosContent: "2021-12-12 12:00",
        },
        {
          infosName: "派单人电话",
          infosContent: "123 1234 5678",
        },
      ],
      defectInfosData: [
        {
          defectName: "缺陷名称",
          defectContent: "演示XXXXXXXXXXXXXXXX",
        },
        {
          defectName: "缺陷类型",
          defectContent: "生产设备/配电主设备/变压器",
        },
        {
          defectName: "缺陷位置",
          defectContent: "1#大厦3层302房间",
        },
        {
          defectName: "关联设备编码",
          defectContent: "#1-9逆变器",
        },
        {
          defectName: "缺陷编码",
          defectContent: "d333333333333",
        },
      ],
      clientInfosData: [
        {
          clientName: "企业名称",
          clientContent: "用能企业",
        },
        {
          clientName: "企业地址",
          clientContent: "北京市朝阳区摩托罗拉大厦10F",
        },
        {
          clientName: "联系人",
          clientContent: "张春天",
        },
        {
          clientName: "联系电话",
          clientContent: "123 1234 5678",
        },
      ],
    };
  },
};
</script>

<style lang='less' scope>
.order-details {
  min-height: 100vh;
  background-color: #0780ed;
  background-image: url("../assets/images/background2x.png");
  background-size: 100%;
  background-repeat: no-repeat;
  font-size: 28px;
  font-weight: 400;
  color: #333333;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  justify-content: center;
  align-items: center;
  .order-details-wrap {
    width: 690px;
    min-height: 100vh;
    background: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    .order-infos {
      border: 1px solid red;
      min-height: 100vh;
      margin: 0 30px;
      // 第一行--工单编号
      .order-id {
        font-size: 30px;
        margin-top: 30px;
        .order-id-text {
          color: #999999;
        }
        .order-id-num {
          margin-left: 18px;
          font-weight: bold;
          color: #333333;
        }
      }
      // 第二行--停留时间
      .stay-time {
        font-size: 30px;
        font-weight: bold;
        line-height: 30px;
        margin-top: 20px;
      }
      // 第三行--接收状态
      .revices-status {
        font-size: 64px;
        font-weight: bold;
        color: #ff9200;
        margin-top: 48px;
      }
      // 第四五六行标--题公用样式
      .title-style {
        font-size: 30px;
        font-weight: bold;
        margin-left: 30px;
        padding-top: 30px;
      }
      // 第四五六行--背景公用样式
      .infos-background-style {
        background: #f3f7fd;
        border-radius: 12px;
        margin-top: 30px;
      }
      // 第四五六行--表格信息公用样式
      .infos-name {
        color: #999999;
        margin-top: 30px;
        margin-left: 30px;
      }
      .infos-content {
        margin-top: 30px;
        margin-left: 24px;
      }
      // 第四行--工单信息
      .order-information {
        height: 549px;
        margin-top: 60px;
        .infos-title {
          padding-top: 23px;
        }
      }
      // 第五行--消缺信息
      .defect-information {
        height: 1136px;
      }
      // 第六行--客户信息
      .client-information {
        height: 345px;
      }
      //第七行-- 接单--拒单--公用样式
      .status-style {
        width: 270px;
        height: 90px;
        background: #ffffff;
        box-shadow: 0px 24px 36px 0px rgba(7, 128, 237, 0.2);
        border-radius: 48px;
      }
      // 第七行-- 接单--拒单
      .receive-status {
        border: 1px solid red;
        margin: 30px 0;
      }
    }
  }
}
</style>