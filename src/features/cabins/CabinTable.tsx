// Cabin table component that displays a list of cabins with data fetching
import styled from "styled-components";
// import type { Cabin } from "../../types/cabin";
import CabinRow from "./CabinRow";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

// interface CabinTableProps {
//   cabins?: Cabin[];
// }

// Main table container with styling
const Table = styled.div`
  border: 1px solid var(--color-grey-200); // Subtle border
  font-size: 1.4rem; // Consistent font size
  background-color: var(--color-grey-0); // White background
  border-radius: var(--border-radius-md); // Rounded corners
  overflow: hidden; // Hide overflow content
  width: 100%; // Full width
  margin-top: 1.6rem; // Top margin for spacing
`;

// Table header with grid layout for column alignment
const TableHeader = styled.header`
  display: grid;
  // Grid columns: image, cabin name, capacity, price, discount, actions
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem; // Space between columns
  align-items: center; // Center items vertically

  background-color: var(--color-grey-50); // Light grey background
  padding: 1.6rem 2.4rem; // Padding for header content
  border-bottom: 1px solid var(--color-grey-100); // Bottom border
  letter-spacing: 0.4px; // Letter spacing for better readability
  font-weight: 400; // Medium font weight
  text-transform: uppercase; // Uppercase text
  color: var(--color-grey-600); // Muted text color
`;

function CabinTable() {
  // Fetch cabins data using React Query
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"], // Unique key for caching
    queryFn: () => getCabins(), // Function to fetch data
  });

  // Show loading spinner while data is being fetched
  if (isLoading) return <Spinner />;

  // Show empty state when no cabins are found
  if (!cabins || cabins.length === 0) {
    return (
      <Table>
        <TableHeader>
          <div></div> {/* Empty div for image column */}
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </TableHeader>
        {/* Empty state message */}
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "var(--color-grey-500)",
          }}
        >
          No cabins found
        </div>
      </Table>
    );
  }

  // Render table with cabin data
  return (
    <Table>
      <TableHeader>
        <div></div> {/* Empty div for image column */}
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      </TableHeader>

    
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
