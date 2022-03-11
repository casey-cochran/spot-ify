

const LOAD_FOLLOWERS = 'user/LOAD_FOLLOWERS';
const LOAD_FOLLOWING = 'user/LOAD_FOLLOWING';
const ADD_FOLLOWERS = 'user/ADD_FOLLOWERS';
const REMOVE_FOLLOWERS = 'user/REMOVE_FOLLOWERS';


const removeFollower = (userId, otherUserId) => {
    return {
        type: REMOVE_FOLLOWERS,
        userId,
        otherUserId
    }
}

export const remove_Follower = (userId, otherUserId) => async dispatch => {
    const response = await fetch(`/api/users/followers/delete`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId, otherUserId}),
    })
    const data = await response.json()
    // dispatch(removeFollower(userId, otherUserId))
}


export const add_Followers = (userId, otherUserId) => async dispatch => {
    const response = await fetch(`/api/users/followers/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId, otherUserId}),
    })
}


const loadFollowers = (data) => {
    return {
        type: LOAD_FOLLOWERS,
        data
    }
}

export const load_Followers = ( userId ) => async dispatch => {
    const response = await fetch(`/api/users/${userId}/followers`)
    const data = await response.json()
    console.log(data, 'any data coming back? ')
    dispatch(loadFollowers(data))
}


 const followsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWERS:
          newState = {...state}
          newState = action.data
          return newState
        case REMOVE_FOLLOWERS:
            newState = {...state}
            let followers = newState.followers
            for(let i = 0; i < followers.length; i++){
                let userFollowers = followers[i]
                if(userFollowers.id === action.followerId){
                    followers.pop(i)
                }
            }
            return newState
      default:
        return state;
    }
  };


  export default followsReducer;