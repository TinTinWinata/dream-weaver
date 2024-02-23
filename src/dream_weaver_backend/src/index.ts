import { Canister, Err, Ok, Principal, Record, Result, StableBTreeMap, Variant, Vec, int, int32, query, text, update } from 'azle';
import { v4 as uuidv4 } from 'uuid';



const TPost = Record({
    id : text,
    title : text,
    description : text,
    currentAmount : int32,
    target : int32,
    imageUrl : text,
    startDate : int,
    endDate : int,
    userId: Principal
})

type TPost = typeof TPost.tsType

const TUser = Record({
    email : text,
    username : text,
    name : text,
    bio : text,
    youtubeUrl : text,
    tiktokUrl : text,
    createdAt : int,
    profilePicture:text,
    posts: Vec(text),
    walletPrincipal: text,
})
type TUser = typeof TUser.tsType

const PostDTO = Record({
    id : text,
    title : text,
    description : text,
    currentAmount : int32,
    target : int32,
    imageUrl : text,
    startDate : int,
    endDate : int,
    username : text,
    userProfile : text
})

type PostDTO = typeof PostDTO.tsType

const ErrorVariant = Variant({
    UserNotFound : text,
    UserAlreadyExist: text,
    UsernameOrEmailIsNotValid: text,
    PostNotFound: text
})

type ErrorVariant  = typeof ErrorVariant.tsType

const PostTree = StableBTreeMap<text,TPost>(0)
const UserTree = StableBTreeMap<Principal,TUser>(1)
const UserIndexUsername = StableBTreeMap<text, Principal>(2)
const UserIndexEmail = StableBTreeMap<text, Principal>(3)

function UserMiddleware<T>(
    userId: Principal,
    handler: (user : TUser) => Result<T, ErrorVariant>
): Result<T, ErrorVariant> {
    const user = UserTree.get(userId);
    if (!user.Some) {
        return Err({ UserNotFound: "User not found" });
    }
    return handler(user.Some);
}



export default Canister({
    greet: query([text], text, (name) => {
        return `Hello, ${name}!`;
    }),
    register: update([text, text, Principal, text],Result(TUser,  ErrorVariant), (username: string, email : string, principal: Principal, walletPrincipal: string)=>{
        const checkUsername = UserIndexUsername.get(username)
        const checkEmail = UserIndexEmail.get(email)
        if(checkUsername.Some || checkEmail.Some){
            return Err({UsernameOrEmailIsNotValid : "Username or Email is already exists"})
        }
        const checkUser = UserTree.get(principal)
        
        if(checkUser.Some){
            return Err({UserAlreadyExist : "User with " + principal + " Already exists"})
        }
        const newUser : TUser = {
            walletPrincipal: walletPrincipal,
            username : username,
            email : email,
            name : "",
            bio : "There is nothing here ...",
            createdAt : BigInt(Date.now()),
            profilePicture: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            tiktokUrl : "",
            youtubeUrl : "",
            posts: [],
        }
        UserIndexEmail.insert(email, principal)
        UserIndexUsername.insert(username, principal)
        UserTree.insert(principal,newUser)
        return Ok(newUser)
    }),
    getUser : query([Principal], Result(TUser, ErrorVariant), (principal : Principal)=>{
        const user = UserTree.get(principal)
        if(user.Some){
            return Ok(user.Some)
        }
        return Err({UserNotFound : "There is no user with this principal"})
    }),
    getUserByName: query([text], Result(TUser, ErrorVariant), (username : string)=>{
        const userPrincipal = UserIndexUsername.get(username)
        if(userPrincipal.Some){
            const user = UserTree.get(userPrincipal.Some)
            if(user.Some){
                return Ok(user.Some)
            } else {
                return Err({UserNotFound : "User object didn\'t found on the tree"})
            }
        }
        return Err({UserNotFound : "There is no user with this username"})
    }),
    // Test Only (to be deleted if production)
    getUsers: query([], Result(Vec(Principal), ErrorVariant), () => {
        const users: Vec<Principal> = UserIndexUsername.values();
        return Ok(users);
    }),
    createPost: update([text, text, int32, text, int, int, Principal], Result(TPost,  ErrorVariant), (title: string, description: string, target: number, imageUrl: text, startDate: int, endDate: int, userId: Principal) => {
        const postId = uuidv4()
        return UserMiddleware(userId, (user : TUser)=>{
            user.posts.push(postId)
            const newPost: TPost = {
                id : postId,
                title: title,
                description: description,
                currentAmount: 0,
                target: target,
                imageUrl: imageUrl,
                startDate: startDate,
                endDate: endDate,
                userId: userId
            }
            UserTree.insert(userId, user)
            PostTree.insert(postId, newPost)
            return Ok(newPost)
        })
    }),
    getPosts: query([], Result(Vec(PostDTO), ErrorVariant), () => {
        const posts: Vec<TPost> = PostTree.values();
        const postsDTO : Vec<PostDTO> = posts.map((post)=>{
            const user = UserTree.get(post.userId).Some!
            const {userId, ...postWithoutUserID} = post
            const postDTO: PostDTO = {
                ...postWithoutUserID,
                username: user.username,
                userProfile: user.profilePicture
            };
            return postDTO;
        })

        return Ok(postsDTO);
    }),
    getPost : query([text], Result(TPost, ErrorVariant), (postId : text)=>{
        const post = PostTree.get(postId)
        if(post.Some){
            return Ok(post.Some)
        }
        return Err({PostNotFound : "There is no post with this id"})
    }),
    getUserPosts: query([Principal], Result(Vec(TPost), ErrorVariant), (userId: Principal) => {
        return UserMiddleware(userId, (user : TUser)=>{
            const posts : Vec<TPost> = []
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
