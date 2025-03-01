

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKEYDVyX2KiCN1j8EjtM9ikf5UiucPBFs",
    authDomain: "health-818c4.firebaseapp.com",
    projectId: "health-818c4",
    storageBucket: "health-818c4.appspot.com",
    messagingSenderId: "941912339189",
    appId: "1:941912339189:web:53a2541d0eb89b06e30bbc",
    measurementId: "G-0TZEEQHPED"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const pointsRef = db.collection("users").doc("points");

const pointsDisplay = document.getElementById("points");

// Function to update points
function updatePoints(change) {
    pointsRef.get().then((doc) => {
        if (doc.exists) {
            let currentPoints = doc.data().points || 0;
            let newPoints = currentPoints + change;

            pointsRef.update({ points: newPoints })
                .then(() => {
                    pointsDisplay.textContent = newPoints;
                    animatePoints();
                })
                .catch((error) => console.error("Error updating points:", error));
        } else {
            pointsRef.set({ points: 0 })
                .then(() => updatePoints(change))
                .catch((error) => console.error("Error creating document:", error));
        }
    }).catch((error) => console.error("Error getting points:", error));
}

// Real-time updates from Firestore
pointsRef.onSnapshot((doc) => {
    if (doc.exists) {
        pointsDisplay.textContent = doc.data().points;
    } else {
        pointsDisplay.textContent = "0";
    }
});

// Button Event Listeners
document.getElementById("unhealthy").addEventListener("click", () => updatePoints(-50));
document.getElementById("healthy").addEventListener("click", () => updatePoints(20));

// Points Animation
function animatePoints() {
    pointsDisplay.style.transform = "scale(1.2)";
    setTimeout(() => pointsDisplay.style.transform = "scale(1)", 200);
}