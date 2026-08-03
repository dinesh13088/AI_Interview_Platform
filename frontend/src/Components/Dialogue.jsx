
"use client";

import { Alert } from "flowbite-react";

export function Dialogue() {
  return (
    <Alert color="success" onDismiss={() => alert('Alert dismissed!')}>
      <span className="font-medium">Info alert!</span> Account Created Successfully!!
    </Alert>
  );
}
