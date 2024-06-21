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

/**
     * 
     * @param {Array} reports 
     * @returns A Dictionary which has key of the duplicate element and value of the duplicate times.
     */
export const countDuplicate = (reports) => {
    const count = {}
    reports.forEach(r => count[r] = (count[r] || 0) + 1)
    return count
}
