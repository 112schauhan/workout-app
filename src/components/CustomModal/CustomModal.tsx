import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    return (
        <Dialog open={open} onClose={onClose} data-testid="custom-modal" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <DialogTitle data-testid="modal-title" sx={{ textAlign: 'center',fontSize:'24px',fontWeight:700 }}>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button data-testid="modal-button" onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomModal;