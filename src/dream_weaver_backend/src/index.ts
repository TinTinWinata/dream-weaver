import { Canister, Err, Ok, Principal, Record, Result, StableBTreeMap, Variant, int, query, text, update } from 'azle';
import {v4 as uuidv4} from 'uuid'

const User = Record({
    email : text,
    username : text,
    name : text,
    bio : text,
    youtubeUrl : text,
    tiktokUrl : text,
    createdAt : int,
    profilePicture:text
})
type User = typeof User.tsType

const ErrorVariant = Variant({
    UserNotFound : text,
    UserAlreadyExist: text,
    UsernameOrEmailIsNotValid: text
})

const UserTree = StableBTreeMap<Principal,User>(0)
const UserIndexUsername = StableBTreeMap<text, Principal>(1)
const UserIndexEmail = StableBTreeMap<text, Principal>(2)


export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    register: update([text, text, Principal],Result(User,  ErrorVariant), (username: string, email : string, principal: Principal)=>{
        const checkUsername = UserIndexUsername.get(username)
        const checkEmail = UserIndexEmail.get(email)
        if(checkUsername.Some || checkEmail.Some){
            return Err({UsernameOrEmailIsNotValid : "Username or Email is not Valid"})
        }
        const checkUser = UserTree.get(principal)
        
        if(checkUser.Some){
            return Err({UserAlreadyExist : "User with " + principal + " Already exists"})
        }
        const newUser : User = {
            username : username,
            email : email,
            name : "",
            bio : "There is nothing here ...",
            createdAt : BigInt(Date.now()),
            profilePicture: "",
            tiktokUrl : "",
            youtubeUrl : ""
        }
        UserIndexEmail.insert(email, principal)
        UserIndexUsername.insert(username, principal)
        UserTree.insert(principal,newUser)
        return Ok(newUser)
    }),
    getUser : query([Principal], Result(User, ErrorVariant), (principal : Principal)=>{
        const user = UserTree.get(principal)
        if(user.Some){
            return Ok(user.Some)
        }
        return Err({UserNotFound : "There is no user with this principal"})
    }),
    

})
