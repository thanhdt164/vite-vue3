<!-- TEMPLATE -->
<template>
  <v-text-field
    :rules="[rules.required]"
    :label="label"
    clearable
    variant="outlined"
    v-model="valueX"
  ></v-text-field>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */

/* EXPORT */
export default{
  name: "",
  components:{

  },
  data: () => ({
    valueX: ""
  }),
  props:{
    value: {
      type: String,
      default: ""
    },
    rules:{
      type: Object,
      default: {
        required: value => !!value || 'Bắt buộc nhập',
      },
    },
    label:{
      type: String,
      default: null
    }
  },
  watch:{
    valueX: {
      handler(newVal, oldVal) {
        //this.value = newVal;
        this.$emit('input', newVal);
      },
    }
  },
  computed: {

  },
  created(){
    this.valueX = this.value;
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