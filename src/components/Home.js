import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase'
import  {db, auth, storage } from '../firebase'
import './Home.css'
import Card from './Card';
const Home = () => {
    const [image, setImage] = useState(null)
    const [user, loading, error] = useAuthState(auth);
    const imageRef = useRef(null)
    const msgRef = useRef(null)

    const [rposts] = useCollection(
        firebase.firestore().collection('posts')
    );
    const [realtimePosts] = useCollection(
        db.collection("posts").orderBy("timestamp", "desc")
    );

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log('submit')
        db.collection('posts').add({
            message: msgRef.current.value,
            email: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        }).then(doc => {
            if (image) {
                const storageRef = storage.ref();
                var uploadTask = storageRef.child(`posts/${doc.id}`).put(image);
                setImage(null)

                uploadTask.on('state_changed',
                    null,
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            db.collection('posts').doc(doc.id).set({
                                image: downloadURL
                            }, { merge: true })
                        });
                    }
                );

            }
        })
    }
    const addImage = e => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setImage(readerEvent.target.result)
        }

    }

  
    return (
        <div>
            <h1>Welcome home</h1>
            <p><button onClick={() => auth.signOut()}>Sign out</button></p>

            <form>
                <label htmlFor="fname">Your message</label>
                <input ref={msgRef} type="text" id="fname" name="firstname" placeholder="Your message.." />
                <button hidden type="submit" onClick={onSubmitHandler}></button>

                <input ref={imageRef} type="file" onChange={addImage} hidden />
                <div className="button" onClick={() => imageRef.current.click()}>upload image</div>
                <p>{image && (
                    <img style={{ height: 100 }} src={image} onClick={() => setImage(null)} />
                )}</p>

            </form>

            <div>
                {console.log(rposts)}
                {realtimePosts?.docs.map(post=>(
                    <Card key={post.id}
                    image={post.data().image}
                    message={post.data().message}
                    email={post.data().email}
                    timestamp={post.data().timestamp}
                    
                    
                    />
                ))}
            </div>

        </div>
    )
}

export default Home
