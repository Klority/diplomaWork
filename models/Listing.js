const mongoose = require("mongoose")
const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    hotelName: {
      type: String,
      required: false,
    },
    hotelAddress: {
      type: String,
      required: false,
    },
    hotelRate: {
      type: Number,
      required: false,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    daysCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default:[]
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs
    
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true}
)

const Listing = mongoose.model("Listing", ListingSchema )
module.exports = Listing