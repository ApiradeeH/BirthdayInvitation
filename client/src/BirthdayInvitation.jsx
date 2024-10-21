import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Countdown from "./Countdown";
import leni from "./assets/leni.jpg";

const BirthdayInvitation = () => {
  const [guests, setGuests] = useState([]);
  const [newGuestName, setNewGuestName] = useState("");
  const [travelOption, setTravelOption] = useState("");
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch all guests from the backend
  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const response = await axios.get(
        "https://birthdayinvitation.onrender.com/api/allGuests"
      );
      console.log("Fetched guests:", response.data);
      setGuests(response.data);
    } catch (error) {
      console.error("Error fetching guests", error);
      alert(
        "Fehler beim Laden der Gästeliste. Bitte versuchen Sie es später erneut."
      );
    }
  };

  // Add a guest via backend
  const addGuest = async () => {
    if (newGuestName && travelOption) {
      try {
        await axios.post(
          "https://birthdayinvitation.onrender.com/api/addGuest",
          {
            name: newGuestName,
            travelOption,
          }
        );

        fetchGuests();
        setNewGuestName(""); // Clear input field
        setTravelOption(""); // Clear travel option
        alert("Vielen Dank für deine Antwort!");
      } catch (error) {
        console.error("Error adding guest", error);
        alert(
          "Fehler beim Hinzufügen des Gastes. Bitte versuchen Sie es später erneut."
        );
      }
    } else {
      alert("Bitte gib einen Namen und eine Reiseoption ein.");
    }
  };

  // Remove a guest via backend
  const removeGuest = async (id) => {
    try {
      await axios.delete(
        `https://birthdayinvitation.onrender.com/api/deleteGuestById/${id}`
      );
      setGuests((prevGuests) => prevGuests.filter((guest) => guest._id !== id));
    } catch (error) {
      console.error("Error removing guest", error);
      alert(
        "Fehler beim Entfernen des Gastes. Bitte versuchen Sie es später erneut."
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // Scroll down button visibility
      if (scrollY >= maxScroll - 50) {
        setShowScrollDown(false);
        setShowScrollTop(true); // Show scroll-up when at the bottom
      } else if (scrollY > 100) {
        setShowScrollDown(false);
        setShowScrollTop(true);
      } else {
        setShowScrollDown(true);
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="birthday-invitation">
        <div className="invitation-header">
          <h1 className="invitation-title">Einladung zu Lenis Geburtstag!</h1>
          <img
            src={leni}
            alt="Birthday Celebration"
            style={{ width: "100%", maxWidth: "700px", margin: "20px 0" }}
          />
          <Countdown />
        </div>

        <div className="event-details">
          <p>Wann: 10.11.2024 (14-16 Uhr)</p>
          <p>
            Wo:
            <a
              href="https://boulderhalle-leipzig.de"
              target="_blank"
              rel="noopener noreferrer"
              className="event-link"
            >
              No Limit Boulderhalle Leipzig
            </a>
          </p>

          <p style={{ fontFamily: "Gaegu, sans-serif" }}>
            Wir möchten Leni's 6ten Geburtstag in der Boulderhalle in Leipzig
            feiern! Dort werden die Kinder mit Hilfe eines Trainers spielerisch
            das Bouldern erlernen. Für's leibliche Wohl ist gesorgt: Pizza,
            Desserts und Getränke werden bereitgestellt. Bitte bringt bequeme
            Sportkleidung und Turnschuhe mit. Wir treffen uns um 13:00 Uhr auf
            den Schlossterrassen 5b in Pouch oder direkt vor Ort um 14:00 Uhr.
            Nach der Feier können eure Eltern euch entweder in Pouch oder an der
            Boulderhalle direkt abholen. (Bitte bringt einen Kindersitz mit,
            falls ihr mit uns fahrt.) Wir freuen uns auf euch!
          </p>
          <a
            href="https://boulderhalle-leipzig.de/index.php/infos/bouldern"
            target="_blank"
            rel="noopener noreferrer"
            className="event-link"
          >
            Was ist Bouldern überhaupt?
          </a>
        </div>

        <form
          className="rsvp-form"
          onSubmit={(e) => {
            e.preventDefault();
            addGuest();
          }}
        >
          <div className="form-group">
            <p
              className="event-details"
              style={{ fontFamily: "Gaegu, sans-serif" }}
            >
              Wir freuen uns, wenn du Zeit hast und uns Bescheid gibst ob du zu
              unsere Feier kommen kannst.
            </p>
            <input
              type="text"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              className="form-control mt-2"
              placeholder="Dein Name bitte!"
              required
            />

            <div className="form-group mt-2">
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  value="Mit uns fahren"
                  checked={travelOption === "Mit uns fahren"}
                  onChange={(e) => setTravelOption(e.target.value)}
                />
                Mit uns fahren
              </label>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  value="Direkt vor Ort"
                  checked={travelOption === "Direkt vor Ort"}
                  onChange={(e) => setTravelOption(e.target.value)}
                />
                Direkt vor Ort
              </label>
            </div>

            <button type="submit" className="rsvp-button">
              <FontAwesomeIcon icon={faThumbsUp} /> Sei dabei!
            </button>
          </div>
        </form>

        <ul className="list-group">
          <h4 className="guest-list-header">Gästeliste:</h4>
          {guests.map((guest) => (
            <li key={guest._id} className="list-group-item">
              {guest.name}-{guest.travelOption}
              <button
                onClick={() => removeGuest(guest._id)}
                className="btn btn-danger "
                style={{
                  fontFamily: "Gaegu, sans-serif",
                  fontSize: "0.8em",
                  padding: "4px 8px",
                  borderRadius: "50%",
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>

        <div className="whatsapp-links">
          <p>Kontaktiere uns über WhatsApp:</p>
          <a
            href="https://wa.me/4917647115462"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <FontAwesomeIcon icon={faWhatsapp} /> Kae
          </a>
          <a
            href="https://wa.me/4917643824474"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <FontAwesomeIcon icon={faWhatsapp} /> Mathias
          </a>
        </div>

        {/* Scroll-Down Button */}
        {showScrollDown && (
          <button className="scroll-down" onClick={scrollToBottom}>
            <FontAwesomeIcon icon={faChevronUp} rotation={180} />
          </button>
        )}

        {/* Back-to-Top Button */}
        {showScrollTop && (
          <button className="back-to-top" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BirthdayInvitation;
