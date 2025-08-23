// Individual cabin row component for displaying cabin information in a table
import styled from "styled-components";
// import { useState } from "react";
import type { Cabin } from "../../types/cabin";

// import CreateCabinForm from "./CreateCabinForm";
// import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
// import { useCreateCabin } from "./useCreateCabin";

// Table row container with grid layout matching the header
const TableRow = styled.div`
  display: grid;
  // Grid columns: image, cabin name, capacity, price, discount, actions
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem; // Space between columns
  align-items: center; // Center items vertically
  padding: 1.4rem 2.4rem; // Padding for row content

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
  font-family: "Sono"; // Monospace font for better alignment
  font-weight: 500; // Medium weight
  color: var(--color-green-700); // Green color for discounts
`;

// Props interface for the component
interface CabinRowProps {
  cabin: Cabin; // Cabin data to display
}

function CabinRow({ cabin }: CabinRowProps) {
  // Commented out state and hooks for future functionality
  //   const [showForm, setShowForm] = useState(false);
  //   const { isDeleting, deleteCabin } = useDeleteCabin();
  //   const { isCreating, createCabin } = useCreateCabin();

  // Destructure cabin properties for display
  const {
    // id: cabinId, // Commented out for future use
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    // description, // Commented out for future use
  } = cabin;

  // Commented out duplicate function for future implementation
  //   function handleDuplicate() {
  //     createCabin({
  //       name: `Copy of ${name}`,
  //       maxCapacity,
  //       regularPrice,
  //       discount,
  //       image,
  //       description,
  //     });
  //   }

  return (
    <>
      <TableRow role="row">
        {/* Cabin image */}
        <Img src={image} />

        {/* Cabin name */}
        <Cabin>{name}</Cabin>

        {/* Capacity information */}
        <div>Fits up to {maxCapacity} guests</div>

        {/* Regular price */}
        <Price>{formatCurrency(regularPrice)}</Price>

        {/* Discount price or dash if no discount */}
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
          <button>
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
