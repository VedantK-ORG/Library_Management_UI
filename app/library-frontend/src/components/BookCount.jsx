import { useState } from "react";
import { getBookCount } from "../services/api";

function BookCount() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetCount = async () => {
    setLoading(true);

    try {
      const data = await getBookCount();
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching count:", error);
      alert("Failed to fetch book count");
    }

    setLoading(false);
  };

  return (
    <div style={styles.card}>
      <h2>Total Books</h2>

      <button onClick={handleGetCount} style={styles.button}>
        Get Book Count
      </button>

      {loading && <p>Loading...</p>}

      {count !== null && (
        <p style={styles.number}>{count}</p>
      )}
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    margin: "20px 0",
    borderRadius: "10px",
    backgroundColor: "#000000",
    textAlign: "center",
    color: "white",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    marginTop: "10px"
  },
  number: {
    fontSize: "40px",
    fontWeight: "bold",
    marginTop: "15px",
    color: "red"
  }
};

export default BookCount;