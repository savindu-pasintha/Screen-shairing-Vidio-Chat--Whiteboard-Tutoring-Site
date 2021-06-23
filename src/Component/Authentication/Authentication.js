import emailjs from "emailjs-com";
import firebase from "../Firebase/firebase";

export default class Authentication {
    //Registartion save Firebase firestore DB
    //generate password
    //send password using email
    //Login

    /*   Flow of Authentication
      1-fill forms
       2-click button
       * registration 
        3-generate password
         4- send email inside the password
          5- if true  login redirect to session page -- false redirect to login
           6- end
    */

    //Registartion save
    async registration(userNameAsAId, regDatajson) {
        try{
        var password = this.generatePassword(regDatajson.firstname,regDatajson.lastname,regDatajson.email);
        var storeDataJsonDataSet = {
            firstname : regDatajson.firstname,
            lastname : regDatajson.lastname,
            email : regDatajson.email,
            lineone : regDatajson.lineone,
            linetwo : regDatajson.linetwo,
            linethree : regDatajson.linethree,
            mobileTel : regDatajson.mobile,
            homeTel : regDatajson.home,
            grade : regDatajson.grade,
            program : regDatajson.program,
            timestamp : regDatajson.timestamp,
            username: regDatajson.email,
            password : password
        };
       //  console.log("storeDataJsonDataSet",storeDataJsonDataSet);
        var l = userNameAsAId.length;
        var id = userNameAsAId.slice(0, l - 10); //remove the last 9 charactore for @gmail.com
        const db = firebase.firestore();
        //db.collection("name").add(); this method can not add document to collection
        await db
            .collection("Collage")
            .doc("Login")
            .update(
                {  [id]: storeDataJsonDataSet,  }
            ).then(() => {
                alert("Registration Sucessfully.");
                var fullName = storeDataJsonDataSet.firstname+storeDataJsonDataSet.lastname;
                var loginPassword = password; 
                var loginEmail = storeDataJsonDataSet.email;
                this.sendEmail(fullName,loginEmail,loginPassword);
               // console.log("Registration success status-ok");
               // window.location.href="./login";
            }).catch((error) => {
                window.alert("Registration Failed !.");
                console.log("Registration error-", error);
            });

        }catch(err){
            console.log("Error in ..Authentication/Authentication.js page",err);
        }
    }

   
    //generate password
   generatePassword(firstname,lastname,email){
       /* var j={
            firstname:"savi",lastname:"ravi",email:"savindu@gmail.com"
        };
        */
        var a,b,c;
        a=firstname.length;
        b=lastname.length;
        c=email.length;
      // get first two charactors as a password
       var p1 = firstname.slice(0,a-(a-2));
       var p2 = lastname.slice(0,b-(b-2));
       var p3 = email.slice(0,c-(c-4));
       var password= p1+p2+p3; 
      // console.log("generated password",password);
       return password;
       //console.log("generated password",password);
    }
    //Login
    async userLoginFunction(userName,userPassword) {
      //  console.log(userName,userPassword);

        try{
        var l = userName.length;
        const db = firebase.firestore();
        var docRef = await db.collection("Collage").doc("Login");
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              var d = doc.data(); //json array data read
              var id = userName.slice(0, l - 10);
            //console.log("Login data",d[id].password);//get specific values by search
             if(d[id].password === userPassword && d[id].length !=0 ){
                 alert("Login Success");
                 window.localStorage.setItem("userId",userName);
                 window.location.href = "/";
             }else{
                alert("Login Failed");
             }
           
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        }catch(e){
            console.log(e);
        }
    }
    //send password using email
  async  sendEmail(userName,reciverEmail,userPassword) {
        // e.preventDefault();
        //naveencu69@gmail.com
     await emailjs
            .send(
                "savindupasinthaserviceid",
                "template_8gnpm1v",
                {
                    user_name: userName,
                    subject: "Access Your Password Bellow Attached.",
                    user_email: reciverEmail,
                    bind: "",
                    carbon: "",
                    message: "Your password is "+userPassword,
                },
                "user_3pugb72pxIy5ds8BKYtUd"
            )
            .then(
                (result) => {
                   console.log("YOUR EMAIL SENT status-", result.text);
                    window.alert("YOUR PASSWORD SENT TO YOUR "+reciverEmail + " Email NOW !");
                   if(result.text === "OK")
                   { window.location.href="./login"; }
                },
                (error) => {
                   console.log("YOUR EMAIL Error status-", error.text);
                    window.alert("CAN NOT SEND EMAIL ! "+reciverEmail);
                }
            );
        //  e.target.reset();
    }



   

}
