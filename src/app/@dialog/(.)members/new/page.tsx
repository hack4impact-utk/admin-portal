'use client';
import { ArrowBack } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewMemberDialog() {
  const router = useRouter();
  return (
    <Dialog
      open={true}
      onClose={() => router.back()}
      sx={{ '& .MuiDialog-paper': { minWidth: '40vw' } }}
    >
      <DialogTitle sx={{ px: 2 }}>
        <IconButton sx={{ mr: 2 }} onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        Add a member
      </DialogTitle>
      <DialogContent>
        <h1>NewMemberDialog</h1>
      </DialogContent>
    </Dialog>
  );
}
