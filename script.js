
const firebaseConfig = {
  apiKey: "AIzaSyDKEYDVyX2KiCN1j8EjtM9ikf5UiucPBFs",
  authDomain: "health-818c4.firebaseapp.com",
  projectId: "health-818c4",
  storageBucket: "health-818c4.firebasestorage.app",
  messagingSenderId: "941912339189",
  appId: "1:941912339189:web:53a2541d0eb89b06e30bbc",
  measurementId: "G-0TZEEQHPED"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const pointsRef = db.collection("users").doc("points");

// Get the points display element
const pointsDisplay = document.getElementById("points");

// Function to fetch and update points
function updatePoints(change) {
    pointsRef.get().then((doc) => {
        let currentPoints = doc.exists ? doc.data().points : 0;
        let newPoints = currentPoints + change;
        
        // Update Firestore
        pointsRef.set({ points: newPoints })
            .then(() => {
                pointsDisplay.textContent = newPoints;
            })
            .catch((error) => console.error("Error updating points:", error));
    }).catch((error) => console.error("Error getting points:", error));
}

// Fetch initial points
pointsRef.get().then((doc) => {
    pointsDisplay.textContent = doc.exists ? doc.data().points : 0;
}).catch((error) => console.error("Error getting points:", error));

// Event Listeners
document.getElementById("unhealthy").addEventListener("click", () => updatePoints(-50));
document.getElementById("healthy").addEventListener("click", () => updatePoints(20));
