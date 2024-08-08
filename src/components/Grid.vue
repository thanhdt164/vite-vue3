<template>
  <div ref="grid-box" class="grid-box">
    <v-card-title class="card-title d-flex align-center">
      <v-responsive
        v-if="titleGrid"
        class="mx-auto"
        max-width="400"
      >
      {{ titleGrid }}
      </v-responsive>
      <v-spacer></v-spacer>
      <v-responsive
        v-show="showSearch"
        class="mx-auto"
        max-width="400"
      >
        <v-text-field
          class="search-bar"
          v-model="name"
          placeholder="Search name..."
          density="compact"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          flat
          hide-details
          single-line
        ></v-text-field>
      </v-responsive>
      <v-btn v-if="showbtnAdd" variant="tonal" @click="addItem" class="btn-add">
        Thêm mới
        <v-icon end icon="mdi-plus-box" ></v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table-server 
    class="grid-table custom-border"
    v-model="itemSelected"
    :show-select="showSelect"
    return-object

    :items-per-page="itemsPerPage" 
    :search="search" 
    :headers="headersX"  
    :items-length="totalItems" 
    :items="serverItems" 
    :loading="loading" 
    item-value="name" 
    multi-sort
    @update:options="loadItems"
    @click:row="handleRowClick"
    loading-text="Đang tải..."
    items-per-page-text="Số mục"
    :items-per-page-options="[5, 10, 15, 20]"
    :page-text="customPageText"
    >
      <template v-slot:top>
      </template>
      <template v-slot:thead>
      </template>
      <template  v-slot:tfoot>        
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          v-show="showEdit"
          class="me-2"
          @click="editItem(item)"
          icon="mdi-pencil"
        ></v-icon>
        <v-icon
          v-show="showDelete"
          @click="deleteItem(item)"
          icon="mdi-delete"
        ></v-icon>
      </template>
      <template v-slot:no-data>
        Dữ liệu trống
      </template>
      
    </v-data-table-server>
    <!-- Dialog sửa -->
    <v-dialog v-model="dialogEdit" max-width="400" persistent>
      <v-card title="Sửa bản ghi">
        <v-card-text>{{ "Chi tiết các trường" }}</v-card-text>
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancelEdit">
            Hủy bỏ
          </v-btn>
          <v-btn @click="confirmEdit">
            Đồng ý
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <!-- Dialog Xóa -->
    <v-dialog v-model="dialogDelete" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="Bạn có chắc chắn muốn xóa không?"
        title="Thông báo!"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancelDelete">
            Hủy bỏ
          </v-btn>
          <v-btn @click="confirmDelete">
            Đồng ý
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" multi-line>
      {{ "Thành công" }}
      <template v-slot:actions>
        <v-btn color="green" @click="snackbar = false"> Đóng </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22',
  },
]

const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy, search }) {
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.slice().filter(item => {
          if (search.name && !item.name.toLowerCase().includes(search.name.toLowerCase())) {
            return false
          }

          // eslint-disable-next-line sonarjs/prefer-single-boolean-return
          if (search.calories && !(item.calories >= Number(search.calories))) {
            return false
          }

          return true
        })

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }

        const paginated = items.slice(start, end)

        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}

export default {
  data: () => ({
    page: 1,
    itemsPerPage: 20,
    sortBy: [],

    itemSelected: [],
    headersX: [
      {
        title: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        key: 'name',
        type: 'bool|boolean',
        width: 200,
        fixed: true
      },
      { title: 'Calories', key: 'calories', align: 'end' },
      { title: 'Fat (g)', key: 'fat', align: 'end' },
      { title: 'Carbs (g)', key: 'carbs', align: 'end' },
      { title: 'Protein (g)', key: 'protein', align: 'end' },
      { title: 'Iron (%)', key: 'iron', align: 'end' },
      //Actions
      { title: '', key: 'actions', sortable: false }
    ],
    serverItems: [],
    loading: true,
    totalItems: 0,
    name: '',
    calories: '',
    search: '',
    dialogEdit: false,
    dialogDelete: false,
    snackbar: false,
    currentItemIndex: -1,
    currentItem: null,
    firstTimeConvert: true,
  }),
  props:{
    api: {
      type: Object,
      default: null
    },
    titleGrid: {
      type: String,
      default: ""
    },
    headers:{
      type: Array,
      default: null
    },
    replacePagingGrid:{
      type: Function,
      default: null
    },
    showbtnAdd:{
      type: Boolean,
      default: false
    },
    customConvertPageData: {
      type: Function,
      default: null
    },
    gridHeighExpand: {
      type: Number,
      default: 0
    },
    triggerPaging:{
      type: Boolean,
      default: false
    },
    convertMultiTime:{
      type: Boolean,
      default: true
    },
    showSearch:{
      type: Boolean,
      default: true
    },
    showSelect:{
      type: Boolean,
      default: true
    },
    showPaging: {
      type: Boolean,
      default: true
    },
    showEdit:{
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: false
    }
  },
  created(){
    this.init();
  },
  mounted(){
    // Check titleGrid vaf showSearch
    let top = 0;
    if(!this.titleGrid && !this.showSearch){
      top = 52 - 16;
    }
    this.$refs['grid-box'].style.height = `calc(100% + ${this.gridHeighExpand}px + ${top}px)`
    // Check showPaging 
    if(!this.showPaging){
      setTimeout(() => {
        this.$el.querySelector('.grid-table .v-data-table-footer').classList.add('hidden-important');
      }, 0);
    }
  },
  computed:{
    customPageText(context) {
      let page = context.page
      let size = context.itemsPerPage
      let total = context.totalItems
      let from = (page-1)*size + 1
      let to = Math.min(page*size, total)
      return `${from} - ${to} trên ${total}`;
    },
  },
  watch: {
    name () {
      this.search = String(Date.now())
    },
    calories () {
      this.search = String(Date.now())
    },
    triggerPaging(val){
      if(val){
        this.loadItems(this.page, this.itemsPerPage, this.sortBy)
      }
    }
  },
  methods: {
    init(){
      this.headersX = this.headers ?? this.headersX;
    },
    async loadItems ({ page, itemsPerPage, sortBy }) {
      this.page = page
      this.itemsPerPage = itemsPerPage
      this.sortBy = sortBy
      this.loading = true
      if(this.api != null){
        // Call API
        await this.pagingGrid(page, itemsPerPage, "")
      }else{
        // Default
        FakeAPI.fetch({ page, itemsPerPage, sortBy, search: { name: this.name, calories: this.calories } })
        .then(({ items, total }) => {
          this.serverItems = items
          this.totalItems = total
          this.loading = false
        })
      }
    },
    /**
     * paging chung các màn sử dụng grid
     */
    async pagingGrid(pageIndex, pageSize = 10, valueWhere = ""){
      let pageData = [];
      let total = 0;
      let res = null;
      if(this.replacePagingGrid){
        res = await this.replacePagingGrid({
          PageIndex: pageIndex,
          PageSize: pageSize,
          ValueWhere: valueWhere
        })
      }else{
        res = await this.api.paging({
          PageIndex: pageIndex,
          PageSize: pageSize,
          ValueWhere: valueWhere
        })
      }
      pageData = res.data.data.pageData
      total = res.data.data.pageSize
      this.convertPageData(pageData);
      this.serverItems = pageData
      this.totalItems = total
      this.loading = false
    },
    /**
     * Convert dữ liệu paging
     */
    convertPageData(pageData){
      this.customConvertPageData && this.customConvertPageData(pageData)
      if(this.firstTimeConvert || this.convertMultiTime){
        this.firstTimeConvert = false;
        pageData.forEach((el, id) => {
          el["STT"] = id + 1
          // Case headers data type
          // Lần đầu tiên convert
          this.headersX.forEach(header => {
            let key = header.key
            switch(header.type){
              case 'bool':
              case 'boolean':
                if(el[key]){
                  el[key] = 'Có'
                }else{
                  el[key] = 'Không'
                }
                break;
              default:
                break;
            }
            // Tiền tố
            if(header.prefix){
              el[key] = header.prefix + " " + el[key]
            }
            // Hậu tố
            if(header.suffix){
              el[key] += " " + header.suffix
            }
          })   
        });
      } 
    },
    handleRowClick(evt,e){
      this.$emit("clickRow",e.item)
    },
    addItem(){
      this.dialogEdit = true
      // fake item mới
      this.currentItem = {
        name: 'New',
        calories: 5,
        fat: 5.0,
        carbs: 5,
        protein: 5,
        iron: '5',
      }
    },
    editItem(item) {
      this.currentItemIndex = desserts.findIndex(x => JSON.stringify(x) == JSON.stringify(item))
      // fake thay đổi
      let newItem = Object.assign({}, item)
      newItem.calories += 10;
      this.currentItem = Object.assign({}, newItem)
      this.dialogEdit = true
    },
    cancelEdit(){
      this.closeEdit();
    },
    /**
     * Call API sửa và show thông báo
     */
    confirmEdit(){
      // Call API
      let success = true; 
      if(success){
        this.snackbar = true;
        if (this.currentItemIndex > -1) {
          Object.assign(desserts[this.currentItemIndex], this.currentItem)
        } else {
          desserts.unshift(this.currentItem)
        }
        this.loadItems({page: this.page, itemsPerPage: this.itemsPerPage, sortBy: this.sortBy});
      }else{

      }
      this.closeEdit();
    },
    closeEdit(){
      this.dialogEdit = false
      this.$nextTick(() => {
        this.currentItem = null
        this.currentItemIndex = -1
      })
    },
    deleteItem(item) {
      this.currentItemIndex = desserts.findIndex(x => JSON.stringify(x) == JSON.stringify(item))
      this.currentItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    cancelDelete(){
      this.closeDelete();
    },
    /**
     * Call API xóa và show thông báo
     */
    confirmDelete(){
      // Call API
      let success = true;
      if(success){
        this.snackbar = true;
        desserts.splice(this.currentItemIndex, 1);
        this.loadItems({page: this.page, itemsPerPage: this.itemsPerPage, sortBy: this.sortBy});
      }else{

      }
      this.closeDelete();
    },
    closeDelete(){
      this.dialogDelete = false
      this.$nextTick(() => {
        this.currentItem = null
        this.currentItemIndex = -1
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-add{
  margin-left: 8px;
}

</style>

<style lang="scss">
.grid-box{
  width: 100%;
  .grid-table{
    height: calc(100% - 56px);
    .v-field__input {
      padding-bottom: 6px !important;
    }
    .v-data-table__thead{
      position: sticky;
      top: 0;
      background: white;
      z-index: 10;
    }
    // .v-data-table-footer {
    //   display: none !important;
    // }
    
  }
  .v-card-title{
    padding: 0.5rem 0;
  }
  .v-data-table__thead{
    background-color: #f6f6f6;
  }
  .v-data-table-footer{
    // background-color: #f6f6f6;
    // border: 1px solid #f6f6f6;
    // border-radius: 4px;
  }
  .v-data-table-footer__info{
    padding-inline-end: 8px;
  }
  .v-data-table-footer__items-per-page{
    padding-inline-end: 12px;
    span {
      padding-inline-end: 8px;
    }
  }
}
.hidden-important {
  display: none !important;
}
.search-bar{
  .v-field__input {
    padding: 0 8px !important;
  }
  
}
.custom-border {
  border-top: 1px solid #e0e0e0 !important; /* Thêm border màu đen */
  // border-radius: 4px;
  thead{
    background-color: #f6f6f6;
  }
}
</style>