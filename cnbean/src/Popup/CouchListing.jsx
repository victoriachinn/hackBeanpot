import React from "react";
import styles from "../css/CouchListing.module.css";

const CouchListing = ({ imageUrl, details, description, datePickers, reserveButton }) => {
  return (
    <div className={styles.couchlisting}>
      <img src={imageUrl} alt="Couch" className={styles.image} />
      <div className={styles.content}>
        <h2 className={styles.title}>{details.title}</h2>
        <h3 className={styles.user}>{details.user}</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {details.stats.map((stat, index) => (
            <li className={styles.statItem} key={index}>
              <span className={styles.statName}>{stat.name}:</span>
              <span className={styles.statResult}> {stat.value}</span>
            </li>
          ))}
        </ul>

        <p className={styles.description}>{description}</p>

        <div className={styles.datePickerContainer}>
          {datePickers.map((picker, index) => (
            <div key={index}>
              <label className={styles.dateLabel}>{picker.label}</label>
              {picker.component}
            </div>
          ))}
        </div>

        <button className={styles.reserveButton} disabled={reserveButton.disabled}>
          {reserveButton.text}
        </button>
      </div>
    </div>
  );
};

export default CouchListing;