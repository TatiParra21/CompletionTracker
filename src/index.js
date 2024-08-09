//import './index.css'
import { initializeApp } from "firebase/app";
import { getAuth, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword, 
signOut, 
onAuthStateChanged,
GoogleAuthProvider,
signInWithPopup} from "firebase/auth";
import gLogo from './images/free-goo.png'
import { getFirestore, doc, setDoc } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: "completion-tracker",
  storageBucket: "completion-tracker.appspot.com",
   
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const emailInput = document.getElementById("email-address")
const passwordInput = document.getElementById("password")
const signInSection = document.getElementById("sign-in-sec")
const loggedInSection = document.getElementById("logged-in-sec")

const showSec = (sec) =>{
  sec.style.display = "flex"
  }
  const hideSec= (sec) => {
    sec.style.display = "none"
  
  }

  
  


const loggedInView =()=>{
  hideSec(signInSection)
  showSec(loggedInSection)
  document.body.classList.remove('hidden')
  
}

const loggedOutView = ()=>{
  hideSec(loggedInSection)
  showSec(signInSection)
  document.body.classList.remove('hidden')
  
}
const resetInfo= () =>{
  emailInput.value=""
  passwordInput.value =""
}
const signInUser=()=>{
  
  const email = emailInput.value
  const password = passwordInput.value

  signInWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    const user = userCredential.user
    resetInfo()
    loggedInView() 
})
  .catch((error)=>{
    console.error(error.message)
})
}

const createUserAccount = ()=> {
  
  const email = emailInput.value
  const password = passwordInput.value

  createUserWithEmailAndPassword(auth,email,password)
  .then((userCredential)=>{
    const user = userCredential.user
    resetInfo()
    
  }) //.then runs if createUserWithEmail and Password completes without any errors
  .catch((error)=>{

   console.error(error.message) 
  }) //the .catch code runs if the function above does come accross an issue
  }

  const signOutUser =() =>{
 signOut(auth)
  .then(()=> {
    loggedOutView()
    
  }).catch((error)=>{
    console.error(error.message)
  })
  }

  onAuthStateChanged(auth,(user)=>{
    
    console.log("test")
    if(user){
      console.log("lgged in")
      loggedInView()
    }else{
      loggedOutView()
      console.log("logged out")
    }
})

 
const authSignWithGoogle = ()=>{
  
  signInWithPopup(auth,provider)
  .then((result)=>{//result returns a userCredentialObject
    console.log(result)
    const credential = GoogleAuthProvider.credentialFromResult(result)//This extracts the OuthCredential from the userCredential Object
    const token = credential.accessToken
    const user = result.user
    console.log(user)
   loggedInView()
  }).catch((error) => {
  
      console.error(error.message);
      console.error("error detail:",error)
      console.error("error code:",error.code)
    
  });
}

  /*
window.addEventListener("load",()=>{
  onAuthStateChanged(auth,(user)=>{
    
    console.log("test")
    if(user){
      console.log("lgged in")
      loggedInView()
    }else{
      console.log("logged out")
      loggedOutView()
    }
    })
 })
  */
  document.addEventListener("click",(e)=>{
    e.preventDefault()
    if(e.target.id == "log-in-btn"){
      signInUser()
    }else if(e.target.id == "create-account-btn"){
      createUserAccount()
    }else if(e.target.id == "sign-out-btn"){
      signOutUser()
    }else if(e.target.id =="sign-with-google"){
      authSignWithGoogle()
    }

  })





// console.log(app)
// console.log(auth)

