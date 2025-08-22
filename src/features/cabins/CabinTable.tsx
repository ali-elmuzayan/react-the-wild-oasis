import styled from "styled-components";
// import type { Cabin } from "../../types/cabin";
import CabinRow from "./CabinRow";
import { getCabins } from "../../services/getCabins";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

// interface CabinTableProps {
//   cabins?: Cabin[];
// }

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  width: 100%;
  margin-top: 1.6rem;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid var(--color-grey-100);
  letter-spacing: 0.4px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-grey-600);
`;

function CabinTable() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => getCabins(),
  });

  if (isLoading) return <Spinner />;

  if (!cabins || cabins.length === 0) {
    return (
      <Table>
        <TableHeader>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </TableHeader>
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

  return (
    <Table>
      <TableHeader>
        <div></div>
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
