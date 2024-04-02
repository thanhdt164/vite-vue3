<template>
    <v-data-table-server 
    v-model:items-per-page="itemsPerPage" 
    :search="search" 
    :headers="headers"
    :items-length="totalItems" 
    :items="serverItems" 
    :loading="loading" 
    item-value="routeExam ? ExamName : name" 
    @update:options="loadItems"
    @click:row="handleRowClick"
    >
        <template v-slot:tfoot v-if="!routeExamDetail">
            <tr v-if="!routeExam" >
                <td>
                    <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2"
                        density="compact"></v-text-field>
                </td>
                <td>
                    <v-text-field v-model="calories" hide-details placeholder="Minimum calories" type="number" class="ma-2"
                        density="compact"></v-text-field>
                </td>
            </tr>
            <!-- Exam -->
            <tr v-else>
                <td>
                    <v-text-field v-model="ExamName" hide-details placeholder="Tìm kiếm bài kiểm tra..." class="ma-2"
                        density="compact"></v-text-field>
                </td>
                <td>
                    <v-text-field v-model="School" hide-details placeholder="Tìm kiếm trường" class="ma-2"
                        density="compact"></v-text-field>
                </td>
            </tr>
        </template>
    </v-data-table-server>
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
const desserts2 = [
  {
    ExamName: 'Bài kiểm tra giữa kì I, Năm học 2023-2024',
    School: 'Trường THCS Văn Phú',
    Subject: "Vật lý - THCS",
    Time: "50 phút",
    PeriodTime: "2023-2024",
    QuestionAmount: '40',
  },
  {
    ExamName: 'Bài kiểm tra giữa kì I, Năm học 2023-2024',
    School: 'Trường THCS Văn Phú',
    Subject: "Vật lý - THCS",
    Time: "50 phút",
    PeriodTime: "2023-2024",
    QuestionAmount: '40',
  },
  {
    ExamName: 'Bài kiểm tra giữa kì I, Năm học 2023-2024',
    School: 'Trường THCS Văn Phú',
    Subject: "Vật lý - THCS",
    Time: "50 phút",
    PeriodTime: "2023-2024",
    QuestionAmount: '40',
  },
  {
    ExamName: 'Bài kiểm tra giữa kì I, Năm học 2023-2024',
    School: 'Trường THCS Văn Phú',
    Subject: "Vật lý - THCS",
    Time: "50 phút",
    PeriodTime: "2023-2024",
    QuestionAmount: '40',
  },
  {
    ExamName: 'Bài kiểm tra giữa kì I, Năm học 2023-2024',
    School: 'Trường THCS Văn Phú',
    Subject: "Vật lý - THCS",
    Time: "50 phút",
    PeriodTime: "2023-2024",
    QuestionAmount: '40',
  },
  {
    ExamName: 'Bài kiểm tra giữa kì I, Năm học 2023-2024',
    School: 'Trường THCS Văn Phú',
    Subject: "Vật lý - THCS",
    Time: "50 phút",
    PeriodTime: "2023-2024",
    QuestionAmount: '40',
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
  };
  const FakeAPIExams = {
    async fetch ({ page, itemsPerPage, sortBy, search }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const end = start + itemsPerPage
          const items = desserts2.slice().filter(item => {
            if (search.ExamName && !item.ExamName.toLowerCase().includes(search.ExamName.toLowerCase())) {
              return false
            }
            if (search.School && !item.School.toLowerCase().includes(search.School.toLowerCase())) {
              return false
            }

            // eslint-disable-next-line sonarjs/prefer-single-boolean-return
            // if (search.calories && !(item.calories >= Number(search.calories))) {
            //   return false
            // }

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
      itemsPerPage: 5,
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Calories', key: 'calories', align: 'end' },
        { title: 'Fat (g)', key: 'fat', align: 'end' },
        { title: 'Carbs (g)', key: 'carbs', align: 'end' },
        { title: 'Protein (g)', key: 'protein', align: 'end' },
        { title: 'Iron (%)', key: 'iron', align: 'end' },
      ],
      loading: true,
      totalItems: 0,
      name: '',
      calories: '',
      search: '',

      ExamName: '',
      School: '',
      // search: '',
    }),
    props:{
      // p_headers: {
      //   type: Array,
      //   default: []
      // },
      headers:{
        type:Array,
        default:[]
      },
      serverItems:{
        type:Array,
        default:[]
      },
      loading:{
        type:Boolean,
        default :false
      }
    },
    computed: {
      routeExam(){
        return this.$route.name == 'exams'
      },
      routeExamDetail(){
        return this.$route.name == 'examdetail'
      }
    },
    watch: {
      name () {
        this.search = String(Date.now())
      },
      calories () {
        this.search = String(Date.now())
      },
      ExamName () {
        this.search = String(Date.now())
      },
      School () {
        this.search = String(Date.now())
      },
    },
    methods: {
      loadItems ({ page, itemsPerPage, sortBy }) {
        if(!this.routeExam){
          this.loading = true
          FakeAPI.fetch({ page, itemsPerPage, sortBy, search: { name: this.name, calories: this.calories } }).then(({ items, total }) => {
            this.serverItems = items
            this.totalItems = total
            this.loading = false
          })
        }else{
          this.loading = true
          FakeAPIExams.fetch({ page, itemsPerPage, sortBy, search: { ExamName: this.ExamName, School: this.School } }).then(({ items, total }) => {
            this.serverItems = items
            this.totalItems = total
            this.loading = false
          })
        }
        
      },
      handleRowClick(val,e){
        this.$emit("clickRow",e.item)
      }
    },
    created(){
      if(this.routeExam){
        this.headers = [
          {
            title: 'Tên đề thi',
            align: 'start',
            sortable: false,
            key: 'ExamName',
          },
          { title: 'Trường', key: 'School', align: 'end' },
          { title: 'Môn học', key: 'Subject', align: 'end' },
          { title: 'Thời gian', key: 'Time', align: 'end' },
          { title: 'Kỳ thi', key: 'PeriodTime', align: 'end' },
          { title: 'Số lượng câu hỏi', key: 'QuestionAmount', align: 'end' },
        ]
      }
    },
  }
</script>