import "../styles/ListingCard.scss";
import { useNavigate } from "react-router-dom";

const ListingCard = ({
  listingId,
  creator,
  category,
  price,
  startDate,
  endDate,
  totalPrice,
  booking,
}) => {

  const navigate = useNavigate();



  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-container">
      </div>
       

      <p>{category}</p>

      {!booking ? (
        <>
          <p>
            <span>{price}руб</span>
          </p>
        </>
      ) : (
        <>
          <p>
            {startDate} - {endDate}
          </p>
          <p>
            <span>{totalPrice}руб</span> всего          </p>
        </>
      )}

    </div>
  );
};

export default ListingCard;
