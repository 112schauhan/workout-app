import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Transition } from '../UI/Transition';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CustomModal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    return (
        <Dialog open={open}
            onClose={onClose}
            data-testid="custom-modal"
            sx={{ position: 'fixed', top: '5%', left: '20%', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '800px', maxHeight: '900px' }}
            TransitionComponent={Transition}
        >
            <DialogActions sx={{ justifyContent: 'flex-end', position: 'absolute', top: 0, right: 0, scale: '0.8', padding: '2px' }}>
                <IconButton data-testid="modal-button" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <DialogTitle data-testid="modal-title" sx={{ textAlign: 'center', fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>{title}</DialogTitle>

            <DialogContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>{children}</DialogContent>

        </Dialog>
    );
};

export default CustomModal;