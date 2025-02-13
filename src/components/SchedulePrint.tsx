"use client";

import { Button } from "@components/components/ui/button";
import { PrinterIcon } from "lucide-react";
import { useRef } from "react";
import { Schedule } from "@lib/prisma/queries";
import SchedulePreview from "@components/SchedulePreview";

const SchedulePrint = ({ schedule }: { schedule: Schedule[] }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const newWindow = window.open("", "_blank");
      if (newWindow) {
        newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Розклад - Друк</title>
            <style>
              @page { size: auto;  margin: 0mm; }
              body { 
                font-family: Palatino Linotype, sans-serif; 
                padding: 40px; margin: 0; 
                max-height: 25cm; 
              }
            </style>
          </head>
          <body>
            <main>${printContent}</main>
          </body>
        </html>
      `);
        newWindow.document.close();
        // Wait until all images are loaded before printing
        const images = newWindow.document.images;
        let loadedImages = 0;

        if (images.length > 0) {
          for (const img of images) {
            img.onload = () => {
              loadedImages++;
              if (loadedImages === images.length) {
                newWindow.focus();
                newWindow.print();
                newWindow.close();
              }
            };
            img.onerror = () => {
              loadedImages++;
              if (loadedImages === images.length) {
                newWindow.focus();
                newWindow.print();
                newWindow.close();
              }
            };
          }
        } else {
          // No images, proceed with printing
          newWindow.focus();
          newWindow.print();
          newWindow.close();
        }
      }
    }
  };

  return (
    <>
      <Button onClick={handlePrint}>
        Друк
        <PrinterIcon />
      </Button>
      <SchedulePreview
        ref={printRef}
        schedule={schedule}
        showQrCode
        showFooter
        className="hidden print:block"
      />
    </>
  );
};

export default SchedulePrint;
