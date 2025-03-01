window.onload = function() {
    console.log("JavaScript file is running!");

    // ✅ Define Firebase Configuration BEFORE using it
    const firebaseConfig = {
        apiKey: "AIzaSyDKEYDVyX2KiCN1j8EjtM9ikf5UiucPBFs",
        authDomain: "health-818c4.firebaseapp.com",
        projectId: "health-818c4",
        storageBucket: "health-818c4.appspot.com",  // ✅ FIXED QUOTE
        messagingSenderId: "941912339189",
        appId: "1:941912339189:web:53a2541d0eb89b06e30bbc",
        measurementId: "G-0TZEEQHPED"
    };

    // ✅ Initialize Firebase AFTER defining firebaseConfig
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully!");

    const db = firebase.firestore();
    const pointsRef = db.collection("users").doc("points");

    // Get the points display element
    const pointsDisplay = document.getElementById("points");

    // Function to fetch and update points
    function updatePoints(change) {
        pointsRef.get().then((doc) => {
            if (doc.exists) {
                let currentPoints = doc.data().points || 0;
                let newPoints = currentPoints + change;

                // Update Firestore
                pointsRef.update({ points: newPoints })
                    .then(() => {
                        console.log("Updated points:", newPoints);
                        pointsDisplay.textContent = newPoints;
                    })
                    .catch((error) => console.error("Error updating points:", error));
            } else {
                console.log("Document does not exist, creating it...");
                pointsRef.set({ points: 0 })
                    .then(() => updatePoints(change))
                    .catch((error) => console.error("Error creating document:", error));
            }
        }).catch((error) => console.error("Error getting points:", error));
    }

    // Fetch initial points and listen for real-time updates
    pointsRef.onSnapshot((doc) => {
        if (doc.exists) {
            console.log("Real-time update:", doc.data().points);
            pointsDisplay.textContent = doc.data().points;
        } else {
            console.log("No points data found.");
            pointsDisplay.textContent = "0";
        }
    });

    // Event Listeners
    document.getElementById("unhealthy").addEventListener("click", () => updatePoints(-50));
    document.getElementById("healthy").addEventListener("click", () => updatePoints(20));
console.log("script loaded");
}
