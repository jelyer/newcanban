<template>
  <div>
    <!-- <vue-seamless-scroll :data="domConfig" :class-option="optionSingleHeight" class="seamless-warps">-->
    <div v-if="domConfig.legend && domConfig.data.length > 0" class="seamless-warps">
      <el-row>
        <el-col v-for="(item,index) in domConfig.legend" :key="index" :style="{'width':parseInt(100/domConfig.legend.length)+'%'}">
          <p><span/>{{ item }}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-for="(item,index) in domConfig.data[0]" :key="index" :style="{'width':parseInt(100/domConfig.legend.length)+'%'}">
          <div><span>{{ item }}</span></div>
        </el-col>
      </el-row>
    </div>
    <!--</vue-seamless-scroll>-->
  </div>
</template>

<script>
/**/
export default {
  name: 'Table1',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    domConfig: {
      default: []
    }
  },
  computed: {
    optionSingleHeight() {
      return {
        singleHeight: 75
      };
    }
  }
};
</script>

<style scoped>
  .firstLeftTop .el-row{
    height: auto;
    margin-top:.5rem;
    padding-top: 0;
  }
</style>
