import React,{useState,useEffect} from 'react';
// import PlayChallenge from './ChallengePage';
import CardComponent from './card-component';
//import firebaseRef from 'firebase';
import firestoreRef from '../firebase';
export default function Challenges()
{

    
    //const db = firebase.firestore();
    let name = "name";
    let image = "";
    let creator = "";
    console.log("calling function..")
    const [isFirebaseDone,setFirebaseDone] = useState(false);

    useEffect(() => {
        async function getPlaylists() {
            await firestoreRef
            .collection('Playlists')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    name = doc.data().playlist_info[0];
                    console.log("Name is: ", name)
                    image = doc.data().playlist_info[1];
                    creator = doc.data().playlist_info[2];
                    setFirebaseDone(true);
                });
            });
            console.log('Getting playlists finished');
        }
        getPlaylists();
    });
    //let docRef = db.collection("Playlists").doc("playlist_1");
//     async function getPlaylists() {
//     await firestoreRef.collection('Playlists')
//     .get()
//     .then(function(querySnapshot) {
//         if (doc.exists) {
//             console.log("Document data:", doc.data());
//             let playlist_info = doc.get('playlist_info');
//             console.log(playlist_info);
//             name = playlist_info[0];
//             image = playlist_info[1];
//             creator = playlist_info[2]
//             setFirebaseDone(true);


//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     }).catch(function(error) {
//         console.log("Error getting document:", error);
//     });
//         console.log("Getting playlist Finished.")

// }
    console.log(name)
    console.log("we here!");

    return(
        <div>
            <header>
                {console.log("rendering component...")}
                {isFirebaseDone && <CardComponent name={name}
                               image={image}
                               creator={creator}/>}
            </header>
        </div>
        
    );
}