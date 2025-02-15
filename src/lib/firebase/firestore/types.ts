interface Listing {
    updated: Date,
    title: string,
    price: number,
    condition: string,
    category: string,
    description: string,
    owner: string, // owner (seller) user_id
    selected_buyer: string, // buyer user_id
	potential_buyers: string[], // user_ids of potential buyers
	reporters: string[], // user_ids of reporters
	ratings: { string: number }, // strings are user_ids mapped to number ratings
	image_paths: string[], // list of paths to imgs
    id: string, // firebase listing_id
  }

interface User {
    first: string,
    last: string,
    email_address: string,
    active_listings: string[], // listing_ids owned by seller
    interested_listings: string[], // listing_ids owned by buyer
    completed_sales: number, // number of completed sales
    completed_purchases: number, // number of completed purchases
    cum_buyer_rating: number, // cumulative buyer rating count
    cum_seller_rating: number, // cumulative seller rating count
    pfp: string, // path to profile picture img
    id: string, // firebase user_id
}
