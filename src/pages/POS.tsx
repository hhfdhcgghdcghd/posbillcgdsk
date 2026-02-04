import { MainLayout } from '@/components/layout/MainLayout';
import { BarcodeScanner } from '@/components/pos/BarcodeScanner';
import { Cart } from '@/components/pos/Cart';

export default function POSPage() {
  return (
    <MainLayout>
      <div className="h-screen flex flex-col">
        <div className="p-4 border-b border-border bg-card">
          <BarcodeScanner />
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto p-4">
            <Cart />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
