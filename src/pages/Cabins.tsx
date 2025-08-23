import { Suspense, useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import CabinForm from "../features/cabins/CabinForm";
import Button from "../ui/Button";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>filter /sort </p>
      </Row>
      <Row>
        <Suspense fallback={<Spinner />}>
          <CabinTable />
          <Button onClick={() => setShowForm((show) => !show)}>
            {showForm ? "Hide form" : "Add new cabin"}
          </Button>
        </Suspense>
      </Row>

      {showForm && (
        <Row>
          <CabinForm onCloseModal={() => setShowForm(false)} />
        </Row>
      )}
    </>
  );
}

export default Cabins;
