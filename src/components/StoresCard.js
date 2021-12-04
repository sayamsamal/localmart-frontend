import storeIMG from "../images/store.jpg";

export default function StoresCard({ details }) {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-lg-4">
          <img src={storeIMG} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-lg-8">
          <div className="card-body">
            <h5 className="card-title">{details.store_name}</h5>
            <p className="card-text">
              {details.store_adress}
              {", "}
              {details.store_city}
              {", "}
              {details.store_state}
              {", "}
              {JSON.parse(details.store_postal_code)}
            </p>
            <p className="card-text"></p>
            <p className="card-text">Ph no: {details.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
