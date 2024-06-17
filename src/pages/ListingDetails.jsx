import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  },[]);

  console.log(listing)


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const minDate = new Date(); 
  const dayCount =  (dateRange[0].endDate - dateRange[0].startDate) / (1000 * 3600 * 24) + 1;

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      }

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm)
      })

      if (response.ok) {
        navigate(`/${customerId}/trips`)
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:3001/uploads/${item}`}
              alt="listing pic"
            />
          ))}
        </div>

        <p>
          {listing.guestCount} гостей {" "}
        </p>
        <hr />

        <div className="profile">
          <h3>
            Размещено {listing.creator.email}
          </h3>
        </div>
        <hr />

        <h3>Описание</h3>
        <p>{listing.description}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>Что вы можете увидеть?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

       <div>
      <h2>Сколько дней планируете путешествовать?</h2>
      <div className="date-range-calendar">
        <DateRange
          ranges={dateRange}
          onChange={handleSelect}
          minDate={minDate} // ограничение выбора дат до сегодняшнего дня
        />
        {dayCount > 1 ? (
          <h2>
            {listing.price} руб x {dayCount} суток
          </h2>
        ) : (
          <h2>
            {listing.price} руб x {dayCount} сутки
          </h2>
        )}
        <h2>Сумма: {listing.price * dayCount} руб</h2>
        <p>Начальная дата: {dateRange[0].startDate.toDateString()}</p>
        <p>Дата отъезда: {dateRange[0].endDate.toDateString()}</p>
        <button className="button" type="submit" onClick={handleSubmit}>
          Путешествовать
        </button>
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
