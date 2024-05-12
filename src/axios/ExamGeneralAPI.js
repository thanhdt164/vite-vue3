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
}
export default ExamGeneralAPI;