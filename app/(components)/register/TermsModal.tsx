"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/atoms/dialog";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-seniorBankDarkBlue">
            Våre Vilkår
          </DialogTitle>
          <DialogDescription>
            Vennligst les gjennom våre vilkår og betingelser.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4 text-sm">
          <h3 className="text-lg font-semibold">1. Generelle Vilkår</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
            ultricies nisl nisl eget nisl.
          </p>

          <h3 className="text-lg font-semibold">2. Personvern</h3>
          <p>
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
            nisl, eget ultricies nisl nisl eget nisl. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>

          <h3 className="text-lg font-semibold">3. Bruk av Tjenesten</h3>
          <p>
            Eget ultricies nisl nisl eget nisl. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
            tincidunt, nisl nisl aliquam nisl.
          </p>

          <h3 className="text-lg font-semibold">4. Ansvar</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
            ultricies nisl nisl eget nisl.
          </p>

          <h3 className="text-lg font-semibold">5. Oppsigelse</h3>
          <p>
            Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam
            nisl, eget ultricies nisl nisl eget nisl. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
