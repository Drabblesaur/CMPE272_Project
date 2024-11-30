import React from "react"
import { AlertCircle } from 'lucide-react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function ErrorAlert({
  title = "Error",
  description,
  showIcon = true
}) {
  return (
    (<Alert variant="destructive">
      {showIcon && <AlertCircle className="h-4 w-4" />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>)
  );
}

