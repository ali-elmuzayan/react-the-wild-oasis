// Individual cabin row component for displaying cabin information in a table
import styled from "styled-components";
// import { useState } from "react";
import type { Cabin } from "../../types/cabin";

// import CreateCabinForm from "./CreateCabinForm";
// import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
// import { useCreateCabin } from "./useCreateCabin";

// Table row container with grid layout matching the header
const TableRow = styled.div`
  display: grid;
  // Grid columns: image, cabin name, capacity, price, discount, actions
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  // Add border between rows (except the last one)
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

// Cabin image with specific styling
const Img = styled.img`
  display: block;
  width: 6.4rem; // Fixed width
  aspect-ratio: 3 / 2; // Maintain aspect ratio
  object-fit: cover; // Cover the container while maintaining aspect ratio
  object-position: center; // Center the image
  transform: scale(1.5) translateX(-7px); // Scale and position the image
`;

// Cabin name styling
const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600; // Bold text
  color: var(--color-grey-600); // Muted text color
  font-family: "Sono"; // Monospace font for better alignment
`;

// Price styling
const Price = styled.div`
  font-family: "Sono"; // Monospace font for better alignment
  font-weight: 600; // Bold text
`;

// Discount styling with green color
const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700); 
`;

// Props interface for the component
interface CabinRowProps {
  cabin: Cabin; 
}

function CabinRow({ cabin }: CabinRowProps) {
  const queryClient = useQueryClient(); 

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    // description, // Commented out for future use
  } = cabin;

  // handle delete mutation
  const {isLoading: isDeleting, mutate} = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["cabins"]})
    },
    onError: (err: Error) => alert(err.message)
  })


  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        {/* Action buttons */}
        <div>
          <button>
            <HiSquare2Stack /> {/* Duplicate icon */}
          </button>
          <button>
            <HiPencil /> {/* Edit icon */}
          </button>
          <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
            <HiTrash /> {/* Delete icon */}
          </button>
        </div>
      </TableRow>

      {/* Commented out form for future edit functionality */}
      {/* {showForm && <CreateCabinForm cabinToEdit={cabin} />} */}
    </>
  );
}

export default CabinRow;
