import "../styles/TravelItem.css";

const TravelItem = ({ trip, onDelete, onUpdate }) => {
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this trip?");
    if (confirmDelete) {
      onDelete(trip._id);
    }
  };

  return (
    <div className="travel-card">
      {trip.image && <img src={trip.image} alt={trip.title} />}
      <div className="card-body">
        <h3>{trip.title}</h3>
        <p>{trip.description}</p>
        {trip.location?.coordinates && (
          <p>
            Location: Lat {trip.location.coordinates[1]}, Lng {trip.location.coordinates[0]}
          </p>
        )}
        <div className="card-actions">
          <button onClick={() => onUpdate(trip)}>Update</button>
          <button onClick={handleDelete} className="danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TravelItem;
