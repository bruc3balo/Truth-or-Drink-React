export class ApiResponse {

    statusCode
    description
    data;

    constructor(statusCode, description, data) {
        this.statusCode = statusCode;
        this.description = description;
        this.data = data;
    }

     static async fromBase64(response) {
        let base64String = await response.text();
        //no data
        if(!base64String) return new ApiResponse(response.status, response.statusText, null)

        //has data
        let obj = JSON.parse(this.decodeBase64(base64String));
        return new ApiResponse(obj.api_http_code ?? response.status,obj.api_description ?? "", obj.data);
    }

    static decodeBase64(data) {
        if (typeof atob === "function") {
            return atob(data);
        } else if (typeof Buffer === "function") {
            return Buffer.from(data, "base64").toString("utf-8");
        } else {
            throw new Error("Failed to determine the platform specific decoder");
        }
    }

}

export class MyUser {
    username

    gamerTag

    emotion

    email

    verified

    createdAt;


    constructor(username, gamerTag, emotion, email, verified, createdAt) {
        this.username = username;
        this.gamerTag = gamerTag;
        this.emotion = emotion;
        this.email = email;
        this.verified = verified;
        this.createdAt = createdAt;
    }

    static fromApiResponse(apiResponse) {
        if(apiResponse.statusCode !== 200) return null
        let json = apiResponse.data
        return new MyUser(json.username, json.gamer_tag, json.emotion, json.email,json.verified, json.created_at)
    }
}

export class Emotion {
    id

    description

    status;


    constructor(id, description, status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }

    static listFromApiResponse (apiResponse) {
        return apiResponse.data.map(e => new Emotion(e.id, e.description, e.status));
    }
}

