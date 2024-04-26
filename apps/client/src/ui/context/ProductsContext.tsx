import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "types/product.type";
import { apiUrl } from "../../constants";

// Define the context type
interface ProductsContextType {
  products: Product[] | null;
  isLoading: boolean;
  error: string | null;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiUrl + "/products");
      const { data } = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (err) {
      setError(String(err));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProductsContext() {
  const productsContext = useContext(ProductsContext);
  if (!productsContext) {
    throw new Error("ProductsContextProvider must be used within the context");
  }
  return productsContext;
}
