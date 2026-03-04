import { useState } from "react";
import { getAverageYear } from "../services/api";

function AverageYear() {
  const [average, setAverage] = useState(null);

  const handleGetAverage = async () => {
    try {
      const data = await getAverageYear();
      setAverage(data.average_year);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.card}>
      <h2>Average Publication Year</h2>

      <button
        style={styles.button}
        onClick={handleGetAverage}
      >
        Get Average Year
      </button>

      {average !== null && (
        <p style={styles.number}>{average}</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    backgroundColor: "#ffffff",  // changed from black (minimal theme)
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)"
  },
  button: {
    padding: "8px 16px",
    cursor: "pointer",
    marginTop: "10px",
    border: "none",
    backgroundColor: "#333",
    color: "white",
    borderRadius: "6px"
  },
  number: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "15px",
    color: "#222"
  }
};

export default AverageYear;