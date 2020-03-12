<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  // import IconButton from '@smui/icon-button';
  import Button, { Label } from "@smui/button";

  import Menu, { SelectionGroup, SelectionGroupIcon } from "@smui/menu";
  import { Anchor } from "@smui/menu-surface";
  import List, {
    Item,
    Separator,
    Text,
    PrimaryText,
    SecondaryText,
    Graphic
  } from "@smui/list";

  // Firebase App (the core Firebase SDK) is always required and
  // must be listed before other Firebase SDKs
  import firebase from "firebase/app";

  // Add the Firebase services that you want to use
  import "firebase/auth";
  import "firebase/firestore";

  let menu;
  let clicked;

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

  let user;

  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        const firebaseuser = result.user;
        userAuth.set(result);
      })
      .catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        userAuth.set(undefined);
      });
  };

  const handleSignOut = () => {
    auth.signOut();
    userAuth.set(undefined);
  };

  // handleGoogleLogin()

  import { userAuth } from "../stores.ts";

  const unsubscribe = userAuth.subscribe(value => {
    user = value;
  });

  firebase.auth().onAuthStateChanged(user => {
    // If user exist (is logged in) --> store in state.
    if (user) {
      userAuth.set(user);
    } else {
      userAuth.set(undefined);
    }
  });
</script>

<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>webapp</Title>
    </Section>
    <Section align="end" toolbar>
      <div>
        {#if user}
          <Label>{user.displayName}</Label>
          <Button
            on:click={() => handleSignOut()}
            variant="raised"
            color="secondary"
            class="button-shaped-round">
            <Label>Sign out</Label>
          </Button>
        {:else}
          <Button
            on:click={() => handleGoogleLogin()}
            variant="raised"
            color="secondary"
            class="button-shaped-round">
            <Label>Sign in</Label>
          </Button>
        {/if}
      </div>
    </Section>
  </Row>
</TopAppBar>
