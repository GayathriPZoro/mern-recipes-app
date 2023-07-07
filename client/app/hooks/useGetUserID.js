export const useGetUserID = () => {
    if(typeof window !== "undefined") {
        return window.localStorage.getItem('userID')
    } else return null
}