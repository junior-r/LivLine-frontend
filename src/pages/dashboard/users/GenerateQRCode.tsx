import { useRef, useState } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface Props {
  url: string;
  userId: string;
}

function DataQRCode({ url, userId }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [format, setFormat] = useState<"png" | "jpg" | "svg">("png");
  const qrCodeName = `${userId}-qr-code.${format}`;

  const handleDownload = () => {
    if (format === "svg") {
      const svgElement = document.getElementById(`qr-${userId}`);
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = qrCodeName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const imageURL = canvas.toDataURL(mimeType);

      const a = document.createElement("a");
      a.href = imageURL;
      a.download = qrCodeName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    toast.success("Código QR generado y descargado correctamente.");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {format === "svg" ? (
        <QRCodeSVG
          id={`qr-${userId}`}
          value={url}
          size={150}
          level="L"
          minVersion={1}
          marginSize={4}
        />
      ) : (
        <QRCodeCanvas
          id={`qr-${userId}`}
          value={url}
          size={150}
          level="L"
          minVersion={1}
          marginSize={4}
          ref={canvasRef}
        />
      )}
      <div className="flex">
        <Button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 rounded-tr-none rounded-br-none"
        >
          Descargar QR ({format.toUpperCase()})
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-blue-600 focus:border-none text-white rounded hover:bg-blue-700 rounded-tl-none rounded-bl-none">
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFormat("png")}>
              PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFormat("jpg")}>
              JPG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFormat("svg")}>
              SVG
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default DataQRCode;
