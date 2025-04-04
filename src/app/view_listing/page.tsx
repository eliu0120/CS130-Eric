"use client";

import Slideshow from "@/components/ItemPictureDeck";
import PriceTag from "@/components/PriceTag";
import ReportButton from "@/components/ReportButton";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/lib/authContext";

interface ListingObject {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  image_paths: string[];
  owner: string;
  owner_name: string;
  owner_pfp: string;
  potential_buyers: string[];
  selected_buyer: string;
  seller_rating: number;
  updated: Timestamp;
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

function getDateFromTimestamp(secs: number, nanos: number): string {
  const ms = secs * 1000 + nanos / 1e6;
  const date = new Date(ms);
  const formatTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const formatDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return `${formatDate} at ${formatTime}`;
}

const ListingContent: React.FC = () => {
  const { user, token } = useAuth();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // use this id to call backend function to get full item details
  const router = useRouter();
  const [listing, setListing] = useState<ListingObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user === undefined) return; // Wait until user is determined
    if (user === null) {
      router.push("/login");
      return;
    }
  }, [user, router]);

  useEffect(() => {
    async function fetchListingById(listingId: string | null) {
      if (!token) {
        console.log("Unauthorized user");
        setLoading(false);
        setListing(null);
        return;
      }
      const response = await fetch(`/api/listing/${listingId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data, error } = await response.json();
      if (error) {
        console.log(error);
        setLoading(false);
        setListing(null);
      } else {
        setListing(data);
        setLoading(false);
      }
    }
    fetchListingById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user found</p>;
  }

  if (!listing) {
    return <p>No listing found</p>;
  }
  const timestampSec = listing.updated.seconds;
  const timestampNano = listing.updated.nanoseconds;
  const dateString = getDateFromTimestamp(timestampSec, timestampNano);
  const displayImages =
    listing.image_paths.length === 0 ? ["noimage.png"] : listing.image_paths;
  return (
    <div>
      <div style={{ float: "right", padding: "10px 0px" }}>
        <img
          src="logo1.png"
          alt="logo"
          className="logoGeneral"
          onClick={() => router.push("/")}
        />
      </div>

      <div className="viewListingsContainer" style={{ clear: "right" }}>
        <div className="viewListingsTitle">
          <PriceTag price={listing.price}></PriceTag>
          {listing.title}
          {listing.owner != user.uid && <ReportButton idObj={id} />}
        </div>

        <Slideshow
          images={displayImages}
          timestamp={dateString}
          listingObj={listing}
        ></Slideshow>
      </div>
    </div>
  );
};

const Listing: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ListingContent />
    </Suspense>
  );
};

export default Listing;
