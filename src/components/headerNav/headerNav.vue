<template>
  <div class="headerNav">
    <p>{{ $t("menu.Welcome") }} {{ user }} {{ $t("menu.to") }}</p>
    <p>
      <img
        src="../../assets/中文语言.png"
        alt=""
        class="imgtext"
        @click="changelanguage"
        v-if="$i18n.locale === 'zh'"
      />
      <img
        src="../../assets/繁体.png"
        alt=""
        class="imgtext"
        @click="changelanguage"
        v-if="$i18n.locale === 'tc'"
      />
      <img
        src="../../assets/英文语言.png"
        alt=""
        class="imgtext"
        @click="changelanguage"
        v-if="$i18n.locale === 'en'"
      />{{ $t("menu.hello") }} {{$t("menu.Dear")}} {{ user }}<i class="el-icon-caret-bottom"></i>
    </p>
  </div>
</template>

<script>
export default {
  name: "headerNav",
  components: {},
  props: {},
  data() {
    return {
      user: "",
      // value: localStorage.getItem("language") || "en", //初始化时候获取上次存的值，并在处于选中状态。
      Hello: "",
      // timedata:'',
      time: ""
    };
  },
  methods: {
    changelanguage() {
      console.log(this.$i18n.locale);
      //改变element组件国际化
      // if (this.value === "en") {
      //   this.value = "zh";
      // } else {
      //   this.value = "en";
      // }
      // this.$i18n.locale = this.value; //在main.js里设置的i180我们在这里调用，并赋值
      // localStorage.setItem("language", this.value); //每次切换语言，本地存一下，防止刷新丢失。
      //改变element组件国际化
      if (this.$i18n.locale === "zh") {
        this.$i18n.locale = "tc";
      } else if (this.$i18n.locale === "tc") {
        this.$i18n.locale = "en";
      } else if (this.$i18n.locale === "en") {
        this.$i18n.locale = "zh";
      }
      console.log(this.$i18n.locale);
    }
  },
  mounted() {
    this.user = localStorage.getItem("user");
    this.$i18n.locale = "zh";
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.headerNav {
  display: flex;
  justify-content: space-between;
  /*注意*/
  /*position: fixed;*/
  /*z-index: 1;*/
  /*top: 10px;*/
  background-color: #2e5e85;
}
p {
  color: white;
  font-size: 17px;
  line-height: 60px;
  margin: 0px 20px;
}
.imgtext {
  vertical-align: middle;
  margin-right: 20px;
  align-items: center;
}
</style>
