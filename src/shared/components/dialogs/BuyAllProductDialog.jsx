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
    Alert,
    Box,
    Typography,
    alpha
} from "@mui/material";

import { 
  StyledTextField, 
  AuthButton 
} from '../../../shared/styled-components/StyledComponents';

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
            await buyAllProducts(payload).unwrap();
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error("Acquisition failed", err);
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth 
            maxWidth="xs"
            PaperProps={{
              sx: { 
                borderRadius: '24px', 
                p: 2,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)'
              }
            }}
        >
            <DialogTitle sx={{ variant: 'h3', textAlign: 'center', pb: 0 }}>Finalize Collection</DialogTitle>

            <DialogContent>
                <Stack spacing={4} sx={{ mt: 3 }}>
                    <Box sx={{ p: 2, borderRadius: '16px', bgcolor: alpha('#4F7C82', 0.05), border: '1px solid', borderColor: alpha('#4F7C82', 0.1) }}>
                        <Typography variant="overline" color="primary.main" display="block">Collection Summary</Typography>
                        <Typography variant="h5">{products?.length} Exquisite Pieces</Typography>
                        <Typography variant="h4" sx={{ mt: 1 }}>₹{totalAmount?.toLocaleString()}</Typography>
                    </Box>

                    <StyledTextField
                        select
                        label="Method of Payment"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="credit_card">Premium Card</MenuItem>
                        <MenuItem value="debit_card">Digital Core</MenuItem>
                        <MenuItem value="boleto">Direct Transfer</MenuItem>
                        <MenuItem value="voucher">Signature Credit</MenuItem>
                    </StyledTextField>

                    {paymentType === 'credit_card' && (
                        <StyledTextField
                            label="Installments"
                            type="number"
                            value={installments}
                            onChange={(e) => setInstallments(e.target.value)}
                            fullWidth
                        />
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
                <Button onClick={onClose} sx={{ color: 'text.secondary', fontWeight: 600 }}>
                    Dismiss
                </Button>
                <AuthButton
                    onClick={handleSubmit}
                    disabled={isLoading}
                    sx={{ px: 6 }}
                >
                    {isLoading ? "Processing..." : "Acquire Collection"}
                </AuthButton>
            </DialogActions>
        </Dialog>
    );
};
