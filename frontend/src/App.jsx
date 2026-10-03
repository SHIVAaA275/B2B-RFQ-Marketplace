import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyerDashboard from "./pages/BuyerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import CreateRFQ from "./pages/CreateRFQ";
import MyRFQs from "./pages/MyRFQs";
import RFQQuotations from "./pages/RFQQuotations";
import BrowseRFQs from "./pages/BrowseRFQs";
import SupplierRFQDetails from "./pages/SupplierRFQDetails";
import MyQuotations from "./pages/MyQuotations";
import EditRFQ from "./pages/EditRFQ";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Register />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/buyer"
                    element={
                        <ProtectedRoute role="buyer">
                            <BuyerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/buyer/create-rfq"
                    element={
                        <ProtectedRoute role="buyer">
                            <CreateRFQ />
                        </ProtectedRoute>
                    }
                />

                
                <Route
                    path="/buyer/my-rfqs"
                    element={
                        <ProtectedRoute role="buyer">
                            <MyRFQs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/buyer/rfq/:rfqId/edit"
                    element={
                        <ProtectedRoute role="buyer">
                            <EditRFQ />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/buyer/rfq/:rfqId/quotations"
                    element={
                        <ProtectedRoute role="buyer">
                            <RFQQuotations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/supplier"
                    element={
                        <ProtectedRoute role="supplier">
                            <SupplierDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/supplier/rfqs"
                    element={
                        <ProtectedRoute role="supplier">
                            <BrowseRFQs />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/supplier/rfq/:rfqId"
                    element={
                        <ProtectedRoute role="supplier">
                            <SupplierRFQDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/supplier/my-quotations"
                    element={
                        <ProtectedRoute role="supplier">
                            <MyQuotations />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;