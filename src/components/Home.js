import React, { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import db, { auth, storage } from '../firebase'
import './Home.css'
const Home = () => {
    const [image, setImage] = useState(null)
    const [user, loading, error] = useAuthState(auth);
    const imageRef = useRef(null)
    const msgRef = useRef(null)
    const onSubmitHandler = e => {
        e.preventDefault();
        console.log('submit')
        db.collection('posts').add({
            message: msgRef.current.value,
            email: user.email
        }).then(doc => {
            if (image) {
                const storageRef = storage.ref();
                var uploadTask = storageRef.child(`posts/${doc.id}`).put(image);
                setImage(null)

                uploadTask.on('state_changed',
                    null,
                    (error) => {
                        // Handle unsuccessful uploads
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

        </div>
    )
}

export default Home
