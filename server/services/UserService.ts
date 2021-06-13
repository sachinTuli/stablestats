class UserService {
    async registerNewDiscordUser(accessToken:string, refreshToken:string, userProfile:any) {
        console.log(accessToken, refreshToken ,userProfile);
        return userProfile;
    }
}

export default new UserService();