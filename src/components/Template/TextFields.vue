<!-- TEMPLATE -->
<template>
  <BaseArea title="Template TextFields">
    <template v-slot:center-area>
      <div class="fields-area h-full w-full">
        <!-- 1 -->
        <v-text-field class="c-field" label="Label"></v-text-field>
        <!-- 2 -->
        
        <!-- 3 -->
        <!-- 4 -->
        <!-- 5 -->
        <!-- 6 -->
        <!-- 7 -->
        <!-- 8 -->

      </div>
    </template>
  </BaseArea>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import BaseArea from '@/components/BaseArea.vue'

/* EXPORT */
export default{
  name: "TextFields",
  components:{
    BaseArea,
  },
  data: () => ({

  }),
  props:{
    tmp_Prop: {
      type: [Number, Array, Object, String],
      default: 100
    },
  },
  watch:{
    tmp_obj: {
      handler(newVal) {
        
      },
      deep: true, 
      immediate: true, 
      once: true, 
    }
  },
  computed: {

  },
  created(){
    
  },
  methods:{

  }
}
</script>
/* STYLE */
<style lang="scss">
.c-field{
  .v-field-label--floating{
    top: 2px !important;
  }
}

</style>
<style scoped lang="scss">
.fields-area{
  // border: 1px dashed #d6dee1;
  border: 1px dashed black;
  border-radius: 4px;
  padding: 16px;
}
</style>