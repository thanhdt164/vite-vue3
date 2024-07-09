import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class ExamsAPI extends BaseAPI{
    constructor(name = "Exams"){
        super();
        this.controller = name;
    }
    // Phương thức riêng
    InsertExam(data){
        let url = this.url('exam-detail')
        return baseCRUD.post(url, data);
    }
    getallShuffExams(){
        let url = this.url('all-shuff-exams')
        return baseCRUD.get(url);
    }
    getExamByCode(code){
        let url = this.url(`exam-bycode?examCode=${code}`)
        return baseCRUD.get(url)
    }
    getAllExam(){
        let url = this.url('get-all')
        return baseCRUD.get(url);
    }
    getExamDoing(examCode){
        let url = this.url(`/current-exam?code=${examCode}`)
        return baseCRUD.get(url);
    }
    getMarkTest(data){
        let url = this.url(`/mark-test`)
        return baseCRUD.post(url, data);
    }
}
export default ExamsAPI;