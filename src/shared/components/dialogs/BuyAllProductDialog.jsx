import React, { useState } from "react";
import { useBuyAllProductsMutation } from "../../../shared";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField,
    Stack,
    Alert
} from "@mui/material";

export const BuyAllDialog = ({ open, onClose, products, onSuccess }) => {

    const [buyAllProducts, { isLoading }] = useBuyAllProductsMutation();

    const [paymentType, setPaymentType] = useState("credit_card");
    const [installments, setInstallments] = useState(1);

    const totalAmount = products?.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const handleSubmit = async () => {
        try {
            const uid = localStorage.getItem("user_id");

            const payload = {
                customer_id: uid,
                payment_type: paymentType,
                payment_installments: Number(installments),

                items: products.map(item => ({
                    product_id: Array.isArray(item.product_id)
                        ? item.product_id[0]  
                        : item.product_id,
                    quantity: item.quantity
                }))
            };
            console.log(payload)
            console.log(typeof products[0].product_id);
            
            await buyAllProducts(payload).unwrap();

            if (onSuccess) onSuccess();

            onClose();

        } catch (err) {
            console.error("Buy all failed", err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Buy All Products</DialogTitle>

            <DialogContent>
                <Stack spacing={2} mt={1}>

                    <Alert severity="info">
                        Total Items: {products?.length}
                        <br />
                        Total Amount: ₹{totalAmount?.toFixed(2)}
                    </Alert>

                    <TextField
                        select
                        label="Payment Type"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="credit_card">Credit Card</MenuItem>
                        <MenuItem value="debit_card">Debit Card</MenuItem>
                        <MenuItem value="boleto">Boleto</MenuItem>
                        <MenuItem value="voucher">Voucher</MenuItem>
                    </TextField>

                    <TextField
                        label="Installments"
                        type="number"
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        fullWidth
                        disabled={paymentType !== "credit_card"}
                    />

                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="error" variant="contained">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? "Processing..." : "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
