import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Snackbar,
} from "@mui/material";
import "./App.css";
import Logo from "./assets/logo.svg";
import Wheel from "./assets/logo-wheel.svg";
import "./index.css";
import { useEffect, useState } from "react";
import { db } from "./Firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const waitlistRef = doc(db, "waitlist", "emails");

  useEffect(() => {
    const setupDatabase = async () => {
      const emailDocSnap = await getDoc(waitlistRef);
      if (!emailDocSnap.exists()) {
        await setDoc(waitlistRef, {
          email: [],
        });
      }
    };
    setupDatabase();
  }, [waitlistRef]);

  const handleSubmit = async () => {
    // TODO: Implement email submission logic
    try {
      const emailDocSnap = await getDoc(waitlistRef);
      if (emailDocSnap.exists()) {
        const emailData = emailDocSnap.data().email || [];
        await updateDoc(waitlistRef, {
          email: [...emailData, email],
        });
      }
      setSubmitted("Email submitted successfully!");
    } catch (error) {
      console.error("Error submitting email:", error);
    }
    console.log("Submitted email:", email);
    setEmail("");
    handleClose();
  };

  return (
    <>
      <Analytics />
      <header className="bg-gray-200 flex justify-between items-center p-2">
        <div>
          <a href="/">
            <img src={Logo} alt="Wheel of Life" />
          </a>
        </div>
      </header>
      <main className="p-4 bg-orange-300">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 h-full w-full bg-orange-300">
          <div className="md:order-2 md:w-1/2 w-full flex items-center justify-center">
            <img
              src={Wheel}
              alt="Wheel of Life"
              className="md:w-full w-1/2 animate-spin-slow"
            />
          </div>
          <div className="md:order-1 w-full md:w-1/2 flex flex-col items-center md:items-start justify-center">
            <h1 className="text-white text-5xl md:text-9xl text-center md:text-left">
              Wheel of Life
            </h1>
            <h6 className=" text-white text-xl mt-8 text-center md:text-left">
              Take control of your journey to a balanced life!
            </h6>
            <p className="mt-4 text-center md:text-left text-white">
              The Wheel of Life is a self-care app designed to empower you in
              all aspects of your life. By rating eight key areas—such as
              health, career, and relationships—on a scale of 1 to 10, you’ll
              gain insight into your strengths and areas for improvement. Our
              AI-driven chatbot provides tailored tasks to help you achieve a
              more fulfilling and balanced life. Join the waitlist today to be
              among the first to experience this transformative journey!
            </p>
            <div className="flex gap-4 mt-8 justify-center md:justify-start">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Join the Waitlist
              </Button>
              {/* <Button variant="outlined" color="primary" href="learn-more">
                Learn More
              </Button> */}
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="bg-gray-800 text-white py-4 px-8 text-center">
          <p>&copy; 2024 Wheel of Life. All rights reserved.</p>
        </div>
      </footer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join the Waitlist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {submitted && (
        <Snackbar
          open={Boolean(submitted)}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => setSubmitted(null)}
        >
          <Alert onClose={() => setSubmitted(null)} severity="success">
            {submitted || "An error occurred."}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;
