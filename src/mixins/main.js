
export const mixinsMain = {
  data() {
    return {

    };
  },
  computed: {
    allData() {
      return this.$store.state.user.SourDataAll;// 数据源
    }
  },
  created() {

  },
  mounted() {
    // 当前时间
    var _this = this;
    _this.date = this.COMMONFUN.parseTime(null, new Date());
    this.timer = setInterval(() => {
      _this.date = this.COMMONFUN.parseTime(null, new Date());
    }, 1000);
    // 设定刷新时间
    let reloadt = localStorage.reloadTime;// 单位分钟
    if (reloadt != undefined) {
      reloadt = parseInt(reloadt);
      if (reloadt > 0) {
        this.timereload = setInterval(() => {
          if (_this.reloadbl) {
            _this.getData();// 刷新数据
            this.$message({
              message: '刷新数据',
              type: 'success'
            });
          }
        }, reloadt * 1000 * 60);
      }
    }
  },
  activated() {

  },
  methods: {

  }
};
