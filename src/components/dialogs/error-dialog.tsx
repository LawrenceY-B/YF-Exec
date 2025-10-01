import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onRetry?: () => void;
  showCancel?: boolean;
  retryText?: string;
  cancelText?: string;
}

export function ErrorDialog({
  open,
  onOpenChange,
  title = "An error occurred",
  description = "Please try again later or contact support if the issue persists.",
  onRetry,
  showCancel = true,
  retryText = "Try Again",
  cancelText = "Cancel",
}: ErrorDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
          {onRetry && (
            <AlertDialogAction onClick={onRetry}>{retryText}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
