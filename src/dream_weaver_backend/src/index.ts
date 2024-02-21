import { Canister, Err, Ok, Principal, Record, Result, StableBTreeMap, Variant, Vec, int, int32, query, text, update } from 'azle';
import { v4 as uuidv4 } from 'uuid';



const Post = Record({
    title : text,
    description : text,
    currentAmount : int32,
    target : int32,
    imageUrl : text,
    startDate : int,
    endDate : int,
    userId: Principal
})

type Post = typeof Post.tsType

const User = Record({
    email : text,
    username : text,
    name : text,
    bio : text,
    youtubeUrl : text,
    tiktokUrl : text,
    createdAt : int,
    profilePicture:text,
    posts: Vec(text)
})
type User = typeof User.tsType

const ErrorVariant = Variant({
    UserNotFound : text,
    UserAlreadyExist: text,
    UsernameOrEmailIsNotValid: text,
    PostNotFound: text
})

type ErrorVariant  = typeof ErrorVariant.tsType

const PostTree = StableBTreeMap<text,Post>(0)
const UserTree = StableBTreeMap<Principal,User>(0)
const UserIndexUsername = StableBTreeMap<text, Principal>(1)
const UserIndexEmail = StableBTreeMap<text, Principal>(2)

function UserMiddleware<T>(
    userId: Principal,
    handler: (user : User) => Result<T, ErrorVariant>
): Result<T, ErrorVariant> {
    const user = UserTree.get(userId);
    if (!user.Some) {
        return Err({ UserNotFound: "User with " + userId + " not found" });
    }
    return handler(user.Some);
}



export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    register: update([text, text, Principal],Result(User,  ErrorVariant), (username: string, email : string, principal: Principal)=>{
        const checkUsername = UserIndexUsername.get(username)
        const checkEmail = UserIndexEmail.get(email)
        if(checkUsername.Some || checkEmail.Some){
            return Err({UsernameOrEmailIsNotValid : "Username or Email is already exists"})
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
            profilePicture: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            tiktokUrl : "",
            youtubeUrl : "",
            posts: []
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
    createPost: update([text, text, int32, text, int, int, Principal], Result(Post,  ErrorVariant), (title: string, description: string, target: number, imageUrl: text, startDate: int, endDate: int, userId: Principal) => {
        const postId = uuidv4()
        const user = UserTree.get(userId)
        if(user.Some == undefined) {
            return Err({UserNotFound : "User with " + userId + " not found"})
        }
        user.Some.posts.push(postId)
        const newPost: Post = {
            title: title,
            description: description,
            currentAmount: 0,
            target: target,
            imageUrl: imageUrl,
            startDate: startDate,
            endDate: endDate,
            userId: userId
        }
        PostTree.insert(postId, newPost)
        return Ok(newPost)
    }),
    getPosts: query([Principal], Result(Vec(Post), ErrorVariant), (userId: Principal) => {
        return UserMiddleware(userId, (user : User)=>{
            const posts: Vec<Post> = PostTree.values();
            return Ok(posts);
        })
    }),
    getPost : query([text], Result(Post, ErrorVariant), (postId : text)=>{
        const post = PostTree.get(postId)
        if(post.Some){
            return Ok(post.Some)
        }
        return Err({PostNotFound : "There is no post with this id"})
    }),
    getUserPosts: query([Principal], Result(Vec(Post), ErrorVariant), (userId: Principal) => {
        return UserMiddleware(userId, (user : User)=>{
            const posts : Vec<Post> = []
            user.posts.forEach(postId => {
                const post = PostTree.get(postId)
                if(post.Some) {
                    posts.push(post.Some)
                }
            });
            return Ok(posts)
        })
    }),
})
