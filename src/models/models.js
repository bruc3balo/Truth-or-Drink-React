import {isNullOrUndefined} from "../constants/constants";

export class ApiResponse {

    statusCode
    description
    data;

    constructor(statusCode, description, data) {
        this.statusCode = statusCode;
        this.description = description;
        this.data = data;
    }


    static from(response) {
        if(isNullOrUndefined(response.data) || !Object.keys(response.data).length) return new ApiResponse(response.status, response.statusText, null)
        let obj = JSON.parse(response.json())
        return new ApiResponse(isNullOrUndefined(obj.api_http_code) ?? response.status,isNullOrUndefined(obj.api_description) ?? "", obj.data);
    }
}

