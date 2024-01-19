import React, { useState } from "react";
import axios from "axios";

const DogForm = () => {
  const [breed, setBreed] = useState("");
  const [submittedBreed, setSubmittedBreed] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/dogs", {
        dog_form: { breed },
      });
      setSubmittedBreed(breed);
      setImage(response.data.image_url);
      setError("");
    } catch (error) {
      setError("Failed to submit the form");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="breed">Breed:</label>
              <input
                type="text"
                className="form-control"
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

          {error && <p className="text-danger mt-3">{error}</p>}
        </div>

        {image && (
          <div className="col-group-img">
            <div className="mt-3">
              <h2>{submittedBreed}</h2>
              <img src={image} alt={submittedBreed} className="img-fluid" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogForm;
