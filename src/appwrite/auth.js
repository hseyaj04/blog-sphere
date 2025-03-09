import conf from '../conf/conf.js'
import {ID, Account, Client} from 'appwrite'


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createUser({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //login user
                return this.login(email, password)
            }
            else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
            
        }

        return null;
        //null when we dont get anything
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw new error
        }
    }

}

export const authService = new AuthService();

export default authService