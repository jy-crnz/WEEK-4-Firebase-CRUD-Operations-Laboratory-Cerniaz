import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } 
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBPRaiLBp0f69aP_hIqVR5To3xVFplSgmk",
    authDomain: "mycrudapp-5f0f1.firebaseapp.com",
    projectId: "mycrudapp-5f0f1",
    storageBucket: "mycrudapp-5f0f1.firebasestorage.app",
    messagingSenderId: "694209167273",
    appId: "1:694209167273:web:669770672bb1921a5a4eb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.addUser = async function () {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    if (name === "" || email === "") {
        alert("Please enter both name and email.");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "users"), { name, email });
        alert("User added successfully! ID: " + docRef.id);
        getUsers(); 
    } catch (error) {
        console.error("Error adding user:", error);
        alert("Error adding user.");
    }
};

async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userList = document.getElementById("userList");
    userList.innerHTML = ""; 

    querySnapshot.forEach((doc) => {
        let user = doc.data();
        let listItem = document.createElement("li");
        listItem.textContent = `ID: ${doc.id} | Name: ${user.name}, Email: ${user.email}`;
        userList.appendChild(listItem);
    });
}

window.updateUser = async function () {
    const userId = document.getElementById("userId").value;
    const newName = document.getElementById("newName").value;

    if (userId === "" || newName === "") {
        alert("Please enter both User ID and New Name.");
        return;
    }

    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { name: newName });
        alert("User updated successfully!");
        getUsers(); 
    } catch (error) {
        console.error("Error updating user:", error);
        alert("Error updating user.");
    }
};

window.deleteUser = async function () {
    const userId = document.getElementById("deleteUserId").value;

    if (userId === "") {
        alert("Please enter a User ID.");
        return;
    }

    try {
        await deleteDoc(doc(db, "users", userId));
        alert("User deleted successfully!");
        getUsers(); 
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user.");
    }
};

getUsers();
