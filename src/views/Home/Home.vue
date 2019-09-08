<template>
  <div class="Home">
    <div class="topmessage">
      <div
        v-for="(item, index) in topmessage"
        :key="index"
        class="topdv"
        @click="changeclass(item, index)"
        :class="{ topcolor: index1 === index }"
      >
        <!--        动态样式数组-->
        <hr
          class="hrcolor"
          :class="{
            topcolor1: index1 === index && index === 0,
            topcolor2: index1 === index && index === 1,
            topcolor3: index1 === index && index === 2
          }"
        />
        <div class="topdv1" :class="{ topdv2: index === 0 || index === 1 }">
          <div>
            <div>{{ item.title }}</div>
            <div v-if="index1 === index" class="fontsi">
              ￥
              <countTo
                :startVal="startVal"
                :endVal="item.price"
                :duration="3000"
              ></countTo>
            </div>
            <div v-if="index1 !== index" class="fontsi">
              ￥
              <countTo
                :startVal="item.price"
                :endVal="item.price"
                :duration="3000"
              ></countTo>
            </div>
          </div>
          <div class="progressvip">
            <div v-show="index1 === index" class="complete">
              完成率
              <div>{{ item.value }}%</div>
            </div>
            <div v-show="index1 === index">
              <Progressbar
                :id="item.id"
                class="progress"
                :isAnimation="true"
                :isRound="true"
                :width="width"
                :radius="radius"
                :progress="item.value"
                :barColor="barColor"
                :duration="duration"
                :delay="delay"
                :timeFunction="timeFunction"
                :backgroundColor="backgroundColor"
              ></Progressbar>
            </div>
            <div v-show="index1 !== index">
              <Progressbar
                :id="item.id"
                class="progress"
                :progress="item.value"
                :isAnimation="true"
                :isRound="true"
                :width="width"
                :radius="radius"
                :barColor="barColor1"
                :duration="duration"
                :delay="delay"
                :timeFunction="timeFunction"
                :backgroundColor="backgroundColor1"
              ></Progressbar>
            </div>
          </div>
        </div>
        <div class="righthr" v-if="index !== 2"></div>
      </div>
    </div>
    <citynav></citynav>
    <fromnav></fromnav>
  </div>
</template>

<script>
import fromnav from "../../components/fromnav/fromnav";
import citynav from "../../components/citynav/citynav";
import countTo from "vue-count-to";
import Progressbar from "../../components/circle-progress";
export default {
  name: "Home",
  components: {
    Progressbar,
    countTo,
    citynav,
    fromnav
  },
  props: {},
  data() {
    return {
      index1: 0, //动态class
      startVal: 0,
      progress: 10,
      topmessage: [], //头部数据
      isDurationModel: true, // 是否打开持续缓动模式
      isShow: true,
      width: 80,
      radius: 8,
      duration: 1000,
      delay: 20,
      barColor: "greenyellow",
      barColor1: "#b3b3b3",
      backgroundColor: "#dbfaff",
      backgroundColor1: "#b3b3b3",
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)",
      intervalTimer: null, // 持续模式，循环计时器
      currentTime: 0, // 当前时间
      durationTime: 60 // 持续模式总时长
    };
  },
  methods: {
    changeclass(item, index) {
      this.index1 = index;
      if (index === 0) this.barColor = "greenyellow";
      if (index === 1) this.barColor = "#276fff";
      if (index === 2) this.barColor = "#ff55bb";
    },
    changeprice() {
      this.$axios
        .req("api/price")
        .then(res => {
          console.log(res);
          let arr = [];
          // 注释注释注释注释注释
          res.data.data.map((item, index) => {
            if (index === 0) {
              this.$set(item, "title", "本月营收(元)");
            }
            if (index === 1) {
              this.$set(item, "title", "待回款(元)");
            }
            if (index === 2) {
              this.$set(item, "title", "合同/客单价(元)");
            }
          });
          this.topmessage = res.data.data;
          console.log(this.topmessage);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.changeprice();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.topmessage {
  display: flex;
  width: 97.5%;
  margin: 0 auto;
  background: white;
  justify-content: space-around;
}
.topdv {
  width: 79%;
  text-align: center;
  position: relative;
  color: #beb6c0;
}
.topcolor {
  /*box-sizing: border-box;*/
  /*<!--border-top: 10px skyblue solid;-->*/
  /*<!--margin-top: -10px;-->*/
  color: black;
}
.topdv1 {
  display: flex;
  justify-content: space-around;
  vertical-align: center;
  align-items: center;
  margin: 30px 0;
}
/*.topdv2 {*/
/*  border-right: 1px skyblue solid;*/
/*}*/
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.hrcolor {
  height: 10px;
  border: 0;
}
.topcolor1 {
  background-color: greenyellow;
}
.topcolor2 {
  background-color: #276fff;
}
.topcolor3 {
  background-color: #ff55bb;
}
/*.box-card {*/
/*  width: 100%;*/
/*  !*margin: 20px 30px 0 0;*!*/
/*}*/
.progressvip {
  position: relative;
}
/*动态变化的宽度会引起文字位置变化*/
.fontsi {
  font-size: 19px;
  color: black;
  margin: 10px 0;
  width: 100px;
}
.complete {
  position: absolute;
  top: 20%;
  right: 20%;
}
.righthr {
  width: 1px;
  height: 30px;
  background: #ff55bb;
  position: absolute;
  right: 0;
  z-index: 99;
  transform: translateY(-50%);
  top: 50%;
}
</style>
