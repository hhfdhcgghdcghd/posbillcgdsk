import { useState, useRef, useEffect } from 'react';
import { Search, ScanBarcode } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

export function BarcodeScanner() {
  const [barcode, setBarcode] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { products } = useProducts();
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const findProductByBarcode = (code: string) => {
    return products.find((p) => p.barcode === code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcode.trim()) return;

    const product = findProductByBarcode(barcode.trim());
    if (product) {
      if (product.stock <= 0) {
        toast.error(`${product.name} is out of stock`);
      } else {
        addToCart(product);
        toast.success(`Added ${product.name} to cart`);
      }
    } else {
      toast.error('Product not found');
    }
    setBarcode('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <ScanBarcode className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Scan barcode or enter manually..."
          className="pos-input w-full pl-12 pr-12 text-lg"
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-accent transition-colors"
        >
          <Search className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </form>
  );
}
