import { NextResponse } from "next/server";

/*
 * Rate Listing's Users (owner or buyer) by id
 *
 * Params:
 *  listing_id: id of the Listing to get
 *  user_id: id of the User being rated
 * Request body:
 *  rating: rating for the specified User in range [1-5]
 * Return:
 *  data: id of the updated Listing
 *  error: error or null
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ listing_id: string, user_id: string }> }
) {
  // get URL parameter listing_id
  const listing_id = (await params).listing_id;
  const user_id = (await params).user_id;

  // get rating data from req body
  const data = await req.json();

  // TODO: update User/Listing in db

  return NextResponse.json({ data: { listing_id: listing_id }, error: null });
}
