import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class BlockAPI extends BaseAPI{
    constructor(name = "Block"){
        super();
        this.controller = name;
    }
    
}
export default BlockAPI;