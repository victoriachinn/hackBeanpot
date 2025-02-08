import React, { useState } from "react";
import CouchListing from "./components/CouchListing.jsx";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import styles from "./components/CouchListing.module.css"; 

const App = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const availableStartDate = new Date("2025-02-10T15:00:00");
  const availableEndDate = new Date("2025-02-14T10:00:00");

  const handleCloseClick = () => {
    setIsDisabled(true);
  };

  const details = {
    title: "best couch in town",
    user: "Meredith Scott",
    stats: [
      { name: "Location", value: "650 Columbus Ave, Boston, MA 02118" },
      { name: "Availability", value: "2/10/25 - 2/14/25" },
      { name: "Couchability", value: "High" },
      { name: "Roommates", value: "2" },
      { name: "Pets", value: "No" },
    ],
  };

  const description = "This quality couch, courtesy of Northeastern Housing, comes with two decorative pillows, a mysterious stain, and a throw blanket themed with your favorite husky. The delightful ambiance from Columbus Ave guarantees a disrupted night’s sleep. Beans included.";

  const datePickers = [
    {
      label: "From:",
      component: (
        <DatePicker
          selected={selectedStartDate}
          onChange={(date) => setSelectedStartDate(date)}
          className={styles.datePicker}
          placeholderText="mm/dd/yyyy"
          minDate={availableStartDate}
          maxDate={selectedEndDate || availableEndDate}
          disabled={isDisabled}
        />
      ),
    },
    {
      label: "To:",
      component: (
        <DatePicker
          selected={selectedEndDate}
          onChange={(date) => setSelectedEndDate(date)}
          className={styles.datePicker}
          placeholderText="mm/dd/yyyy"
          minDate={selectedStartDate || availableStartDate}
          maxDate={availableEndDate}
          disabled={isDisabled}
        />
      ),
    },
  ];

  const reserveButton = {
    text: "Reserve",
    disabled: isDisabled,
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.imageWrapper}>
        <img
          src="src/assets/CouchListing/Meredith/bean_meredith.png"
          alt="Small Couch"
          className={styles.overlayImage}
        />
        <div className={`${styles.couchListingWrapper} ${isDisabled ? styles.disabled : ""}`}>
          <button
            className={styles.closeButton}
            onClick={handleCloseClick}
            aria-label="Close"
          >
            <img src="src/assets/CouchListing/Icons/close_icon_white.png" alt="Close Icon" className={styles.closeIcon} />
          </button>
          <CouchListing
            imageUrl="src/assets/CouchListing/Meredith/couch_meredith.png"
            details={details}
            description={description}
            datePickers={datePickers}
            reserveButton={reserveButton}
          />
        </div>
      </div>
    </div>
  );
};

export default App;