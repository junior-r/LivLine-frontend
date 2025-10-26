import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface PinVerificationProps {
  isOpen: boolean;
  onSuccess: (pin: string) => Promise<boolean>;
  onCancel: () => void;
}

export function PinVerification({
  isOpen,
  onSuccess,
  onCancel,
}: PinVerificationProps) {
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPin("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin.trim()) {
      toast.error("Por favor ingresa tu PIN de acceso");
      return;
    }

    setIsLoading(true);
    const success = await onSuccess(pin);
    setIsLoading(false);

    if (!success) setPin("");
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verificación de Acceso</DialogTitle>
          <DialogDescription>
            Ingresa el PIN de seguridad para acceder a los datos médicos.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">
          <Input
            type="password"
            placeholder="PIN de acceso"
            autoComplete="off"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            disabled={isLoading}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader size="sm" /> Verificando...
                </div>
              ) : (
                "Confirmar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
