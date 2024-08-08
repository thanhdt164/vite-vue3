import BaseAPI from '@/axios/BaseAPI.js'
import {baseCRUD} from "@/axios/BaseConfig";

class AnalysisContentAPI extends BaseAPI{
    constructor(name = "AnalysisContent"){
        super();
        this.controller = name;
    }
    // Phương thức riêng
    
}
export default new AnalysisContentAPI();