import { Listing, User } from "@prisma/client";
import ListingsCard from "@/app/components/listings/ListingsCard";
import Heading from "@/app/Heading";
import Container from "@/app/components/Container";
import React from "react";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

const FavouritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingsCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;