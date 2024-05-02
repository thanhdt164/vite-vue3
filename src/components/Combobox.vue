<!-- TEMPLATE -->
<template>
  <v-combobox
    clearable
    chips
    :multiple="is_multiple"
    :label="label"
    :item-value="item_key"
    :item-title="item_value"
    :items="item_source"
    variant="outlined"
    v-model="selectX"
  ></v-combobox>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */

/* EXPORT */
export default{
  name: "Combobox",
  components:{
    
  },
  data: () => ({
    selectX: null,
  }),
  props:{
    /**
     * Danh sách key đang tích chọn
     */
    select: {
      type: Array,
      default: []
    },
    item_source:{
      type: Array,
      default: [{Key: 'California', Value: 'California'}]
    },
    item_key:{
      type: String,
      default: "Key"
    },
    item_value:{
      type: String,
      default: "Value"
    },
    label:{
      type: String,
      default: "Combobox"
    },
    is_multiple: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    selectX: {
      handler(newVal, oldVal) {
        //this.select = newVal;
        this.$emit('update:select', newVal);
      },
    }
  },
  computed: {

  },
  created(){
    this.selectX = this.select;
  },
  methods:{

  }
}
/* STYLE */
</script>
<style scoped lang="scss">

</style>
<style lang="scss">

</style>