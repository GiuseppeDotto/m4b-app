import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { auth } from "../config/firebase";
import { UserContext } from "../App";
import { FirebaseError } from "firebase/app";
import ObjectToTable from "./ObjectToTable";

interface Props {
  opened: boolean;
  onCLose: () => void;
}

export default function UserDialog({ opened, onCLose }: Props) {
  const user = useContext(UserContext);
  const dialogRef = useRef<HTMLDialogElement>(null);
  if (opened && dialogRef.current) dialogRef.current.showModal();

  const alertMsgRef = useRef<HTMLDivElement>(null);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const alertDiv = alertMsgRef.current;
    if (!alertDiv || alertMessage.length == 0) return;
    alertDiv.style.height = "1.5em";
    setTimeout(() => {
      alertDiv.style.height = "";
      setAlertMessage("");
    }, 10000);
  }, [alertMessage]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onCLose();
  };

  const userLogin = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    let displayName = formData.get("displayName");
    if (typeof email != "string" || typeof password != "string") return;
    if (typeof displayName != "string" || displayName.length == 0)
      displayName = email.split("@")[0];
    createUserWithEmailAndPassword;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(userCredentials.user, { displayName });
        await sendEmailVerification(userCredentials.user);
        setAlertMessage("Verification pending, please check your email inboxes.");
      } catch (error) {
        setAlertMessage("mail or password invalid.");
        console.log((error as FirebaseError).code);
      }
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    await signInWithPopup(auth, provider);
  };

  const FormLogin = () => {
    return (
      <form onSubmit={userLogin}>
        <h3>Login / Signin</h3>
        <label htmlFor="displayName">username:</label>
        <input type="text" name="displayName" id="displayName" />
        <label htmlFor="email">email:</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">password:</label>
        <input type="password" name="password" id="password" />
        <hr />
        <div className="form-buttons">
          <button type="reset">Reset</button>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
        <hr />
        <small>Alternatively, log in with</small>
        <button style={{ marginTop: "5px" }} onClick={googleSignIn}>
          GOOGLE
        </button>
      </form>
    );
  };

  const UserSpace = () => {
    if (!user) return;

    return (
      <div className="user-space">
        <h3>{user.displayName}</h3>
        <ObjectToTable
          obj={{
            email: user.email,
            userSince: new Date(user.metadata.creationTime ?? "").toLocaleDateString(),
          }}
        />
        <hr />
        <button
          style={{ width: "100%" }}
          onClick={async () => {
            await signOut(auth);
            location.reload();
          }}
        >
          SING-OUT
        </button>
      </div>
    );
  };

  return (
    <dialog ref={dialogRef}>
      <button className="abs-topright btn-secondary" onClick={closeDialog}>
        CLOSE
      </button>
      {user ? <UserSpace /> : <FormLogin />}
      <div className="dialog-div-alert" ref={alertMsgRef}>
        {alertMessage}
      </div>
    </dialog>
  );
}
