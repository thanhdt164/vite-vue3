<!-- TEMPLATE -->
<template>
  <v-card
    class="field-card"
    :width="width"
    :height="height"
    :title="title"
    :subtitle="subtitle"
    :variant="variant"
  >
    <template v-if="prepend_obj.show" v-slot:prepend>
      <v-icon :icon="prepend_obj.icon"></v-icon>
    </template>
    <template v-if="append_obj.show" v-slot:append>
      <v-icon :icon="append_obj.icon"></v-icon>
    </template>
    <TextField v-model="textX" ></TextField>
  </v-card>
</template>
<!-- SCRIPT -->
<script>
/* IMPORT */
import TextField from '@/components/TextField.vue'
/* EXPORT */
export default{
  name: "CardField",
  components:{
    TextField
  },
  data: () => ({
    textX: ""
  }),
  props:{
    text: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "Phòng GDĐT"
    },
    subtitle: {
      type: String,
      default: ""
    },
    card_text: {
      type: String,
      default: "Phòng GDĐT Sơn Dương."
    },
    // ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain']
    variant:{
      type: String,
      default: 'flat'
    },
    width:{
      type: [String, Number],
      default: 'auto'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    // prepend icon
    prepend_obj: {
      type: Object,
      default: {
        show: false,
        icon: 'mdi-account'
      }
    },
    append_obj:{
      type: Object,
      default: {
        show: false,
        icon: 'mdi-check'
      }
    }
  },
  watch:{
    textX: {
      handler(newVal, oldVal) {
        // this.$emit('input', newVal);
        this.$emit('update:text', newVal);
      },
    }
  },
  computed: {

  },
  created(){
    this.textX = this.text;
  },
  methods:{

  }
}
/* STYLE */
</script>
<style scoped lang="scss">


</style>
<style lang="scss">
.field-card{
  .v-card-item{
    padding: 0;
  }
}
</style>