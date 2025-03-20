const users = []

//join user to chat 
function userJoin(id,userName,userEmail) {
    const user = { id,userName , userEmail};
    if(users.some((item)=>item.userEmail === user.userEmail)) {
        return
    }
    users.push(user)
    console.log("userJoin")
    return user;
}

//get user online
function getUsersOnline() {
    return users
}

//User leaves chat
function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}
export { userJoin,
    getUsersOnline,userLeave }