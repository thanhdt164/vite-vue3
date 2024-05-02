import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class AuthenticateAPI extends BaseAPI{
    constructor(name = "Authenticate"){
        this.controller = name;
    }
    // Phương thức riêng
    login(data){
        let url = this.url('login');
        return baseCRUD.post(url, data)
    }
}
export default AuthenticateAPI;