import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy as CopyIcon, Check as CopyCheck } from "lucide-react"; // o los íconos que uses

export function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  return (
    <Button
      size="icon"
      variant="outline"
      title="Copiar URL de acceso"
      onClick={handleCopy}
      className="cursor-pointer"
    >
      {copied ? (
        <CopyCheck className="w-4 h-4 text-green-500" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
