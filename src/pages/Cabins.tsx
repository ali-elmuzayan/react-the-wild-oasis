import { Suspense } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter /sort </p>
      </Row>
      <Row type="horizontal">
        <Suspense fallback={<Spinner />}>
          <CabinTable />
        </Suspense>
      </Row>
    </>
  );
}

export default Cabins;
