import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // default export 

// make the color scheme more like ig***************
// I can't keep this as an object with both these values since I need to use .includes (only for arrays)
let followersList = [];
let followingObjects = [];

// fetches from server-side (server.js)
const followersObjects = await fetch('/api/followers-fetch').then(response=>response.json());
followingObjects = await fetch('/api/following-fetch').then(response=>response.json());

// error handling (stop rest of script)
if (followersObjects.status === 'error' || followingObjects.status === 'error'){
    document.querySelector('.js-counter').innerHTML = `Results: (-)`;
    document.querySelector('.names').innerHTML = `Error getting the data from the given file`;
    throw new Error();
}

// followers list is consistent (the one being compared to)
followersObjects.data.forEach((listItem)=>{
    followersList.push(listItem.string_list_data[0].value);
});

// console.log(followersList)
// console.log(followingObjects)


let followingObj = {};
// note: had a problem where after deleting a handle the count wasn't changing, this kind of feels lazy using a global var to modify count directly 
let count = 0;

// if local storage has values then use that, otherwise initialize from json files
if(localStorage.getItem('followingObj')){
    // followingObj holds a list and extraInfo object all in a general object
    followingObj = JSON.parse(localStorage.getItem('followingObj'));
} else{
    followingObj = initializeFollowing();
}

renderResults();
setEventListeners();


function initializeFollowing (){
    let tempFollowingList = [];
    let tempExtraInfo = [];

    followingObjects.data.relationships_following.forEach((listItem)=>{
        tempFollowingList.push(listItem.string_list_data[0].value);
        
        tempExtraInfo.push({
            timestamp: dayjs.unix(listItem.string_list_data[0].timestamp).format('MMMM D, YYYY'),
            link: listItem.string_list_data[0].href
        });
    });

    // sends an object of the info so that it doesnt
    return {
        followingList: tempFollowingList, 
        extraInfo: tempExtraInfo
    };
}

function renderResults(){
    let html = '';
    
    followingObj.followingList.forEach((following, index)=>{
        // if someones im following is NOT in followersList
        if (!(followersList.includes(following))){
            html+=`
            <div class="ig-line">
                <p class="text">
                    ig handle: <a href="${followingObj.extraInfo[index].link}" target="_blank">@${following}</a>, followed on ${followingObj.extraInfo[index].timestamp}
                </p>
                <span class="remove-option js-remove" data-ig-handle="${following}">Remove</span>
            </div>
            `;
            count++;
        }
    });
    
    // if null
    if (!html){
        html = `Everybody that you follow has followed you back :)`;
    }
    
    document.querySelector('.js-counter').innerHTML = `Results: (${count} found)`;
    document.querySelector('.names').innerHTML = html;
}

// saves followingObj
function saveToStorage(){
    // console.log('save call');
    localStorage.setItem('followingObj', JSON.stringify(followingObj));
}

// note: this needed to be called after render results so that the buttons were actually created before the event listeners could be added
function setEventListeners(){
    // note: make sure to always have event listeners AFTER the html is sent in
    document.querySelectorAll('.js-remove').forEach((link)=>{
        
        link.addEventListener('click', () => {
            // put inside a timeout for 0.1s so multiple buttons aren't clicked on the same click
            setTimeout(()=>{
                // note: whenever using link.dataset the name should be camelCase of the data-______
                const { igHandle } = link.dataset;
                const index = followingObj.followingList.indexOf(igHandle);
                
                // removes corresponding ig from the list of nonMutuals
                followingObj.followingList.splice(index, 1);
                followingObj.extraInfo.splice(index, 1);
        
                saveToStorage();
        
                count--;
                document.querySelector('.js-counter').innerHTML = `Results: (${count} found)`;
                // removes the handle from the page by using the remove buttons parent div which also holds the handle text
                link.closest('.ig-line').innerHTML = '';
            }, 100);
        });
    });
}






