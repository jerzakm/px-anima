<script lang="ts">
    // import Layers from './components/Layers.svelte'
    import Toolbar from './components/Toolbar.svelte'
    // import {initPixiCanvas} from './canvas/renderer'
    // import {Graphics, Sprite}     from 'pixi.js'

    // const {renderer, ticker, stage, canvas} = initPixiCanvas()



    // const sprite = Sprite.from('test.jpg')
    // sprite.scale.set(0.25, 0.25)
    // stage.addChild(sprite)

    // ticker.add(()=> {
    // })


    // Firebase App (the core Firebase SDK) is always required and
    // must be listed before other Firebase SDKs
    import firebase from "firebase/app";

    // Add the Firebase services that you want to use
    import "firebase/auth";
    import "firebase/firestore";

    const firebaseConfig = {
        apiKey: "AIzaSyAjCgYB9VdcCacpWLaWTN4UBCXoUgJlHGA",
        authDomain: "pixelizerwebapp.firebaseapp.com",
        databaseURL: "https://pixelizerwebapp.firebaseio.com",
        projectId: "pixelizerwebapp",
        storageBucket: "pixelizerwebapp.appspot.com",
        messagingSenderId: "464760066182",
        appId: "1:464760066182:web:2f0462df33feaf7d81c107",
        measurementId: "G-G2QQYDS1BB"
    };
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleLogin = () => {
        auth
        .signInWithPopup(provider)
        .then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            const firebaseuser = result.user;
        })
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
        });
    };

    handleGoogleLogin()
</script>

<Toolbar/>