import APIService from "../features/APIService"

export const getAvatar = (avatar) => {
    if (avatar == "male") {
        return APIService.URL_REST_API + "/files/user_male.png"
    } else if (avatar == "female") {
        return APIService.URL_REST_API + "/files/user_female.png"
    } else if (avatar == "group") {
        return APIService.URL_REST_API + "/files/group_image.png"
    } else {
        return avatar
    }
}