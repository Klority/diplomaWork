import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories,facilities } from "../data";

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [category, setCategory] = useState("");
  
  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    hotelAddress: "",
    hotelRate: "",
    hotelName: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState(1);
  const [daysCount, setDaysCount] = useState(1);
  const [hotelRate, setHotelRate] = useState(1);
;

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((option) => option !== facility)
      );
    } else {
      setAmenities((prev) => [...prev, facility]);
    }
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (isNaN(value) || Number(value) < 0) {
        setFormDescription({
          ...formDescription,
          [name]: 0,
        });
      } else {
        setFormDescription({
          ...formDescription,
          [name]: value,
        });
      }
    } else {
      setFormDescription({
        ...formDescription,
        [name]: value,
      });
    }
  };
  

  const creatorId = useSelector((state) => state.user._id);

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);

      listingForm.append("hotelName", formLocation.hotelName);
      listingForm.append("hotelAddress", formLocation.hotelAddress);
      listingForm.append("hotelRate", formLocation.hotelRate);
      
      listingForm.append("guestCount", guestCount);
      listingForm.append("daysCount", daysCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("price", formDescription.price);

      
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

    
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };
  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Поделитесь своим маршрутом</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Маршрут</h2>
            <hr />
            <h3>Категория</h3>
            <div className="category-list">
              {categories?.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          
            <div className="basics">
              <div className="basic">
                <p>Количество путешественников</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      guestCount > 1 && setGuestCount(guestCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{guestCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setGuestCount(guestCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>

              <div className="basic">
                <p>Сколько дней путешествовали?</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      daysCount > 1 && setDaysCount(daysCount - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{daysCount}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setDaysCount(daysCount + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              </div>



          <h3>Расскажите об отеле, в котором останавливались</h3>
            <div className="full">
              <div className="location">
                <p>Название отеля</p>
                <input
                  type="text"
                  placeholder="Название отеля"
                  name="hotelName"
                  value={formLocation.hotelName}
                  onChange={handleChangeLocation}
                />
              </div>


              
            </div>

            <div className="full">
              <div className="location">
                <p>Адрес отеля, если запомнили</p>
                <input
                  type="text"
                  placeholder="Адрес отеля"
                  name="hotelAddress"
                  value={formLocation.hotelAddress}
                  onChange={handleChangeLocation}
                                  />
              </div>
          
              <div className="basics">
              <div className="basic">
                <p>Оценка отеля</p>
                <div className="basic_count">
                  <RemoveCircleOutline
                    onClick={() => {
                      hotelRate > 1 && setHotelRate(hotelRate - 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                  <p>{hotelRate}</p>
                  <AddCircleOutline
                    onClick={() => {
                      setHotelRate(hotelRate + 1);
                    }}
                    sx={{
                      fontSize: "25px",
                      cursor: "pointer",
                      "&:hover": { color: variables.pinkred },
                    }}
                  />
                </div>
              </div>
              </div>

              
</div>
</div>

         
          <div className="create-listing_step2">
            <h2>Подробнее о маршруте</h2>
            <hr />

            <h3>Характеристики маршрута</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <h3>Добавьте пару фотографий из путешествия</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Загрузить</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Загрузить</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>Расскажите о своем маршруте подробнее</h3>
            <div className="description">
              <p>Описание</p>
              <input
                type="text"
                placeholder="Этот маршрут крутой, потому что..."
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />
              <p>Места, которые вы посетили</p>
              <textarea
                type="text"
                placeholder="Кафе, отель, музей..."
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
           
              <p>Сколько стоило ваше путешествие</p>
              <input
                type="number"
                placeholder="50"
                name="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                className="price"
                required
              />
               <span>руб</span>
            </div>
          </div>

          <button className="submit_btn" type="submit">
            Загрузить мой маршрут
          </button>
        </form>
      </div>

      
    </>
  );
};

export default CreateListing;
