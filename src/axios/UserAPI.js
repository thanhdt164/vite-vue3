import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class UserAPI extends BaseAPI{
    constructor(name = "User"){
        this.controller = name;
    }
    // Phương thức riêng
    InsertUser(data){
        let url = this.url('create-user')
        return baseCRUD.post(url, data)
    }
}
export default UserAPI;