
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
        if(!(response.data) || !Object.keys(response.data).length) return new ApiResponse(response.status, response.statusText, null)
        let obj = JSON.parse(response.json())
        return new ApiResponse(obj.api_http_code ?? response.status,obj.api_description ?? "", obj.data);
    }
}

