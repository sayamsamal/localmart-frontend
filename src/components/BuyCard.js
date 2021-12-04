export default function BuyCard({ details, handleAddProduct }) {
  return (
    <div className="mt-3">
      <form
        class="row g-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct(details);
        }}
      >
        <div className="col-8">{details.product_name}</div>
        <div className="col-2">{details.product_price / 100}</div>
        <div className="col-2">
          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
