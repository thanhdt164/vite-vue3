import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class ExamGeneralAPI extends BaseAPI{
    constructor(name = "ExamGeneral"){
        super();
        this.controller = name;
    }
    async InsertExamGeneral(data){
        let url = this.url('/exam-test-general')
        return await baseCRUD.post(url, data);
    }
    Paging(pagingRequest){
        let url = this.url('/paging')
        return baseCRUD.post(url, pagingRequest)
    }
    PagingByUser(pagingRequest){
        let url = this.url('/paging-by-user')
        return baseCRUD.post(url, pagingRequest)
    }
}
export default ExamGeneralAPI;