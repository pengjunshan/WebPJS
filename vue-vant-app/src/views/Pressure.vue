<template>
  <div class="pressure">
    <!-- titleBar -->
    <van-sticky>
      <div class="titleBar">
        <div class="pp1">
          <van-icon size="1.2rem" class="leftArrowIV" name="arrow-left" @click="closeCur" />
        </div>
        <div class="pp2">
          <span class="title-center">{{paramsObj.meterName}}</span>
        </div>
        <div class="pp3">
          <span class="right-one"></span>
          <span class="right-tow"></span>
        </div>
      </div>
    </van-sticky>

    <!-- 内容 -->
    <div class="content-div">
      <div class="in-pre">
        <div>智能识别压力:</div>

        <div
          v-if="paramsObj.picValue>paramsObj.meterThreshold.codeAlarm||paramsObj.picValue<paramsObj.meterThreshold.downAlarm"
          class="item-bar item-bar-alarm"
        >{{paramsObj.picValue}} bar</div>
        <div
          v-else-if="paramsObj.picValue>paramsObj.meterThreshold.codeAttention||paramsObj.picValue<paramsObj.meterThreshold.downAttention"
          class="item-bar item-bar-attention"
        >{{paramsObj.picValue}} bar</div>
        <div v-else class="item-bar">{{paramsObj.picValue}} bar</div>
      </div>
      <div class="in-time">
        <div>图像采集时间:</div>
        <div>{{paramsObj.updateTime}}</div>
      </div>
      <div class="item-line"></div>
      <van-image radius="0.4rem" class="in-img" :src="getImgUrl(0)" @click="getImagePreview(0)" />
      <van-image
        radius="0.4rem"
        fit="cover"
        class="dis-img"
        :src="getImgUrl(1)"
        @click="getImagePreview(1)"
      />

      <div class="item-line"></div>

      <div class="dis-pre">
        <div>最近图像识别压力:</div>
        <div
          v-if="paramsObj.pressure>paramsObj.meterThreshold.codeAlarm||paramsObj.pressure<paramsObj.meterThreshold.downAlarm"
          class="item-bar item-bar-alarm"
        >{{paramsObj.pressure}} bar</div>
        <div
          v-else-if="paramsObj.pressure>paramsObj.meterThreshold.codeAttention||paramsObj.pressure<paramsObj.meterThreshold.downAttention"
          class="item-bar item-bar-attention"
        >{{paramsObj.pressure}} bar</div>
        <div v-else class="item-bar">{{paramsObj.pressure}} bar</div>
      </div>
      <div class="dis-time">
        <div>最近图像采集时间:</div>
        <div>{{paramsObj.picUpdateTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      paramsObj: {},
      imgList: []
    };
  },
  created() {
    console.log(this.$route.params);
    console.log(this.$route.params.meterThreshold);
    if (undefined == this.$route.params.meterThreshold) {
      this.$router.push({
        name: "login"
      });
    }
    this.paramsObj = this.$route.params;
    this.imgList.push(
      `http://220.189.213.2:44045/pressure-meter/meterController/download?meterId=${this.paramsObj.meterId}+&updateTime=${this.paramsObj.updateTime}`
    );
    this.imgList.push(
      `http://220.189.213.2:44045/pressure-meter/meterController/download?meterId=${this.paramsObj.meterId}&updateTime=${this.paramsObj.updateTime}&type=1`
    );
  },
  mounted() {},
  methods: {
    getImgUrl(type) {
      return type === 1
        ? `http://220.189.213.2:44045/pressure-meter/meterController/download?meterId=${this.paramsObj.meterId}&updateTime=${this.paramsObj.updateTime}&type=1`
        : `http://220.189.213.2:44045/pressure-meter/meterController/download?meterId=${this.paramsObj.meterId}+&updateTime=${this.paramsObj.updateTime}`;
    },
    getImagePreview(index) {
      ImagePreview({
        images: this.imgList,
        showIndex: true,
        loop: false,
        closeable: true,
        startPosition: index
      });
    },
    closeCur() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.right-one,
.right-tow {
  visibility: hidden;
}
html,
body,
#app,
.pressure {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f7f7f7;
}
.content-div {
  background-color: white;
  padding: 0.6rem;
  margin-top: 0.8rem;
}
.in-pre,
.in-time,
.dis-pre,
.dis-time {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: black;
}

.in-pre>:first-child,
.in-time>:first-child,
.dis-pre>:first-child,
.dis-time>:first-child
 {
  font-weight: bold;
}

.item-bar {
  color: #016763;
}
.item-bar-alarm {
  color: #ff4843;
}
.item-bar-attention {
  color: #ffa500;
}

.in-time,
.dis-pre,
.dis-time {
  margin-top: 0.6rem;
}

.item-line {
  height: 0.05rem;
  background-color: #e8e8e8;
  margin-top: 0.5rem;
}

.in-img {
  width: 100%;
  height: 10rem;
  margin-top: 0.6rem;
}

.dis-img {
  width: 100%;
  height: 14rem;
  margin-top: 0.3rem;
}
</style>