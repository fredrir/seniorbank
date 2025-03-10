import React from "react";
import { TriangleAlert } from 'lucide-react';

const Alert = () => {
  return (
    <div className="flex flex-row gap-4 text-seniorBankDarkBlue">
      <TriangleAlert className="size-16" />
      <div className="flex flex-col text-2xl">
        <p>Mistenkelig mottaker.</p>
        <p>Trygghetskontakt er varslet</p>
      </div>
    </div>
  );
};

export default Alert;