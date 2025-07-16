import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import "../assets/styles/Contact.scss";

function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);

  const form = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError(name.trim() === "");
    setEmailError(email.trim() === "");
    setMessageError(message.trim() === "");

    if (name && email && message) {
      // Simulate successful send
      console.log("Contact Form Submitted:", { name, email, message });
      alert("Message sent successfully!");

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project or an idea? Let’s work together and make it happen!</p>

          <Box
            ref={form}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-flex">
              <TextField
                required
                label="Your Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? "Name is required" : ""}
              />
              <TextField
                required
                label="Email or Phone"
                placeholder="Enter your contact info"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? "Email or phone is required" : ""}
              />
            </div>
            <TextField
              required
              label="Message"
              placeholder="Write your message here"
              multiline
              rows={6}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={messageError}
              helperText={messageError ? "Message is required" : ""}
            />
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
