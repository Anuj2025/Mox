import { useParams } from 'react-router-dom';

const Products = () => {
  const { id } = useParams();
  return <div>Product ID: {id}</div>;
};

export default Products;