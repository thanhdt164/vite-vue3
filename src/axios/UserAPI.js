import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class UserAPI extends BaseAPI{
    constructor(name = "User"){
        super();
        this.controller = name;
    }
    // Phương thức riêng
    InsertUser(data){
        let url = this.url('/create-user')
        return baseCRUD.post(url, data)
    }
    createUserBlock(data){
        let url = this.url('/users-block')
        return baseCRUD.post(url, data)
    }
    InitLogin(){
        let url = this.url('/init-login')
        return baseCRUD.post(url)
    }
    getUserExamResult(){
        let url = this.url('/lst-users-exam')
        return baseCRUD.get(url)
    }
    async replacePagingGrid(pagingRequest) {
        let url = this.url(`/paging`);
        return baseCRUD.post(url, pagingRequest);
    }
}
export default new UserAPI();