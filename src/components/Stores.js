import storeIMG from "../images/store.jpg";

export default function Stores(props) {
  return (
    <div className="col-6">
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-lg-4">
            <img src={storeIMG} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-lg-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
