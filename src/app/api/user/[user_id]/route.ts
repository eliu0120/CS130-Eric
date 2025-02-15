import { NextResponse } from "next/server";

/*
 * Get a User by id
 *
 * Params:
 *  user_id: id of the User to get
 * Request body:
 *  None
 * Return:
 *  data: the User object corresponding to the requested id
 *  error: error or null
*/
export async function GET(
    req: Request,
    { params }: { params: Promise<{ user_id: string }> }
  ) {
    // get URL parameter user_id
    const user_id = (await params).user_id;

    // TODO: get User from db

    return NextResponse.json({ data: {}, error: null });
  }

/*
 * Update a User by id
 *
 * Params:
 *  user_id: id of the User to get
 * Request body:
 *  first: first name
 *  last: last name
 *  pfp: path to pfp image
 * Return:
 *  data: the updated User object corresponding to the requested id
 *  error: error or null
*/
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  // get URL parameter user_id
  const user_id = (await params).user_id;

  // get updated user data from req body
  const data = await req.json();

  // TODO: update user in db

  return NextResponse.json({ data: {}, error: null });
}

/*
 * Delete a User by id
 *
 * Params:
 *  user_id: id of the User to get
 * Request body:
 *  None
 * Return:
 *  data: id of the deleted User
 *  error: error or null
*/
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  // get URL parameter user_id
  const user_id = (await params).user_id;

  // TODO: delete user in db

  return NextResponse.json({ data: { user_id: user_id }, error: null });
}
