import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartSidebar } from './components/cart/CartSidebar';
import { HomePage } from './pages/HomePage';
import { ProductCatalogPage } from './pages/ProductCatalogPage';
import { SupplierDirectoryPage } from './pages/SupplierDirectoryPage';
import { QuoteRequestsPage } from './pages/QuoteRequestsPage';
import { DashboardPage } from './pages/DashboardPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { HelpCenterPage } from './pages/HelpCenterPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background flex flex-col">
            <Routes>
              {/* Auth pages without header */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              
              {/* Main app with header */}
              <Route path="/*" element={
                <>
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductCatalogPage />} />
                      <Route path="/suppliers" element={<SupplierDirectoryPage />} />
                      <Route path="/quotes" element={<QuoteRequestsPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/help" element={<HelpCenterPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CartSidebar />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;