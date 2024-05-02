import { configAPI, baseCRUD} from "@/axios/BaseConfig";

class BaseAPI {
	// Constructor
  constructor(name = "Base") {
    this.controller = name;
  }
	// URL
	url(endpoint = null) {
		return `/${this.controller}${endpoint}`
	}
  // Phương thức get-all
  async getAll() {
		let url =this.url('/get-all')
    return baseCRUD.get(url);
  }
  // Phương thức get-by-id
  async getById(id) {
		let url = this.url(`/${id}`);
    return baseCRUD.get(url);
  }
	// Phương thức create
	async create(data){
		let url = this.url();
		return baseCRUD.post(url, data);
	}

  // Phương thức paging
  // pagingRequest: {
  //   pageNumber: 1,
  //   pageSize: -1,
  //   Sort: []
  // }
  async paging(pagingRequest) {
		let url = this.url(`/paging`);
		return baseCRUD.post(url, pagingRequest);
  }

  // Phương thức update 1 trường cụ thể của một mục
  async updateField(id, fieldName, fieldValue) {
		let url = this.url(`/update-field/${id}`)
		let params = {
			FieldAndValue: {
				fieldName: fieldValue
			}
		}
		return baseCRUD.post(url, params)
  }
	// Phương thức update nhiều trường cùng lúc
	async updateMultiField(id, fields, vals){
		let url = this.url(`/update-multi-field/${id}`)
		let params = {
			FieldAndValue: {}
		}
		fields.forEach((field, id) => {
			params.FieldAndValue[field] = vals[id]
		});
		return baseCRUD.post(url, params);
	}
};

export default BaseAPI;
