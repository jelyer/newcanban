<template>
  <div>
    <vue-seamless-scroll :data="domConfig" :class-option="optionSingleHeight" class="seamless-warps">
      <el-row>
        <el-col v-for="item in domConfig.legend" :span="(24/domConfig.legend.length)">
          <p><span></span>{{item}}</p>
        </el-col>
      </el-row>
      <el-row>
          <el-col v-for="item in domConfig.data[0]" :span="(24/domConfig.legend.length)">
            <div><span>{{item}}</span></div>
          </el-col>
       </el-row>
    </vue-seamless-scroll>
  </div>
</template>

<script>
  export default {
    name: 'table1',
    props: {
      domConfig: {
        type: Array,
        default: []
      }
    },
    computed: {
      optionSingleHeight () {
        return {
          singleHeight: 75
        }
      }
    },
  }
</script>

<style scoped>

</style>
