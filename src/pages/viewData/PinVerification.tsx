import { useState } from "react";
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
import { verifyUserId } from "@/actions/user";
import { useValidatePinStore } from "@/store/medicalData/useValidatePinStore";

interface PinVerificationProps {
  userPk: string;
}

export function PinVerification({ userPk }: PinVerificationProps) {
  const [pin, setPin] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const setPinValidated = useValidatePinStore((state) => state.setPinValidated);

  const handleCancelPin = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pin.trim()) {
      toast.error("Por favor ingresa tu PIN de acceso");
      return;
    }

    try {
      setIsLoading(true);
      const res = await verifyUserId(userPk, pin);
      if (res.error) {
        setError(res.error);
        return;
      }

      setPinValidated(true);
      setIsOpen(false);
    } catch (_error) {
      setError("Error al verificar el PIN");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => null}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Verificar acceso
        </Button>
      </DialogTrigger>
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
              onClick={handleCancelPin}
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
