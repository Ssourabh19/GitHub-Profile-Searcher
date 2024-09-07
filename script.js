const darkMode = document.querySelector('.DarkUi');
const lightMode = document.querySelector('.lightUi');
const body = document.querySelector('body');
const heading1 = document.querySelector('.heading1');
const searchInput = document.querySelector('[dataSearchUser]');
const root = document.documentElement.style;

const searchbtn = document.querySelector('.SearchBtn');
const Following = document.querySelector('[dataFollowing]');
const Followers = document.querySelector('[ dataFollower]');
const bio = document.querySelector('[dataBio]');
const userLocation = document.querySelector('[dataLocation]');
const userTwitter = document.querySelector('[dataTwitter]');
const company = document.querySelector('[dataofficeInfo]');
const blog = document.querySelector('[dataLinks]');
const User = document.querySelector('[dataUsename]');
const userName = document.querySelector('[dataUsernameLink]');
const userProfile = document.querySelector('[dataProfile]');
const userRepo = document.querySelector('[dataRepo]');
const userJoined = document.querySelector('[userJoined]');
const contentBox = document.querySelector('.ContentBox2');
const UserdetailDiv = document.querySelector('.maindiv');
const repoFollower = document.querySelector('.RepoFollower');
const parametercalled1 = document.querySelector('.parameter');
const parametercalled2 = document.querySelector('.parameter1');
const parametercalled3 = document.querySelector('.parameter2');
const otherinfo = document.querySelector('.OtherInfo');
const otherinfo2 = document.querySelector('.OtherInfo2');
const errorWindow=document.querySelector('.error');
const errorColor=document.querySelector('.ColorChange');



let darkModeVar=false;
let username ;
darkMode.classList.add('active');
searchInput.style.color = '#4B6A9B';
body.style.backgroundColor = "#F6F8FF";
contentBox.style.backgroundColor = "white";
UserdetailDiv.style.backgroundColor = "white";
UserdetailDiv.classList.add('userDetailsNotPresent')


function darkModeProp(){
    lightMode.classList.add('active');
  errorColor.style.color="white"
    darkMode.classList.remove('active');
    body.style.backgroundColor = "#141D2F"
    lightMode.style.color = "white"
    heading1.style.color = "white"
    contentBox.style.backgroundColor = "#1E2A47"
    UserdetailDiv.style.backgroundColor = "#1E2A47"
    searchInput.style.color = 'white';
    repoFollower.classList.add('RepoFollower2');
    parametercalled1.classList.add('parameter3');
    parametercalled2.classList.add('parameter3');
    parametercalled3.classList.add('parameter3');
    Following.classList.add('following');
    Followers.classList.add('follower');
    userRepo.classList.add('repo');
    userRepo.style.color = "white"
    Following.style.color = "white"
    Followers.style.color = "white"
    User.style.color = "white";
    otherinfo.classList.add('OtherInfo3');
    otherinfo2.classList.add('OtherInfo3');
    bio.classList.add('databio2');
    userJoined.style.color = "white";
    blog.style.color = "white"
    userTwitter.style.color = "white"
    searchInput.placeholder="Enter a GitHub username..."
    contentBox.style.boxShadow="none";
    UserdetailDiv.style.boxShadow="none";
    darkModeVar=true;
    root.setProperty("--lm-text", "white");
    localStorage.setItem("dark-mode",true);

}
function lightModeProp(){
   
     searchInput.placeholder="Enter a GitHub username..."
    lightMode.classList.remove('active');
    errorColor.style.color="black"
    darkMode.classList.add('active');
    body.style.backgroundColor = "#F6F8FF"
    heading1.style.color = "#4B6A9B"
    contentBox.style.backgroundColor = "white"
    UserdetailDiv.style.backgroundColor = "white"
    searchInput.style.color = '#4B6A9B';
    repoFollower.classList.remove('RepoFollower2');
    parametercalled1.classList.remove('parameter3');
    parametercalled2.classList.remove('parameter3');
    parametercalled3.classList.remove('parameter3');
    userRepo.style.color = "black"
    Following.style.color = "black"
    Followers.style.color = "black"
    User.style.color = "black"
    otherinfo.classList.remove('OtherInfo3');
    otherinfo2.classList.remove('OtherInfo3');
    bio.classList.remove('databio2')
    userJoined.style.color = "#4B6A9B"
    blog.style.color = "#0079ff"
    userTwitter.style.color = "#0079ff"
    contentBox.style.boxShadow="0px 0px 20px gray";
    UserdetailDiv.style.boxShadow="0px 0px 20px gray";
    darkModeVar=false;
    localStorage.setItem("dark-mode",false);
    root.setProperty("--lm-text", "#4B6A9B");

}
function SearchUser(){
    username = searchInput.value;
    console.log(username);
    Githubuserapi(username);
}

darkMode.addEventListener('click', darkModeProp);
lightMode.addEventListener('click', lightModeProp);
searchbtn.addEventListener('click', SearchUser);
searchInput.addEventListener('input',function(){
    if(searchInput!==""){
        searchInput.addEventListener('keydown',function(e){
            if(e.keyCode===13){
                SearchUser();
            }
        })
    }
})
searchInput.addEventListener('input',function(){
    errorWindow.classList.remove('active');
})


async function Githubuserapi(username) {
    
        try {
       
            const data = await fetch(`https://api.github.com/users/${username}`);
          

            const response = await data.json()
            

            console.log(response);
            renderuserData(response);
        }
        catch (err) {
            console.log(err)
        }
    

}

function renderuserData(response) {
    Following.innerText = `${response?.following}`;
    Followers.innerText = `${response?.followers}`
    company.innerText = `${response?.company}`
    userName.href = `https://github.com/${response?.login}`
    userProfile.src = `${response?.avatar_url}`
    userRepo.innerText = `${response?.public_repos}`
    const userCreatedAccount = `${response?.created_at}`
    const date = new Date(userCreatedAccount);
    const DateConform = date.toDateString();
    console.log(DateConform);
    userJoined.innerText = ` Joined ${DateConform}`


    if (response.name) {
        User.innerText = `${response.name}`;
    }
    else {
        User.innerText = `Not Available`;
    }
    if (response?.bio) {
        bio.innerText = `${response?.bio}`;

    }
    else {
        bio.innerText = `This Profile has no Bio`
    }
    if (response?.blog) {
        blog.innerText = `${response?.blog}`
        blog.href = `${response?.blog}`;
    }
    else {
        blog.innerText = `Not Available`
        blog.href = `#`;
    }
    if (response?.location) {
        userLocation.innerText = `${response?.location}`
    }
    else {
        userLocation.innerText = `Not Available`
    }
    if (response?.twitter_username) {
        userTwitter.innerText = `${response?.twitter_username}`
        userTwitter.href = `https://x.com/${response?.twitter_username}`
    }
    else {
        userTwitter.innerText = `Not Available`
        userTwitter.href = `#`
    }
    if (response?.company) {
        company.innerText = `${response?.company}`
    }
    else {
        company.innerText = `Not Available`;
    }
    if (response?.login) {
        userName.innerText = `@${response?.login}`
        UserdetailDiv.classList.remove('userDetailsNotPresent');
        errorWindow.classList.remove('active');
      
    }
    else {

        UserdetailDiv.classList.add('userDetailsNotPresent');
       
        errorWindow.classList.add('active');

    }
}
// function init(){
// darkModeVar=false;
// const prefersmode=window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
// if(localStorage.getItem("dark-mode")){
//     darkModeVar=localStorage.getItem("dark-mode");
//     darkModeProp();
// }
// else{
//     localStorage.setItem("dark-mode",prefersmode);
//     darkModeVar=prefersmode;
//     lightModeProp();
// }
// }
// init();
function init(){
    darkModeVar=false;

    const value=localStorage.getItem("dark-mode");
    if(value==null){
        localStorage.setItem("dark-mode",darkModeVar)
        lightModeProp()
    }
    else if(value=="true"){
        darkModeProp();
    }
    else if(value=="false"){
        lightModeProp();
    }
}
init();